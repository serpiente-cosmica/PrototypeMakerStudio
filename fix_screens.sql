-- ============================================================================
-- FIX SCREENS - Complete Database Setup
-- ============================================================================
-- This script will:
-- 1. Remove old/invalid screens (onboarding_notifications, onboarding_analytics)
-- 2. Add all 6 working screens to your database
-- 3. Link them to your approach in the correct order
-- ============================================================================

-- STEP 1: First, find your approach_id
-- Run this query and copy the approach_id:
SELECT approach_id, name, description FROM app_approaches;

-- STEP 2: Find your client_id and verify which approach it uses
-- Replace 'YOUR_CLIENT_ID' with your actual client_id
SELECT client_id, app_name, approach_id FROM client_configs;

-- ============================================================================
-- STEP 3: Delete old/invalid screens from approach_screens
-- ============================================================================

-- Delete invalid screen references from approach_screens
DELETE FROM approach_screens 
WHERE screen_id IN ('onboarding_notifications', 'onboarding_analytics');

-- ============================================================================
-- STEP 4: Insert all 6 working screens into app_screens
-- ============================================================================

-- 1. Login with Logo
INSERT INTO app_screens (screen_id, name, description)
VALUES (
  'login_generic_logo',
  'Login with Logo',
  'Login screen with logo and simple form'
)
ON CONFLICT (screen_id) DO UPDATE
SET name = EXCLUDED.name, description = EXCLUDED.description;

-- 2. Login with Form
INSERT INTO app_screens (screen_id, name, description)
VALUES (
  'login_generic_form',
  'Login with Form',
  'Login screen with detailed form'
)
ON CONFLICT (screen_id) DO UPDATE
SET name = EXCLUDED.name, description = EXCLUDED.description;

-- 3. Data Privacy
INSERT INTO app_screens (screen_id, name, description)
VALUES (
  'data_privacy',
  'Data Privacy',
  'Data privacy information and consent screen'
)
ON CONFLICT (screen_id) DO UPDATE
SET name = EXCLUDED.name, description = EXCLUDED.description;

-- 4. Home Dashboard
INSERT INTO app_screens (screen_id, name, description)
VALUES (
  'home_dashboard',
  'Home Dashboard',
  'Home screen with banner, alerts, and push notifications'
)
ON CONFLICT (screen_id) DO UPDATE
SET name = EXCLUDED.name, description = EXCLUDED.description;

-- 5. Menu Dashboard
INSERT INTO app_screens (screen_id, name, description)
VALUES (
  'menu_dashboard',
  'Menu Dashboard',
  'Menu with profile, configurable tiles, and navigation'
)
ON CONFLICT (screen_id) DO UPDATE
SET name = EXCLUDED.name, description = EXCLUDED.description;

-- 6. My Activities
INSERT INTO app_screens (screen_id, name, description)
VALUES (
  'my_activities',
  'My Activities',
  'Activities tracking with calendar and configurable cards'
)
ON CONFLICT (screen_id) DO UPDATE
SET name = EXCLUDED.name, description = EXCLUDED.description;

-- ============================================================================
-- STEP 5: Link screens to your approach
-- IMPORTANT: Replace 'YOUR_APPROACH_ID_HERE' with the actual UUID from STEP 1
-- ============================================================================

-- First, clear existing approach_screens for this approach (optional - only if you want a fresh start)
-- Uncomment the next line if you want to delete all existing screen associations:
-- DELETE FROM approach_screens WHERE approach_id = 'YOUR_APPROACH_ID_HERE'::uuid;

-- Add all 6 screens to your approach in order
INSERT INTO approach_screens (approach_id, screen_id, order_index)
VALUES 
  ('550e8400-e29b-41d4-a716-446655440001'::uuid, 'login_generic_logo', 0),
  ('550e8400-e29b-41d4-a716-446655440001'::uuid, 'login_generic_form', 1),
  ('550e8400-e29b-41d4-a716-446655440001'::uuid, 'data_privacy', 2),
  ('550e8400-e29b-41d4-a716-446655440001'::uuid, 'home_dashboard', 3),
  ('550e8400-e29b-41d4-a716-446655440001'::uuid, 'menu_dashboard', 4),
  ('550e8400-e29b-41d4-a716-446655440001'::uuid, 'my_activities', 5)
ON CONFLICT (approach_id, screen_id) 
DO UPDATE SET order_index = EXCLUDED.order_index;

-- ============================================================================
-- STEP 6: Verify everything is set up correctly
-- ============================================================================

-- Check all screens are in app_screens
SELECT screen_id, name, description FROM app_screens
ORDER BY screen_id;

-- Check screens are linked to your approach
SELECT 
  aps.approach_id,
  aps.screen_id,
  aps.order_index,
  s.name,
  s.description
FROM approach_screens aps
JOIN app_screens s ON aps.screen_id = s.screen_id
WHERE aps.approach_id = '550e8400-e29b-41d4-a716-446655440001'::uuid
ORDER BY aps.order_index;

-- Check which approach your client is using
SELECT 
  cc.client_id,
  cc.app_name,
  cc.approach_id,
  aa.name as approach_name,
  (
    SELECT COUNT(*) 
    FROM approach_screens 
    WHERE approach_id = cc.approach_id
  ) as total_screens
FROM client_configs cc
LEFT JOIN app_approaches aa ON cc.approach_id = aa.approach_id
ORDER BY cc.created_at DESC;

-- ============================================================================
-- DONE! After running this script:
-- 1. Go to your app: http://localhost:3000/portal/client/YOUR_CLIENT_ID/configure
-- 2. Hard refresh (Cmd+Shift+R or Ctrl+Shift+R)
-- 3. You should see "1 / 6" in the navigation
-- 4. Use Previous/Next buttons to navigate through all 6 screens
-- ============================================================================

