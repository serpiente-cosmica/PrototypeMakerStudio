-- EMERGENCY FIX - Run this NOW
-- This will completely reset your screens to exactly 6 screens

-- STEP 1: Delete ALL existing screen associations for your approach
DELETE FROM approach_screens 
WHERE approach_id = '550e8400-e29b-41d4-a716-446655440001'::uuid;

-- STEP 2: Add all 6 screens to app_screens (creates them if they don't exist)
INSERT INTO app_screens (screen_id, name, description)
VALUES 
  ('login_generic_logo', 'Login with Logo', 'Login screen with logo and simple form'),
  ('login_generic_form', 'Login with Form', 'Login screen with detailed form'),
  ('data_privacy', 'Data Privacy', 'Data privacy information and consent screen'),
  ('home_dashboard', 'Home Dashboard', 'Home screen with banner, alerts, and push notifications'),
  ('menu_dashboard', 'Menu Dashboard', 'Menu with profile, configurable tiles, and navigation'),
  ('my_activities', 'My Activities', 'Activities tracking with calendar and configurable cards')
ON CONFLICT (screen_id) DO UPDATE
SET name = EXCLUDED.name, description = EXCLUDED.description;

-- STEP 3: Link all 6 screens to your approach in order (0 to 5)
INSERT INTO approach_screens (approach_id, screen_id, order_index)
VALUES 
  ('550e8400-e29b-41d4-a716-446655440001'::uuid, 'login_generic_logo', 0),
  ('550e8400-e29b-41d4-a716-446655440001'::uuid, 'login_generic_form', 1),
  ('550e8400-e29b-41d4-a716-446655440001'::uuid, 'data_privacy', 2),
  ('550e8400-e29b-41d4-a716-446655440001'::uuid, 'home_dashboard', 3),
  ('550e8400-e29b-41d4-a716-446655440001'::uuid, 'menu_dashboard', 4),
  ('550e8400-e29b-41d4-a716-446655440001'::uuid, 'my_activities', 5);

-- STEP 4: VERIFY - You should see exactly 6 rows with order_index 0 to 5
SELECT 
  aps.order_index,
  aps.screen_id,
  s.name as screen_name,
  CASE 
    WHEN s.screen_id IS NULL THEN '❌ MISSING IN app_screens'
    ELSE '✅ OK'
  END as status
FROM approach_screens aps
LEFT JOIN app_screens s ON aps.screen_id = s.screen_id
WHERE aps.approach_id = '550e8400-e29b-41d4-a716-446655440001'::uuid
ORDER BY aps.order_index;

-- You should see:
-- 0 | login_generic_logo | Login with Logo | ✅ OK
-- 1 | login_generic_form | Login with Form | ✅ OK
-- 2 | data_privacy | Data Privacy | ✅ OK
-- 3 | home_dashboard | Home Dashboard | ✅ OK
-- 4 | menu_dashboard | Menu Dashboard | ✅ OK
-- 5 | my_activities | My Activities | ✅ OK

