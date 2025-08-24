import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { getAccounts, getTransactions } from '../lib/supabase';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import Logo, { LogoIcon } from './ui/Logo';
import { 
  Bell,
  Search,
  Menu,
  Moon,
  Sun,
  User,
  LogOut,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Settings as SettingsIcon,
  Palette,
  Globe,
  Shield
} from 'lucide-react';
import { NAVIGATION_ITEMS } from './constants/navigation';

interface DashboardLayoutProps {
  children: React.ReactNode;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isOffline?: boolean;
  notifications?: any[];
}

export default function DashboardLayout({ 
  children, 
  isDarkMode, 
  toggleDarkMode, 
  isOffline = false,
  notifications = []
}: DashboardLayoutProps) {
  const location = useLocation();
  const { user, profile } = useAuth();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [accountSummary, setAccountSummary] = useState({
    totalBalance: 0,
    accountCount: 0
  });

  React.useEffect(() => {
    if (user) {
      loadAccountSummary();
    }
  }, [user]);

  const loadAccountSummary = async () => {
    if (!user) return;
    
    try {
      const { data: accounts } = await getAccounts(user.id);
      if (accounts) {
        const totalBalance = accounts.reduce((sum, account) => sum + Number(account.balance), 0);
        setAccountSummary({
          totalBalance,
          accountCount: accounts.length
        });
      }
    } catch (error) {
      console.error('Error loading account summary:', error);
      // Set default values on error
      setAccountSummary({
        totalBalance: 0,
        accountCount: 0
      });
    }
  };

  const isActive = (href: string) => location.pathname === href;

  const handleProfileClick = () => {
    // Navigate to profile settings
    window.location.href = '/settings';
  };

  const handleHelpClick = () => {
    // Open help documentation
    window.open('https://docs.financeflow.com', '_blank');
  };

  const handleNotificationClick = () => {
    // Toggle notification panel or navigate to notifications page
    console.log('Show notifications panel');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const query = formData.get('search') as string;
    if (query) {
      // Navigate to search results
      window.location.href = `/search?q=${encodeURIComponent(query)}`;
    }
  };

  const handleLogout = () => {
    // Clear user session and redirect to landing
    localStorage.removeItem('financeflow-user');
    localStorage.removeItem('financeflow-token');
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-200">
      {/* Professional Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 ${isSidebarCollapsed ? 'w-16' : 'w-64'} bg-card border-r border-border transition-all duration-300 shadow-lg`}>
        <div className="flex h-full flex-col">
          {/* Logo Section */}
          <div className={`flex items-center border-b border-border p-4 ${isSidebarCollapsed ? 'justify-center' : ''}`}>
            {isSidebarCollapsed ? (
              <LogoIcon size="default" />
            ) : (
              <Logo variant="compact" />
            )}
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
            {NAVIGATION_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                    active
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  }`}
                  title={isSidebarCollapsed ? item.name : undefined}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  {!isSidebarCollapsed && <span className="ml-3 truncate">{item.name}</span>}
                  {active && !isSidebarCollapsed && (
                    <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary-foreground" />
                  )}
                </Link>
              );
            })}
          </nav>
          
          {/* User Profile Section */}
          <div className="border-t border-border p-4">
            <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'space-x-3'}`}>
              <Avatar className="h-8 w-8 cursor-pointer" onClick={handleProfileClick}>
                <AvatarImage src="/api/placeholder/32/32" alt="Profile" />
                <AvatarFallback className="bg-primary text-primary-foreground text-sm font-semibold">AJ</AvatarFallback>
              </Avatar>
              {!isSidebarCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {profile?.full_name || 'User'}
                  </p>
                  <div className="flex items-center space-x-1">
                    <Badge className="badge-success text-xs">Premium</Badge>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">Active</span>
                  </div>
                </div>
              )}
            </div>
            {!isSidebarCollapsed && (
              <div className="mt-3 flex space-x-1">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 flex-1 justify-start px-2 text-xs hover:bg-accent"
                  onClick={handleProfileClick}
                >
                  <User className="mr-1 h-3 w-3" />
                  Profile
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 px-2 hover:bg-destructive hover:text-destructive-foreground"
                  onClick={handleLogout}
                  title="Logout"
                >
                  <LogOut className="h-3 w-3" />
                </Button>
              </div>
            )}
          </div>

          {/* Sidebar Toggle */}
          <div className="border-t border-border p-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="w-full justify-center hover:bg-accent"
              title={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {isSidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`${isSidebarCollapsed ? 'ml-16' : 'ml-64'} transition-all duration-300`}>
        {/* Header */}
        <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-16 items-center justify-between px-6">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden"
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              >
                <Menu className="h-4 w-4" />
              </Button>
              
              {/* Enhanced Search */}
              <form onSubmit={handleSearchSubmit} className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  name="search"
                  type="text"
                  placeholder="Search transactions, goals, or insights..."
                  className="h-10 w-64 rounded-lg border border-border bg-background pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                />
              </form>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Performance Badge */}
              <Badge className="badge-success hidden sm:inline-flex">
                <TrendingUp className="mr-1 h-3 w-3" />
                ₹{accountSummary.totalBalance.toLocaleString()}
              </Badge>

              {/* Theme Toggle */}
              <div className="flex items-center space-x-2 rounded-lg border border-border bg-card px-3 py-1.5 shadow-sm">
                <Sun className={`h-4 w-4 transition-colors ${!isDarkMode ? 'text-primary' : 'text-muted-foreground'}`} />
                <Switch
                  checked={isDarkMode}
                  onCheckedChange={toggleDarkMode}
                  aria-label="Toggle dark mode"
                  className="data-[state=checked]:bg-primary"
                />
                <Moon className={`h-4 w-4 transition-colors ${isDarkMode ? 'text-primary' : 'text-muted-foreground'}`} />
              </div>
              
              {/* Notifications */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative hover:bg-accent"
                onClick={handleNotificationClick}
                title="Notifications"
              >
                <Bell className="h-4 w-4" />
                {notifications.length > 0 && (
                  <div className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-xs font-medium text-destructive-foreground">
                    {notifications.length > 9 ? '9+' : notifications.length}
                  </div>
                )}
              </Button>
              
              {/* Help */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="hover:bg-accent"
                onClick={handleHelpClick}
                title="Help & Documentation"
              >
                <HelpCircle className="h-4 w-4" />
              </Button>

              {/* Quick Settings */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="hover:bg-accent"
                onClick={() => window.location.href = '/settings'}
                title="Settings"
              >
                <SettingsIcon className="h-4 w-4" />
              </Button>
              
              {/* Profile Avatar */}
              <div className="relative">
                <Avatar 
                  className="h-8 w-8 cursor-pointer ring-2 ring-transparent hover:ring-primary/20 transition-all duration-200" 
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  <AvatarImage src={profile?.avatar_url} alt={profile?.full_name || 'User'} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-sm font-semibold">
                    {profile?.full_name ? 
                      profile.full_name.split(' ').map(n => n[0]).join('').toUpperCase() : 
                      'U'
                    }
                  </AvatarFallback>
                </Avatar>
                
                {/* User Menu Dropdown */}
                {showUserMenu && (
                  <div className="absolute right-0 top-10 w-48 rounded-lg border border-border bg-card shadow-lg py-1 z-50">
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start px-4 py-2 text-sm hover:bg-accent"
                      onClick={handleProfileClick}
                    >
                      <User className="mr-2 h-4 w-4" />
                      Profile Settings
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start px-4 py-2 text-sm hover:bg-accent"
                      onClick={() => window.location.href = '/settings'}
                    >
                      <Palette className="mr-2 h-4 w-4" />
                      Preferences
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start px-4 py-2 text-sm hover:bg-accent"
                      onClick={() => window.location.href = '/subscription'}
                    >
                      <Shield className="mr-2 h-4 w-4" />
                      Subscription
                    </Button>
                    <div className="border-t border-border my-1" />
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start px-4 py-2 text-sm hover:bg-destructive hover:text-destructive-foreground"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-6">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>

      {/* Click outside to close user menu */}
      {showUserMenu && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </div>
  );
}