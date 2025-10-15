# Screens Setup Guide

This guide explains how to add and configure the Menu Dashboard and My Activities screens.

## 🗄️ Database Setup

### Step 1: Add Screens to Database

Run the `add_new_screens.sql` script in your Supabase SQL Editor:

1. Open Supabase Dashboard
2. Go to SQL Editor
3. Open the `add_new_screens.sql` file
4. **Important:** Change the `approach_id` value (currently set to `1`) to match your actual approach ID
5. Adjust `order_index` values based on how many screens you already have
6. Run the script

### Step 2: Verify Screens Are Added

After running the script, you should see:
- `menu_dashboard` and `my_activities` in the `app_screens` table
- Both screens linked to your approach in the `approach_screens` table

## 📱 Available Screens

### 1. Home Dashboard (`home_dashboard`)
**Features:**
- Top navigation bar
- Banner image (configurable)
- Alerts section (configurable cards)
- Bottom navigation bar
- **Push notification** (click "9:41" to trigger)

**Configurable Sections:**
- Top bar: title, colors
- Banner: image, height, show/hide
- Alerts: add/remove, icon, title, description
- Push notification: icon, title, message, duration
- Bottom bar: add/remove items, colors, navigation

---

### 2. Menu Dashboard (`menu_dashboard`)
**Features:**
- Top navigation bar
- Profile section (name, subtitle, avatar)
- **Configurable Tiles Grid** (2-3 per row)
- Footer links (Help & Support, Settings & Privacy)
- Bottom navigation bar

**Configurable Sections:**
- Top bar: title, colors
- Profile: name, subtitle, show/hide
- **Tiles (Main Configuration):**
  - Add/remove tiles
  - Each tile: icon (emoji), label
  - Grid layout: 1-3 tiles per row
  - Tile colors and borders
  - Navigation for each tile
- Footer links: text, colors, show/hide
- Bottom bar: add/remove items, colors, navigation

**Default Tiles (8 tiles in 2x4 grid):**
1. ⌚ SmartWalking
2. 👤 ActiveFit@Home
3. 🗺️ Map
4. 🏢 My Facilities
5. 📊 iEnrollment+
6. 🏃 Movement Health
7. ✅ Self-Report
8. ❤️ MyCarePath

---

### 3. My Activities (`my_activities`)
**Features:**
- Top navigation bar
- Status cards (Goal Met, Accepted, Pending, Rejected)
- **Navigable Calendar** (month navigation)
- Selected date display
- **Configurable Activity Cards**
- Bottom navigation bar

**Configurable Sections:**
- Top bar: title, colors
- Status cards: label, value, color (4 cards)
- Calendar: month/year, selected day, date text
- **Activity Cards (Main Configuration):**
  - Add/remove activity cards
  - Each card: icon, title, subtitle, status badge, status color
  - Scrollable list
  - Navigation for each card
- Bottom bar: add/remove items, colors, navigation

**Calendar Features:**
- Click previous/next to navigate months
- Days are color-coded by status:
  - Blue = Accepted
  - Orange = Pending
  - Red = Rejected
  - Green = Goal Met
- Click on days to select

**Default Activity Cards (2 cards):**
1. ⌚ SmartWalking - 15046 steps - Approved
2. 📊 iEnroll activity - Guided Health... - Approved

---

## 🎨 Configuration Tips

### Menu Dashboard - Tiles
The **tiles section** is the main configurable area:
- Use "Add Tile" button to create new menu items
- Each tile can have custom icon (emoji) and label
- Configure navigation for each tile to link to other screens
- Adjust "Tiles Per Row" (1-3) for different layouts
- Customize tile background and border colors

### My Activities - Activity Cards
The **activity cards section** is the main configurable area:
- Use "Add Activity" button to create new cards
- Each card can have:
  - Custom icon (emoji)
  - Title (activity name)
  - Subtitle (activity details)
  - Status text (e.g., "Approved", "Pending")
  - Status color
- Configure navigation for each card to link to detail screens
- Cards are scrollable if list is long

---

## 🔧 Testing the Screens

### In Configuration Mode:
1. Navigate to `/portal/client/[clientId]/configure`
2. Use the carousel (Previous/Next buttons) to navigate between screens
3. When on Menu or My Activities screen:
   - Scroll through the configuration panel on the right
   - Look for the purple-highlighted main sections:
     - **Menu:** "🎯 Menu Tiles Configuration"
     - **My Activities:** "📋 Activity Cards"
4. Make changes and they auto-save when you navigate

### In Demo Mode:
1. Navigate to `/demo/[clientId]`
2. The screens will display in order
3. Test clicking on tiles (Menu) and activity cards (My Activities)
4. Verify navigation works if configured

---

## 🐛 Troubleshooting

### Screens Not Showing Up?

1. **Check Database:**
   ```sql
   SELECT * FROM app_screens WHERE screen_id IN ('menu_dashboard', 'my_activities');
   ```
   Both screens should exist.

2. **Check Approach Link:**
   ```sql
   SELECT * FROM approach_screens 
   WHERE screen_id IN ('menu_dashboard', 'my_activities')
   AND approach_id = YOUR_APPROACH_ID;
   ```
   Both screens should be linked to your approach.

3. **Check Order Index:**
   Make sure `order_index` values don't conflict with existing screens.

4. **Refresh Page:**
   After adding screens to database, refresh the configuration page.

### Screens Show "Screen not found"?

1. **Verify Registration:**
   Check browser console for errors
   
2. **Check Imports:**
   Verify `components/screens/index.js` includes:
   ```javascript
   import "./menu_dashboard";
   import "./my_activities";
   ```

3. **Restart Dev Server:**
   ```bash
   npm run dev
   ```

### Configuration Not Saving?

1. Changes auto-save when you navigate between screens
2. Check browser console for errors
3. Verify database connection in Supabase

---

## 📊 Screen Order Example

Here's a recommended screen order for a complete app:

1. **order_index: 0** - `login_generic_logo` (Logo screen)
2. **order_index: 1** - `login_generic_form` (Login form)
3. **order_index: 2** - `data_privacy` (Privacy agreement)
4. **order_index: 3** - `home_dashboard` (Home with alerts)
5. **order_index: 4** - `menu_dashboard` (Menu with tiles)
6. **order_index: 5** - `my_activities` (Activities with calendar)

---

## 🎯 Quick Start Checklist

- [ ] Run `add_new_screens.sql` in Supabase SQL Editor
- [ ] Update `approach_id` in the SQL script to match your approach
- [ ] Verify screens appear in configuration carousel
- [ ] Configure Menu tiles (add/remove, customize icons and labels)
- [ ] Configure Activity cards (add/remove, customize details)
- [ ] Set up navigation between screens
- [ ] Test in demo mode

---

## 💡 Pro Tips

1. **Consistent Bottom Bar:** Use the same bottom bar items across Home, Menu, and My Activities for consistent navigation
2. **Icon Consistency:** Use related emojis for similar features (e.g., 📊 for analytics-related items)
3. **Color Coding:** Use consistent status colors across screens (blue=approved, orange=pending, red=rejected)
4. **Navigation Flow:** Set up logical navigation paths (Home ↔ Menu ↔ My Activities)

---

## 🆘 Need Help?

If you're still having issues:
1. Check browser console for errors
2. Verify Supabase connection
3. Ensure all screens are properly registered
4. Try clearing browser cache and restarting dev server

