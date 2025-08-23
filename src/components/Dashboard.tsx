import React, { useState, useEffect } from 'react';
import DashboardLayout from './DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  PiggyBank, 
  ArrowRight,
  Wallet,
  Target,
  CreditCard,
  Brain,
  BarChart3,
  Users,
  Activity,
  Calendar,
  FileText,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface DashboardProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Dashboard({ isDarkMode, toggleDarkMode }: DashboardProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Professional financial data
  const monthlyData = [
    { month: 'Jan', income: 85000, expenses: 62000, savings: 23000, investment: 15000 },
    { month: 'Feb', income: 87000, expenses: 58000, savings: 29000, investment: 18000 },
    { month: 'Mar', income: 82000, expenses: 65000, savings: 17000, investment: 12000 },
    { month: 'Apr', income: 89000, expenses: 61000, savings: 28000, investment: 20000 },
    { month: 'May', income: 91000, expenses: 67000, savings: 24000, investment: 22000 },
    { month: 'Jun', income: 94000, expenses: 59000, savings: 35000, investment: 25000 },
  ];

  const expenseCategories = [
    { name: 'Housing', value: 25000, color: '#2563EB', percentage: 35 },
    { name: 'Transportation', value: 12000, color: '#059669', percentage: 17 },
    { name: 'Food & Dining', value: 8500, color: '#D97706', percentage: 12 },
    { name: 'Utilities', value: 6000, color: '#0284C7', percentage: 8 },
    { name: 'Insurance', value: 5500, color: '#7C3AED', percentage: 8 },
    { name: 'Other', value: 14000, color: '#94A3B8', percentage: 20 },
  ];

  const quickStats = [
    {
      title: 'Total Balance',
      amount: '₹2,45,000',
      change: '+12.5%',
      trend: 'up',
      icon: Wallet,
      description: 'All accounts'
    },
    {
      title: 'Monthly Income',
      amount: '₹94,000',
      change: '+8.2%',
      trend: 'up',
      icon: TrendingUp,
      description: 'This month'
    },
    {
      title: 'Total Savings',
      amount: '₹35,000',
      change: '+25.7%',
      trend: 'up',
      icon: PiggyBank,
      description: 'Last 30 days'
    },
    {
      title: 'Investments',
      amount: '₹25,000',
      change: '+15.3%',
      trend: 'up',
      icon: BarChart3,
      description: 'Portfolio value'
    }
  ];

  const insights = [
    {
      type: 'success',
      title: 'Savings Goal Progress',
      message: 'You\'re on track to meet your emergency fund goal 2 months ahead of schedule.',
      action: 'View Goal',
      icon: CheckCircle
    },
    {
      type: 'warning',
      title: 'Budget Alert',
      message: 'Your dining expenses are 15% higher than usual this month. Consider reviewing your spending.',
      action: 'Review Budget',
      icon: AlertCircle
    },
    {
      type: 'info',
      title: 'Investment Opportunity',
      message: 'Based on your risk profile, consider diversifying into index funds for better returns.',
      action: 'Learn More',
      icon: Info
    }
  ];

  const recentTransactions = [
    { id: 1, description: 'Salary Credit', amount: 94000, type: 'income', date: '2025-01-15', category: 'Income' },
    { id: 2, description: 'Grocery Shopping', amount: -2500, type: 'expense', date: '2025-01-14', category: 'Food' },
    { id: 3, description: 'Electricity Bill', amount: -1200, type: 'expense', date: '2025-01-13', category: 'Utilities' },
    { id: 4, description: 'Mutual Fund SIP', amount: -10000, type: 'investment', date: '2025-01-12', category: 'Investment' },
    { id: 5, description: 'Fuel Expense', amount: -800, type: 'expense', date: '2025-01-11', category: 'Transportation' },
  ];

  return (
    <DashboardLayout isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className={`slide-up ${isLoaded ? 'animate' : ''}`}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-heading font-bold text-foreground">Welcome back, Alex</h1>
              <p className="text-muted-foreground">Here's your financial overview for today</p>
            </div>
            <div className="flex items-center space-x-3">
              <Badge className="badge-success">
                <CheckCircle className="mr-1 h-3 w-3" />
                All systems operational
              </Badge>
              <div className="text-right text-sm">
                <div className="text-muted-foreground">Last updated</div>
                <div className="font-medium">Just now</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className={`slide-up ${isLoaded ? 'animate' : ''} grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4`} style={{ animationDelay: '100ms' }}>
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="clean-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className={`flex items-center text-sm font-medium ${
                      stat.trend === 'up' ? 'text-emerald-600' : 'text-red-600'
                    }`}>
                      {stat.trend === 'up' ? 
                        <TrendingUp className="mr-1 h-4 w-4" /> : 
                        <TrendingDown className="mr-1 h-4 w-4" />
                      }
                      {stat.change}
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-heading font-bold text-foreground">{stat.amount}</p>
                    <p className="text-xs text-muted-foreground">{stat.description}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Financial Flow Chart */}
          <Card className={`clean-card slide-up ${isLoaded ? 'animate' : ''}`} style={{ animationDelay: '200ms' }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                <span>Financial Flow</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={320}>
                <AreaChart data={monthlyData}>
                  <defs>
                    <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#DC2626" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#DC2626" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                  <Tooltip 
                    formatter={(value) => [`₹${value.toLocaleString()}`, '']}
                    contentStyle={{ 
                      backgroundColor: 'var(--card)', 
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Legend fontSize={12} />
                  <Area
                    type="monotone"
                    dataKey="income"
                    stroke="#2563EB"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#incomeGradient)"
                    name="Income"
                  />
                  <Area
                    type="monotone"
                    dataKey="expenses"
                    stroke="#DC2626"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#expenseGradient)"
                    name="Expenses"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Expense Breakdown */}
          <Card className={`clean-card slide-up ${isLoaded ? 'animate' : ''}`} style={{ animationDelay: '300ms' }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-primary" />
                <span>Expense Breakdown</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-6 lg:flex-row lg:items-center lg:space-x-8 lg:space-y-0">
                <div className="flex-1">
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={expenseCategories}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {expenseCategories.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => [`₹${value.toLocaleString()}`, '']}
                        contentStyle={{ 
                          backgroundColor: 'var(--card)', 
                          border: '1px solid var(--border)',
                          borderRadius: '8px',
                          fontSize: '12px'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex-1 space-y-3">
                  {expenseCategories.map((category, index) => (
                    <div key={index} className="flex items-center justify-between rounded-lg border border-border p-3">
                      <div className="flex items-center space-x-3">
                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: category.color }}></div>
                        <span className="text-sm font-medium">{category.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold">₹{category.value.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">{category.percentage}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Insights Section */}
        <Card className={`clean-card slide-up ${isLoaded ? 'animate' : ''}`} style={{ animationDelay: '400ms' }}>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="h-5 w-5 text-primary" />
              <span>Financial Insights</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {insights.map((insight, index) => {
              const Icon = insight.icon;
              return (
                <div key={index} className="flex items-start space-x-4 rounded-lg border border-border p-4">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                    insight.type === 'success' ? 'bg-emerald-100 text-emerald-600' :
                    insight.type === 'warning' ? 'bg-amber-100 text-amber-600' :
                    'bg-blue-100 text-blue-600'
                  }`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-heading font-semibold">{insight.title}</h4>
                    <p className="text-sm text-muted-foreground">{insight.message}</p>
                    <Button variant="ghost" size="sm" className="mt-2 h-auto p-0 text-primary hover:text-primary/80">
                      {insight.action}
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Recent Transactions & Quick Actions */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Recent Transactions */}
          <Card className={`clean-card slide-up lg:col-span-2 ${isLoaded ? 'animate' : ''}`} style={{ animationDelay: '500ms' }}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <span>Recent Transactions</span>
                </div>
                <Button variant="ghost" size="sm">
                  View All
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between rounded-lg border border-border p-4">
                    <div className="flex items-center space-x-4">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                        transaction.type === 'income' ? 'bg-emerald-100 text-emerald-600' :
                        transaction.type === 'investment' ? 'bg-blue-100 text-blue-600' :
                        'bg-red-100 text-red-600'
                      }`}>
                        {transaction.type === 'income' ? <TrendingUp className="h-5 w-5" /> :
                         transaction.type === 'investment' ? <BarChart3 className="h-5 w-5" /> :
                         <TrendingDown className="h-5 w-5" />}
                      </div>
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-sm text-muted-foreground">{transaction.category} • {transaction.date}</p>
                      </div>
                    </div>
                    <div className={`text-right font-semibold ${
                      transaction.type === 'income' ? 'text-emerald-600' : 'text-foreground'
                    }`}>
                      {transaction.type === 'income' ? '+' : ''}₹{Math.abs(transaction.amount).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className={`clean-card slide-up ${isLoaded ? 'animate' : ''}`} style={{ animationDelay: '600ms' }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-primary" />
                <span>Quick Actions</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full justify-start" variant="outline">
                <CreditCard className="mr-2 h-4 w-4" />
                Add Transaction
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Target className="mr-2 h-4 w-4" />
                Set New Goal
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <BarChart3 className="mr-2 h-4 w-4" />
                View Reports
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Users className="mr-2 h-4 w-4" />
                Share Portfolio
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}