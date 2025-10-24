# 🔍 Enhanced Search Functionality

## Overview
The search functionality has been significantly enhanced with smart suggestions, trending keywords, category exploration, and personalized recommendations.

## ✨ Key Features

### 1. **Smart Search Dropdown**
- Appears on focus with smooth fade-in and slide-down animation (200ms)
- Real-time filtering as user types
- Closes when clicking outside or selecting a result
- Responsive design for all device sizes

### 2. **Trending Keywords** 🔥
- Displays top 5 most searched keywords
- Visual trending indicator (↑)
- Click to instantly search with that keyword
- Styled with orange accent color for visibility

### 3. **Explore Tabs**
Two exploration modes:
- **Explore by Category**: Music, Theater, Sports, Conference, Arts, Food & Drink
- **Explore by City**: Hanoi, Ho Chi Minh City, Da Nang, and more

Each tab shows:
- Interactive cards with category/city icons
- Gradient backgrounds (dark to darker)
- Hover effects: scale (1.05x) + orange glow overlay
- Smooth transitions

### 4. **Event Suggestions** 💡
Shows 4 event cards with:
- Event poster image with hover zoom effect
- Event title (truncated if too long)
- Date with calendar icon
- Location with map pin icon
- Price starting from (formatted in VND)
- Arrow indicator on hover with slide animation
- "Sold Out" badge for unavailable events

### 5. **Search Results**
- Updates in real-time as user types
- Shows result count badge
- Filters events by:
  - Title
  - Category
  - City
  - Venue name
- "No results" state with helpful message and clear button

## 🎨 UI/UX Highlights

### Colors
- Primary: Orange (#F97316)
- Background: White with neutral gray cards
- Text: Dark gray (#171717) for main text
- Accent: Orange for interactive elements

### Animations
- Dropdown: fade-in + slide-down (200ms)
- Category cards: scale + orange overlay on hover
- Event images: zoom (scale 1.1) on hover
- Arrow icons: slide right on hover

### Responsive Behavior
- **Desktop**: Full 3-column layout for categories/cities
- **Tablet**: 3-column maintained, adjusted spacing
- **Mobile**: 2-column grid, vertical event cards

## 🔌 Integration

### Home Page
```tsx
<SearchBar
  value={searchQuery}
  onChange={setSearchQuery}
  onSearch={handleSearch}
  onEventClick={handleEventClick}
  onCategoryClick={handleCategoryClick}
  onCityClick={handleCityClick}
  placeholder="What are you looking for today?"
/>
```

### Event Listing Page
Same implementation with additional filter integration

## 📊 Trending Keywords (Current)
1. yconcert
2. gdragon
3. ntpmm
4. summer festival
5. hanoi concert

## 🎯 User Flow

1. **User clicks search box**
   → Dropdown appears with trending keywords, categories, and suggestions

2. **User types keyword**
   → Real-time filtering shows matching events
   → Result count badge updates
   → Shows "no results" if no matches

3. **User clicks:**
   - **Trending keyword** → Auto-fills search and navigates to results
   - **Category card** → Filters by category and navigates to listing
   - **City card** → Filters by city and navigates to listing
   - **Event card** → Navigates to event detail page
   - **Search button / Enter** → Navigates to full listing page

## 🛠 Technical Implementation

### Components Used
- Custom SearchBar component
- ShadCN UI: Tabs, Badge, Button, Input
- Lucide React icons
- Mock data integration

### State Management
- Focus state for dropdown visibility
- Active tab state (category/city)
- Search query with real-time filtering
- Click outside detection with useRef + useEffect

### Features
- Debounced search (instant for better UX)
- Event filtering by multiple criteria
- Price formatting (VND)
- Date formatting (localized)
- Responsive grid layouts

## 🚀 Future Enhancements

Potential improvements:
- Search history persistence
- AI-powered personalized suggestions
- Location-based event recommendations
- Recent searches section
- Voice search integration
- Advanced filters in dropdown
- Search analytics tracking
