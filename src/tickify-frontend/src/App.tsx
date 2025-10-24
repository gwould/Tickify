import { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { EventListing } from './pages/EventListing';
import { EventDetail } from './pages/EventDetail';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Success } from './pages/Success';
import { MyTickets } from './pages/MyTickets';
import { OrganizerWizard } from './pages/OrganizerWizard';
import { OrganizerDashboard } from './pages/OrganizerDashboard';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ForgotPassword } from './pages/ForgotPassword';
import { CartItem, Order } from './types';

type Page = 
  | 'home' 
  | 'listing' 
  | 'event-detail' 
  | 'cart' 
  | 'checkout' 
  | 'success' 
  | 'my-tickets'
  | 'organizer-wizard'
  | 'organizer-dashboard'
  | 'login'
  | 'register'
  | 'forgot-password';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [completedOrders, setCompletedOrders] = useState<Order[]>([]);
  const [lastOrder, setLastOrder] = useState<Order | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleNavigate = (page: string, eventId?: string) => {
    setCurrentPage(page as Page);
    if (eventId) {
      setSelectedEventId(eventId);
    }
    window.scrollTo(0, 0);
  };

  const handleAddToCart = (items: CartItem[]) => {
    setCartItems(items);
  };

  const handleCompleteOrder = (order: Order) => {
    setCompletedOrders([...completedOrders, order]);
    setLastOrder(order);
    setCartItems([]);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} isSearchOpen={isSearchOpen} />;
      
      case 'listing':
        return <EventListing onNavigate={handleNavigate} />;
      
      case 'event-detail':
        if (!selectedEventId) {
          setCurrentPage('home');
          return null;
        }
        return (
          <EventDetail
            eventId={selectedEventId}
            onNavigate={handleNavigate}
            onAddToCart={handleAddToCart}
          />
        );
      
      case 'cart':
        return (
          <Cart
            items={cartItems}
            onNavigate={handleNavigate}
            onUpdateCart={setCartItems}
          />
        );
      
      case 'checkout':
        return (
          <Checkout
            items={cartItems}
            onNavigate={handleNavigate}
            onCompleteOrder={handleCompleteOrder}
          />
        );
      
      case 'success':
        return (
          <Success
            order={lastOrder}
            onNavigate={handleNavigate}
          />
        );
      
      case 'my-tickets':
        return (
          <MyTickets
            orders={completedOrders}
            onNavigate={handleNavigate}
          />
        );
      
      case 'organizer-wizard':
        return <OrganizerWizard onNavigate={handleNavigate} />;
      
      case 'organizer-dashboard':
        return <OrganizerDashboard onNavigate={handleNavigate} />;
      
      case 'login':
        return <Login onNavigate={handleNavigate} />;
      
      case 'register':
        return <Register onNavigate={handleNavigate} />;
      
      case 'forgot-password':
        return <ForgotPassword onNavigate={handleNavigate} />;
      
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  // Pages that don't need header/footer
  const isStandalonePage = currentPage === 'login' || currentPage === 'register' || currentPage === 'forgot-password';

  return (
    <div className="min-h-screen flex flex-col">
      {!isStandalonePage && (
        <Header 
          onNavigate={handleNavigate} 
          currentPage={currentPage} 
          isAuthenticated={isAuthenticated}
          onSearchOpenChange={setIsSearchOpen}
        />
      )}
      <main className="flex-1">
        {renderPage()}
      </main>
      {!isStandalonePage && <Footer />}
    </div>
  );
}
