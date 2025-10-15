# 🚀 START HERE - Add Menu & Activities Screens

## Current Situation

✅ **Code:** All 6 screens are registered and working  
✅ **Preview:** iPhone Pro Max size is correct (430 x 932 pixels)  
⚠️ **Database:** Needs to be updated (you're seeing invalid screens)

---

## What You're Seeing Now

❌ Screen 4: `onboarding_notifications` - "Screen not implemented"  
❌ Screen 5: `onboarding_analytics` - "Screen not implemented"

**Problem:** These screens don't exist in the code.

---

## What You'll Have After Fix

✅ **Screen 1/6:** Login with Logo  
✅ **Screen 2/6:** Login with Form  
✅ **Screen 3/6:** Data Privacy  
✅ **Screen 4/6:** Home Dashboard  
✅ **Screen 5/6:** Menu Dashboard ← **NEW**  
✅ **Screen 6/6:** My Activities ← **NEW**

---

## Fix It Now (3 Steps, 7 Minutes)

### Step 1: Get Your Database IDs (2 min)

Open **Supabase Dashboard** → **SQL Editor**

Run this query:
```sql
SELECT approach_id, name FROM app_approaches;
```

📋 **Copy the `approach_id`** (looks like: `abc12345-6789-...`)

---

### Step 2: Run the Fix Script (3 min)

1. Open the file: **`fix_screens.sql`**
2. Press Cmd+F (or Ctrl+F) to Find & Replace
3. Replace `YOUR_APPROACH_ID_HERE` with your actual approach_id
4. Copy **the entire file** into Supabase SQL Editor
5. Click **Run**
6. Scroll down - you should see **6 screens** in the results

---

### Step 3: Test It (2 min)

1. Go to your configure page
2. Press **Cmd+Shift+R** (Mac) or **Ctrl+Shift+R** (Windows) to hard refresh
3. You should see **"1 / 6"** in the screen navigation
4. Click **Next →** to navigate through all screens
5. Verify screens 5 and 6 are Menu Dashboard and My Activities

---

## Need Help?

- **Detailed Guide:** Read `DATABASE_FIX_GUIDE.md`
- **Quick Reference:** Read `QUICK_FIX_REFERENCE.md`
- **Status Info:** Read `STATUS_SUMMARY.md`

---

## That's It! 🎉

After completing the 3 steps above, you'll have:
- ✅ All 6 screens working
- ✅ Menu Dashboard with 8 configurable tiles
- ✅ My Activities with calendar and activity cards
- ✅ Full configuration capabilities for both new screens

**Ready?** Open `fix_screens.sql` and let's get started!

