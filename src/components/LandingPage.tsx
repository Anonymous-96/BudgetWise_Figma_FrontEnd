import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { 
  Building2, 
  TrendingUp, 
  Shield, 
  Smartphone, 
  BarChart3,
  Star,
  ArrowRight,
  Users,
  DollarSign,
  Award,
  Brain,
  PieChart,
  Target,
  Sun,
  Moon,
  CheckCircle,
  Globe,
  Zap,
  Lock,
  Calculator,
  FileText
} from 'lucide-react';

interface LandingPageProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export default function LandingPage({ isDarkMode, toggleDarkMode }: LandingPageProps) {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      { threshold: 0.1, rootMargin: '20px' }
    );

    const elements = document.querySelectorAll('.slide-up, .scale-in');
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  const features = [
    {
      icon: <Brain className="h-6 w-6 text-primary" />,
      title: "AI-Powered Insights",
      description: "Advanced machine learning algorithms analyze your spending patterns and provide personalized financial recommendations."
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-primary" />,
      title: "Real-time Analytics",
      description: "Get instant insights into your financial health with comprehensive dashboards and detailed reporting."
    },
    {
      icon: <Target className="h-6 w-6 text-primary" />,
      title: "Goal Tracking",
      description: "Set and monitor financial goals with intelligent milestone tracking and progress visualization."
    },
    {
      icon: <Shield className="h-6 w-6 text-primary" />,
      title: "Bank-level Security",
      description: "Enterprise-grade encryption and security protocols protect your sensitive financial information."
    },
    {
      icon: <Calculator className="h-6 w-6 text-primary" />,
      title: "Smart Budgeting",
      description: "Automated budget creation and expense categorization with intelligent spending recommendations."
    },
    {
      icon: <FileText className="h-6 w-6 text-primary" />,
      title: "Detailed Reports",
      description: "Comprehensive financial reports with actionable insights for better money management decisions."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Financial Advisor",
      content: "This platform has revolutionized how I manage client portfolios. The insights are incredibly accurate and the interface is intuitive.",
      rating: 5,
      company: "Wealth Partners LLC"
    },
    {
      name: "Michael Rodriguez",
      role: "Small Business Owner",
      content: "The automated categorization and reporting features have saved me hours each week. Highly recommended for business owners.",
      rating: 5,
      company: "Rodriguez Consulting"
    },
    {
      name: "Emily Thompson",
      role: "Personal Finance Enthusiast",
      content: "Finally, a financial app that doesn't overwhelm you with features. Clean, professional, and incredibly effective.",
      rating: 5,
      company: "Individual User"
    }
  ];

  const stats = [
    { 
      value: "$2.5M+", 
      label: "Assets Managed", 
      icon: <DollarSign className="h-5 w-5 text-primary" />
    },
    { 
      value: "50,000+", 
      label: "Active Users", 
      icon: <Users className="h-5 w-5 text-primary" />
    },
    { 
      value: "99.9%", 
      label: "Uptime", 
      icon: <Globe className="h-5 w-5 text-primary" />
    },
    { 
      value: "4.9/5", 
      label: "User Rating", 
      icon: <Award className="h-5 w-5 text-primary" />
    }
  ];

  const trustFeatures = [
    { icon: <Lock className="h-5 w-5 text-primary" />, title: "256-bit Encryption", description: "Military-grade security" },
    { icon: <Shield className="h-5 w-5 text-primary" />, title: "SOC 2 Compliant", description: "Industry-standard compliance" },
    { icon: <CheckCircle className="h-5 w-5 text-primary" />, title: "GDPR Ready", description: "Privacy-first approach" },
    { icon: <Zap className="h-5 w-5 text-primary" />, title: "99.9% Uptime", description: "Reliable and fast" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Clean Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container-clean">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <Building2 className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <span className="text-lg font-heading font-semibold text-foreground">FinanceFlow</span>
                <div className="text-xs text-muted-foreground">Professional Finance</div>
              </div>
            </div>
            
            <nav className="hidden lg:flex items-center space-x-8">
              <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Features
              </a>
              <a href="#testimonials" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Testimonials
              </a>
              <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </a>
              
              {/* Theme Toggle */}
              <div className="flex items-center space-x-2 rounded-lg border border-border px-3 py-1.5">
                <Sun className="h-4 w-4 text-muted-foreground" />
                <Switch
                  checked={isDarkMode}
                  onCheckedChange={toggleDarkMode}
                  aria-label="Toggle dark mode"
                />
                <Moon className="h-4 w-4 text-muted-foreground" />
              </div>
              
              <Link to="/dashboard">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button size="sm">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="section-padding">
        <div className="container-clean">
          <div className="mx-auto max-w-4xl text-center">
            <div className="fade-in mb-8">
              <Badge className="badge-primary mb-6">
                <Smartphone className="mr-2 h-3 w-3" />
                Now Available on Web & Mobile
              </Badge>
            </div>
            
            <div className="slide-up mb-6">
              <h1 className="mb-6 text-4xl font-heading font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Professional Financial
                <span className="block text-primary">Management</span>
              </h1>
            </div>
            
            <div className="slide-up mb-8" style={{ animationDelay: '100ms' }}>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                Streamline your finances with professional-grade tools designed for individuals, 
                businesses, and financial advisors. Experience the future of money management.
              </p>
            </div>
            
            <div className="slide-up mb-12 flex flex-col gap-4 sm:flex-row sm:justify-center" style={{ animationDelay: '200ms' }}>
              <Link to="/dashboard">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Schedule Demo
              </Button>
            </div>
            
            {/* Stats */}
            <div className="slide-up grid grid-cols-2 gap-4 sm:grid-cols-4" style={{ animationDelay: '300ms' }}>
              {stats.map((stat, index) => (
                <div key={index} className="clean-card-subtle p-6 text-center">
                  <div className="mb-2 flex justify-center">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-heading font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-muted/30">
        <div className="container-clean">
          <div className="slide-up mx-auto max-w-3xl text-center mb-12">
            <h2 className="mb-4 text-3xl font-heading font-bold">
              Trusted by Professionals Worldwide
            </h2>
            <p className="text-lg text-muted-foreground">
              Enterprise-grade security and reliability that financial professionals depend on.
            </p>
          </div>
          
          <div className="slide-up grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4" style={{ animationDelay: '100ms' }}>
            {trustFeatures.map((feature, index) => (
              <div key={index} className="clean-card p-6 text-center">
                <div className="mb-4 flex justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    {feature.icon}
                  </div>
                </div>
                <h4 className="mb-2 font-heading font-semibold">{feature.title}</h4>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section-padding">
        <div className="container-clean">
          <div className="slide-up mx-auto max-w-3xl text-center mb-16">
            <h2 className="mb-4 text-3xl font-heading font-bold">
              Everything You Need for Financial Success
            </h2>
            <p className="text-lg text-muted-foreground">
              Comprehensive tools designed to simplify complex financial management tasks.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="slide-up clean-card p-6"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  {feature.icon}
                </div>
                <h3 className="mb-3 text-lg font-heading font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="section-padding bg-muted/30">
        <div className="container-clean">
          <div className="slide-up mx-auto max-w-3xl text-center mb-16">
            <h2 className="mb-4 text-3xl font-heading font-bold">
              What Our Users Say
            </h2>
            <p className="text-lg text-muted-foreground">
              Trusted by thousands of professionals and individuals worldwide.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="slide-up clean-card p-6"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="mb-4 flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current text-amber-400" />
                  ))}
                </div>
                <blockquote className="mb-6 text-muted-foreground">
                  "{testimonial.content}"
                </blockquote>
                <div>
                  <div className="font-heading font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  <div className="text-xs text-muted-foreground">{testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-clean">
          <div className="slide-up mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-heading font-bold">
              Ready to Transform Your Finances?
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Join thousands of users who have already simplified their financial management.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link to="/dashboard">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30">
        <div className="container-clean">
          <div className="grid grid-cols-1 gap-8 py-16 md:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <Building2 className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="font-heading font-semibold">FinanceFlow</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Professional financial management for the modern world.
              </p>
            </div>
            
            {[
              { title: 'Product', items: ['Features', 'Pricing', 'Security', 'API'] },
              { title: 'Company', items: ['About', 'Careers', 'Blog', 'Contact'] },
              { title: 'Support', items: ['Help Center', 'Documentation', 'Status', 'Privacy'] }
            ].map((section, index) => (
              <div key={section.title}>
                <h3 className="mb-4 font-heading font-semibold">{section.title}</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {section.items.map((item) => (
                    <li key={item}>
                      <a href="#" className="hover:text-foreground transition-colors">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t border-border py-8 text-center text-sm text-muted-foreground">
            © 2025 FinanceFlow. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}