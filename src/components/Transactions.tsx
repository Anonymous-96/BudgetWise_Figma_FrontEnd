import React, { useState } from 'react';
import DashboardLayout from './DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Upload,
  TrendingUp,
  TrendingDown,
  Calendar,
  Receipt,
  Leaf,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface TransactionsProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Transactions({ isDarkMode, toggleDarkMode }: TransactionsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  React.useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Professional transaction data
  const transactions = [
    {
      id: 1,
      date: '2025-01-15',
      description: 'Grocery Shopping',
      category: 'Food & Dining',
      amount: -2500,
      type: 'expense',
      merchant: 'SuperMart',
      paymentMethod: 'Credit Card'
    },
    {
      id: 2,
      date: '2025-01-14',
      description: 'Salary Credit',
      category: 'Income',
      amount: 85000,
      type: 'income',
      merchant: 'TechCorp Ltd',
      paymentMethod: 'Direct Transfer'
    },
    {
      id: 3,
      date: '2025-01-14',
      description: 'Uber Ride',
      category: 'Transportation',
      amount: -350,
      type: 'expense',
      merchant: 'Uber',
      paymentMethod: 'Digital Wallet'
    },
    {
      id: 4,
      date: '2025-01-13',
      description: 'Netflix Subscription',
      category: 'Entertainment',
      amount: -649,
      type: 'expense',
      merchant: 'Netflix',
      paymentMethod: 'Auto-Pay'
    },
    {
      id: 5,
      date: '2025-01-12',
      description: 'Electricity Bill',
      category: 'Utilities',
      amount: -1200,
      type: 'expense',
      merchant: 'Power Company',
      paymentMethod: 'Auto-Pay'
    },
    {
      id: 6,
      date: '2025-01-11',
      description: 'Amazon Purchase',
      category: 'Shopping',
      amount: -3500,
      type: 'expense',
      merchant: 'Amazon',
      paymentMethod: 'Credit Card'
    },
    {
      id: 7,
      date: '2025-01-10',
      description: 'Freelance Project',
      category: 'Income',
      amount: 15000,
      type: 'income',
      merchant: 'Design Studio',
      paymentMethod: 'Bank Transfer'
    },
    {
      id: 8,
      date: '2025-01-09',
      description: 'Restaurant Dinner',
      category: 'Food & Dining',
      amount: -850,
      type: 'expense',
      merchant: 'Fine Dining',
      paymentMethod: 'Credit Card'
    }
  ];

  const categories = [
    'Food & Dining',
    'Transportation',
    'Shopping',
    'Utilities',
    'Entertainment',
    'Income',
    'Healthcare',
    'Education'
  ];

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.merchant.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || transaction.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = Math.abs(transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0));

  const getCategoryColor = (category: string) => {
    const colors = {
      'Food & Dining': 'badge-primary',
      'Transportation': 'badge-success',
      'Shopping': 'badge-warning',
      'Utilities': 'badge-neutral',
      'Entertainment': 'badge-primary',
      'Income': 'badge-success',
      'Healthcare': 'badge-error',
      'Education': 'badge-primary'
    };
    return colors[category] || 'badge-neutral';
  };

  return (
    <DashboardLayout isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}>
      <div className="space-y-8">
        {/* Page Header */}
        <div className={`slide-up ${isLoaded ? 'animate' : ''} flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6`}>
          <div>
            <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Transactions</h1>
            <p className="text-muted-foreground">View and manage your financial transactions</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" className="zen-button border-accent/30 hover:border-accent/60 text-foreground">
              <Upload className="h-4 w-4 mr-2" />
              Upload Receipt
            </Button>
            <Button variant="outline" size="sm" className="zen-button border-primary/30 hover:border-primary/60 text-foreground">
              <Download className="h-4 w-4 mr-2" />
              Export Wisdom
            </Button>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="zen-button zen-ripple bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Mindfully
                  <Sparkles className="h-4 w-4 ml-2" />
                </Button>
              </DialogTrigger>
              <DialogContent className="clean-card border-primary/20">
                <DialogHeader>
                  <DialogTitle className="font-heading text-xl text-foreground">Record New Transaction</DialogTitle>
                  <DialogDescription className="text-muted-foreground">
                    Add a new transaction to track your financial activity.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-6 pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="amount" className="text-foreground font-medium">Amount</Label>
                      <Input id="amount" placeholder="₹0.00" className="bg-secondary/50 border-border/40 focus:border-primary/60 text-foreground" />
                    </div>
                    <div>
                      <Label htmlFor="type" className="text-foreground font-medium">Flow Type</Label>
                      <Select>
                        <SelectTrigger className="bg-secondary/50 border-border/40 focus:border-primary/60 text-foreground">
                          <SelectValue placeholder="Select flow" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="income">Income Flow</SelectItem>
                          <SelectItem value="expense">Mindful Expense</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="description" className="text-foreground font-medium">Description</Label>
                    <Input id="description" placeholder="Describe this mindful transaction" className="bg-secondary/50 border-border/40 focus:border-primary/60 text-foreground" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category" className="text-foreground font-medium">Category</Label>
                      <Select>
                        <SelectTrigger className="bg-secondary/50 border-border/40 focus:border-primary/60 text-foreground">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>{category}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="date" className="text-foreground font-medium">Date</Label>
                      <Input id="date" type="date" className="bg-secondary/50 border-border/40 focus:border-primary/60 text-foreground" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="merchant" className="text-foreground font-medium">Merchant</Label>
                    <Input id="merchant" placeholder="Where was this transaction?" className="bg-secondary/50 border-border/40 focus:border-primary/60 text-foreground" />
                  </div>
                  <div className="flex justify-end space-x-3 pt-4">
                    <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="zen-button border-border/40 text-foreground">
                      Cancel
                    </Button>
                    <Button onClick={() => setIsAddDialogOpen(false)} className="zen-button bg-primary hover:bg-primary/90 text-primary-foreground">
                      Record Transaction
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Enhanced Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="zen-card border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1 font-medium">Income Flow</p>
                  <p className="text-3xl font-serif font-semibold text-primary">₹{totalIncome.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground mt-1">Abundant & Growing</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="p-3 rounded-2xl bg-primary/20">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-2xl">💰</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="zen-card border-accent/20 bg-gradient-to-br from-accent/5 to-accent/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1 font-medium">Mindful Spending</p>
                  <p className="text-3xl font-serif font-semibold text-accent">₹{totalExpenses.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground mt-1">Conscious & Intentional</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="p-3 rounded-2xl bg-accent/20">
                    <TrendingDown className="h-6 w-6 text-accent" />
                  </div>
                  <span className="text-2xl">🧘‍♂️</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="zen-card border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1 font-medium">Balance Harmony</p>
                  <p className={`text-3xl font-serif font-semibold ${totalIncome - totalExpenses >= 0 ? 'text-primary' : 'text-accent'}`}>
                    ₹{(totalIncome - totalExpenses).toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">In Perfect Balance</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="p-3 rounded-2xl bg-primary/10">
                    <Receipt className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-2xl">⚖️</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Filters and Search */}
        <Card className="zen-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3 font-serif text-foreground">
              <div className="p-2 rounded-xl bg-primary/10">
                <Leaf className="h-5 w-5 text-primary" />
              </div>
              <span>Transaction Journey</span>
              <span className="text-lg">📜</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="h-4 w-4 absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search your financial journey..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 bg-secondary/50 border-border/40 focus:border-primary/60 text-foreground rounded-2xl"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-64 bg-secondary/50 border-border/40 focus:border-primary/60 text-foreground rounded-2xl">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter mindfully" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Enhanced Transactions List */}
            <div className="space-y-4">
              {filteredTransactions.map((transaction) => (
                <div key={transaction.id} className="zen-card p-6 hover:bg-gradient-to-r hover:from-primary/5 hover:to-accent/5 transition-all duration-300 group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1">
                      <div className={`p-3 rounded-2xl ${transaction.type === 'income' ? 'bg-primary/10' : 'bg-accent/10'} group-hover:scale-110 transition-transform duration-300`}>
                        <div className="flex items-center space-x-2">
                          {transaction.type === 'income' ? 
                            <TrendingUp className="h-5 w-5 text-primary" /> :
                            <TrendingDown className="h-5 w-5 text-accent" />
                          }
                          <span className="text-lg">{transaction.accent}</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-serif font-medium text-foreground text-lg">{transaction.description}</h3>
                          <Badge variant="secondary" className={getCategoryColor(transaction.category)}>
                            {transaction.category}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                          <span className="flex items-center">
                            <Calendar className="h-3 w-3 mr-2" />
                            {new Date(transaction.date).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </span>
                          <span className="font-medium">{transaction.merchant}</span>
                          <span className="italic">{transaction.paymentMethod}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-serif font-semibold ${
                        transaction.type === 'income' ? 'text-primary' : 'text-accent'
                      }`}>
                        {transaction.type === 'income' ? '+' : ''}₹{Math.abs(transaction.amount).toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {transaction.type === 'income' ? 'Abundance Flows' : 'Mindful Choice'}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredTransactions.length === 0 && (
              <div className="text-center py-16">
                <div className="p-6 rounded-3xl bg-primary/10 inline-block mb-6">
                  <Receipt className="h-16 w-16 text-primary mx-auto" />
                </div>
                <h3 className="text-2xl font-serif font-medium text-foreground mb-3">No Transactions Found</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto leading-relaxed">
                  Your mindful spending journey awaits. Try adjusting your search or begin recording your first transaction.
                </p>
                <Button className="zen-button bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Plus className="h-4 w-4 mr-2" />
                  Start Your Journey
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}