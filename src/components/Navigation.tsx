import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { 
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import Logo from './ui/Logo';
import { useAuth } from '../hooks/useAuth';
import { signOut, getAccounts, getTransactions } from '../lib/supabase';
import { 
  Menu,
  Bell,
  Search,
  User,
  Settings,
  LogOut,
  CreditCard,
  PieChart,
  Target,
  Brain,
  Zap,
  Trophy,
  GraduationCap,
  Users,
  Crown,
  Home,
  Plus,
  TrendingUp,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

interface NavigationProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Navigation({ isDarkMode, toggleDarkMode }: NavigationProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, isAuthenticated } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [accountSummary, setAccountSummary] = useState({
    totalBalance: 0,
    accountCount: 0,
    recentTransactions: 0
  });

  const navigationItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Transactions', href: '/transactions', icon: CreditCard },
    { name: 'Budgets', href: '/budgets', icon: PieChart },
    { name: 'Goals', href: '/goals', icon: Target },
    { name: 'AI Insights', href: '/insights', icon: Brain },
    { name: 'AI Hub', href: '/ai-hub', icon: Zap },
    { name: 'Gamification', href: '/gamification', icon: Trophy },
    { name: 'Learning', href: '/learning', icon: GraduationCap },
    { name: 'Community', href: '/community', icon: Users },
    { name: 'Subscription', href: '/subscription', icon: Crown },
  ];

  useEffect(() => {
    if (isAuthenticated && user) {
      loadAccountSummary();
      loadNotifications();
    }
  }, [isAuthenticated, user]);

  const loadAccountSummary = async () => {
    if (!user) return;

    try {
      const { data: accounts } = await getAccounts(user.id);
      const { data: transactions } = await getTransactions(user.id, 10);

      if (accounts) {
        const totalBalance = accounts.reduce((sum, account) => sum + Number(account.balance), 0);
        setAccountSummary({
          totalBalance,
          accountCount: accounts.length,
          recentTransactions: transactions?.length || 0
        });
      }
    } catch (error) {
      console.error('Error loading account summary:', error);
    }
  };

  const loadNotifications = async () => {
    // Simulate loading notifications - in real app, this would come from database
    const mockNotifications = [
      {
        id: 1,
        type: 'success',
        title: 'Goal Achievement',
        message: 'You\'ve reached 75% of your vacation fund goal!',
        timestamp: new Date(Date.now() - 3600000), // 1 hour ago
        read: false
      },
      {
        id: 2,
        type: 'warning',
        title: 'Budget Alert',
        message: 'You\'ve spent 90% of your dining budget this month.',
        timestamp: new Date(Date.now() - 7200000), // 2 hours ago
        read: false
      },
      {
        id: 3,
        type: 'info',
        title: 'New Feature',
        message: 'AI-powered expense categorization is now available!',
        timestamp: new Date(Date.now() - 86400000), // 1 day ago
        read: true
      }
    ];
    setNotifications(mockNotifications);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const isActive = (href: string) => location.pathname === href;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning': return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'error': return <AlertCircle className="h-4 w-4 text-red-500" />;
      default: return <Bell className="h-4 w-4 text-blue-500" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  if (!isAuthenticated) {
    return (
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container-clean">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <Logo variant="compact" />
            </Link>
            
            <nav className="hidden lg:flex items-center space-x-8">
              <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Features
              </a>
              <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </a>
              <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                About
              </a>
            </nav>

            <div className="flex items-center space-x-4">
              <Link to="/dashboard">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button size="sm">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-clean">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-3">
            <Logo variant="compact" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.slice(0, 6).map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    active
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Account Summary */}
            <div className="hidden md:flex items-center space-x-4 text-sm">
              <div className="text-right">
                <div className="font-semibold text-foreground">
                  ₹{accountSummary.totalBalance.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground">
                  {accountSummary.accountCount} accounts
                </div>
              </div>
              <Badge className="badge-success">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12.5%
              </Badge>
            </div>

            {/* Search */}
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="h-4 w-4" />
            </Button>

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-4 w-4" />
                  {unreadCount > 0 && (
                    <div className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-xs font-medium text-destructive-foreground">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </div>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="flex items-center justify-between">
                  <span>Notifications</span>
                  {unreadCount > 0 && (
                    <Badge className="badge-primary text-xs">
                      {unreadCount} new
                    </Badge>
                  )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-64 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <DropdownMenuItem key={notification.id} className="flex items-start space-x-3 p-3">
                        {getNotificationIcon(notification.type)}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-foreground truncate">
                              {notification.title}
                            </p>
                            {!notification.read && (
                              <div className="h-2 w-2 bg-primary rounded-full ml-2" />
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {notification.timestamp.toLocaleTimeString([], { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </p>
                        </div>
                      </DropdownMenuItem>
                    ))
                  ) : (
                    <div className="p-4 text-center text-sm text-muted-foreground">
                      No notifications
                    </div>
                  )}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={profile?.avatar_url} alt={profile?.full_name || 'User'} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-sm font-semibold">
                      {profile?.full_name ? 
                        profile.full_name.split(' ').map(n => n[0]).join('').toUpperCase() : 
                        'U'
                      }
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {profile?.full_name || 'User'}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {profile?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/subscription" className="flex items-center">
                    <Crown className="mr-2 h-4 w-4" />
                    <span>Subscription</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetHeader>
                  <SheetTitle>Navigation</SheetTitle>
                  <SheetDescription>
                    Access all features of your financial dashboard
                  </SheetDescription>
                </SheetHeader>
                
                <div className="mt-6 space-y-6">
                  {/* User Info */}
                  <div className="flex items-center space-x-3 p-4 bg-muted/50 rounded-lg">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={profile?.avatar_url} alt={profile?.full_name || 'User'} />
                      <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                        {profile?.full_name ? 
                          profile.full_name.split(' ').map(n => n[0]).join('').toUpperCase() : 
                          'U'
                        }
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-foreground">
                        {profile?.full_name || 'User'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        ₹{accountSummary.totalBalance.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Navigation Items */}
                  <nav className="space-y-2">
                    {navigationItems.map((item) => {
                      const Icon = item.icon;
                      const active = isActive(item.href);
                      return (
                        <Link
                          key={item.name}
                          to={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                            active
                              ? 'bg-primary text-primary-foreground shadow-sm'
                              : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                          <span>{item.name}</span>
                        </Link>
                      );
                    })}
                  </nav>

                  {/* Quick Actions */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-foreground">Quick Actions</h4>
                    <div className="space-y-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full justify-start"
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          navigate('/transactions');
                        }}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Transaction
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full justify-start"
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          navigate('/goals');
                        }}
                      >
                        <Target className="mr-2 h-4 w-4" />
                        Create Goal
                      </Button>
                    </div>
                  </div>

                  {/* Settings & Logout */}
                  <div className="border-t border-border pt-4 space-y-2">
                    <Link
                      to="/settings"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      <Settings className="h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleSignOut}
                      className="w-full justify-start text-destructive hover:bg-destructive/10 hover:text-destructive"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}