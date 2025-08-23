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
  Target, 
  Calendar,
  TrendingUp,
  Plane,
  Home,
  Car,
  GraduationCap,
  Heart,
  Briefcase,
  CheckCircle,
  Clock,
  Leaf,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface GoalsProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Goals({ isDarkMode, toggleDarkMode }: GoalsProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Enhanced goals data with zen philosophy
  const goals = [
    {
      id: 1,
      title: 'Sacred Journey to Bali',
      targetAmount: 200000,
      currentAmount: 150000,
      percentage: 75,
      deadline: '2025-12-15',
      monthlyContribution: 15000,
      icon: Plane,
      color: 'bg-primary',
      status: 'flourishing',
      priority: 'soul-calling',
      wisdom: 'Your wanderlust is manifesting beautifully',
      accent: '✈️'
    },
    {
      id: 2,
      title: 'Emergency Sanctuary Fund',
      targetAmount: 500000,
      currentAmount: 320000,
      percentage: 64,
      deadline: '2026-06-30',
      monthlyContribution: 20000,
      icon: Target,
      color: 'bg-primary',
      status: 'growing-steadily',
      priority: 'life-foundation',
      wisdom: 'Building your fortress of peace',
      accent: '🛡️'
    },
    {
      id: 3,
      title: 'Conscious Transport Vessel',
      targetAmount: 300000,
      currentAmount: 125000,
      percentage: 41.67,
      deadline: '2025-08-31',
      monthlyContribution: 25000,
      icon: Car,
      color: 'bg-accent',
      status: 'needs-attention',
      priority: 'life-enhancement',
      wisdom: 'Accelerate your saving rhythm',
      accent: '🚗'
    },
    {
      id: 4,
      title: 'Home Sanctuary Renewal',
      targetAmount: 800000,
      currentAmount: 200000,
      percentage: 25,
      deadline: '2026-12-31',
      monthlyContribution: 30000,
      icon: Home,
      color: 'bg-accent',
      status: 'early-growth',
      priority: 'nest-building',
      wisdom: 'Creating your perfect sanctuary',
      accent: '🏠'
    },
    {
      id: 5,
      title: 'Wisdom Investment Fund',
      targetAmount: 1000000,
      currentAmount: 450000,
      percentage: 45,
      deadline: '2028-06-30',
      monthlyContribution: 18000,
      icon: GraduationCap,
      color: 'bg-primary',
      status: 'wisdom-flowing',
      priority: 'mind-expansion',
      wisdom: 'Knowledge compounds like interest',
      accent: '🎓'
    },
    {
      id: 6,
      title: 'Love Celebration Fund',
      targetAmount: 600000,
      currentAmount: 600000,
      percentage: 100,
      deadline: '2025-03-15',
      monthlyContribution: 0,
      icon: Heart,
      color: 'bg-primary',
      status: 'manifested',
      priority: 'heart-celebration',
      wisdom: 'Love has found its way to completion',
      accent: '💍'
    }
  ];

  const totalGoalAmount = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const totalSaved = goals.reduce((sum, goal) => sum + goal.currentAmount, 0);
  const totalMonthlyContribution = goals.reduce((sum, goal) => sum + goal.monthlyContribution, 0);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'manifested':
        return <Badge className="bg-primary/10 text-primary border-primary/20"><CheckCircle className="h-3 w-3 mr-1" />Manifested</Badge>;
      case 'flourishing':
      case 'wisdom-flowing':
        return <Badge className="bg-primary/10 text-primary border-primary/20"><TrendingUp className="h-3 w-3 mr-1" />Flourishing</Badge>;
      case 'growing-steadily':
      case 'early-growth':
        return <Badge className="bg-accent/10 text-accent border-accent/20"><Target className="h-3 w-3 mr-1" />Growing</Badge>;
      case 'needs-attention':
        return <Badge variant="secondary" className="bg-secondary/20 text-foreground border-border/40"><Clock className="h-3 w-3 mr-1" />Nurture</Badge>;
      default:
        return null;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'soul-calling':
      case 'heart-celebration':
        return 'border-l-primary';
      case 'life-foundation':
      case 'mind-expansion':
        return 'border-l-accent';
      case 'nest-building':
      case 'life-enhancement':
        return 'border-l-secondary';
      default:
        return 'border-l-border';
    }
  };

  const calculateMonthsRemaining = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
    return diffMonths;
  };

  const goalCategories = [
    { value: 'soul-journey', label: 'Soul Journey', icon: '✈️' },
    { value: 'sanctuary', label: 'Life Sanctuary', icon: '🛡️' },
    { value: 'transport', label: 'Conscious Transport', icon: '🚗' },
    { value: 'home', label: 'Nest Building', icon: '🏠' },
    { value: 'wisdom', label: 'Wisdom Investment', icon: '🎓' },
    { value: 'love', label: 'Love Celebration', icon: '💍' },
    { value: 'creative', label: 'Creative Expression', icon: '🎨' },
    { value: 'freedom', label: 'Financial Freedom', icon: '🦋' }
  ];

  return (
    <DashboardLayout isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}>
      <div className="space-y-8">
        {/* Zen Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <h1 className="text-4xl font-serif font-semibold text-foreground mb-2">Dreams & Manifestations 🌸</h1>
            <p className="text-muted-foreground font-medium">Nurture your aspirations with mindful intention and gentle persistence</p>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="zen-button zen-ripple bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg">
                <Plus className="h-4 w-4 mr-2" />
                Plant New Dream
                <Sparkles className="h-4 w-4 ml-2" />
              </Button>
            </DialogTrigger>
            <DialogContent className="clean-card border-primary/20">
              <DialogHeader>
                <DialogTitle className="font-heading text-xl text-foreground">Create New Goal</DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Set up a new savings goal to track your progress.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6 pt-4">
                <div>
                  <Label htmlFor="title" className="text-foreground font-medium">Dream Title</Label>
                  <Input id="title" placeholder="e.g., Sacred Journey to..." className="bg-secondary/50 border-border/40 focus:border-primary/60 text-foreground" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="target" className="text-foreground font-medium">Dream Amount</Label>
                    <Input id="target" placeholder="₹0.00" className="bg-secondary/50 border-border/40 focus:border-primary/60 text-foreground" />
                  </div>
                  <div>
                    <Label htmlFor="current" className="text-foreground font-medium">Current Blessing</Label>
                    <Input id="current" placeholder="₹0.00" className="bg-secondary/50 border-border/40 focus:border-primary/60 text-foreground" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="category" className="text-foreground font-medium">Dream Category</Label>
                  <Select>
                    <SelectTrigger className="bg-secondary/50 border-border/40 focus:border-primary/60 text-foreground">
                      <SelectValue placeholder="Choose your dream type" />
                    </SelectTrigger>
                    <SelectContent>
                      {goalCategories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.icon} {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="deadline" className="text-foreground font-medium">Manifestation Date</Label>
                    <Input id="deadline" type="date" className="bg-secondary/50 border-border/40 focus:border-primary/60 text-foreground" />
                  </div>
                  <div>
                    <Label htmlFor="monthly" className="text-foreground font-medium">Monthly Intention</Label>
                    <Input id="monthly" placeholder="₹0.00" className="bg-secondary/50 border-border/40 focus:border-primary/60 text-foreground" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="priority" className="text-foreground font-medium">Soul Priority</Label>
                  <Select>
                    <SelectTrigger className="bg-secondary/50 border-border/40 focus:border-primary/60 text-foreground">
                      <SelectValue placeholder="How important is this dream?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="soul-calling">Soul Calling</SelectItem>
                      <SelectItem value="life-foundation">Life Foundation</SelectItem>
                      <SelectItem value="heart-desire">Heart Desire</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="zen-button border-border/40 text-foreground">
                    Release
                  </Button>
                  <Button onClick={() => setIsAddDialogOpen(false)} className="zen-button bg-primary hover:bg-primary/90 text-primary-foreground">
                    Plant Dream Seed
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Enhanced Goals Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="zen-card border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1 font-medium">Total Dream Vision</p>
                  <p className="text-3xl font-serif font-semibold text-primary">₹{totalGoalAmount.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground mt-1">Infinite Possibilities</p>
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
                  <p className="text-sm text-muted-foreground mb-1 font-medium">Manifested Wealth</p>
                  <p className="text-3xl font-serif font-semibold text-accent">₹{totalSaved.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground mt-1">Dreams Taking Form</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="p-3 rounded-2xl bg-accent/20">
                    <TrendingUp className="h-6 w-6 text-accent" />
                  </div>
                  <span className="text-2xl">✨</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="zen-card border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1 font-medium">Monthly Flow</p>
                  <p className="text-3xl font-serif font-semibold text-primary">₹{totalMonthlyContribution.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground mt-1">Consistent Intention</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="p-3 rounded-2xl bg-primary/10">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-2xl">🌊</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Goals Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {goals.map((goal) => {
            const Icon = goal.icon;
            const monthsRemaining = calculateMonthsRemaining(goal.deadline);
            
            return (
              <Card key={goal.id} className={`zen-card hover:shadow-2xl transition-all duration-500 border-l-4 ${getPriorityColor(goal.priority)} group`}>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-4 rounded-3xl bg-primary/10 group-hover:bg-primary/20 transition-all duration-300">
                        <div className="flex items-center space-x-2">
                          <Icon className="h-7 w-7 text-primary" />
                          <span className="text-xl">{goal.accent}</span>
                        </div>
                      </div>
                      <div>
                        <CardTitle className="text-xl font-serif text-foreground">{goal.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {monthsRemaining >= 0 ? `${monthsRemaining} moons remaining` : 'Manifestation time has passed'}
                        </p>
                      </div>
                    </div>
                    {getStatusBadge(goal.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground font-medium">Dream Progress</span>
                      <span className="font-semibold text-foreground">
                        ₹{goal.currentAmount.toLocaleString()} / ₹{goal.targetAmount.toLocaleString()}
                      </span>
                    </div>
                    <Progress 
                      value={goal.percentage} 
                      className={`h-4 rounded-full ${goal.status === 'manifested' ? '[&>div]:bg-primary' : '[&>div]:bg-gradient-to-r [&>div]:from-primary [&>div]:to-accent'}`}
                    />
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-primary">
                        {goal.percentage.toFixed(1)}% manifested
                      </span>
                      <span className="text-muted-foreground">
                        ₹{(goal.targetAmount - goal.currentAmount).toLocaleString()} to complete
                      </span>
                    </div>
                  </div>
                  
                  {/* Wisdom Section */}
                  <div className="p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl">
                    <div className="flex items-center space-x-2 mb-2">
                      <Leaf className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium text-foreground">Dream Wisdom</span>
                    </div>
                    <p className="text-sm text-muted-foreground italic">{goal.wisdom}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6 pt-2 border-t border-border/30">
                    <div>
                      <p className="text-xs text-muted-foreground font-medium">Monthly Intention</p>
                      <p className="font-semibold text-foreground">₹{goal.monthlyContribution.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium">Manifestation Date</p>
                      <p className="font-semibold text-foreground">{new Date(goal.deadline).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-2">
                    <Button variant="outline" size="sm" className="zen-button border-primary/30 hover:border-primary/60 text-primary flex-1 mr-3">
                      Nurture Dream
                      <Sparkles className="h-3 w-3 ml-2" />
                    </Button>
                    <Button variant="ghost" size="sm" className="zen-button text-muted-foreground hover:text-foreground">
                      Explore
                      <ArrowRight className="h-3 w-3 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Enhanced Goal Insights */}
        <Card className="zen-card border-primary/20 bg-gradient-to-br from-primary/5 via-secondary/10 to-accent/5">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3 text-foreground">
              <div className="p-2 rounded-xl bg-primary/20">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <span className="font-serif">Dream Manifestation Insights</span>
              <span className="text-lg">🌟</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="zen-card p-6 bg-background/60 backdrop-blur-sm">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-2xl bg-primary/10">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span className="text-lg">💍</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-serif font-medium text-foreground mb-2">Love Celebration Complete!</h4>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      Congratulations! Your love celebration fund has fully manifested. Time to celebrate this beautiful achievement.
                    </p>
                    <Button variant="outline" size="sm" className="zen-button border-primary/30 hover:border-primary/60 text-primary">
                      Celebrate Love
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="zen-card p-6 bg-background/60 backdrop-blur-sm">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-2xl bg-primary/10">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      <span className="text-lg">🎓</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-serif font-medium text-foreground mb-2">Wisdom Investment Flourishing</h4>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      You're 15% ahead of schedule on your wisdom fund. Knowledge truly compounds like interest.
                    </p>
                    <Button variant="outline" size="sm" className="zen-button border-primary/30 hover:border-primary/60 text-primary">
                      Expand Wisdom
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="zen-card p-6 bg-background/60 backdrop-blur-sm">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-2xl bg-accent/10">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-accent" />
                      <span className="text-lg">🚗</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-serif font-medium text-foreground mb-2">Transport Dream Needs Attention</h4>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      Consider increasing monthly contribution by ₹5,000 to keep your transport dream on track.
                    </p>
                    <Button variant="outline" size="sm" className="zen-button border-accent/30 hover:border-accent/60 text-accent">
                      Accelerate Flow
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="zen-card p-6 bg-background/60 backdrop-blur-sm">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-2xl bg-primary/10">
                    <div className="flex items-center space-x-2">
                      <Target className="h-5 w-5 text-primary" />
                      <span className="text-lg">🦋</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-serif font-medium text-foreground mb-2">New Dream Suggestion</h4>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      Based on your beautiful progress, consider manifesting a 'Creative Expression' fund for your artistic soul.
                    </p>
                    <Button variant="outline" size="sm" className="zen-button border-primary/30 hover:border-primary/60 text-primary">
                      Plant New Seed
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