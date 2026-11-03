// Seed script for citizen app demo data
// Primes localStorage with Godhra presentation mock data idempotently.

import {
  DEMO_DEVICE_ID,
  DEMO_WARD_ID,
  DEMO_CITIZEN,
  DEMO_WARDS,
  DEMO_ROUTES,
  DEMO_VANS,
  DEMO_COMPLAINTS,
  DEMO_NOTICES,
  DEMO_RATINGS,
  DEMO_FEEDBACK,
  DEMO_WARD_DUTY,
} from './demoData';

export async function seedDemoData() {
  if (typeof window === 'undefined' || !window.localStorage) {
    return {
      deviceId: DEMO_DEVICE_ID,
      wardId: DEMO_WARD_ID,
      citizen: DEMO_CITIZEN,
      wards: DEMO_WARDS,
      routes: DEMO_ROUTES,
      vans: DEMO_VANS,
      complaints: DEMO_COMPLAINTS,
      notices: DEMO_NOTICES,
      ratings: DEMO_RATINGS,
      feedback: DEMO_FEEDBACK,
      wardDuty: DEMO_WARD_DUTY,
    };
  }

  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const todayKey = `${yyyy}-${mm}-${dd}`;

  // 1. Device and citizen identity
  localStorage.setItem('safai_sathi_device_id', DEMO_DEVICE_ID);
  localStorage.setItem('safai_sathi_selected_ward_id', DEMO_WARD_ID);
  localStorage.setItem('safai_sathi_citizen_address_text', DEMO_CITIZEN.address);
  localStorage.setItem('safai_sathi_intro_completed', 'true');

  // 2. Complaints and collection feedback
  localStorage.setItem('safai_sathi_my_complaints', JSON.stringify(DEMO_COMPLAINTS));
  localStorage.setItem('safai_sathi_collection_feedback', JSON.stringify(DEMO_FEEDBACK));

  // 3. Ward duty over flag (in-progress, not duty over)
  const dutyKey = `${todayKey}_${DEMO_WARD_ID}`;
  let wardDutyRecords: Record<string, boolean> = {};
  const existingDutyRaw = localStorage.getItem('safai_sathi_ward_duty_over_by_date');
  if (existingDutyRaw) {
    try {
      wardDutyRecords = JSON.parse(existingDutyRaw);
    } catch {}
  }
  wardDutyRecords[dutyKey] = false;
  localStorage.setItem('safai_sathi_ward_duty_over_by_date', JSON.stringify(wardDutyRecords));

  // 4. Reset missed reports and arrival alerts for the demo session
  localStorage.setItem('safai_sathi_missed_reports_by_date', JSON.stringify({}));
  localStorage.setItem('safai_sathi_arrival_alerts_by_date', JSON.stringify({}));

  // 5. Admin wards (all 16 Godhra wards)
  localStorage.setItem('safai_sathi_admin_wards', JSON.stringify(DEMO_WARDS));

  const demoData = {
    deviceId: DEMO_DEVICE_ID,
    wardId: DEMO_WARD_ID,
    citizen: DEMO_CITIZEN,
    wards: DEMO_WARDS,
    routes: DEMO_ROUTES,
    vans: DEMO_VANS,
    complaints: DEMO_COMPLAINTS,
    notices: DEMO_NOTICES,
    ratings: DEMO_RATINGS,
    feedback: DEMO_FEEDBACK,
    wardDuty: DEMO_WARD_DUTY,
  };

  console.log('Demo data seeded successfully for Godhra W03 Bhadrapura');
  return demoData;
}
