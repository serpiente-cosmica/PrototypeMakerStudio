-- CORRECT SQL - Using 'config' column instead of 'screen_config'
-- This is the WORKING version - column name is 'config' not 'screen_config'

-- First, let's check the table structure
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'client_screen_configs';

-- Now the CORRECT updates using 'config' column:

-- 1. Fix My Activities calendar day labels and date year
UPDATE client_screen_configs
SET config = jsonb_set(
    jsonb_set(
        config,
        '{calendar_day_labels}',
        '["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]'::jsonb
    ),
    '{selected_date_text}',
    '"Monday, April 25, 2025"'::jsonb
)
WHERE screen_id = 'my_activities';

-- 2. Add navigation config for Home Dashboard
UPDATE client_screen_configs
SET config = jsonb_set(
    COALESCE(config, '{}'::jsonb),
    '{navigation_config}',
    jsonb_build_object(
        'bottom_nav_activities', jsonb_build_object('target_screen_id', 'my_activities', 'enabled', true),
        'bottom_nav_menu', jsonb_build_object('target_screen_id', 'menu_dashboard', 'enabled', true)
    )
)
WHERE screen_id = 'home_dashboard';

-- 3. Add navigation config for Menu Dashboard
UPDATE client_screen_configs
SET config = jsonb_set(
    COALESCE(config, '{}'::jsonb),
    '{navigation_config}',
    jsonb_build_object(
        'bottom_nav_home', jsonb_build_object('target_screen_id', 'home_dashboard', 'enabled', true),
        'bottom_nav_activities', jsonb_build_object('target_screen_id', 'my_activities', 'enabled', true)
    )
)
WHERE screen_id = 'menu_dashboard';

-- 4. Add navigation config for My Activities
UPDATE client_screen_configs
SET config = jsonb_set(
    COALESCE(config, '{}'::jsonb),
    '{navigation_config}',
    jsonb_build_object(
        'bottom_nav_home', jsonb_build_object('target_screen_id', 'home_dashboard', 'enabled', true),
        'bottom_nav_menu', jsonb_build_object('target_screen_id', 'menu_dashboard', 'enabled', true)
    )
)
WHERE screen_id = 'my_activities';

-- Verify the updates
SELECT 
    client_id,
    screen_id,
    config->'calendar_day_labels' as day_labels,
    config->'selected_date_text' as date_text,
    config->'navigation_config' as navigation
FROM client_screen_configs
WHERE screen_id IN ('my_activities', 'home_dashboard', 'menu_dashboard')
ORDER BY client_id, screen_id;

