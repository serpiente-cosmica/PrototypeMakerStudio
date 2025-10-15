# ⚡ Quick Fix Reference - Menu & Activities Screens

## Problem
Seeing "Screen not implemented" for `onboarding_notifications` or `onboarding_analytics`

## Solution (3 Steps)

### 1️⃣ Get Your IDs (2 minutes)
```sql
-- Run in Supabase SQL Editor
SELECT approach_id, name FROM app_approaches;
SELECT client_id, app_name FROM client_configs;
```
📝 Copy the `approach_id` (looks like: `123e4567-e89b-12d3-a456-426614174000`)

### 2️⃣ Run Fix Script (2 minutes)
1. Open `fix_screens.sql`
2. Find & Replace: `YOUR_APPROACH_ID_HERE` → Your actual approach_id
3. Find & Replace: `YOUR_CLIENT_ID` → Your actual client_id
4. Run entire script in Supabase SQL Editor

### 3️⃣ Test (30 seconds)
1. Go to: `http://localhost:3000/portal/client/YOUR_CLIENT_ID/configure`
2. Hard refresh: **Cmd+Shift+R** (Mac) or **Ctrl+Shift+R** (Windows)
3. You should see **"1 / 6"** screens
4. Navigate with Next → button to see all screens

---

## What You'll See After Fix

| Screen | Name | Features |
|--------|------|----------|
| 1/6 | Login with Logo | Logo + simple form |
| 2/6 | Login with Form | Detailed login form |
| 3/6 | Data Privacy | Privacy information |
| 4/6 | Home Dashboard | Banner, alerts, push notifications |
| **5/6** | **Menu Dashboard** | **Profile, 8 tiles, navigation** ← NEW |
| **6/6** | **My Activities** | **Calendar, activity cards** ← NEW |

---

## Files You Need

| File | Purpose |
|------|---------|
| `get_database_info.sql` | Get your approach_id and client_id |
| `fix_screens.sql` | Complete fix script (run this) |
| `DATABASE_FIX_GUIDE.md` | Detailed step-by-step guide |

---

## Troubleshooting One-Liners

**Still seeing old screens?**  
→ Hard refresh (Cmd+Shift+R) or try incognito mode

**SQL error about approach_id?**  
→ Did you replace `YOUR_APPROACH_ID_HERE` with actual UUID?

**Screen shows but no config?**  
→ Hard refresh browser, screens are registered in code

**Want to verify in database?**  
```sql
SELECT aps.order_index, aps.screen_id, s.name 
FROM approach_screens aps 
JOIN app_screens s ON aps.screen_id = s.screen_id 
WHERE aps.approach_id = 'YOUR_APPROACH_ID_HERE'::uuid 
ORDER BY aps.order_index;
```

---

## Success Indicators ✅

- [ ] Navigation shows "1 / 6" through "6 / 6"
- [ ] Menu Dashboard (5/6) displays with 8 tiles
- [ ] My Activities (6/6) displays with calendar
- [ ] Can configure tiles in Menu screen
- [ ] Can configure activity cards in Activities screen
- [ ] No more "Screen not implemented" errors

---

## Next Steps After Fix

1. **Configure Menu Tiles:**
   - Go to screen 5/6 (Menu Dashboard)
   - Scroll to "🎯 Menu Tiles Configuration"
   - Add/remove tiles, change icons and labels
   - Set tiles per row (1-3)

2. **Configure Activity Cards:**
   - Go to screen 6/6 (My Activities)
   - Scroll to "📋 Activity Cards"
   - Add/remove activities
   - Customize icons, titles, status

3. **Test Navigation:**
   - Set up bottom bar in each screen
   - Test navigation between Home, Menu, Activities
   - Run demo: `/demo/YOUR_CLIENT_ID`

---

**Need more details?** → Read `DATABASE_FIX_GUIDE.md`  
**Need help?** → Check browser console (F12) for errors

