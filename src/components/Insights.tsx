import React, { useState, useEffect } from 'react';
import DashboardLayout from './DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import ChatBot from './ui/ChatBot';
import { 
  Bot, 
  Send, 
  TrendingUp, 
  TrendingDown,
  Lightbulb,
  AlertTriangle,
  Target,
  PieChart,
  Calendar,
  DollarSign,
  User,
  Sparkles,
  Loader2
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { getTransactions, getGoals, getAccounts } from '../lib/supabase';

interface InsightsProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Insights({ isDarkMode, toggleDarkMode }: InsightsProps) {
  const { user } = useAuth();
  const [userContext, setUserContext] = useState<any>({});
  const [isLoadingContext, setIsLoadingContext] = useState(true);

  useEffect(() => {
    if (user) {
      loadUserContext();
    }
  }, [user]);

  const loadUserContext = async () => {
    if (!user) return;

    try {
      const [accountsResult, transactionsResult, goalsResult] = await Promise.all([
        getAccounts(user.id),
        getTransactions(user.id, 30),
        getGoals(user.id)
      ]);

      const accounts = accountsResult.data || [];
      const transactions = transactionsResult.data || [];
      const goals = goalsResult.data || [];

      const totalBalance = accounts.reduce((sum, acc) => sum + Number(acc.balance), 0);
      const monthlyIncome = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + Number(t.amount), 0);
      const monthlyExpenses = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + Math.abs(Number(t.amount)), 0);

      setUserContext({
        totalBalance,
        monthlyIncome,
        monthlyExpenses,
        goals,
        recentTransactions: transactions.slice(0, 10)
      });
    } catch (error) {
      console.error('Error loading user context:', error);
    } finally {
      setIsLoadingContext(false);
    }
  };

  // Mock insights data
  const aiInsights = [
    {
      id: 1,
      type: 'savings',
      title: 'Subscription Optimization',
      description: 'I found 3 unused subscriptions costing ₹2,100/month',
      impact: '+₹25,200/year',
      priority: 'high',
      icon: DollarSign,
      color: 'bg-green-500'
    },
    {
      id: 2,
      type: 'spending',
      title: 'Dining Pattern Alert',
      description: 'Your weekend dining expenses are 40% higher than weekdays',
      impact: 'Save ₹3,000/month',
      priority: 'medium',
      icon: TrendingUp,
      color: 'bg-yellow-500'
    },
    {
      id: 3,
      type: 'investment',
      title: 'Investment Opportunity',
      description: 'You have ₹15,000 excess cash earning only 3% in savings',
      impact: '+₹1,800/year potential',
      priority: 'medium',
      icon: Target,
      color: 'bg-blue-500'
    },
    {
      id: 4,
      type: 'goal',
      title: 'Emergency Fund Status',
      description: 'Your emergency fund covers 6.4 months of expenses - well done!',
      impact: 'Goal exceeded',
      priority: 'low',
      icon: AlertTriangle,
      color: 'bg-green-500'
    }
  ];

  const predictions = [
    {
      title: 'Next Month Forecast',
      description: 'Based on your patterns, you\'ll likely spend ₹62,000 next month',
      change: '+3.2%',
      trend: 'up'
    },
    {
      title: 'Savings Projection',
      description: 'You\'re on track to save ₹340,000 by year-end',
      change: '+₹12,000',
      trend: 'up'
    },
    {
      title: 'Budget Performance',
      description: 'You\'ll finish within budget in 4 out of 6 categories',
      change: '67% success rate',
      trend: 'neutral'
    }
  ];

  const quickQuestions = [
    "How can I reduce my monthly expenses?",
    "What's the best way to increase my savings?",
    "Should I invest my emergency fund?",
    "How am I performing against my budget?",
    "What subscriptions should I cancel?",
    "When can I afford my vacation goal?"
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-red-500 bg-red-50 dark:bg-red-950';
      case 'medium':
        return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-950';
      case 'low':
        return 'border-green-500 bg-green-50 dark:bg-green-950';
      default:
        return 'border-gray-500 bg-gray-50 dark:bg-gray-950';
    }
  };

  return (
    <DashboardLayout isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="slide-up animate flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold text-foreground">AI Insights</h1>
            <p className="text-muted-foreground">Get personalized financial advice and predictions</p>
          </div>
          <Badge className="badge-primary">
            <Bot className="h-4 w-4 mr-1" />
            AI Powered
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* AI Chat Interface */}
          <div className="lg:col-span-2 space-y-6">
            {isLoadingContext ? (
              <Card className="clean-card h-[600px] flex items-center justify-center">
                <div className="text-center">
                  <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
                  <p className="text-muted-foreground">Loading your financial context...</p>
                </div>
              </Card>
            ) : (
              <ChatBot userContext={userContext} />
            )}
          </div>

          {/* Insights Panel */}
          <div className="space-y-6">
            {/* AI Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Sparkles className="h-5 w-5 text-purple-600" />
                  <span>Smart Insights</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {aiInsights.map((insight) => {
                  const Icon = insight.icon;
                  return (
                    <div key={insight.id} className={`p-3 rounded-lg border-l-4 ${getPriorityColor(insight.priority)}`}>
                      <div className="flex items-start space-x-3">
                        <div className="p-1 rounded">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm mb-1">{insight.title}</h4>
                          <p className="text-xs text-muted-foreground mb-2">{insight.description}</p>
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="text-xs">
                              {insight.impact}
                            </Badge>
                            <Button variant="ghost" size="sm" className="text-xs h-6 px-2">
                              Act
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Predictions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <span>Predictions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {predictions.map((prediction, index) => (
                  <div key={index} className="p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">{prediction.title}</h4>
                      <div className={`flex items-center text-xs ${
                        prediction.trend === 'up' ? 'text-green-600' :
                        prediction.trend === 'down' ? 'text-red-600' :
                        'text-gray-600'
                      }`}>
                        {prediction.trend === 'up' && <TrendingUp className="h-3 w-3 mr-1" />}
                        {prediction.trend === 'down' && <TrendingDown className="h-3 w-3 mr-1" />}
                        {prediction.change}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">{prediction.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lightbulb className="h-5 w-5 text-yellow-600" />
                  <span>Quick Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <PieChart className="h-4 w-4 mr-2" />
                  Analyze Spending
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Target className="h-4 w-4 mr-2" />
                  Optimize Budget
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Plan Goals
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Find Savings
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}