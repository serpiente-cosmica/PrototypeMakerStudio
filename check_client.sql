-- Check if test-client-001 exists and has everything needed
SELECT 'Client exists:' as check_type, client_id, app_name, approach_id FROM client_configs WHERE client_id = 'test-client-001'
UNION ALL
SELECT 'Approach has screens:', approach_id::text, null, null FROM approach_screens WHERE approach_id = (SELECT approach_id FROM client_configs WHERE client_id = 'test-client-001' LIMIT 1) LIMIT 1
UNION ALL
SELECT 'Screen count:', COUNT(*)::text, null, null FROM approach_screens WHERE approach_id = (SELECT approach_id FROM client_configs WHERE client_id = 'test-client-001' LIMIT 1);

-- Show the screens
SELECT 'Screens for test-client-001:' as info;
SELECT aps.order_index, aps.screen_id, s.name
FROM client_configs cc
JOIN approach_screens aps ON aps.approach_id = cc.approach_id
LEFT JOIN app_screens s ON s.screen_id = aps.screen_id
WHERE cc.client_id = 'test-client-001'
ORDER BY aps.order_index;

