import React, { useState, useEffect } from 'react';
import DashboardLayout from './DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Users, 
  Target, 
  Trophy,
  TrendingUp,
  Share2,
  MessageCircle,
  Heart,
  UserPlus,
  Calendar,
  Crown,
  Star,
  Gift,
  Zap,
  Send,
  Plus,
  ChevronRight,
  Award,
  Flame
} from 'lucide-react';

interface CommunityProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Community({ isDarkMode, toggleDarkMode }: CommunityProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [newChallengeTitle, setNewChallengeTitle] = useState('');

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const groupChallenges = [
    {
      id: 1,
      title: 'January Savings Sprint',
      description: 'Save ₹25,000 collectively this month',
      creator: 'Sarah Chen',
      participants: 12,
      maxParticipants: 15,
      currentAmount: 187500,
      targetAmount: 300000,
      progress: 62.5,
      daysLeft: 8,
      reward: '₹500 bonus each + Savings Champion badge',
      category: 'Savings',
      difficulty: 'Medium',
      isJoined: true,
      topContributors: [
        { name: 'Alex J', amount: 28000, avatar: 'AJ' },
        { name: 'Maria S', amount: 25500, avatar: 'MS' },
        { name: 'John D', amount: 23000, avatar: 'JD' }
      ]
    },
    {
      id: 2,
      title: 'No-Spend Weekend Warriors',
      description: 'Avoid unnecessary expenses this weekend',
      creator: 'Mike Johnson',
      participants: 8,
      maxParticipants: 10,
      currentAmount: 0,
      targetAmount: 8,
      progress: 0,
      daysLeft: 2,
      reward: '₹200 bonus + Weekend Warrior badge',
      category: 'Budgeting',
      difficulty: 'Easy',
      isJoined: false,
      topContributors: []
    },
    {
      id: 3,
      title: 'Investment Diversity Challenge',
      description: 'Diversify portfolios across 3 asset classes',
      creator: 'Emma Davis',
      participants: 6,
      maxParticipants: 12,
      currentAmount: 4,
      targetAmount: 18,
      progress: 22.2,
      daysLeft: 15,
      reward: '₹1000 bonus + Diversifier badge',
      category: 'Investment',
      difficulty: 'Hard',
      isJoined: true,
      topContributors: [
        { name: 'Lisa W', amount: 3, avatar: 'LW' },
        { name: 'David K', amount: 2, avatar: 'DK' }
      ]
    }
  ];

  const communityFeed = [
    {
      id: 1,
      user: {
        name: 'Sarah Chen',
        avatar: 'SC',
        level: 'Gold Member',
        streak: 28
      },
      type: 'achievement',
      content: 'Just completed my 6-month emergency fund! 🎉',
      timestamp: '2 hours ago',
      likes: 24,
      comments: 8,
      isLiked: false,
      badge: 'Emergency Fund Master'
    },
    {
      id: 2,
      user: {
        name: 'Alex Johnson',
        avatar: 'AJ',
        level: 'Silver Member',
        streak: 15
      },
      type: 'tip',
      content: 'Pro tip: Use the 50/30/20 rule - 50% needs, 30% wants, 20% savings. Game changer for my budget! 💡',
      timestamp: '4 hours ago',
      likes: 18,
      comments: 5,
      isLiked: true,
      badge: null
    },
    {
      id: 3,
      user: {
        name: 'Maria Silva',
        avatar: 'MS',
        level: 'Platinum Member',
        streak: 42
      },
      type: 'challenge',
      content: 'Created a new challenge: "Healthy Meal Prep Savings" - save money while eating better! Who\'s in?',
      timestamp: '6 hours ago',
      likes: 31,
      comments: 12,
      isLiked: false,
      badge: 'Challenge Creator'
    }
  ];

  const leaderboard = [
    { rank: 1, name: 'Sarah Chen', points: 4521, badge: 'Platinum', contributions: 85, avatar: 'SC' },
    { rank: 2, name: 'Marcus Silva', points: 4102, badge: 'Gold', contributions: 72, avatar: 'MS' },
    { rank: 3, name: 'Alex Johnson', points: 2847, badge: 'Silver', contributions: 58, avatar: 'AJ', isCurrentUser: true },
    { rank: 4, name: 'Emma Davis', points: 2654, badge: 'Silver', contributions: 51, avatar: 'ED' },
    { rank: 5, name: 'Lisa Wang', points: 2341, badge: 'Bronze', contributions: 43, avatar: 'LW' }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'Monthly Budget Planning Workshop',
      date: '2025-01-28',
      time: '7:00 PM IST',
      attendees: 47,
      maxAttendees: 50,
      type: 'Workshop',
      host: 'Financial Expert Team'
    },
    {
      id: 2,
      title: 'Investment Strategy Webinar',
      date: '2025-02-05',
      time: '6:30 PM IST',
      attendees: 23,
      maxAttendees: 100,
      type: 'Webinar',
      host: 'Investment Specialist'
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Savings': return 'badge-success';
      case 'Investment': return 'badge-primary';
      case 'Budgeting': return 'badge-warning';
      default: return 'badge-neutral';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'Medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'Hard': return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Platinum': return 'text-purple-600 bg-purple-100 dark:bg-purple-900/20';
      case 'Gold': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'Silver': return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
      case 'Bronze': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  return (
    <DashboardLayout isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}>
      <div className="space-y-8">
        {/* Header */}
        <div className={`slide-up ${isLoaded ? 'animate' : ''} flex items-center justify-between`}>
          <div>
            <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Community Hub</h1>
            <p className="text-muted-foreground">Connect, challenge, and grow together on your financial journey</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-heading font-bold text-primary">2.4k</div>
              <div className="text-xs text-muted-foreground">Members</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-heading font-bold text-emerald-600">15</div>
              <div className="text-xs text-muted-foreground">Challenges</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-heading font-bold text-purple-600">#3</div>
              <div className="text-xs text-muted-foreground">Your Rank</div>
            </div>
          </div>
        </div>

        {/* Community Stats */}
        <div className={`slide-up ${isLoaded ? 'animate' : ''} grid grid-cols-1 md:grid-cols-4 gap-6`} style={{ animationDelay: '100ms' }}>
          <Card className="clean-card text-center p-6 bg-gradient-to-br from-blue-500/10 to-indigo-500/10">
            <Users className="h-8 w-8 text-blue-500 mx-auto mb-3" />
            <div className="text-2xl font-heading font-bold text-foreground mb-1">3</div>
            <div className="text-sm text-muted-foreground">Active Challenges</div>
          </Card>
          <Card className="clean-card text-center p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10">
            <Trophy className="h-8 w-8 text-green-500 mx-auto mb-3" />
            <div className="text-2xl font-heading font-bold text-foreground mb-1">2847</div>
            <div className="text-sm text-muted-foreground">Community Points</div>
          </Card>
          <Card className="clean-card text-center p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10">
            <Award className="h-8 w-8 text-purple-500 mx-auto mb-3" />
            <div className="text-2xl font-heading font-bold text-foreground mb-1">7</div>
            <div className="text-sm text-muted-foreground">Achievements</div>
          </Card>
          <Card className="clean-card text-center p-6 bg-gradient-to-br from-orange-500/10 to-red-500/10">
            <Flame className="h-8 w-8 text-orange-500 mx-auto mb-3" />
            <div className="text-2xl font-heading font-bold text-foreground mb-1">58</div>
            <div className="text-sm text-muted-foreground">Contributions</div>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="challenges" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="challenges">Group Challenges</TabsTrigger>
            <TabsTrigger value="feed">Community Feed</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
          </TabsList>

          {/* Group Challenges Tab */}
          <TabsContent value="challenges" className="space-y-6">
            {/* Create Challenge Section */}
            <Card className="clean-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600">
                    <Plus className="h-6 w-6 text-white" />
                  </div>
                  <span>Create New Challenge</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  <Input
                    placeholder="Enter challenge title..."
                    value={newChallengeTitle}
                    onChange={(e) => setNewChallengeTitle(e.target.value)}
                    className="flex-1 input-clean"
                  />
                  <Button className="btn-primary">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Challenge
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Active Challenges */}
            <div className="space-y-6">
              {groupChallenges.map((challenge, index) => (
                <Card key={challenge.id} className="clean-card hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-heading font-semibold">{challenge.title}</h3>
                          <Badge className={getCategoryColor(challenge.category)}>
                            {challenge.category}
                          </Badge>
                          <Badge className={`${getDifficultyColor(challenge.difficulty)} text-xs`}>
                            {challenge.difficulty}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mb-3">{challenge.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>Created by {challenge.creator}</span>
                          <span>•</span>
                          <span>{challenge.participants}/{challenge.maxParticipants} participants</span>
                          <span>•</span>
                          <span>{challenge.daysLeft} days left</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <Button 
                          size="sm" 
                          variant={challenge.isJoined ? "secondary" : "default"}
                          className={challenge.isJoined ? 'btn-secondary' : 'btn-primary'}
                        >
                          {challenge.isJoined ? 'Joined' : 'Join Challenge'}
                          <UserPlus className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">{challenge.progress.toFixed(1)}%</span>
                        </div>
                        <Progress value={challenge.progress} className="h-3" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          {challenge.category === 'Savings' ? (
                            <span>₹{challenge.currentAmount.toLocaleString()} / ₹{challenge.targetAmount.toLocaleString()}</span>
                          ) : (
                            <span>{challenge.currentAmount} / {challenge.targetAmount} completed</span>
                          )}
                          <span>{challenge.participants} participants</span>
                        </div>
                      </div>

                      {/* Top Contributors */}
                      {challenge.topContributors.length > 0 && (
                        <div className="border-t border-border pt-4">
                          <h4 className="text-sm font-medium text-foreground mb-3">Top Contributors</h4>
                          <div className="flex space-x-4">
                            {challenge.topContributors.map((contributor, idx) => (
                              <div key={idx} className="flex items-center space-x-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">
                                    {contributor.avatar}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="text-xs font-medium">{contributor.name}</div>
                                  <div className="text-xs text-muted-foreground">
                                    {challenge.category === 'Savings' ? 
                                      `₹${contributor.amount.toLocaleString()}` : 
                                      `${contributor.amount} items`
                                    }
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <div>
                          <div className="text-sm font-medium text-foreground">Reward:</div>
                          <div className="text-sm text-primary">{challenge.reward}</div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Share2 className="h-4 w-4 mr-2" />
                            Share
                          </Button>
                          <Button variant="outline" size="sm">
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Discuss
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Community Feed Tab */}
          <TabsContent value="feed" className="space-y-6">
            <div className="space-y-6">
              {communityFeed.map((post) => (
                <Card key={post.id} className="clean-card hover:shadow-md transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-primary text-primary-foreground font-bold">
                          {post.user.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-heading font-semibold">{post.user.name}</h4>
                          <Badge className={`${getBadgeColor(post.user.level)} text-xs`}>
                            {post.user.level}
                          </Badge>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Flame className="h-3 w-3 mr-1 text-orange-500" />
                            {post.user.streak} day streak
                          </div>
                          {post.badge && (
                            <Badge className="badge-success text-xs">
                              {post.badge}
                            </Badge>
                          )}
                        </div>
                        
                        <p className="text-foreground mb-3 leading-relaxed">{post.content}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span>{post.timestamp}</span>
                          </div>
                          <div className="flex items-center space-x-4">
                            <button 
                              className={`flex items-center space-x-1 text-sm ${
                                post.isLiked ? 'text-red-500' : 'text-muted-foreground hover:text-red-500'
                              } transition-colors`}
                            >
                              <Heart className={`h-4 w-4 ${post.isLiked ? 'fill-current' : ''}`} />
                              <span>{post.likes}</span>
                            </button>
                            <button className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-primary transition-colors">
                              <MessageCircle className="h-4 w-4" />
                              <span>{post.comments}</span>
                            </button>
                            <button className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-primary transition-colors">
                              <Share2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Leaderboard Tab */}
          <TabsContent value="leaderboard" className="space-y-6">
            <Card className="clean-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500">
                    <Trophy className="h-6 w-6 text-white" />
                  </div>
                  <span>Community Leaderboard</span>
                  <Badge className="badge-primary">This Month</Badge>
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
                            <span>{user.contributions} contributions</span>
                            <Badge className={`${getBadgeColor(user.badge)} text-xs`}>
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
              </CardContent>
            </Card>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="clean-card hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-heading font-semibold mb-2">{event.title}</h3>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2" />
                            <span>{event.date} at {event.time}</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-2" />
                            <span>{event.attendees}/{event.maxAttendees} attendees</span>
                          </div>
                          <div>Host: {event.host}</div>
                        </div>
                      </div>
                      <Badge className="badge-primary">
                        {event.type}
                      </Badge>
                    </div>
                    
                    <div className="space-y-3">
                      <Progress value={(event.attendees / event.maxAttendees) * 100} className="h-2" />
                      <Button size="sm" className="w-full btn-outline">
                        Register Now
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}