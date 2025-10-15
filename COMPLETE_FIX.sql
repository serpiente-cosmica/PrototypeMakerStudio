-- ============================================================================
-- COMPLETE FIX - Delete ALL clients and create only ONE working test client
-- ============================================================================

-- STEP 1: Delete ALL existing clients (clean slate)
DELETE FROM client_screen_configs;
DELETE FROM client_configs;

-- STEP 2: Verify all 6 screens exist in app_screens
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

-- STEP 3: Make sure approach_screens are set correctly
DELETE FROM approach_screens WHERE approach_id = '550e8400-e29b-41d4-a716-446655440001'::uuid;

INSERT INTO approach_screens (approach_id, screen_id, order_index)
VALUES 
  ('550e8400-e29b-41d4-a716-446655440001'::uuid, 'login_generic_logo', 0),
  ('550e8400-e29b-41d4-a716-446655440001'::uuid, 'login_generic_form', 1),
  ('550e8400-e29b-41d4-a716-446655440001'::uuid, 'data_privacy', 2),
  ('550e8400-e29b-41d4-a716-446655440001'::uuid, 'home_dashboard', 3),
  ('550e8400-e29b-41d4-a716-446655440001'::uuid, 'menu_dashboard', 4),
  ('550e8400-e29b-41d4-a716-446655440001'::uuid, 'my_activities', 5);

-- STEP 4: Create ONE clean test client
INSERT INTO client_configs (client_id, app_name, approach_id, logo_url, colors_json)
VALUES (
  'demo-001',
  'ActiveFit+ Demo',
  '550e8400-e29b-41d4-a716-446655440001'::uuid,
  'https://via.placeholder.com/150/10b981/ffffff?text=Demo',
  '{"primary": "#10b981", "secondary": "#6b7280", "accent": "#f59e0b", "background": "#ffffff"}'::jsonb
);

-- STEP 5: Verify everything
SELECT 'CLIENTS:' as section, client_id, app_name, approach_id::text FROM client_configs
UNION ALL
SELECT 'SCREENS FOR APPROACH:' as section, aps.screen_id, s.name, aps.approach_id::text 
FROM approach_screens aps 
JOIN app_screens s ON aps.screen_id = s.screen_id 
WHERE aps.approach_id = '550e8400-e29b-41d4-a716-446655440001'::uuid
ORDER BY section, client_id;
