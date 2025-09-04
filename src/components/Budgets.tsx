import React, { useState } from 'react';
import DashboardLayout from './DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Plus, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp,
  PieChart,
  Calendar,
  Target,
  Leaf,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface BudgetsProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Budgets({ isDarkMode, toggleDarkMode }: BudgetsProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Enhanced budget data with zen approach
  const budgets = [
    {
      id: 1,
      category: 'Nourishing Food',
      allocated: 20000,
      spent: 18500,
      remaining: 1500,
      percentage: 92.5,
      status: 'mindful-attention',
      icon: '🥗',
      transactions: 23,
      wisdom: 'Consider more home-cooked meals'
    },
    {
      id: 2,
      category: 'Mindful Travel',
      allocated: 15000,
      spent: 12000,
      remaining: 3000,
      percentage: 80,
      status: 'flowing-well',
      icon: '🚗',
      transactions: 15,
      wisdom: 'Your travel choices are balanced'
    },
    {
      id: 3,
      category: 'Self Development',
      allocated: 8000,
      spent: 6000,
      remaining: 2000,
      percentage: 75,
      status: 'growing-wisdom',
      icon: '📚',
      transactions: 8,
      wisdom: 'Investing in yourself beautifully'
    },
    {
      id: 4,
      category: 'Mindful Purchases',
      allocated: 12000,
      spent: 11500,
      remaining: 500,
      percentage: 95.8,
      status: 'needs-reflection',
      icon: '🛍️',
      transactions: 12,
      wisdom: 'Time to pause and reflect'
    },
    {
      id: 5,
      category: 'Life Essentials',
      allocated: 18000,
      spent: 15000,
      remaining: 3000,
      percentage: 83.3,
      status: 'harmonious',
      icon: '⚡',
      transactions: 6,
      wisdom: 'Essential needs well-managed'
    },
    {
      id: 6,
      category: 'Wellness & Health',
      allocated: 10000,
      spent: 2500,
      remaining: 7500,
      percentage: 25,
      status: 'abundant-space',
      icon: '🧘‍♂️',
      transactions: 2,
      wisdom: 'Room for more self-care'
    }
  ];

  const totalAllocated = budgets.reduce((sum, budget) => sum + budget.allocated, 0);
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0);
  const totalRemaining = totalAllocated - totalSpent;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'abundant-space':
        return 'text-primary';
      case 'growing-wisdom':
      case 'flowing-well':
      case 'harmonious':
        return 'text-accent';
      case 'mindful-attention':
        return 'text-muted-foreground';
      case 'needs-reflection':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusBadge = (status: string, percentage: number) => {
    if (status === 'needs-reflection') {
      return <Badge variant="secondary" className="bg-destructive/10 text-destructive border-destructive/20"><AlertTriangle className="h-3 w-3 mr-1" />Reflect</Badge>;
    } else if (status === 'mindful-attention') {
      return <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20"><AlertTriangle className="h-3 w-3 mr-1" />Mindful</Badge>;
    } else if (status === 'abundant-space') {
      return <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20"><CheckCircle className="h-3 w-3 mr-1" />Abundant</Badge>;
    } else {
      return <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20"><CheckCircle className="h-3 w-3 mr-1" />Flowing</Badge>;
    }
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case 'needs-reflection':
        return '[&>div]:bg-destructive';
      case 'mindful-attention':
        return '[&>div]:bg-accent';
      default:
        return '[&>div]:bg-primary';
    }
  };

  const categories = [
    'Nourishing Food',
    'Mindful Travel',
    'Mindful Purchases',
    'Life Essentials',
    'Self Development',
    'Wellness & Health',
    'Relationship Investment',
    'Creative Expression'
  ];

  return (
    <DashboardLayout isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}>
      <div className="space-y-8">
        {/* Zen Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <h1 className="text-4xl font-serif font-semibold text-foreground mb-2">Budget Harmony 🌸</h1>
            <p className="text-muted-foreground font-medium">Cultivate mindful spending with intentional boundaries</p>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="zen-button zen-ripple bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg">
                <Plus className="h-4 w-4 mr-2" />
                Create Budget
                <Sparkles className="h-4 w-4 ml-2" />
              </Button>
            </DialogTrigger>
            <DialogContent className="clean-card border-primary/20">
              <DialogHeader>
                <DialogTitle className="font-heading text-xl text-foreground">Create Budget</DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Set up a new budget category to track your spending.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6 pt-4">
                <div>
                  <Label htmlFor="category" className="text-foreground font-medium">Life Category</Label>
                  <Select>
                    <SelectTrigger className="bg-secondary/50 border-border/40 focus:border-primary/60 text-foreground">
                      <SelectValue placeholder="Choose your focus area" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="amount" className="text-foreground font-medium">Monthly Intention</Label>
                  <Input id="amount" placeholder="₹0.00" className="bg-secondary/50 border-border/40 focus:border-primary/60 text-foreground" />
                </div>
                <div>
                  <Label htmlFor="period" className="text-foreground font-medium">Time Flow</Label>
                  <Select>
                    <SelectTrigger className="bg-secondary/50 border-border/40 focus:border-primary/60 text-foreground">
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly Flow</SelectItem>
                      <SelectItem value="weekly">Weekly Rhythm</SelectItem>
                      <SelectItem value="yearly">Yearly Vision</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="zen-button border-border/40 text-foreground">
                    Release
                  </Button>
                  <Button onClick={() => setIsAddDialogOpen(false)} className="zen-button bg-primary hover:bg-primary/90 text-primary-foreground">
                    Create with Intention
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Enhanced Budget Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="zen-card border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1 font-medium">Total Intention</p>
                  <p className="text-3xl font-serif font-semibold text-primary">₹{totalAllocated.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground mt-1">Mindfully Allocated</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="p-3 rounded-2xl bg-primary/20">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-2xl">🎯</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="zen-card border-accent/20 bg-gradient-to-br from-accent/5 to-accent/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1 font-medium">Mindful Flow</p>
                  <p className="text-3xl font-serif font-semibold text-accent">₹{totalSpent.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground mt-1">Consciously Spent</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="p-3 rounded-2xl bg-accent/20">
                    <PieChart className="h-6 w-6 text-accent" />
                  </div>
                  <span className="text-2xl">🌊</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="zen-card border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1 font-medium">Remaining Space</p>
                  <p className="text-3xl font-serif font-semibold text-primary">₹{totalRemaining.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground mt-1">Available Energy</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="p-3 rounded-2xl bg-primary/10">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-2xl">✨</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Budget Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {budgets.map((budget) => (
            <Card key={budget.id} className="zen-card hover:shadow-xl transition-all duration-500 group">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                      <span className="text-2xl">{budget.icon}</span>
                    </div>
                    <div>
                      <CardTitle className="text-lg font-serif text-foreground">{budget.category}</CardTitle>
                      <p className="text-sm text-muted-foreground">{budget.transactions} mindful choices</p>
                    </div>
                  </div>
                  {getStatusBadge(budget.status, budget.percentage)}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground font-medium">Energy Used</span>
                    <span className="font-semibold text-foreground">₹{budget.spent.toLocaleString()} / ₹{budget.allocated.toLocaleString()}</span>
                  </div>
                  <Progress 
                    value={budget.percentage} 
                    className={`h-4 rounded-full ${getProgressColor(budget.status)}`}
                  />
                  <div className="flex justify-between text-sm">
                    <span className={`font-medium ${getStatusColor(budget.status)}`}>
                      {budget.percentage.toFixed(1)}% flowing
                    </span>
                    <span className="text-muted-foreground">
                      ₹{budget.remaining.toLocaleString()} space remains
                    </span>
                  </div>
                </div>
                
                {/* Wisdom Section */}
                <div className="p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl">
                  <div className="flex items-center space-x-2 mb-2">
                    <Leaf className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">Gentle Wisdom</span>
                  </div>
                  <p className="text-sm text-muted-foreground italic">{budget.wisdom}</p>
                </div>
                
                <div className="flex justify-between items-center pt-2 border-t border-border/30">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Current month</span>
                  </div>
                  <Button variant="outline" size="sm" className="zen-button border-primary/30 hover:border-primary/60 text-primary">
                    Explore Flow
                    <ArrowRight className="h-3 w-3 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enhanced Budget Insights */}
        <Card className="zen-card border-primary/20 bg-gradient-to-br from-primary/5 via-secondary/10 to-accent/5">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3 text-foreground">
              <div className="p-2 rounded-xl bg-primary/20">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <span className="font-serif">Budget Wisdom & Insights</span>
              <span className="text-lg">🧘‍♂️</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="zen-card p-6 bg-background/60 backdrop-blur-sm">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-2xl bg-destructive/10">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-5 w-5 text-destructive" />
                      <span className="text-lg">🛍️</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-serif font-medium text-foreground mb-2">Mindful Purchase Reflection</h4>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      You've used 95.8% of your mindful purchase budget. Consider pausing to reflect on needs vs wants.
                    </p>
                    <Button variant="outline" size="sm" className="zen-button border-destructive/30 hover:border-destructive/60 text-destructive">
                      Pause & Reflect
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="zen-card p-6 bg-background/60 backdrop-blur-sm">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-2xl bg-primary/10">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span className="text-lg">🧘‍♂️</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-serif font-medium text-foreground mb-2">Wellness Abundance</h4>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      Beautiful! You have ₹7,500 available for wellness. Consider investing in your wellbeing.
                    </p>
                    <Button variant="outline" size="sm" className="zen-button border-primary/30 hover:border-primary/60 text-primary">
                      Nurture Self
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="zen-card p-6 bg-background/60 backdrop-blur-sm">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-2xl bg-accent/10">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5 text-accent" />
                      <span className="text-lg">🥗</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-serif font-medium text-foreground mb-2">Nourishment Pattern</h4>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      Your food spending shows a 15% increase. Consider more home-prepared nourishing meals.
                    </p>
                    <Button variant="outline" size="sm" className="zen-button border-accent/30 hover:border-accent/60 text-accent">
                      Find Balance
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="zen-card p-6 bg-background/60 backdrop-blur-sm">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-2xl bg-primary/10">
                    <div className="flex items-center space-x-2">
                      <Target className="h-5 w-5 text-primary" />
                      <span className="text-lg">✨</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-serif font-medium text-foreground mb-2">Flow Optimization</h4>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      Consider creating a 'Creative Expression' budget to nurture your artistic soul.
                    </p>
                    <Button variant="outline" size="sm" className="zen-button border-primary/30 hover:border-primary/60 text-primary">
                      Create with Joy
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}