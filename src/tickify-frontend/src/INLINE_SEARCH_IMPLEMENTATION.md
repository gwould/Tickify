# 🔍 Inline Search Implementation Guide

## Overview
The new inline search provides a fast, seamless search experience directly in the header without page navigation. Users can discover events while staying in the current viewing context (sliders, categories, banners).

---

## 🎨 Design Implementation

### Color Scheme
- **Primary Brand**: `#00C16A` / `bg-teal-500` (Ticketbox green)
- **Header Background**: `bg-teal-500`
- **Dropdown Background**: `bg-neutral-900` / `#1E1E1E`
- **Overlay**: `bg-black/60` (60% opacity)
- **Accent**: `text-teal-400` for icons and highlights

### Header Layout (`/components/Header.tsx`)
```
Height: 80px (h-20)
Position: sticky top-0 z-50
Background: bg-teal-500

[Logo] [--- Search Bar (center-aligned) ---] [Create Event] [My Tickets] [Account ▼]
```

**Components:**
- **Logo** (left): Tickify logo with white ticket icon
- **Search Bar** (center): White background, rounded-full, max-w-2xl
- **Create Event** (desktop only): White button with teal text
- **My Tickets**: Ticket icon + text
- **Account**: Avatar dropdown menu

---

## 🔍 Search Behavior

### 1. Opening the Search Dropdown
- Click or focus on search input → dropdown appears
- Semi-transparent overlay (`bg-black/60`) covers the page
- Dropdown animates with fade-in + slide-down (200ms)
- Search is paused when dropdown is open (via `isPaused` prop to HeroSlider)

### 2. Search States

#### Default State (No Query)
Shows:
- 🔥 **Trending Keywords**: 5 clickable badges
- 🎭 **Explore Tabs**: Category or City exploration
- 💡 **Suggestions**: 3 recommended events

#### Active Search (>= 2 characters)
Shows:
- **Search Results**: Filtered events (max 4)
- **Result Count Badge**: Shows number of matches
- **Loading Indicator**: Spinner during debounce (300ms)
- **No Results State**: Empty state with clear button

### 3. Closing the Dropdown
- Click outside dropdown
- Press `ESC` key
- Click on any result
- Click X button (mobile only)

---

## 📱 Responsive Design

### Desktop (>= 768px)
- Search bar in header center, always visible
- Dropdown positioned below header
- No X close button (click outside to close)

### Mobile (< 768px)
- Search bar appears below logo
- Full-width search input
- X close button visible in search input
- Results take full screen width

---

## 🧩 Components Structure

### `/components/InlineSearchBar.tsx`
Main search component with dropdown functionality.

**Props:**
```typescript
interface InlineSearchBarProps {
  onEventClick?: (eventId: string) => void;
  onCategoryClick?: (category: Category) => void;
  onCityClick?: (city: string) => void;
  onOpenChange?: (isOpen: boolean) => void;
}
```

**Features:**
- ✅ Debounced search (300ms)
- ✅ Real-time filtering
- ✅ Click outside detection
- ✅ ESC key support
- ✅ Loading states
- ✅ Empty states
- ✅ Trending keywords
- ✅ Category/City exploration tabs

### `/components/HeroSlider.tsx`
Full-width hero slider with auto-slide.

**Props:**
```typescript
interface HeroSliderProps {
  onViewDetails?: (eventId: string) => void;
  isPaused?: boolean; // Pauses autoplay when search is open
}
```

**Features:**
- ✅ Auto-slide every 5 seconds
- ✅ Pause when search dropdown is open
- ✅ Manual navigation (prev/next arrows)
- ✅ Dot indicators
- ✅ Fade transitions
- ✅ Responsive heights (500px mobile, 600px desktop)

---

## 🎯 User Flow

1. **User lands on homepage**
   - Sees hero slider with featured events
   - Search bar is visible in header

2. **User clicks search bar**
   - Dropdown appears with overlay
   - Hero slider pauses autoplay
   - Shows trending keywords + suggestions

3. **User types search query**
   - Debounced search after 300ms
   - Loading spinner appears
   - Results filter in real-time
   - Shows matching events or "no results"

4. **User clicks result**
   - Dropdown closes
   - Navigates to event detail
   - Hero slider resumes autoplay
   - No page reload

5. **User explores by category/city**
   - Tabs show category or city grids
   - Click navigates to listing page with filter
   - Maintains search context

---

## 🎨 Dropdown Structure

### Layout
```
┌─────────────────────────────────────────┐
│ 🔥 Trending Search                      │
│ [keyword] [keyword] [keyword] ...       │
├─────────────────────────────────────────┤
│ [Category] [City] ← Tabs                │
│ ┌────┬────┬────┐                        │
│ │ 🎵 │ 🎭 │ 🏆 │ ← Category/City cards  │
│ │ 📅 │ 🎨 │ 🍔 │                        │
│ └────┴────┴────┘                        │
├─────────────────────────────────────────┤
│ 💡 Suggestions for You                  │
│ ┌─────────────────────────────────────┐ │
│ │ [img] Event Title          → 150K  │ │
│ │       📅 Date • 📍 City            │ │
│ └─────────────────────────────────────┘ │
│ [More event cards...]                   │
└─────────────────────────────────────────┘
```

### Styling
- **Max Height**: 500px
- **Overflow**: Auto scroll
- **Border Radius**: 12px (rounded-xl)
- **Background**: #2B2B2B (bg-neutral-900)
- **Text**: #E5E5E5 (text-white/neutral-300)
- **Shadow**: shadow-2xl

---

## ⚡ Performance Optimizations

### Debouncing
- Search queries debounced by 300ms
- Prevents excessive filtering
- Shows loading spinner during debounce

### Conditional Rendering
- Dropdown only renders when open
- Overlay only appears when needed
- Slider pauses to reduce CPU usage

### Event Delegation
- Single click-outside handler
- Single ESC key handler
- Efficient cleanup on unmount

---

## 🔧 Integration Points

### App.tsx
```typescript
const [isSearchOpen, setIsSearchOpen] = useState(false);

<Header 
  onSearchOpenChange={setIsSearchOpen}
  // ...
/>

<Home 
  isSearchOpen={isSearchOpen}
  // ...
/>
```

### Home.tsx
```typescript
<HeroSlider 
  isPaused={isSearchOpen}
  onViewDetails={handleViewDetails}
/>
```

---

## 🎨 Animations

### Dropdown
- **Entry**: fade-in + slide-down (200ms)
- **Exit**: Instant removal (no exit animation)

### Overlay
- **Entry**: fade-in (200ms)
- **Exit**: fade-out (200ms)

### Hover Effects
- **Category Cards**: scale(1.05) + teal glow overlay
- **Event Images**: scale(1.1)
- **Arrows**: translate-x-1

---

## 📊 Search Algorithm

### Filtering Logic
Events match if query appears in:
1. Event title (case-insensitive)
2. Category name
3. City name
4. Venue name

### Results Display
- Maximum 4 results shown
- Sorted by relevance (order in mockData)
- Shows "Sold Out" badge if applicable
- Displays lowest available price

---

## 🚀 Future Enhancements

Potential improvements:
- [ ] Search history persistence (localStorage)
- [ ] AI-powered suggestions
- [ ] Voice search
- [ ] Recent searches section
- [ ] Search analytics
- [ ] Autocomplete suggestions
- [ ] Fuzzy matching
- [ ] Search result pagination

---

## 🐛 Known Limitations

1. **Mock Data Only**: Currently uses static mockData
2. **No API Integration**: Real implementation would need backend
3. **Limited Filtering**: Basic string matching only
4. **No Persistence**: Search state resets on page change

---

## 📝 Code Examples

### Using InlineSearchBar
```tsx
<InlineSearchBar
  onEventClick={(id) => navigate('event-detail', id)}
  onCategoryClick={(cat) => navigate('listing')}
  onCityClick={(city) => navigate('listing')}
  onOpenChange={(isOpen) => setSearchOpen(isOpen)}
/>
```

### Styling Dropdown Results
```tsx
<div className="bg-neutral-900 rounded-xl p-6">
  <div className="space-y-3">
    {events.map(event => (
      <button className="group bg-neutral-800 hover:bg-neutral-700 
                         rounded-lg p-3 transition-all">
        {/* Event card content */}
      </button>
    ))}
  </div>
</div>
```

---

## ✅ Testing Checklist

- [x] Search opens on focus
- [x] Overlay appears
- [x] Hero slider pauses
- [x] Trending keywords clickable
- [x] Category tabs work
- [x] City tabs work
- [x] Search filters in real-time
- [x] Debouncing works (300ms)
- [x] Loading spinner shows
- [x] No results state displays
- [x] Close on click outside
- [x] Close on ESC key
- [x] Mobile responsive
- [x] Event navigation works
- [x] Hero slider resumes after close

---

## 🎯 Key Achievements

✨ **Fast & Seamless**: No page reloads, instant feedback
⚡ **Optimized**: Debounced search, conditional rendering
📱 **Responsive**: Works beautifully on all devices
🎨 **Beautiful**: Modern design with smooth animations
♿ **Accessible**: Keyboard navigation, ESC support
🔍 **Smart**: Trending keywords, category exploration
