import { 
  Home,
  CreditCard,
  PieChart,
  Target,
  Brain,
  Settings,
  Zap,
  Users,
  GraduationCap,
  Crown,
  Trophy
} from 'lucide-react';

export const NAVIGATION_ITEMS = [
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
  { name: 'Settings', href: '/settings', icon: Settings },
];

export const NOTIFICATION_TEMPLATES = [
  { message: "💡 AI Tip: You can save ₹3,000 monthly by optimizing subscriptions", type: "tip" },
  { message: "🎯 Goal Alert: You're 75% towards your vacation fund!", type: "goal" },
  { message: "💳 New transaction: ₹450 at Café Coffee Day", type: "transaction" },
  { message: "🔥 Streak Alert: 15 days of budget goals achieved!", type: "streak" }
];