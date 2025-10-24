import { useState } from 'react';
import { SearchBar } from '../components/SearchBar';
import { EventCard } from '../components/EventCard';
import { FilterSheet } from '../components/FilterSheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { mockEvents } from '../mockData';
import { Filter, SortOption } from '../types';

interface EventListingProps {
  onNavigate: (page: string, eventId?: string) => void;
}

export function EventListing({ onNavigate }: EventListingProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<Filter>({});
  const [sortBy, setSortBy] = useState<SortOption>('popularity');

  const handleSearch = () => {
    // In a real app, this would trigger an API call
    console.log('Searching for:', searchQuery);
  };

  const handleApplyFilters = (newFilters: Filter) => {
    setFilters(newFilters);
  };

  // Filter and sort events
  let filteredEvents = [...mockEvents];

  if (filters.city && filters.city !== 'all') {
    filteredEvents = filteredEvents.filter(e => e.city === filters.city);
  }

  if (filters.category && filters.category !== 'all') {
    filteredEvents = filteredEvents.filter(e => e.category === filters.category);
  }

  if (filters.minPrice || filters.maxPrice) {
    filteredEvents = filteredEvents.filter(e => {
      const minPrice = Math.min(...e.ticketTiers.map(t => t.price));
      return minPrice >= (filters.minPrice || 0) && minPrice <= (filters.maxPrice || Infinity);
    });
  }

  // Sort events
  if (sortBy === 'date') {
    filteredEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  } else if (sortBy === 'price-asc') {
    filteredEvents.sort((a, b) => {
      const aMin = Math.min(...a.ticketTiers.map(t => t.price));
      const bMin = Math.min(...b.ticketTiers.map(t => t.price));
      return aMin - bMin;
    });
  } else if (sortBy === 'price-desc') {
    filteredEvents.sort((a, b) => {
      const aMin = Math.min(...a.ticketTiers.map(t => t.price));
      const bMin = Math.min(...b.ticketTiers.map(t => t.price));
      return bMin - aMin;
    });
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Search Bar */}
      <section className="bg-white border-b border-neutral-200 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onSearch={handleSearch}
            placeholder="Search events, cities, venues..."
          />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters and Sort */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <FilterSheet filters={filters} onApply={handleApplyFilters} />
            <span className="text-sm text-neutral-600">
              {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''} found
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-neutral-600">Sort by:</span>
            <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popularity">Popularity</SelectItem>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onClick={() => onNavigate('event-detail', event.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-neutral-400 mb-4">
              <svg
                className="mx-auto h-24 w-24"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-neutral-900 mb-2">No events found</h3>
            <p className="text-neutral-600">Try adjusting your filters or search query</p>
          </div>
        )}
      </div>
    </div>
  );
}
