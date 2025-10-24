import { useState } from 'react';
import { SearchBar } from '../components/SearchBar';
import { EventCard } from '../components/EventCard';
import { Badge } from '../components/ui/badge';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { Button } from '../components/ui/button';
import { mockEvents, categories } from '../mockData';
import { Category } from '../types';

interface HomeProps {
  onNavigate: (page: string, eventId?: string) => void;
}

export function Home({ onNavigate }: HomeProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');

  const handleSearch = () => {
    onNavigate('listing');
  };

  const trendingEvents = mockEvents.slice(0, 3);
  const upcomingEvents = mockEvents.slice(3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-neutral-900 to-neutral-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h1 className="text-white mb-4">
              Discover Amazing Events
            </h1>
            <p className="text-xl text-neutral-300">
              Find and book tickets for concerts, sports, conferences, and more across Vietnam
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              onSearch={handleSearch}
              placeholder="Search events, cities, venues..."
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            <Badge
              variant={selectedCategory === 'all' ? 'default' : 'secondary'}
              className={`cursor-pointer whitespace-nowrap ${
                selectedCategory === 'all' 
                  ? 'bg-orange-500 hover:bg-orange-600' 
                  : 'bg-neutral-100 hover:bg-neutral-200'
              }`}
              onClick={() => setSelectedCategory('all')}
            >
              All Events
            </Badge>
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? 'default' : 'secondary'}
                className={`cursor-pointer whitespace-nowrap ${
                  selectedCategory === category 
                    ? 'bg-orange-500 hover:bg-orange-600' 
                    : 'bg-neutral-100 hover:bg-neutral-200'
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <TrendingUp className="text-orange-500" size={28} />
              <h2>Trending Events</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onClick={() => onNavigate('event-detail', event.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2>Upcoming Events</h2>
            <Button 
              variant="ghost" 
              onClick={() => onNavigate('listing')}
              className="text-orange-500 hover:text-orange-600"
            >
              View All
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onClick={() => onNavigate('event-detail', event.id)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
