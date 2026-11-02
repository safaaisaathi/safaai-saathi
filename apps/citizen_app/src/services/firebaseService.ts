/**
 * Safaai Saathi - Firebase Firestore, Auth & Cloud Functions Integration Service
 * Platform Contract Architecture: v1.0.0 (Project: safaaisaathi-63a87)
 * Implements CHG-0003: Claim-scoped auth session via bootstrapUserSession callable
 */
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  onSnapshot,
  Firestore,
  serverTimestamp,
} from 'firebase/firestore';
import {
  getAuth,
  signInAnonymously,
  signInWithCustomToken,
  onAuthStateChanged,
  Auth,
  User,
} from 'firebase/auth';
import { getFunctions, httpsCallable, Functions } from 'firebase/functions';
import { Complaint, CitizenCollectionFeedback } from '../types';

// Shared Platform Firebase Configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyDemo-Godhra-SafaaiSaathi2026',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'safaaisaathi-63a87.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'safaaisaathi-63a87',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'safaaisaathi-63a87.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '179594621556',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:179594621556:web:citizenapp',
};

const DEVICE_STORAGE_KEY = 'safai_sathi_device_id';

class FirebaseService {
  private app: FirebaseApp | null = null;
  private db: Firestore | null = null;
  private auth: Auth | null = null;
  private functions: Functions | null = null;
  private currentUser: User | null = null;
  private authInitPromise: Promise<string | null> | null = null;
  private isConfigured: boolean = false;
  private deviceId: string;
  private currentRouteId: string | null = null;
  private currentWardId: string | null = null;

  constructor() {
    this.deviceId = this.initDeviceId();
    this.init();
  }

  /**
   * Generates or retrieves the persistent client install UUID.
   * Required for CHG-0003 claim minting & complaint scope.
   */
  private initDeviceId(): string {
    let id = localStorage.getItem(DEVICE_STORAGE_KEY);
    if (!id) {
      if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        id = crypto.randomUUID();
      } else {
        id = 'dev_' + Math.random().toString(36).substring(2, 10) + '_' + Date.now().toString(36);
      }
      localStorage.setItem(DEVICE_STORAGE_KEY, id);
    }
    return id;
  }

  public getDeviceId(): string {
    return this.deviceId;
  }

  public getCurrentRouteId(): string | null {
    return this.currentRouteId;
  }

  private init() {
    try {
      this.app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
      this.db = getFirestore(this.app);
      this.auth = getAuth(this.app);
      this.functions = getFunctions(this.app, 'asia-south1');
      this.isConfigured = true;

      // Start by ensuring an authenticated session (custom claim or anonymous fallback)
      const savedWardId = localStorage.getItem('safai_sathi_selected_ward_id') || 'ward_godhra_01';
      this.authInitPromise = this.bootstrapUserSession(savedWardId)
        .then(() => this.currentUser?.uid || this.deviceId)
        .catch((err) => {
          console.warn('Bootstrap callable fallback to anonymous auth:', err?.message || err);
          return this.fallbackAnonymousAuth();
        });

      onAuthStateChanged(this.auth, (user) => {
        this.currentUser = user;
      });

      console.log('✅ Safaai Saathi Platform Firebase Initialized (safaaisaathi-63a87)');
    } catch (err) {
      console.warn('Firebase initialization in offline/fallback mode:', err);
      this.isConfigured = false;
    }
  }

  private async fallbackAnonymousAuth(): Promise<string | null> {
    if (!this.auth) return null;
    try {
      const cred = await signInAnonymously(this.auth);
      this.currentUser = cred.user;
      console.log(`🔐 Anonymous Auth Fallback Active (UID: ${cred.user.uid.slice(0, 8)}...)`);
      return cred.user.uid;
    } catch (authErr) {
      console.warn('Anonymous auth offline mode:', authErr);
      return null;
    }
  }

  /**
   * CHG-0003: Session Bootstrap callable
   * Resolves the citizen's ward to its assigned routeId and mints a custom token
   * containing deviceId and routeId claims.
   */
  public async bootstrapUserSession(wardId: string): Promise<boolean> {
    if (!this.auth || !this.functions) return false;
    this.currentWardId = wardId;

    try {
      const bootstrapCallable = httpsCallable<{ deviceId: string; wardId: string }, { token: string; deviceId: string; routeId: string }>(
        this.functions,
        'bootstrapUserSession'
      );

      const res = await bootstrapCallable({
        deviceId: this.deviceId,
        wardId,
      });

      const { token, routeId } = res.data;
      if (token) {
        const cred = await signInWithCustomToken(this.auth, token);
        this.currentUser = cred.user;
        this.currentRouteId = routeId;
        console.log(`🔐 Safaai Saathi Claim-Scoped Session Active (deviceId: ${this.deviceId.slice(0, 8)}..., routeId: ${routeId})`);
        return true;
      }
    } catch (err) {
      console.warn('bootstrapUserSession call deferred (running in offline/dev mode):', err);
    }

    // Ensure fallback session so writes are not blocked
    if (!this.currentUser) {
      await this.fallbackAnonymousAuth();
    }
    return false;
  }

  /**
   * Re-bootstraps session when citizen selects a different municipal ward.
   * If routeId changes, custom claim token is refreshed automatically.
   */
  public async onWardChanged(newWardId: string): Promise<void> {
    if (newWardId && newWardId !== this.currentWardId) {
      await this.bootstrapUserSession(newWardId);
    }
  }

  /**
   * Explicitly ensures the citizen has an active authenticated session before writes.
   */
  public async ensureAuth(): Promise<string | null> {
    if (this.currentUser?.uid) {
      return this.currentUser.uid;
    }
    if (this.authInitPromise) {
      const uid = await this.authInitPromise;
      if (uid) return uid;
    }
    return this.fallbackAnonymousAuth();
  }

  public getUid(): string | null {
    return this.currentUser?.uid || this.deviceId;
  }

  /**
   * Upload or sync a complaint to Firestore collection `complaints`
   * Scoped by deviceId claim per Platform Contract v1.0.0
   */
  async syncComplaintToCloud(complaint: Complaint): Promise<{ success: boolean; cloudId: string }> {
    if (!this.db || !this.isConfigured) {
      return { success: false, cloudId: complaint.id };
    }

    try {
      await this.ensureAuth();
      const docRef = doc(this.db, 'complaints', complaint.id);

      const firestorePayload = {
        ...complaint,
        syncStatus: 'synced',
        deviceId: this.deviceId,
        escalationLevel: complaint.escalationLevel ?? 0,
        status: complaint.status || 'received',
        serverReceivedAt: serverTimestamp(),
        syncSource: 'citizen_app_client',
      };

      await setDoc(docRef, firestorePayload, { merge: true });
      console.log(`📡 Complaint ${complaint.ticketId} synced to Firestore (Contract v1.0.0).`);
      return { success: true, cloudId: complaint.id };
    } catch (error) {
      console.warn(`Firestore sync queued locally for ticket ${complaint.ticketId}:`, error);
      return { success: false, cloudId: complaint.id };
    }
  }

  /**
   * Sync citizen rating for a ward collection to Firestore collection `ratings`
   * Contract: 02-contracts/collections/rating.schema.json
   */
  async syncRatingToCloud(wardId: string, stars: number, date?: string): Promise<boolean> {
    if (!this.db || !this.isConfigured) return false;
    try {
      await this.ensureAuth();
      const todayKey = date || new Date().toISOString().split('T')[0];
      const istMidnight = `${todayKey}T00:00:00.000Z`;
      const docId = `${todayKey}_${wardId}_${this.deviceId.slice(0, 10)}`;

      const docRef = doc(this.db, 'ratings', docId);
      await setDoc(docRef, {
        wardId,
        date: istMidnight,
        stars: Math.max(1, Math.min(5, Math.round(stars))),
        deviceId: this.deviceId,
        createdAt: serverTimestamp(),
      }, { merge: true });

      console.log(`⭐ Rating ${stars} stars synced for ward ${wardId}.`);
      return true;
    } catch (err) {
      console.warn('Rating sync deferred:', err);
      return false;
    }
  }

  /**
   * Sync collection audit feedback to Firestore
   */
  async syncFeedbackToCloud(feedback: CitizenCollectionFeedback): Promise<boolean> {
    if (!this.db || !this.isConfigured) return false;
    try {
      await this.ensureAuth();
      const docId = `${feedback.date}_${feedback.wardId}_${this.deviceId.slice(0, 10)}`;
      const docRef = doc(this.db, 'collectionFeedback', docId);
      await setDoc(docRef, { 
        ...feedback, 
        syncStatus: 'synced', 
        deviceId: this.deviceId, 
        serverReceivedAt: serverTimestamp() 
      }, { merge: true });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Listen to real-time status updates from the Municipal Admin / Ward Inspector
   */
  listenToTicketUpdates(complaintId: string, onUpdate: (updatedComplaint: Partial<Complaint>) => void): () => void {
    if (!this.db || !this.isConfigured) {
      return () => {};
    }

    try {
      const docRef = doc(this.db, 'complaints', complaintId);
      return onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data() as Partial<Complaint>;
          onUpdate(data);
        }
      });
    } catch (err) {
      console.warn('Real-time ticket listener error:', err);
      return () => {};
    }
  }

  /**
   * Checks whether the sanitation van's duty in a specific ward has completed for today.
   */
  async checkWardDutyOver(wardId: string): Promise<boolean> {
    const today = new Date().toISOString().split('T')[0];
    if (this.db && this.isConfigured) {
      try {
        const docRef = doc(this.db, 'wardDuty', `${today}_${wardId}`);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          const data = snap.data();
          if (data.isDutyOver === true || data.status === 'completed') {
            return true;
          }
        }
      } catch {
        // Fallback to local storage in offline mode
      }
    }
    const data = localStorage.getItem('safai_sathi_ward_duty_over_by_date');
    if (data) {
      try {
        const records = JSON.parse(data);
        return Boolean(records[`${today}_${wardId}`]);
      } catch {}
    }
    return false;
  }

  /**
   * Syncs ward duty completion status to Firestore collection 'wardDuty'
   */
  async syncWardDutyToCloud(wardId: string, isOver: boolean = true): Promise<boolean> {
    if (!this.db || !this.isConfigured) return false;
    try {
      const today = new Date().toISOString().split('T')[0];
      const docRef = doc(this.db, 'wardDuty', `${today}_${wardId}`);
      await setDoc(docRef, {
        wardId,
        date: today,
        isDutyOver: isOver,
        status: isOver ? 'completed' : 'in_progress',
        updatedAt: serverTimestamp(),
      }, { merge: true });
      return true;
    } catch {
      return false;
    }
  }

  getIsConfigured(): boolean {
    return this.isConfigured;
  }
}

export const firebaseService = new FirebaseService();
