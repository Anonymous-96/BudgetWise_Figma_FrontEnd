import React, { useState, useEffect } from 'react';
import DashboardLayout from './DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { 
  Check, 
  X, 
  Star, 
  Zap,
  Crown,
  Shield,
  Sparkles,
  Gift,
  TrendingUp,
  Brain,
  Users,
  Lock,
  Unlock,
  CreditCard,
  Calendar,
  Phone
} from 'lucide-react';

interface SubscriptionProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Subscription({ isDarkMode, toggleDarkMode }: SubscriptionProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isYearly, setIsYearly] = useState(false);
  const [currentPlan, setCurrentPlan] = useState('free');

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const plans = [
    {
      id: 'free',
      name: 'Starter',
      description: 'Perfect for getting started with financial management',
      monthlyPrice: 0,
      yearlyPrice: 0,
      popular: false,
      features: [
        'Basic expense tracking',
        'Simple budget creation',
        '3 financial goals',
        'Monthly spending reports',
        'Email support',
        'Mobile app access'
      ],
      limitations: [
        'Limited to 100 transactions/month',
        'Basic AI insights only',
        'No premium integrations',
        'Standard support'
      ],
      icon: Zap,
      gradient: 'from-gray-500 to-slate-600'
    },
    {
      id: 'pro',
      name: 'Professional',
      description: 'Advanced features for serious financial planning',
      monthlyPrice: 499,
      yearlyPrice: 4499,
      popular: true,
      features: [
        'Unlimited transactions',
        'Advanced AI insights',
        'Predictive analytics',
        'Investment tracking',
        'Goal optimization',
        'Bank integrations',
        'Priority support',
        'Custom categories',
        'Receipt scanning',
        'Export features'
      ],
      limitations: [],
      icon: TrendingUp,
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'premium',
      name: 'Elite',
      description: 'Complete financial intelligence for power users',
      monthlyPrice: 999,
      yearlyPrice: 8999,
      popular: false,
      features: [
        'Everything in Professional',
        'AI financial advisor',
        'Tax optimization',
        'Portfolio analysis',
        'Family account sharing',
        'White-glove onboarding',
        'Dedicated account manager',
        'Custom reporting',
        'API access',
        'Advanced security features'
      ],
      limitations: [],
      icon: Crown,
      gradient: 'from-purple-500 to-pink-600'
    }
  ];

  const affiliateOffers = [
    {
      id: 1,
      partner: 'HDFC Bank',
      title: 'Personal Loan',
      description: 'Get instant approval for personal loans up to ₹40 lakhs',
      offer: 'Special rate: 10.5% APR',
      commission: '₹5,000 cashback',
      rating: 4.8,
      image: '🏦',
      cta: 'Apply Now',
      terms: 'Min income ₹50,000/month'
    },
    {
      id: 2,
      partner: 'ICICI Prudential',
      title: 'Term Life Insurance',
      description: 'Comprehensive life cover with tax benefits',
      offer: '50% discount on first year premium',
      commission: '₹2,500 cashback',
      rating: 4.6,
      image: '🛡️',
      cta: 'Get Quote',
      terms: 'Age 18-65 years'
    },
    {
      id: 3,
      partner: 'Groww',
      title: 'Investment Platform',
      description: 'Start investing in mutual funds with zero commission',
      offer: 'Free investment advisory',
      commission: '₹1,000 bonus',
      rating: 4.7,
      image: '📈',
      cta: 'Start Investing',
      terms: 'Minimum investment ₹500'
    },
    {
      id: 4,
      partner: 'PolicyBazaar',
      title: 'Health Insurance',
      description: 'Compare and buy health insurance plans',
      offer: 'Up to 25% discount',
      commission: '₹3,000 cashback',
      rating: 4.5,
      image: '🏥',
      cta: 'Compare Plans',
      terms: 'Family floater available'
    }
  ];

  const premiumFeatures = [
    {
      title: 'AI Financial Advisor',
      description: 'Get personalized advice from our advanced AI',
      icon: Brain,
      locked: currentPlan === 'free'
    },
    {
      title: 'Advanced Analytics',
      description: 'Deep insights into spending patterns and trends',
      icon: TrendingUp,
      locked: currentPlan === 'free'
    },
    {
      title: 'Family Sharing',
      description: 'Share your financial plans with family members',
      icon: Users,
      locked: currentPlan !== 'premium'
    },
    {
      title: 'Tax Optimization',
      description: 'AI-powered tax saving recommendations',
      icon: Shield,
      locked: currentPlan !== 'premium'
    }
  ];

  const calculateSavings = (monthly: number, yearly: number) => {
    const monthlyCost = monthly * 12;
    const savings = monthlyCost - yearly;
    const percentage = Math.round((savings / monthlyCost) * 100);
    return { savings, percentage };
  };

  return (
    <DashboardLayout isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}>
      <div className="space-y-8">
        {/* Header */}
        <div className={`slide-up ${isLoaded ? 'animate' : ''} text-center`}>
          <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
            Unlock Your Financial Potential
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Choose the perfect plan to supercharge your financial journey with AI-powered insights and premium features.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className={`slide-up ${isLoaded ? 'animate' : ''} flex items-center justify-center space-x-4`} style={{ animationDelay: '100ms' }}>
          <span className={`font-medium ${!isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
            Monthly
          </span>
          <Switch
            checked={isYearly}
            onCheckedChange={setIsYearly}
            className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-500 data-[state=checked]:to-purple-600"
          />
          <span className={`font-medium ${isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
            Yearly
          </span>
          {isYearly && (
            <Badge className="badge-success ml-2">
              Save up to 25%
            </Badge>
          )}
        </div>

        {/* Pricing Cards */}
        <div className={`slide-up ${isLoaded ? 'animate' : ''} grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto`} style={{ animationDelay: '200ms' }}>
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
            const savings = isYearly && plan.monthlyPrice > 0 ? calculateSavings(plan.monthlyPrice, plan.yearlyPrice) : null;
            
            return (
              <Card 
                key={plan.id} 
                className={`clean-card relative hover:shadow-2xl transition-all duration-500 ${
                  plan.popular 
                    ? 'ring-2 ring-primary shadow-xl scale-105' 
                    : ''
                } ${currentPlan === plan.id ? 'bg-primary/5 border-primary' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1">
                      <Star className="h-3 w-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <div className={`p-4 rounded-3xl bg-gradient-to-br ${plan.gradient} shadow-lg mx-auto mb-4 w-fit`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-heading font-bold">{plan.name}</CardTitle>
                  <p className="text-muted-foreground text-sm">{plan.description}</p>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className="flex items-baseline justify-center space-x-1">
                      <span className="text-4xl font-heading font-bold text-foreground">
                        ₹{price.toLocaleString()}
                      </span>
                      <span className="text-muted-foreground">
                        /{isYearly ? 'year' : 'month'}
                      </span>
                    </div>
                    {savings && (
                      <div className="text-sm text-green-600 mt-1">
                        Save ₹{savings.savings.toLocaleString()} ({savings.percentage}%)
                      </div>
                    )}
                  </div>
                  
                  <Button 
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg' 
                        : 'btn-outline'
                    } ${currentPlan === plan.id ? 'bg-green-500 hover:bg-green-600 text-white' : ''}`}
                    onClick={() => setCurrentPlan(plan.id)}
                  >
                    {currentPlan === plan.id ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Current Plan
                      </>
                    ) : (
                      <>
                        {plan.id === 'free' ? 'Get Started' : 'Upgrade Now'}
                        <Sparkles className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </Button>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground">What's included:</h4>
                    <ul className="space-y-2">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm">
                          <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {plan.limitations.length > 0 && (
                      <ul className="space-y-2 pt-3 border-t border-border">
                        {plan.limitations.map((limitation, idx) => (
                          <li key={idx} className="flex items-center text-sm text-muted-foreground">
                            <X className="h-4 w-4 text-red-500 mr-3 flex-shrink-0" />
                            <span>{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Premium Features Preview */}
        <Card className={`clean-card slide-up ${isLoaded ? 'animate' : ''}`} style={{ animationDelay: '300ms' }}>
          <CardHeader>
            <CardTitle className="text-center text-2xl font-heading font-bold">
              Premium Features Preview
            </CardTitle>
            <p className="text-center text-muted-foreground">
              See what you're missing with our advanced features
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {premiumFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div 
                    key={index} 
                    className={`relative p-6 rounded-lg border border-border text-center ${
                      feature.locked ? 'opacity-60' : ''
                    }`}
                  >
                    {feature.locked && (
                      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <Lock className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                          <Button size="sm" variant="outline">
                            Upgrade to Unlock
                          </Button>
                        </div>
                      </div>
                    )}
                    
                    <Icon className="h-8 w-8 text-primary mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Affiliate Offers */}
        <Card className={`clean-card slide-up ${isLoaded ? 'animate' : ''}`} style={{ animationDelay: '400ms' }}>
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600">
                <Gift className="h-6 w-6 text-white" />
              </div>
              <span>Exclusive Partner Offers</span>
              <Badge className="badge-success">Earn Cashback</Badge>
            </CardTitle>
            <p className="text-muted-foreground">
              Explore curated financial products from our trusted partners and earn rewards
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {affiliateOffers.map((offer) => (
                <Card key={offer.id} className="clean-card-subtle hover:shadow-lg transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="text-3xl">{offer.image}</div>
                        <div>
                          <h3 className="font-semibold text-foreground">{offer.title}</h3>
                          <p className="text-sm text-muted-foreground">{offer.partner}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{offer.rating}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">{offer.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-green-600">{offer.offer}</span>
                        <Badge className="badge-success text-xs">{offer.commission}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{offer.terms}</p>
                    </div>
                    
                    <Button size="sm" className="w-full btn-outline group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                      {offer.cta}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact Sales */}
        <Card className={`clean-card text-center slide-up ${isLoaded ? 'animate' : ''}`} style={{ animationDelay: '500ms' }}>
          <CardContent className="p-8">
            <h3 className="text-2xl font-heading font-bold mb-4">Need a Custom Solution?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              For enterprises and large teams, we offer custom pricing and dedicated support. 
              Contact our sales team to discuss your requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-primary">
                <Phone className="h-4 w-4 mr-2" />
                Contact Sales
              </Button>
              <Button variant="outline" className="btn-outline">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Demo
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}