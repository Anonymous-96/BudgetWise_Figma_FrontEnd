import React, { useState, useEffect } from 'react';
import DashboardLayout from './DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { 
  BookOpen, 
  Brain, 
  PlayCircle,
  Clock,
  Star,
  Trophy,
  Target,
  Lightbulb,
  TrendingUp,
  Shield,
  PiggyBank,
  Calculator,
  Search,
  Filter,
  CheckCircle,
  Play,
  Users,
  Calendar,
  Award,
  Zap
} from 'lucide-react';

interface LearningHubProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export default function LearningHub({ isDarkMode, toggleDarkMode }: LearningHubProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentQuiz, setCurrentQuiz] = useState(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const learningPaths = [
    {
      id: 1,
      title: 'Financial Fundamentals',
      description: 'Master the basics of personal finance and money management',
      level: 'Beginner',
      duration: '4 weeks',
      modules: 8,
      completed: 3,
      rating: 4.8,
      students: 1247,
      icon: BookOpen,
      gradient: 'from-blue-500 to-indigo-600',
      topics: ['Budgeting', 'Emergency Fund', 'Debt Management', 'Basic Investing']
    },
    {
      id: 2,
      title: 'Investment Mastery',
      description: 'Learn advanced investment strategies and portfolio management',
      level: 'Intermediate',
      duration: '6 weeks',
      modules: 12,
      completed: 0,
      rating: 4.9,
      students: 892,
      icon: TrendingUp,
      gradient: 'from-green-500 to-emerald-600',
      topics: ['Stock Market', 'Mutual Funds', 'Portfolio Diversification', 'Risk Management']
    },
    {
      id: 3,
      title: 'Tax Optimization',
      description: 'Maximize your savings through smart tax planning strategies',
      level: 'Advanced',
      duration: '3 weeks',
      modules: 6,
      completed: 0,
      rating: 4.7,
      students: 456,
      icon: Calculator,
      gradient: 'from-purple-500 to-pink-600',
      topics: ['Tax Planning', '80C Deductions', 'ELSS', 'Capital Gains']
    }
  ];

  const articles = [
    {
      id: 1,
      title: '10 Ways to Build an Emergency Fund Fast',
      category: 'Savings',
      readTime: '5 min',
      difficulty: 'Beginner',
      author: 'Financial Expert',
      publishDate: '2025-01-20',
      summary: 'Practical strategies to build your emergency fund quickly and efficiently',
      image: '💰'
    },
    {
      id: 2,
      title: 'Understanding SIP Investment Strategy',
      category: 'Investment',
      readTime: '8 min',
      difficulty: 'Intermediate',
      author: 'Investment Advisor',
      publishDate: '2025-01-18',
      summary: 'Complete guide to Systematic Investment Plans and their benefits',
      image: '📈'
    },
    {
      id: 3,
      title: 'Credit Score Improvement Guide',
      category: 'Credit',
      readTime: '6 min',
      difficulty: 'Beginner',
      author: 'Credit Specialist',
      publishDate: '2025-01-15',
      summary: 'Step-by-step process to improve your credit score effectively',
      image: '🏦'
    },
    {
      id: 4,
      title: 'Retirement Planning in Your 30s',
      category: 'Planning',
      readTime: '10 min',
      difficulty: 'Intermediate',
      author: 'Retirement Expert',
      publishDate: '2025-01-12',
      summary: 'Essential strategies for building wealth for retirement',
      image: '🏖️'
    }
  ];

  const quizzes = [
    {
      id: 1,
      title: 'Budgeting Basics Quiz',
      description: 'Test your knowledge of fundamental budgeting concepts',
      questions: 10,
      duration: '5 min',
      difficulty: 'Beginner',
      attempts: 1247,
      averageScore: 78,
      category: 'Budgeting'
    },
    {
      id: 2,
      title: 'Investment Risk Assessment',
      description: 'Evaluate your understanding of investment risks and returns',
      questions: 15,
      duration: '8 min',
      difficulty: 'Intermediate',
      attempts: 892,
      averageScore: 72,
      category: 'Investment'
    },
    {
      id: 3,
      title: 'Tax Saving Strategies',
      description: 'Check your knowledge of tax-saving instruments and strategies',
      questions: 12,
      duration: '6 min',
      difficulty: 'Advanced',
      attempts: 456,
      averageScore: 68,
      category: 'Tax Planning'
    }
  ];

  const weeklyTips = [
    {
      id: 1,
      title: 'Automate Your Savings',
      description: 'Set up automatic transfers to build wealth without thinking about it',
      category: 'Savings',
      impact: 'High',
      difficulty: 'Easy',
      icon: PiggyBank
    },
    {
      id: 2,
      title: 'Review Subscriptions Monthly',
      description: 'Cancel unused subscriptions to free up money for investments',
      category: 'Budgeting',
      impact: 'Medium',
      difficulty: 'Easy',
      icon: Calculator
    },
    {
      id: 3,
      title: 'Diversify Your Portfolio',
      description: 'Spread investments across different asset classes to reduce risk',
      category: 'Investment',
      impact: 'High',
      difficulty: 'Medium',
      icon: TrendingUp
    },
    {
      id: 4,
      title: 'Build Credit History',
      description: 'Use credit cards responsibly to build a strong credit profile',
      category: 'Credit',
      impact: 'High',
      difficulty: 'Medium',
      icon: Shield
    }
  ];

  const achievements = [
    { name: 'First Course Completed', icon: Trophy, earned: true },
    { name: 'Quiz Master', icon: Brain, earned: true },
    { name: 'Article Reader', icon: BookOpen, earned: false },
    { name: 'Learning Streak', icon: Zap, earned: false }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'badge-success';
      case 'Intermediate': return 'badge-warning';
      case 'Advanced': return 'badge-error';
      default: return 'badge-neutral';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'Medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'Low': return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  return (
    <DashboardLayout isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}>
      <div className="space-y-8">
        {/* Header */}
        <div className={`slide-up ${isLoaded ? 'animate' : ''} flex items-center justify-between`}>
          <div>
            <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Learning Hub</h1>
            <p className="text-muted-foreground">Master personal finance with expert-crafted content and interactive learning</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-heading font-bold text-primary">3</div>
              <div className="text-xs text-muted-foreground">Courses</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-heading font-bold text-emerald-600">12</div>
              <div className="text-xs text-muted-foreground">Articles Read</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-heading font-bold text-purple-600">8</div>
              <div className="text-xs text-muted-foreground">Quizzes Taken</div>
            </div>
          </div>
        </div>

        {/* Learning Progress Overview */}
        <div className={`slide-up ${isLoaded ? 'animate' : ''} grid grid-cols-1 md:grid-cols-4 gap-6`} style={{ animationDelay: '100ms' }}>
          <Card className="clean-card text-center p-6 bg-gradient-to-br from-blue-500/10 to-indigo-500/10">
            <BookOpen className="h-8 w-8 text-blue-500 mx-auto mb-3" />
            <div className="text-2xl font-heading font-bold text-foreground mb-1">37.5%</div>
            <div className="text-sm text-muted-foreground">Learning Progress</div>
          </Card>
          <Card className="clean-card text-center p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10">
            <Trophy className="h-8 w-8 text-green-500 mx-auto mb-3" />
            <div className="text-2xl font-heading font-bold text-foreground mb-1">5</div>
            <div className="text-sm text-muted-foreground">Achievements</div>
          </Card>
          <Card className="clean-card text-center p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10">
            <Brain className="h-8 w-8 text-purple-500 mx-auto mb-3" />
            <div className="text-2xl font-heading font-bold text-foreground mb-1">82%</div>
            <div className="text-sm text-muted-foreground">Quiz Average</div>
          </Card>
          <Card className="clean-card text-center p-6 bg-gradient-to-br from-orange-500/10 to-red-500/10">
            <Zap className="h-8 w-8 text-orange-500 mx-auto mb-3" />
            <div className="text-2xl font-heading font-bold text-foreground mb-1">7</div>
            <div className="text-sm text-muted-foreground">Day Streak</div>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="courses" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="courses">Learning Paths</TabsTrigger>
            <TabsTrigger value="articles">Articles & Blogs</TabsTrigger>
            <TabsTrigger value="quizzes">Interactive Quizzes</TabsTrigger>
            <TabsTrigger value="tips">Weekly Tips</TabsTrigger>
          </TabsList>

          {/* Learning Paths Tab */}
          <TabsContent value="courses" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {learningPaths.map((path, index) => {
                const Icon = path.icon;
                const progress = (path.completed / path.modules) * 100;
                
                return (
                  <Card key={path.id} className="clean-card hover:shadow-lg transition-all duration-300 group">
                    <div className={`h-2 bg-gradient-to-r ${path.gradient} rounded-t-lg`}></div>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 rounded-2xl bg-gradient-to-br ${path.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <Badge className={getDifficultyColor(path.level)}>
                          {path.level}
                        </Badge>
                      </div>
                      
                      <h3 className="text-lg font-heading font-semibold mb-2">{path.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{path.description}</p>
                      
                      <div className="space-y-3 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">{path.completed}/{path.modules} modules</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {path.duration}
                          </span>
                          <span className="flex items-center">
                            <Users className="h-3 w-3 mr-1" />
                            {path.students}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Star className="h-3 w-3 mr-1 text-yellow-500 fill-current" />
                          <span>{path.rating}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-4">
                        {path.topics.slice(0, 3).map((topic, idx) => (
                          <Badge key={idx} className="badge-neutral text-xs">
                            {topic}
                          </Badge>
                        ))}
                        {path.topics.length > 3 && (
                          <Badge className="badge-neutral text-xs">
                            +{path.topics.length - 3} more
                          </Badge>
                        )}
                      </div>
                      
                      <Button className="w-full btn-outline group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                        {progress > 0 ? 'Continue Learning' : 'Start Course'}
                        <PlayCircle className="h-4 w-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Articles Tab */}
          <TabsContent value="articles" className="space-y-6">
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 input-clean"
                />
              </div>
              <div className="flex space-x-2">
                {['All', 'Savings', 'Investment', 'Credit', 'Planning'].map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category.toLowerCase() ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.toLowerCase())}
                    className="text-xs"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredArticles.map((article) => (
                <Card key={article.id} className="clean-card hover:shadow-lg transition-all duration-300 group cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="text-4xl">{article.image}</div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-heading font-semibold text-foreground group-hover:text-primary transition-colors">
                            {article.title}
                          </h3>
                          <Badge className={getDifficultyColor(article.difficulty)} size="sm">
                            {article.difficulty}
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{article.summary}</p>
                        
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center space-x-3">
                            <span className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {article.readTime}
                            </span>
                            <span>{article.author}</span>
                          </div>
                          <span>{article.publishDate}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Quizzes Tab */}
          <TabsContent value="quizzes" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {quizzes.map((quiz) => (
                <Card key={quiz.id} className="clean-card hover:shadow-lg transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <Brain className="h-8 w-8 text-purple-500" />
                      <Badge className={getDifficultyColor(quiz.difficulty)}>
                        {quiz.difficulty}
                      </Badge>
                    </div>
                    
                    <h3 className="text-lg font-heading font-semibold mb-2">{quiz.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{quiz.description}</p>
                    
                    <div className="space-y-2 mb-4 text-sm text-muted-foreground">
                      <div className="flex justify-between">
                        <span>{quiz.questions} questions</span>
                        <span>{quiz.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{quiz.attempts} attempts</span>
                        <span>Avg: {quiz.averageScore}%</span>
                      </div>
                    </div>
                    
                    <Button className="w-full btn-outline group-hover:bg-purple-500 group-hover:text-white transition-all duration-300">
                      <Play className="h-4 w-4 mr-2" />
                      Start Quiz
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tips Tab */}
          <TabsContent value="tips" className="space-y-6">
            <Card className="clean-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-orange-500 to-red-500">
                    <Lightbulb className="h-6 w-6 text-white" />
                  </div>
                  <span>Weekly Financial Tips</span>
                  <Badge className="badge-warning">Updated Weekly</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {weeklyTips.map((tip, index) => {
                    const Icon = tip.icon;
                    return (
                      <div key={tip.id} className="p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors">
                        <div className="flex items-start space-x-4">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-heading font-semibold">{tip.title}</h4>
                              <div className="flex space-x-1">
                                <Badge className={`${getImpactColor(tip.impact)} text-xs`}>
                                  {tip.impact}
                                </Badge>
                                <Badge className="badge-neutral text-xs">
                                  {tip.difficulty}
                                </Badge>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed">{tip.description}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Learning Achievements */}
            <Card className="clean-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <span>Learning Achievements</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {achievements.map((achievement, index) => {
                    const Icon = achievement.icon;
                    return (
                      <div 
                        key={index} 
                        className={`p-4 rounded-lg border border-border text-center ${
                          achievement.earned ? 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800' : 'opacity-60'
                        }`}
                      >
                        {achievement.earned ? (
                          <CheckCircle className="h-6 w-6 text-green-500 mx-auto mb-2" />
                        ) : (
                          <Icon className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
                        )}
                        <div className="text-sm font-medium">{achievement.name}</div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}