import React, { useState, useEffect } from 'react';
import DashboardLayout from './DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Slider } from './ui/slider';
import { 
  Brain, 
  TrendingUp, 
  TrendingDown,
  Calculator, 
  Lightbulb,
  Target,
  Zap,
  BarChart3,
  PieChart,
  LineChart,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Eye,
  Sparkles,
  Bot,
  Mic,
  Send,
  Play,
  Pause
} from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

interface AIHubProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isOffline?: boolean;
}

export default function AIHub({ isDarkMode, toggleDarkMode, isOffline }: AIHubProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSimulation, setActiveSimulation] = useState('savings');
  const [simulationValue, setSimulationValue] = useState([5000]);
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [chatMessage, setChatMessage] = useState('');

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Enhanced predictive data
  const predictiveData = [
    { month: 'Jan', actual: 85000, predicted: 87000, optimistic: 92000, pessimistic: 82000 },
    { month: 'Feb', actual: 87000, predicted: 89000, optimistic: 94000, pessimistic: 84000 },
    { month: 'Mar', actual: 82000, predicted: 88000, optimistic: 93000, pessimistic: 83000 },
    { month: 'Apr', actual: null, predicted: 90000, optimistic: 95000, pessimistic: 85000 },
    { month: 'May', actual: null, predicted: 92000, optimistic: 97000, pessimistic: 87000 },
    { month: 'Jun', actual: null, predicted: 94000, optimistic: 99000, pessimistic: 89000 },
  ];

  const aiInsights = [
    {
      id: 1,
      type: 'prediction',
      title: 'Income Growth Forecast',
      description: 'AI predicts 12% income growth over next 6 months based on career trajectory and market trends.',
      confidence: 89,
      impact: '+₹15,000/month',
      priority: 'high',
      icon: TrendingUp,
      color: 'from-emerald-500 to-teal-600'
    },
    {
      id: 2,
      type: 'optimization',
      title: 'Smart Expense Categorization',
      description: 'AI has categorized 847 transactions with 94% accuracy. 23 transactions need manual review.',
      confidence: 94,
      impact: 'Save 2 hours/week',
      priority: 'medium',
      icon: Brain,
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 3,
      type: 'alert',
      title: 'Subscription Anomaly Detected',
      description: 'AI identified unusual subscription charges. Netflix charged ₹799 instead of ₹649.',
      confidence: 97,
      impact: 'Save ₹150/month',
      priority: 'high',
      icon: AlertTriangle,
      color: 'from-amber-500 to-orange-600'
    },
    {
      id: 4,
      type: 'opportunity',
      title: 'Investment Window Opening',
      description: 'Market conditions favor SIP investments. Optimal window: Next 15 days.',
      confidence: 82,
      impact: '+18% returns',
      priority: 'medium',
      icon: Target,
      color: 'from-purple-500 to-pink-600'
    }
  ];

  const whatIfScenarios = [
    {
      scenario: 'Increase Monthly Savings',
      description: 'What if you save ₹5,000 more per month?',
      currentValue: simulationValue[0],
      results: {
        '6months': simulationValue[0] * 6,
        '1year': simulationValue[0] * 12,
        '3years': simulationValue[0] * 36 + (simulationValue[0] * 36 * 0.08)
      }
    }
  ];

  const smartCategories = [
    { name: 'Food & Dining', transactions: 23, confidence: 96, amount: 18500, trend: 'up' },
    { name: 'Transportation', transactions: 15, confidence: 94, amount: 12000, trend: 'stable' },
    { name: 'Shopping', transactions: 31, confidence: 89, amount: 8500, trend: 'down' },
    { name: 'Entertainment', transactions: 12, confidence: 92, amount: 6000, trend: 'up' },
    { name: 'Utilities', transactions: 6, confidence: 98, amount: 15000, trend: 'stable' }
  ];

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    // Simulate voice recognition
    if (!isListening) {
      setTimeout(() => {
        setChatMessage("How can I optimize my savings this month?");
        setIsListening(false);
      }, 3000);
    }
  };

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      setIsTyping(true);
      setChatMessage('');
      
      // Simulate AI response
      setTimeout(() => {
        setIsTyping(false);
      }, 2000);
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-emerald-600 bg-emerald-100 dark:bg-emerald-900/20';
    if (confidence >= 80) return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
    if (confidence >= 70) return 'text-amber-600 bg-amber-100 dark:bg-amber-900/20';
    return 'text-red-600 bg-red-100 dark:bg-red-900/20';
  };

  return (
    <DashboardLayout isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}>
      <div className="space-y-8">
        {/* Enhanced Header */}
        <div className={`slide-up ${isLoaded ? 'animate' : ''} flex items-center justify-between`}>
          <div>
            <h1 className="text-3xl font-heading font-bold text-foreground mb-2">AI Intelligence Hub</h1>
            <p className="text-muted-foreground">Advanced financial analytics powered by machine learning</p>
          </div>
          <div className="flex items-center space-x-3">
            <Badge className="badge-success">
              <Bot className="h-3 w-3 mr-1" />
              AI Online
            </Badge>
            <Badge className="badge-primary">
              <Sparkles className="h-3 w-3 mr-1" />
              99.2% Accuracy
            </Badge>
          </div>
        </div>

        {/* AI Insights Grid */}
        <div className={`slide-up ${isLoaded ? 'animate' : ''} grid grid-cols-1 md:grid-cols-2 gap-6`} style={{ animationDelay: '100ms' }}>
          {aiInsights.map((insight, index) => {
            const Icon = insight.icon;
            return (
              <Card key={insight.id} className="clean-card hover:shadow-lg transition-all duration-300 group relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${insight.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                <CardContent className="p-6 relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-2xl bg-gradient-to-br ${insight.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-right">
                      <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getConfidenceColor(insight.confidence)}`}>
                        <Eye className="h-3 w-3 mr-1" />
                        {insight.confidence}% confident
                      </div>
                    </div>
                  </div>
                  <h3 className="text-lg font-heading font-semibold mb-2">{insight.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{insight.description}</p>
                  <div className="flex items-center justify-between">
                    <Badge className={insight.priority === 'high' ? 'badge-error' : 'badge-warning'}>
                      {insight.priority} priority
                    </Badge>
                    <span className="text-sm font-semibold text-primary">{insight.impact}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Predictive Analytics Dashboard */}
        <Card className={`clean-card slide-up ${isLoaded ? 'animate' : ''}`} style={{ animationDelay: '200ms' }}>
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600">
                <LineChart className="h-6 w-6 text-white" />
              </div>
              <span>Predictive Financial Analytics</span>
              <Badge className="badge-primary">AI Powered</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <p className="text-muted-foreground mb-4">
                AI analyzes your financial patterns to predict future trends with scenario modeling
              </p>
              
              <ResponsiveContainer width="100%" height={320}>
                <AreaChart data={predictiveData}>
                  <defs>
                    <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="predictedGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="month" stroke="var(--muted-foreground)" />
                  <YAxis stroke="var(--muted-foreground)" />
                  <Tooltip 
                    formatter={(value, name) => [`₹${value?.toLocaleString()}`, name]}
                    contentStyle={{ 
                      backgroundColor: 'var(--card)', 
                      border: '1px solid var(--border)',
                      borderRadius: '8px'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="actual"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    fill="url(#actualGradient)"
                    name="Actual"
                  />
                  <Area
                    type="monotone"
                    dataKey="predicted"
                    stroke="#10B981"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    fill="url(#predictedGradient)"
                    name="AI Prediction"
                  />
                  <Area
                    type="monotone"
                    dataKey="optimistic"
                    stroke="#059669"
                    strokeWidth={1}
                    strokeDasharray="2 2"
                    fill="none"
                    name="Optimistic"
                  />
                  <Area
                    type="monotone"
                    dataKey="pessimistic"
                    stroke="#DC2626"
                    strokeWidth={1}
                    strokeDasharray="2 2"
                    fill="none"
                    name="Conservative"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* What-If Simulation Engine */}
        <Card className={`clean-card slide-up ${isLoaded ? 'animate' : ''}`} style={{ animationDelay: '300ms' }}>
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600">
                <Calculator className="h-6 w-6 text-white" />
              </div>
              <span>What-If Simulation Engine</span>
              <Badge className="badge-warning">Interactive</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="savings" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="savings">Savings Impact</TabsTrigger>
                <TabsTrigger value="investment">Investment Growth</TabsTrigger>
                <TabsTrigger value="expenses">Expense Reduction</TabsTrigger>
              </TabsList>
              
              <TabsContent value="savings" className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Additional Monthly Savings: ₹{simulationValue[0].toLocaleString()}
                    </label>
                    <Slider
                      value={simulationValue}
                      onValueChange={setSimulationValue}
                      max={20000}
                      min={1000}
                      step={500}
                      className="w-full"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="clean-card-subtle p-4 text-center">
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">6 Months</h4>
                      <p className="text-2xl font-heading font-bold text-primary">
                        ₹{(simulationValue[0] * 6).toLocaleString()}
                      </p>
                    </Card>
                    <Card className="clean-card-subtle p-4 text-center">
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">1 Year</h4>
                      <p className="text-2xl font-heading font-bold text-emerald-600">
                        ₹{(simulationValue[0] * 12).toLocaleString()}
                      </p>
                    </Card>
                    <Card className="clean-card-subtle p-4 text-center">
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">3 Years (8% growth)</h4>
                      <p className="text-2xl font-heading font-bold text-purple-600">
                        ₹{(simulationValue[0] * 36 + (simulationValue[0] * 36 * 0.08)).toLocaleString()}
                      </p>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="investment" className="space-y-6">
                <div className="text-center py-8">
                  <Lightbulb className="h-12 w-12 text-amber-500 mx-auto mb-4" />
                  <h3 className="text-lg font-heading font-semibold mb-2">Investment Growth Simulator</h3>
                  <p className="text-muted-foreground">Model different investment scenarios with AI-powered market predictions</p>
                </div>
              </TabsContent>
              
              <TabsContent value="expenses" className="space-y-6">
                <div className="text-center py-8">
                  <TrendingDown className="h-12 w-12 text-red-500 mx-auto mb-4" />
                  <h3 className="text-lg font-heading font-semibold mb-2">Expense Optimization</h3>
                  <p className="text-muted-foreground">Simulate the impact of reducing different expense categories</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Smart Categorization Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className={`clean-card slide-up ${isLoaded ? 'animate' : ''}`} style={{ animationDelay: '400ms' }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600">
                  <PieChart className="h-6 w-6 text-white" />
                </div>
                <span>Smart Expense Categorization</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {smartCategories.map((category, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{category.name}</h4>
                        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getConfidenceColor(category.confidence)}`}>
                          {category.confidence}%
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{category.transactions} transactions</span>
                        <span>₹{category.amount.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
                
                <Button className="w-full btn-outline">
                  Review AI Categorization
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced AI Chat Advisor */}
          <Card className={`clean-card slide-up ${isLoaded ? 'animate' : ''}`} style={{ animationDelay: '500ms' }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600">
                  <Bot className="h-6 w-6 text-white" />
                </div>
                <span>AI Financial Advisor</span>
                {isTyping && (
                  <Badge className="badge-success animate-pulse">
                    Typing...
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Sample AI Message */}
                <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <div className="flex items-start space-x-3">
                    <Bot className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="text-sm text-foreground">
                        Based on your spending patterns, I recommend reducing dining expenses by 20% this month. 
                        This could save you ₹3,700 while maintaining your lifestyle.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="p-4 rounded-lg bg-muted/50">
                    <div className="flex items-center space-x-2">
                      <Bot className="h-4 w-4 text-muted-foreground" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Chat Input */}
                <div className="flex space-x-2">
                  <Input
                    placeholder="Ask me anything about your finances..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1 input-clean"
                  />
                  <Button
                    variant={isListening ? "destructive" : "outline"}
                    size="icon"
                    onClick={handleVoiceInput}
                    className="relative"
                  >
                    <Mic className={`h-4 w-4 ${isListening ? 'animate-pulse' : ''}`} />
                    {isListening && (
                      <div className="absolute inset-0 rounded-md bg-red-500/20 animate-ping"></div>
                    )}
                  </Button>
                  <Button onClick={handleSendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>

                {/* Quick Suggestions */}
                <div className="flex flex-wrap gap-2">
                  {[
                    "Optimize my budget",
                    "Investment advice",
                    "Reduce expenses"
                  ].map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={() => setChatMessage(suggestion)}
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}