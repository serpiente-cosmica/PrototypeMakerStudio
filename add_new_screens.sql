-- Add Menu Dashboard and My Activities screens to the database
-- Run this in your Supabase SQL Editor

-- Insert Menu Dashboard Screen
INSERT INTO app_screens (screen_id, name, description)
VALUES (
  'menu_dashboard',
  'Menu Dashboard',
  'Menu with profile, configurable tiles, and navigation options'
)
ON CONFLICT (screen_id) DO UPDATE
SET 
  name = EXCLUDED.name,
  description = EXCLUDED.description;

-- Insert My Activities Screen
INSERT INTO app_screens (screen_id, name, description)
VALUES (
  'my_activities',
  'My Activities',
  'Activities tracking with calendar and configurable activity cards'
)
ON CONFLICT (screen_id) DO UPDATE
SET 
  name = EXCLUDED.name,
  description = EXCLUDED.description;

-- IMPORTANT: Get your approach_id first
-- Run this query to see your approach_id:
SELECT approach_id, name FROM app_approaches;

-- Then replace 'YOUR_APPROACH_ID_HERE' below with the actual UUID from the query above

-- Add Menu Dashboard to your approach
INSERT INTO approach_screens (approach_id, screen_id, order_index)
VALUES (
  'YOUR_APPROACH_ID_HERE'::uuid, -- Replace with actual approach UUID
  'menu_dashboard',
  4 -- Adjust order_index: this should be the total number of existing screens + 1
)
ON CONFLICT (approach_id, screen_id) DO NOTHING;

-- Add My Activities to your approach
INSERT INTO approach_screens (approach_id, screen_id, order_index)
VALUES (
  'YOUR_APPROACH_ID_HERE'::uuid, -- Replace with actual approach UUID (same as above)
  'my_activities',
  5 -- Adjust order_index: this should be the total number of existing screens + 2
)
ON CONFLICT (approach_id, screen_id) DO NOTHING;

-- Verify the screens were added
SELECT * FROM app_screens WHERE screen_id IN ('menu_dashboard', 'my_activities');

-- Verify they're in your approach
SELECT 
  aps.approach_id,
  aps.screen_id,
  aps.order_index,
  s.name,
  s.description
FROM approach_screens aps
JOIN app_screens s ON aps.screen_id = s.screen_id
WHERE aps.screen_id IN ('menu_dashboard', 'my_activities')
ORDER BY aps.approach_id, aps.order_index;

