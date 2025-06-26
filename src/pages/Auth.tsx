
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

interface AuthProps {
  language: 'en' | 'bn';
  toggleLanguage: () => void;
}

const Auth: React.FC<AuthProps> = ({ language, toggleLanguage }) => {
  const navigate = useNavigate();
  const { login, register, user } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  // Redirect if already logged in
  React.useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const content = {
    en: {
      login: 'Login',
      register: 'Register',
      loginTitle: 'Welcome Back',
      loginDescription: 'Sign in to your account to continue shopping',
      registerTitle: 'Create Account',
      registerDescription: 'Join Shajogouri family and start shopping',
      name: 'Full Name',
      email: 'Email Address',
      password: 'Password',
      loginButton: 'Sign In',
      registerButton: 'Create Account',
      switchToRegister: "Don't have an account? Register",
      switchToLogin: 'Already have an account? Login',
      adminNote: 'Admin login: sonaton.fl@gmail.com / 01753840087',
      loginError: 'Invalid email or password',
      registerError: 'Registration failed. Please try again.',
      loginSuccess: 'Welcome back!',
      registerSuccess: 'Account created successfully!',
    },
    bn: {
      login: 'লগইন',
      register: 'রেজিস্টার',
      loginTitle: 'স্বাগতম',
      loginDescription: 'শপিং চালিয়ে যেতে আপনার অ্যাকাউন্টে সাইন ইন করুন',
      registerTitle: 'অ্যাকাউন্ট তৈরি করুন',
      registerDescription: 'শাজগৌরী পরিবারে যোগ দিন এবং শপিং শুরু করুন',
      name: 'পূর্ণ নাম',
      email: 'ইমেইল ঠিকানা',
      password: 'পাসওয়ার্ড',
      loginButton: 'সাইন ইন',
      registerButton: 'অ্যাকাউন্ট তৈরি করুন',
      switchToRegister: 'অ্যাকাউন্ট নেই? রেজিস্টার করুন',
      switchToLogin: 'ইতিমধ্যে অ্যাকাউন্ট আছে? লগইন করুন',
      adminNote: 'অ্যাডমিন লগইন: sonaton.fl@gmail.com / 01753840087',
      loginError: 'ভুল ইমেইল বা পাসওয়ার্ড',
      registerError: 'রেজিস্ট্রেশন ব্যর্থ। আবার চেষ্টা করুন।',
      loginSuccess: 'স্বাগতম!',
      registerSuccess: 'অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!',
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let success = false;
      
      if (isLogin) {
        success = await login(formData.email, formData.password);
        if (success) {
          toast({
            title: content[language].loginSuccess,
            description: language === 'en' ? 'You have been logged in successfully.' : 'আপনি সফলভাবে লগইন হয়েছেন।',
          });
          navigate('/');
        } else {
          toast({
            title: content[language].loginError,
            variant: 'destructive'
          });
        }
      } else {
        success = await register(formData.email, formData.password, formData.name);
        if (success) {
          toast({
            title: content[language].registerSuccess,
            description: language === 'en' ? 'Welcome to Shajogouri!' : 'শাজগৌরীতে স্বাগতম!',
          });
          navigate('/');
        } else {
          toast({
            title: content[language].registerError,
            variant: 'destructive'
          });
        }
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-orange-50">
      <Header language={language} toggleLanguage={toggleLanguage} />
      
      <div className="flex items-center justify-center px-4 py-16">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-serif">
              {isLogin ? content[language].loginTitle : content[language].registerTitle}
            </CardTitle>
            <CardDescription>
              {isLogin ? content[language].loginDescription : content[language].registerDescription}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name">{content[language].name}</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="pl-10"
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email">{content[language].email}</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">{content[language].password}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-pink-600 hover:bg-pink-700"
                disabled={loading}
              >
                {loading ? '...' : (isLogin ? content[language].loginButton : content[language].registerButton)}
              </Button>
            </form>
            
            <div className="mt-6 text-center space-y-4">
              <Button
                variant="link"
                onClick={() => setIsLogin(!isLogin)}
                className="text-pink-600 hover:text-pink-700"
              >
                {isLogin ? content[language].switchToRegister : content[language].switchToLogin}
              </Button>
              
              {isLogin && (
                <p className="text-xs text-gray-500 bg-purple-50 p-2 rounded">
                  {content[language].adminNote}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer language={language} />
    </div>
  );
};

export default Auth;
