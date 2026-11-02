/**
 * GENERATED / PLATFORM CONTRACT CONSTANTS & DEFINITIONS
 * Synced from 02-contracts/constants.json & enums.json (Platform Contract v1.0.0)
 */

// Tracking thresholds
export const GPS_INTERVAL_SEC = 10;
export const GPS_INTERVAL_LOW_BATTERY_SEC = 30;
export const LOW_BATTERY_PCT = 20;
export const MIN_MOVE_M = 15;
export const HEARTBEAT_SEC = 30;

// Arrival alert geometry & thresholds (CHG-0007: 100m from ward boundary)
export const ARRIVAL_ALERT_RADIUS_M = 100;
export const STALE_LOCATION_SEC = 60;
export const OFFLINE_THRESHOLD_MIN = 10;

// Duplicates & escalation
export const DUPLICATE_RADIUS_M = 50;
export const ESCALATION_L1_HOURS = 24;
export const ESCALATION_L2_HOURS = 48;
export const MISSED_REPORT_THRESHOLD = 3;

// Complaint rate limits
export const MAX_COMPLAINTS_PER_DEVICE_PER_DAY = 5;

// Depot & ETA
export const DEPOT_RADIUS_M = 500;
export const DEPOT_DWELL_LIMIT_HOURS = 3;
export const DEPOT_DWELL_RESET_M = 100;
export const AVG_VAN_SPEED_KMPH = 15;

// Custom Claim Names (CHG-0003)
export const CLAIM_VAN_ID = 'vanId';
export const CLAIM_DRIVER_ID = 'driverId';
export const CLAIM_DEVICE_ID = 'deviceId';
export const CLAIM_ROUTE_ID = 'routeId';
export const CLAIM_CURRENT_TRIP_ID = 'currentTripId';
export const CLAIM_STAFF_ID = 'staffId';
export const CLAIM_WARD_IDS = 'wardIds';
export const CLAIM_ROLE = 'role';

// Contract Frozen Enums
export const VAN_STATUSES = ['idle', 'on_shift', 'offline'] as const;
export const WARD_TYPES = ['urban', 'rural'] as const;
export const COMPLAINT_CATEGORIES = [
  'garbage_dump',
  'open_gutter',
  'missed_collection',
  'other',
] as const;
export const COMPLAINT_STATUSES = [
  'received',
  'assigned',
  'resolved',
  'escalated',
] as const;

// FCM Topics
export const TOPIC_ALL = 'all';
export const getWardTopic = (wardId: string) => `ward_${wardId}`;
export const getVanTopic = (vanId: string) => `van_${vanId}`;
export const getStaffTopic = (staffId: string) => `staff_${staffId}`;
