-- ============================================================================
-- DATABASE INFO - Run this first to get your IDs
-- ============================================================================

-- 1. Get your approach_id (you'll need this)
SELECT 
  approach_id,
  name,
  description,
  (SELECT COUNT(*) FROM approach_screens WHERE approach_id = app_approaches.approach_id) as current_screens_count
FROM app_approaches;

-- 2. Get your client_id and which approach it's using
SELECT 
  client_id,
  app_name,
  approach_id,
  created_at
FROM client_configs
ORDER BY created_at DESC;

-- 3. See what screens currently exist in app_screens
SELECT 
  screen_id,
  name,
  description,
  (SELECT COUNT(*) FROM approach_screens WHERE screen_id = app_screens.screen_id) as used_in_approaches
FROM app_screens
ORDER BY screen_id;

-- 4. See what screens are currently linked to approaches
SELECT 
  aa.name as approach_name,
  aps.approach_id,
  aps.screen_id,
  aps.order_index,
  s.name as screen_name
FROM approach_screens aps
JOIN app_approaches aa ON aps.approach_id = aa.approach_id
LEFT JOIN app_screens s ON aps.screen_id = s.screen_id
ORDER BY aps.approach_id, aps.order_index;

-- 5. Find orphaned screens (screens in approach_screens but not in app_screens)
SELECT 
  aps.screen_id as orphaned_screen_id,
  aps.approach_id,
  aps.order_index,
  'This screen does not exist in app_screens!' as issue
FROM approach_screens aps
LEFT JOIN app_screens s ON aps.screen_id = s.screen_id
WHERE s.screen_id IS NULL;

-- ============================================================================
-- COPY THE RESULTS AND USE THEM IN fix_screens.sql
-- ============================================================================

