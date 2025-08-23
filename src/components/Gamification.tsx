import React, { useState, useEffect } from 'react';
import DashboardLayout from './DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  Trophy, 
  Target, 
  Flame, 
  Star,
  Award,
  TrendingUp,
  Zap,
  Heart,
  Shield,
  Crown,
  Medal,
  Gift,
  Users,
  Calendar,
  CheckCircle,
  Lock,
  Sparkles,
  BarChart3
} from 'lucide-react';

interface GamificationProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Gamification({ isDarkMode, toggleDarkMode }: GamificationProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(15);
  const [totalPoints, setTotalPoints] = useState(2847);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const badges = [
    {
      id: 1,
      name: 'Budget Master',
      description: 'Stayed within budget for 3 consecutive months',
      icon: Target,
      earned: true,
      rarity: 'epic',
      points: 500,
      gradient: 'from-purple-500 to-pink-600',
      earnedDate: '2025-01-10'
    },
    {
      id: 2,
      name: 'Savings Superstar',
      description: 'Saved over ₹50,000 in a single month',
      icon: Star,
      earned: true,
      rarity: 'rare',
      points: 300,
      gradient: 'from-blue-500 to-cyan-500',
      earnedDate: '2025-01-05'
    },
    {
      id: 3,
      name: 'Investment Explorer',
      description: 'Made your first investment',
      icon: TrendingUp,
      earned: true,
      rarity: 'common',
      points: 100,
      gradient: 'from-green-500 to-emerald-500',
      earnedDate: '2024-12-20'
    },
    {
      id: 4,
      name: 'Streak Legend',
      description: 'Maintained financial goals for 30+ days',
      icon: Flame,
      earned: false,
      rarity: 'legendary',
      points: 1000,
      gradient: 'from-orange-500 to-red-500',
      progress: 50
    },
    {
      id: 5,
      name: 'AI Whisperer',
      description: 'Completed 100 AI-powered financial optimizations',
      icon: Zap,
      earned: false,
      rarity: 'epic',
      points: 750,
      gradient: 'from-indigo-500 to-purple-500',
      progress: 73
    },
    {
      id: 6,
      name: 'Community Champion',
      description: 'Helped 10 friends achieve their financial goals',
      icon: Heart,
      earned: false,
      rarity: 'rare',
      points: 400,
      gradient: 'from-pink-500 to-rose-500',
      progress: 20
    }
  ];

  const challenges = [
    {
      id: 1,
      title: 'January Savings Sprint',
      description: 'Save ₹25,000 this month and earn bonus rewards',
      type: 'monthly',
      progress: 68,
      target: 25000,
      current: 17000,
      reward: '500 points + Savings Champion badge',
      deadline: '2025-01-31',
      participants: 1247,
      status: 'active'
    },
    {
      id: 2,
      title: 'No-Spend Weekend',
      description: 'Avoid unnecessary expenses this weekend',
      type: 'weekend',
      progress: 0,
      target: 1,
      current: 0,
      reward: '100 points + Weekend Warrior badge',
      deadline: '2025-01-26',
      participants: 892,
      status: 'upcoming'
    },
    {
      id: 3,
      title: 'Investment Diversity Challenge',
      description: 'Diversify your portfolio with 3 different asset classes',
      type: 'investment',
      progress: 33,
      target: 3,
      current: 1,
      reward: '300 points + Diversifier badge',
      deadline: '2025-02-15',
      participants: 456,
      status: 'active'
    }
  ];

  const leaderboard = [
    { rank: 1, name: 'Sarah Chen', points: 4521, avatar: 'SC', streak: 28, badge: 'legendary' },
    { rank: 2, name: 'Marcus Silva', points: 4102, avatar: 'MS', streak: 22, badge: 'epic' },
    { rank: 3, name: 'You', points: 2847, avatar: 'AJ', streak: 15, badge: 'rare', isCurrentUser: true },
    { rank: 4, name: 'Emma Davis', points: 2654, avatar: 'ED', streak: 18, badge: 'rare' },
    { rank: 5, name: 'Alex Kumar', points: 2341, avatar: 'AK', streak: 12, badge: 'common' },
    { rank: 6, name: 'Lisa Wang', points: 2198, avatar: 'LW', streak: 9, badge: 'common' },
  ];

  const streakRewards = [
    { day: 7, reward: '50 points', unlocked: true },
    { day: 15, reward: 'Consistency Badge', unlocked: true },
    { day: 30, reward: '500 points + Streak Master', unlocked: false, current: true },
    { day: 60, reward: 'Premium Feature Unlock', unlocked: false },
    { day: 100, reward: 'Legendary Status', unlocked: false }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'text-orange-500 bg-orange-100 dark:bg-orange-900/20';
      case 'epic': return 'text-purple-500 bg-purple-100 dark:bg-purple-900/20';
      case 'rare': return 'text-blue-500 bg-blue-100 dark:bg-blue-900/20';
      default: return 'text-gray-500 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return Crown;
      case 'epic': return Medal;
      case 'rare': return Award;
      default: return Trophy;
    }
  };

  return (
    <DashboardLayout isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}>
      <div className="space-y-8">
        {/* Gamification Header */}
        <div className={`slide-up ${isLoaded ? 'animate' : ''} flex items-center justify-between`}>
          <div>
            <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Financial Gaming Hub</h1>
            <p className="text-muted-foreground">Level up your finances through achievements and challenges</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-heading font-bold text-primary">{totalPoints.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Total Points</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-heading font-bold text-orange-500 flex items-center">
                <Flame className="h-6 w-6 mr-1" />
                {currentStreak}
              </div>
              <div className="text-xs text-muted-foreground">Day Streak</div>
            </div>
          </div>
        </div>

        {/* Achievement Overview */}
        <div className={`slide-up ${isLoaded ? 'animate' : ''} grid grid-cols-1 md:grid-cols-4 gap-6`} style={{ animationDelay: '100ms' }}>
          <Card className="clean-card text-center p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10">
            <Trophy className="h-8 w-8 text-purple-500 mx-auto mb-3" />
            <div className="text-2xl font-heading font-bold text-foreground mb-1">12</div>
            <div className="text-sm text-muted-foreground">Badges Earned</div>
          </Card>
          <Card className="clean-card text-center p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
            <Target className="h-8 w-8 text-blue-500 mx-auto mb-3" />
            <div className="text-2xl font-heading font-bold text-foreground mb-1">3</div>
            <div className="text-sm text-muted-foreground">Active Challenges</div>
          </Card>
          <Card className="clean-card text-center p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10">
            <Users className="h-8 w-8 text-green-500 mx-auto mb-3" />
            <div className="text-2xl font-heading font-bold text-foreground mb-1">#3</div>
            <div className="text-sm text-muted-foreground">Global Rank</div>
          </Card>
          <Card className="clean-card text-center p-6 bg-gradient-to-br from-orange-500/10 to-red-500/10">
            <Flame className="h-8 w-8 text-orange-500 mx-auto mb-3" />
            <div className="text-2xl font-heading font-bold text-foreground mb-1">{currentStreak}</div>
            <div className="text-sm text-muted-foreground">Day Streak</div>
          </Card>
        </div>

        {/* Main Gamification Tabs */}
        <Tabs defaultValue="badges" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="badges">Badges & Achievements</TabsTrigger>
            <TabsTrigger value="challenges">Challenges</TabsTrigger>
            <TabsTrigger value="streaks">Streaks & Rewards</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          </TabsList>

          {/* Badges Tab */}
          <TabsContent value="badges" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {badges.map((badge, index) => {
                const Icon = badge.icon;
                const RarityIcon = getRarityIcon(badge.rarity);
                
                return (
                  <Card 
                    key={badge.id} 
                    className={`clean-card hover:shadow-lg transition-all duration-300 relative overflow-hidden ${
                      badge.earned ? '' : 'opacity-60'
                    }`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${badge.gradient} opacity-5`}></div>
                    <CardContent className="p-6 relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-4 rounded-3xl bg-gradient-to-br ${badge.gradient} shadow-lg`}>
                          <Icon className="h-8 w-8 text-white" />
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <Badge className={`${getRarityColor(badge.rarity)} text-xs`}>
                            <RarityIcon className="h-3 w-3 mr-1" />
                            {badge.rarity}
                          </Badge>
                          {badge.earned ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <Lock className="h-5 w-5 text-muted-foreground" />
                          )}
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-heading font-semibold mb-2">{badge.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{badge.description}</p>
                      
                      {badge.earned ? (
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-primary">+{badge.points} points</span>
                          <span className="text-xs text-muted-foreground">{badge.earnedDate}</span>
                        </div>
                      ) : badge.progress ? (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-medium">{badge.progress}%</span>
                          </div>
                          <Progress value={badge.progress} className="h-2" />
                        </div>
                      ) : (
                        <div className="text-center py-2">
                          <Lock className="h-6 w-6 text-muted-foreground mx-auto" />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Challenges Tab */}
          <TabsContent value="challenges" className="space-y-6">
            {challenges.map((challenge, index) => (
              <Card key={challenge.id} className="clean-card hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-heading font-semibold">{challenge.title}</h3>
                        <Badge className={
                          challenge.status === 'active' ? 'badge-success' :
                          challenge.status === 'upcoming' ? 'badge-warning' : 'badge-neutral'
                        }>
                          {challenge.status}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-4">{challenge.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Ends</div>
                      <div className="font-medium">{challenge.deadline}</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{challenge.progress}%</span>
                      </div>
                      <Progress value={challenge.progress} className="h-3" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>₹{challenge.current.toLocaleString()} / ₹{challenge.target.toLocaleString()}</span>
                        <span>{challenge.participants} participants</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div>
                        <div className="text-sm font-medium text-foreground">Reward:</div>
                        <div className="text-sm text-primary">{challenge.reward}</div>
                      </div>
                      <Button 
                        size="sm" 
                        disabled={challenge.status !== 'active'}
                        className={challenge.status === 'active' ? 'btn-primary' : ''}
                      >
                        {challenge.status === 'active' ? 'Join Challenge' : 'Coming Soon'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Streaks Tab */}
          <TabsContent value="streaks" className="space-y-6">
            <Card className="clean-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-orange-500 to-red-500">
                    <Flame className="h-6 w-6 text-white" />
                  </div>
                  <span>Current Streak: {currentStreak} Days</span>
                  <Badge className="badge-warning">🔥 On Fire!</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    {streakRewards.map((reward, index) => (
                      <Card 
                        key={index} 
                        className={`clean-card-subtle p-4 text-center relative ${
                          reward.unlocked ? 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800' :
                          reward.current ? 'bg-orange-50 dark:bg-orange-900/10 border-orange-200 dark:border-orange-800' :
                          'opacity-60'
                        }`}
                      >
                        {reward.unlocked && (
                          <CheckCircle className="absolute top-2 right-2 h-4 w-4 text-green-500" />
                        )}
                        {reward.current && (
                          <Target className="absolute top-2 right-2 h-4 w-4 text-orange-500" />
                        )}
                        
                        <div className="text-2xl font-heading font-bold mb-2">{reward.day}</div>
                        <div className="text-xs text-muted-foreground mb-2">Days</div>
                        <div className="text-sm font-medium">{reward.reward}</div>
                      </Card>
                    ))}
                  </div>

                  <div className="text-center py-6">
                    <p className="text-muted-foreground mb-4">
                      Keep your streak alive! Complete daily financial goals to earn rewards.
                    </p>
                    <Button className="btn-primary">
                      <Calendar className="h-4 w-4 mr-2" />
                      View Today's Goals
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Leaderboard Tab */}
          <TabsContent value="leaderboard" className="space-y-6">
            <Card className="clean-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500">
                    <Trophy className="h-6 w-6 text-white" />
                  </div>
                  <span>Global Leaderboard</span>
                  <Badge className="badge-primary">Updated Live</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaderboard.map((user, index) => (
                    <div 
                      key={index} 
                      className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-200 ${
                        user.isCurrentUser 
                          ? 'bg-primary/10 border-primary/30 shadow-md' 
                          : 'border-border hover:bg-accent/50'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-3">
                          {user.rank <= 3 ? (
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                              user.rank === 1 ? 'bg-yellow-500' :
                              user.rank === 2 ? 'bg-gray-400' :
                              'bg-orange-600'
                            }`}>
                              {user.rank}
                            </div>
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-bold">
                              {user.rank}
                            </div>
                          )}
                          
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={`/api/placeholder/40/40`} />
                            <AvatarFallback className="bg-primary text-primary-foreground font-bold">
                              {user.avatar}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                        
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{user.name}</span>
                            {user.isCurrentUser && <Badge className="badge-primary text-xs">You</Badge>}
                          </div>
                          <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                            <span className="flex items-center">
                              <Flame className="h-3 w-3 mr-1 text-orange-500" />
                              {user.streak} day streak
                            </span>
                            <Badge className={`${getRarityColor(user.badge)} text-xs`}>
                              {user.badge}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-lg font-heading font-bold text-primary">
                          {user.points.toLocaleString()}
                        </div>
                        <div className="text-xs text-muted-foreground">points</div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="text-center pt-6">
                  <Button variant="outline" className="btn-outline">
                    <Users className="h-4 w-4 mr-2" />
                    View Full Leaderboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}