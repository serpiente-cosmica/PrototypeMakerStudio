# 🔧 Database Fix Guide - Add Menu & Activities Screens

## The Problem
Your database has **invalid screen references** (`onboarding_notifications`, `onboarding_analytics`) that don't exist in the code. This is why you're seeing "Screen not implemented" errors.

## The Solution - Follow These 3 Steps

---

## STEP 1: Get Your Database IDs

1. Open **Supabase Dashboard**
2. Go to **SQL Editor**
3. Create a **New Query**
4. Copy and paste the contents of `get_database_info.sql`
5. Click **Run**

### What to look for:

**Section 1 - Your Approach ID:**
```
approach_id                          | name           | current_screens_count
-------------------------------------|----------------|---------------------
123e4567-e89b-12d3-a456-426614174000 | Main Approach  | 4
```
📝 **Copy the `approach_id`** - you'll need it in Step 2

**Section 2 - Your Client ID:**
```
client_id    | app_name      | approach_id
-------------|---------------|--------------------------------------
foodbox-demo | FoodBox App   | 123e4567-e89b-12d3-a456-426614174000
```
📝 **Note your `client_id`** - you'll need it to test

**Section 5 - Orphaned Screens (PROBLEMS):**
```
orphaned_screen_id          | issue
----------------------------|---------------------------------------
onboarding_notifications    | This screen does not exist in app_screens!
onboarding_analytics        | This screen does not exist in app_screens!
```
✅ This confirms the problem - these screens need to be removed

---

## STEP 2: Run the Fix Script

1. Still in **Supabase SQL Editor**
2. Create a **New Query**
3. Open the file: `fix_screens.sql`
4. **IMPORTANT:** Replace **ALL** instances of `YOUR_APPROACH_ID_HERE` with the UUID from Step 1
5. **IMPORTANT:** Replace `YOUR_CLIENT_ID` with your client_id from Step 1
6. Read through the script (it has comments explaining each step)
7. Click **Run** to execute the entire script

### What the script does:

✅ Deletes invalid screens (`onboarding_notifications`, `onboarding_analytics`)  
✅ Adds all 6 working screens to `app_screens` table  
✅ Links them to your approach in the correct order (0-5)  
✅ Runs verification queries to confirm everything worked

---

## STEP 3: Verify & Test

### In Supabase (verify the fix worked):

After running the script, scroll down to see the verification results:

**You should see 6 screens:**
1. `login_generic_logo` (order 0)
2. `login_generic_form` (order 1)
3. `data_privacy` (order 2)
4. `home_dashboard` (order 3)
5. `menu_dashboard` (order 4)
6. `my_activities` (order 5)

### In Your App (test it works):

1. Go to: `http://localhost:3000/portal/client/YOUR_CLIENT_ID/configure`
2. **Hard refresh** the page (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
3. You should now see **"1 / 6"** in the navigation
4. Use **Next →** button to navigate through all screens
5. When you get to screen **4/6** (Menu Dashboard) and **5/6** (My Activities), they should display properly

---

## 🎯 Expected Result

After completing all steps, you should see:

### Navigation:
- **Screen 1/6:** Login with Logo ✅
- **Screen 2/6:** Login with Form ✅
- **Screen 3/6:** Data Privacy ✅
- **Screen 4/6:** Home Dashboard ✅
- **Screen 5/6:** Menu Dashboard ✅ ← **NEW!**
- **Screen 6/6:** My Activities ✅ ← **NEW!**

### Menu Dashboard Features:
- Top bar with "Menu" title
- Profile section (Alexa Jones)
- 8 configurable tiles in a 2-column grid:
  - ⌚ SmartWalking
  - 👤 ActiveFit@Home
  - 🗺️ Map
  - 🏢 My Facilities
  - 📊 iEnrollment+
  - 🏃 Movement Health
  - ✅ Self-Report
  - ❤️ MyCarePath
- Footer links (Help & Support, Settings & Privacy)
- Bottom navigation bar

### My Activities Features:
- Top bar with "My Activities" title
- 4 status cards (Goal Met!, Accepted, Pending, Rejected)
- Interactive calendar with activity tracking
- Activity cards showing completed activities
- Bottom navigation bar

---

## 🆘 Troubleshooting

### Issue: "No configuration component available for screen"

**Cause:** The screens exist in the database but aren't registered in the code  
**Solution:** The code is already set up! Just refresh your browser

### Issue: Still seeing old screens after running SQL

**Cause:** Browser cache  
**Solution:** 
1. Hard refresh (Cmd+Shift+R or Ctrl+Shift+R)
2. If that doesn't work, clear browser cache completely
3. Close and reopen browser
4. Try incognito/private mode

### Issue: SQL errors when running fix_screens.sql

**Cause:** Didn't replace `YOUR_APPROACH_ID_HERE` or `YOUR_CLIENT_ID`  
**Solution:** 
1. Make sure you replaced ALL instances (there are multiple)
2. Make sure you included the `::uuid` part after the ID
3. Example: `'123e4567-e89b-12d3-a456-426614174000'::uuid`

### Issue: "approach_screens" violation error

**Cause:** Trying to add screens that already exist  
**Solution:** The script uses `ON CONFLICT` to handle this - it should work anyway

---

## 📊 Understanding the Database Structure

```
app_approaches (the app flow)
    ↓
    ├── approach_screens (which screens are in this approach)
    │       ↓
    │       └── app_screens (screen definitions)
    │
client_configs (your client setup)
    ↓
    └── uses → app_approaches
    
client_screen_configs (custom settings per client per screen)
    ↓
    └── stores → settings_json for each screen
```

---

## 🎨 Configuring Menu & Activities

Once the screens are visible, you can configure them:

### Menu Dashboard Configuration:
- **Profile Section:** Name, subtitle, show/hide
- **Tiles:** Add/remove tiles, change icons, labels, layout (1-3 per row)
- **Colors:** Background, borders, text
- **Footer Links:** Customize text and visibility
- **Bottom Bar:** Configure navigation items

### My Activities Configuration:
- **Status Cards:** Customize labels, values, colors
- **Calendar:** Set dates, navigate months, mark activity days
- **Activity Cards:** Add/remove, customize icon, title, subtitle, status
- **Colors:** Background, card colors, status colors
- **Bottom Bar:** Configure navigation items

---

## ✅ Checklist

Before you start:
- [ ] Supabase Dashboard is open
- [ ] SQL Editor is ready
- [ ] You have the files: `get_database_info.sql` and `fix_screens.sql`

After Step 1:
- [ ] You have your `approach_id` copied
- [ ] You have your `client_id` noted
- [ ] You identified the orphaned screens

After Step 2:
- [ ] You replaced ALL `YOUR_APPROACH_ID_HERE` in fix_screens.sql
- [ ] You replaced `YOUR_CLIENT_ID` in the verification query
- [ ] You ran the script successfully
- [ ] You saw 6 screens in the verification results

After Step 3:
- [ ] You hard-refreshed your browser
- [ ] You see "1 / 6" in the navigation
- [ ] You can navigate to all 6 screens
- [ ] Menu Dashboard displays correctly (screen 5/6)
- [ ] My Activities displays correctly (screen 6/6)

---

## 🚀 You're Done!

Once all checkboxes are complete, your prototype maker is fully configured with all 6 screens, including the new Menu Dashboard and My Activities screens!

**Next:** Start configuring each screen to match your design requirements. All changes save automatically when you navigate between screens.

**Need Help?** Check the browser console (F12 → Console) for any error messages.

