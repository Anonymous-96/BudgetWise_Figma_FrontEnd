import React, { useState, useEffect } from 'react';
import DashboardLayout from './DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  User, 
  Lock, 
  Bell, 
  Palette,
  Globe,
  Shield,
  CreditCard,
  Download,
  Upload,
  Trash2,
  Eye,
  EyeOff,
  Check,
  X,
  Camera,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Save,
  RefreshCw
} from 'lucide-react';

interface SettingsProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Settings({ isDarkMode, toggleDarkMode }: SettingsProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'Alex',
    lastName: 'Johnson',
    email: 'alex.johnson@financeflow.com',
    phone: '+91 98765 43210',
    location: 'Mumbai, India',
    dateOfBirth: '1990-05-15',
    bio: 'Financial enthusiast with a passion for smart investing and budgeting.'
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: true,
    marketingEmails: false,
    weeklyReports: true,
    goalReminders: true,
    securityAlerts: true,
    currency: 'INR',
    language: 'en',
    timezone: 'Asia/Kolkata',
    dateFormat: 'DD/MM/YYYY'
  });

  const [security, setSecurity] = useState({
    twoFactorEnabled: false,
    biometricEnabled: true,
    sessionTimeout: '30',
    loginNotifications: true
  });

  useEffect(() => {
    setIsLoaded(true);
    // Load user settings from localStorage or API
    loadUserSettings();
  }, []);

  const loadUserSettings = () => {
    try {
      const savedSettings = localStorage.getItem('financeflow-settings');
      if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        setPreferences(prev => ({ ...prev, ...settings.preferences }));
        setSecurity(prev => ({ ...prev, ...settings.security }));
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const saveSettings = async () => {
    setIsSaving(true);
    try {
      const settings = {
        profile: profileData,
        preferences,
        security,
        lastUpdated: new Date().toISOString()
      };
      
      localStorage.setItem('financeflow-settings', JSON.stringify(settings));
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success notification
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Error saving settings. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleProfileUpdate = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handlePreferenceUpdate = (field: string, value: boolean | string) => {
    setPreferences(prev => ({ ...prev, [field]: value }));
  };

  const handleSecurityUpdate = (field: string, value: boolean | string) => {
    setSecurity(prev => ({ ...prev, [field]: value }));
  };

  const handlePasswordChange = async () => {
    // Implement password change logic
    const currentPassword = (document.getElementById('currentPassword') as HTMLInputElement)?.value;
    const newPassword = (document.getElementById('newPassword') as HTMLInputElement)?.value;
    const confirmPassword = (document.getElementById('confirmPassword') as HTMLInputElement)?.value;

    if (!currentPassword || !newPassword || !confirmPassword) {
      alert('Please fill in all password fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      alert('New passwords do not match');
      return;
    }

    if (newPassword.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Password changed successfully!');
      
      // Clear password fields
      (document.getElementById('currentPassword') as HTMLInputElement).value = '';
      (document.getElementById('newPassword') as HTMLInputElement).value = '';
      (document.getElementById('confirmPassword') as HTMLInputElement).value = '';
    } catch (error) {
      alert('Error changing password. Please try again.');
    }
  };

  const handleExportData = async () => {
    try {
      // Create mock data export
      const exportData = {
        profile: profileData,
        preferences,
        security: { ...security, twoFactorEnabled: undefined }, // Don't export sensitive data
        transactions: [], // Would fetch from API
        goals: [],
        budgets: [],
        exportDate: new Date().toISOString()
      };

      const dataStr = JSON.stringify(exportData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `financeflow-data-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      alert('Data exported successfully!');
    } catch (error) {
      alert('Error exporting data. Please try again.');
    }
  };

  const handleDeleteAccount = async () => {
    const confirmation = prompt('Type "DELETE" to confirm account deletion:');
    if (confirmation !== 'DELETE') {
      alert('Account deletion cancelled.');
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Clear all local data
      localStorage.clear();
      
      alert('Account deleted successfully. You will be redirected to the homepage.');
      window.location.href = '/';
    } catch (error) {
      alert('Error deleting account. Please contact support.');
    }
  };

  const handleAvatarChange = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          // In a real app, you'd upload to a server
          console.log('New avatar selected:', e.target?.result);
          alert('Avatar updated successfully!');
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const enable2FA = async () => {
    try {
      // Simulate 2FA setup
      const code = prompt('Enter the 6-digit code from your authenticator app:');
      if (code && code.length === 6) {
        handleSecurityUpdate('twoFactorEnabled', true);
        alert('Two-factor authentication enabled successfully!');
      } else {
        alert('Invalid code. Please try again.');
      }
    } catch (error) {
      alert('Error enabling 2FA. Please try again.');
    }
  };

  const disable2FA = async () => {
    const confirmation = confirm('Are you sure you want to disable two-factor authentication?');
    if (confirmation) {
      handleSecurityUpdate('twoFactorEnabled', false);
      alert('Two-factor authentication disabled.');
    }
  };

  return (
    <DashboardLayout isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}>
      <div className="space-y-8">
        {/* Header */}
        <div className={`slide-up ${isLoaded ? 'animate' : ''} flex items-center justify-between`}>
          <div>
            <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Settings</h1>
            <p className="text-muted-foreground">Manage your account preferences and security settings</p>
          </div>
          <Button 
            onClick={saveSettings} 
            disabled={isSaving}
            className="btn-primary"
          >
            {isSaving ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>

        {/* Settings Tabs */}
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="data">Data</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="clean-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <span>Profile Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar Section */}
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src="/api/placeholder/80/80" alt="Profile" />
                      <AvatarFallback className="bg-primary text-primary-foreground text-xl font-bold">
                        {profileData.firstName[0]}{profileData.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size="sm"
                      className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full bg-primary hover:bg-primary/90 p-0"
                      onClick={handleAvatarChange}
                    >
                      <Camera className="h-4 w-4 text-primary-foreground" />
                    </Button>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{profileData.firstName} {profileData.lastName}</h3>
                    <p className="text-muted-foreground">{profileData.email}</p>
                    <Badge className="badge-success mt-1">Verified Account</Badge>
                  </div>
                </div>

                {/* Profile Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={profileData.firstName}
                      onChange={(e) => handleProfileUpdate('firstName', e.target.value)}
                      className="input-clean"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={profileData.lastName}
                      onChange={(e) => handleProfileUpdate('lastName', e.target.value)}
                      className="input-clean"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => handleProfileUpdate('email', e.target.value)}
                        className="input-clean pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => handleProfileUpdate('phone', e.target.value)}
                        className="input-clean pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="location"
                        value={profileData.location}
                        onChange={(e) => handleProfileUpdate('location', e.target.value)}
                        className="input-clean pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={profileData.dateOfBirth}
                        onChange={(e) => handleProfileUpdate('dateOfBirth', e.target.value)}
                        className="input-clean pl-10"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => handleProfileUpdate('bio', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 resize-none"
                    placeholder="Tell us about yourself..."
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences" className="space-y-6">
            {/* Notification Preferences */}
            <Card className="clean-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600">
                    <Bell className="h-6 w-6 text-white" />
                  </div>
                  <span>Notifications</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive updates via email' },
                  { key: 'pushNotifications', label: 'Push Notifications', desc: 'Get instant notifications on your device' },
                  { key: 'marketingEmails', label: 'Marketing Emails', desc: 'Receive promotional content and offers' },
                  { key: 'weeklyReports', label: 'Weekly Reports', desc: 'Get weekly financial summaries' },
                  { key: 'goalReminders', label: 'Goal Reminders', desc: 'Reminders for your financial goals' },
                  { key: 'securityAlerts', label: 'Security Alerts', desc: 'Important security notifications' }
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between py-2">
                    <div>
                      <div className="font-medium text-foreground">{item.label}</div>
                      <div className="text-sm text-muted-foreground">{item.desc}</div>
                    </div>
                    <Switch
                      checked={preferences[item.key as keyof typeof preferences] as boolean}
                      onCheckedChange={(checked) => handlePreferenceUpdate(item.key, checked)}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Display Preferences */}
            <Card className="clean-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600">
                    <Palette className="h-6 w-6 text-white" />
                  </div>
                  <span>Display & Localization</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Currency</Label>
                    <select
                      value={preferences.currency}
                      onChange={(e) => handlePreferenceUpdate('currency', e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    >
                      <option value="INR">Indian Rupee (₹)</option>
                      <option value="USD">US Dollar ($)</option>
                      <option value="EUR">Euro (€)</option>
                      <option value="GBP">British Pound (£)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Language</Label>
                    <select
                      value={preferences.language}
                      onChange={(e) => handlePreferenceUpdate('language', e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    >
                      <option value="en">English</option>
                      <option value="hi">Hindi</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Timezone</Label>
                    <select
                      value={preferences.timezone}
                      onChange={(e) => handlePreferenceUpdate('timezone', e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    >
                      <option value="Asia/Kolkata">Asia/Kolkata</option>
                      <option value="America/New_York">America/New_York</option>
                      <option value="Europe/London">Europe/London</option>
                      <option value="Asia/Tokyo">Asia/Tokyo</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Date Format</Label>
                    <select
                      value={preferences.dateFormat}
                      onChange={(e) => handlePreferenceUpdate('dateFormat', e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    >
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>
                </div>

                {/* Theme Toggle */}
                <div className="flex items-center justify-between py-2 border-t border-border pt-4">
                  <div>
                    <div className="font-medium text-foreground">Dark Mode</div>
                    <div className="text-sm text-muted-foreground">Switch between light and dark themes</div>
                  </div>
                  <Switch
                    checked={isDarkMode}
                    onCheckedChange={toggleDarkMode}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            {/* Password Change */}
            <Card className="clean-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-red-500 to-pink-600">
                    <Lock className="h-6 w-6 text-white" />
                  </div>
                  <span>Change Password</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showPassword ? 'text' : 'password'}
                      className="input-clean pr-10"
                      placeholder="Enter current password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-auto p-1"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      type={showNewPassword ? 'text' : 'password'}
                      className="input-clean pr-10"
                      placeholder="Enter new password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-auto p-1"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    className="input-clean"
                    placeholder="Confirm new password"
                  />
                </div>
                <Button onClick={handlePasswordChange} className="btn-primary">
                  Change Password
                </Button>
              </CardContent>
            </Card>

            {/* Security Settings */}
            <Card className="clean-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-orange-500 to-red-600">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <span>Security Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <div>
                    <div className="font-medium text-foreground">Two-Factor Authentication</div>
                    <div className="text-sm text-muted-foreground">Add an extra layer of security</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {security.twoFactorEnabled && (
                      <Badge className="badge-success">Enabled</Badge>
                    )}
                    <Button
                      size="sm"
                      variant={security.twoFactorEnabled ? "destructive" : "default"}
                      onClick={security.twoFactorEnabled ? disable2FA : enable2FA}
                      className={security.twoFactorEnabled ? "" : "btn-primary"}
                    >
                      {security.twoFactorEnabled ? 'Disable' : 'Enable'}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between py-2">
                  <div>
                    <div className="font-medium text-foreground">Biometric Authentication</div>
                    <div className="text-sm text-muted-foreground">Use fingerprint or face recognition</div>
                  </div>
                  <Switch
                    checked={security.biometricEnabled}
                    onCheckedChange={(checked) => handleSecurityUpdate('biometricEnabled', checked)}
                  />
                </div>

                <div className="flex items-center justify-between py-2">
                  <div>
                    <div className="font-medium text-foreground">Login Notifications</div>
                    <div className="text-sm text-muted-foreground">Get notified of new logins</div>
                  </div>
                  <Switch
                    checked={security.loginNotifications}
                    onCheckedChange={(checked) => handleSecurityUpdate('loginNotifications', checked)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Session Timeout (minutes)</Label>
                  <select
                    value={security.sessionTimeout}
                    onChange={(e) => handleSecurityUpdate('sessionTimeout', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  >
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="120">2 hours</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing" className="space-y-6">
            <Card className="clean-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600">
                    <CreditCard className="h-6 w-6 text-white" />
                  </div>
                  <span>Billing & Subscription</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <h3 className="font-semibold text-foreground">Premium Plan</h3>
                    <p className="text-muted-foreground">₹499/month • Next billing: Feb 25, 2025</p>
                  </div>
                  <Badge className="badge-success">Active</Badge>
                </div>

                <div className="flex space-x-4">
                  <Button 
                    className="btn-outline"
                    onClick={() => window.location.href = '/subscription'}
                  >
                    Change Plan
                  </Button>
                  <Button 
                    variant="destructive"
                    onClick={() => {
                      if (confirm('Are you sure you want to cancel your subscription?')) {
                        alert('Subscription cancelled. You will retain access until the end of your billing period.');
                      }
                    }}
                  >
                    Cancel Subscription
                  </Button>
                </div>

                <div className="border-t border-border pt-4">
                  <h4 className="font-medium text-foreground mb-3">Billing History</h4>
                  <div className="space-y-2">
                    {[
                      { date: '2025-01-25', amount: '₹499', status: 'Paid' },
                      { date: '2024-12-25', amount: '₹499', status: 'Paid' },
                      { date: '2024-11-25', amount: '₹499', status: 'Paid' }
                    ].map((invoice, index) => (
                      <div key={index} className="flex items-center justify-between py-2">
                        <div>
                          <span className="font-medium">{invoice.date}</span>
                          <span className="text-muted-foreground ml-2">{invoice.amount}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className="badge-success">{invoice.status}</Badge>
                          <Button size="sm" variant="ghost">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Data Tab */}
          <TabsContent value="data" className="space-y-6">
            <Card className="clean-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600">
                    <Globe className="h-6 w-6 text-white" />
                  </div>
                  <span>Data Management</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div>
                      <h4 className="font-medium text-foreground">Export Data</h4>
                      <p className="text-sm text-muted-foreground">Download all your financial data</p>
                    </div>
                    <Button onClick={handleExportData} className="btn-outline">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div>
                      <h4 className="font-medium text-foreground">Import Data</h4>
                      <p className="text-sm text-muted-foreground">Import transactions from CSV files</p>
                    </div>
                    <Button className="btn-outline">
                      <Upload className="h-4 w-4 mr-2" />
                      Import
                    </Button>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <h4 className="font-medium text-foreground mb-3 text-red-600">Danger Zone</h4>
                  <div className="p-4 border border-red-200 dark:border-red-800 rounded-lg bg-red-50 dark:bg-red-900/10">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium text-red-800 dark:text-red-400">Delete Account</h5>
                        <p className="text-sm text-red-600 dark:text-red-500">Permanently delete your account and all data</p>
                      </div>
                      <Button 
                        variant="destructive"
                        onClick={handleDeleteAccount}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}