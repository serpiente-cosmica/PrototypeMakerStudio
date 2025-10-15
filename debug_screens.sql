y-- Debug: Check what screens exist and their order
-- Copy this into Supabase and tell me what you see

-- 1. Check all screens in app_screens
SELECT 'ALL SCREENS IN DATABASE:' as info;
SELECT screen_id, name FROM app_screens ORDER BY screen_id;

-- 2. Check screens linked to your approach
SELECT 'SCREENS IN YOUR APPROACH:' as info;
SELECT 
  aps.order_index,
  aps.screen_id,
  s.name
FROM approach_screens aps
JOIN app_screens s ON aps.screen_id = s.screen_id
WHERE aps.approach_id = '550e8400-e29b-41d4-a716-446655440001'::uuid
ORDER BY aps.order_index;

-- 3. Check for orphaned screens (screens in approach_screens but not in app_screens)
SELECT 'ORPHANED SCREENS (PROBLEMS):' as info;
SELECT 
  aps.order_index,
  aps.screen_id,
  'Screen exists in approach_screens but NOT in app_screens!' as issue
FROM approach_screens aps
LEFT JOIN app_screens s ON aps.screen_id = s.screen_id
WHERE aps.approach_id = '550e8400-e29b-41d4-a716-446655440001'::uuid
  AND s.screen_id IS NULL
ORDER BY aps.order_index;

-- 4. Count total screens
SELECT 'TOTAL COUNT:' as info;
SELECT COUNT(*) as total_screens 
FROM approach_screens 
WHERE approach_id = '550e8400-e29b-41d4-a716-446655440001'::uuid;

