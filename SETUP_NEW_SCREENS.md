# 🚀 Setup Instructions: Add Menu & Activities Screens

## Problem
You're seeing `"onboarding_analytics"` or other missing screens because the Menu Dashboard and My Activities screens haven't been added to your database yet.

## Solution - Follow These Steps:

### Step 1: Get Your Approach ID

1. Open **Supabase Dashboard**
2. Go to **SQL Editor**
3. Run this query:

```sql
SELECT approach_id, name FROM app_approaches;
```

4. **Copy the `approach_id`** (it's a UUID like `123e4567-e89b-12d3-a456-426614174000`)

### Step 2: Count Your Current Screens

Run this query to see how many screens you currently have:

```sql
SELECT COUNT(*) as total_screens 
FROM approach_screens 
WHERE approach_id = 'YOUR_APPROACH_ID_HERE';
```

This will tell you what `order_index` to use for the new screens.

### Step 3: Run the Updated SQL Script

1. Open the file: `add_new_screens.sql`
2. Replace **ALL** occurrences of `YOUR_APPROACH_ID_HERE` with your actual approach_id
3. Update the `order_index` values:
   - If you have 3 screens, use `4` and `5`
   - If you have 4 screens, use `5` and `6`
   - etc.
4. Run the **entire script** in Supabase SQL Editor

### Step 4: Verify the Screens Were Added

Run this verification query:

```sql
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
```

You should see both screens listed.

### Step 5: Refresh Your App

1. Go back to your configuration page: `http://localhost:3000/portal/client/[YOUR_CLIENT_ID]/configure`
2. **Hard refresh** the page (Cmd+Shift+R or Ctrl+Shift+R)
3. You should now see **6 screens** in the carousel navigation (3 / 6, 4 / 6, etc.)

---

## ✅ What's Fixed

### 1. Preview Size - iPhone Pro Max Dimensions ✅
- **Width**: 430px (correct)
- **Height**: 932px (correct, no more maxHeight constraint)
- The preview now shows the **EXACT** iPhone 14/15/16 Pro Max size

### 2. Screen Registration ✅
- Both `menu_dashboard` and `my_activities` are registered in the app
- Default configurations are set up
- Configuration components are ready

### 3. SQL Script Fixed ✅
- Removed invalid `category` column reference
- Added clear instructions for approach_id
- Added proper UUID casting

---

## 📱 New Screens Overview

### Menu Dashboard (`menu_dashboard`)
- Top navigation bar
- Profile section (name, subtitle, avatar)
- **Configurable Tiles Grid** (2-3 per row)
- Footer links (Help & Support, Settings & Privacy)
- Bottom navigation bar

### My Activities (`my_activities`)
- Top navigation bar
- Status cards (Goal Met, Accepted, Pending, Rejected)
- **Navigable Calendar** with activity tracking
- **Configurable Activity Cards**
- Bottom navigation bar

---

## 🆘 Troubleshooting

### If you still don't see the screens:

1. **Check the approach_id is correct**:
   ```sql
   SELECT * FROM client_configs WHERE client_id = 'YOUR_CLIENT_ID';
   ```

2. **Verify screens exist in approach_screens**:
   ```sql
   SELECT * FROM approach_screens WHERE screen_id IN ('menu_dashboard', 'my_activities');
   ```

3. **Check browser console** for any errors (F12 → Console tab)

4. **Clear cache and restart**:
   - Stop the dev server (Ctrl+C)
   - Delete `.next` folder
   - Run `npm run dev` again

---

## 📞 Need Help?

If you're still having issues, run this comprehensive diagnostic query:

```sql
-- Show everything about your client setup
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
WHERE cc.client_id = 'YOUR_CLIENT_ID';
```

Copy the results and let me know what you see.

