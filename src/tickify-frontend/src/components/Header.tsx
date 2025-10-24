import { Ticket, User, Globe, LogIn } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  isAuthenticated?: boolean;
}

export function Header({ onNavigate, currentPage, isAuthenticated = false }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <Ticket className="text-white" size={20} />
            </div>
            <span className="text-xl text-neutral-900">Tickify</span>
          </button>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => onNavigate('home')}
              className={`text-sm transition-colors ${
                currentPage === 'home' ? 'text-orange-500' : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Browse Events
            </button>
            <button
              onClick={() => onNavigate('my-tickets')}
              className={`text-sm transition-colors ${
                currentPage === 'my-tickets' ? 'text-orange-500' : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              My Tickets
            </button>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Globe size={20} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>English</DropdownMenuItem>
                <DropdownMenuItem>Tiếng Việt</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User size={20} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onNavigate('my-tickets')}>
                    My Tickets
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onNavigate('organizer-dashboard')}>
                    Organizer Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onNavigate('login')}>
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                onClick={() => onNavigate('login')}
                variant="ghost"
                size="sm"
                className="gap-2"
              >
                <LogIn size={18} />
                <span className="hidden sm:inline">Sign In</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
