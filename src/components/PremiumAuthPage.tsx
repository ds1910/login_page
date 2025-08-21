import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EnhancedInput } from '@/components/ui/enhanced-input';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Mail, 
  Lock, 
  User, 
  Github, 
  Chrome,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import AnimatedBackground from './AnimatedBackground';
import FloatingShapes from './FloatingShapes';

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const PremiumAuthPage = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    rememberMe: false,
  });

  // Auto-enable dark mode
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Signup specific validations
    if (activeTab === 'signup') {
      if (!formData.name) {
        newErrors.name = 'Name is required';
      } else if (formData.name.length < 2) {
        newErrors.name = 'Name must be at least 2 characters';
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: activeTab === 'login' ? 'Welcome back!' : 'Account created!',
        description: activeTab === 'login' 
          ? 'You have been successfully logged in.' 
          : 'Your account has been created successfully.',
        variant: 'default',
      });
      
      console.log('Form submitted:', { ...formData, activeTab });
    } catch (error) {
      toast({
        title: 'Something went wrong',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`${provider} login clicked`);
    toast({
      title: `${provider} Login`,
      description: `Redirecting to ${provider}...`,
      variant: 'default',
    });
  };

  const isEmailValid = formData.email && !errors.email && formData.email.includes('@');
  const isPasswordValid = formData.password && !errors.password && formData.password.length >= 6;
  const isNameValid = formData.name && !errors.name && formData.name.length >= 2;
  const isConfirmPasswordValid = formData.confirmPassword && !errors.confirmPassword && formData.password === formData.confirmPassword;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground />
      <FloatingShapes />
      
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="w-full max-w-md"
        >
          {/* Glass Card */}
          <div className="glass rounded-3xl shadow-card backdrop-blur-xl border border-card-border p-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-center mb-8"
            >
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-foreground to-text-secondary bg-clip-text text-transparent">
                  Signify
                </h1>
              </div>
              <p className="text-muted-foreground">
                {activeTab === 'login' 
                  ? 'Welcome back! Please sign in to continue.' 
                  : 'Create your account to get started.'
                }
              </p>
            </motion.div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 h-14 glass border border-card-border rounded-2xl p-1 mb-8">
                <TabsTrigger 
                  value="login" 
                  className="h-12 rounded-xl text-sm font-medium transition-all duration-300 data-[state=active]:bg-gradient-primary data-[state=active]:text-white data-[state=active]:shadow-primary"
                >
                  Sign In
                </TabsTrigger>
                <TabsTrigger 
                  value="signup"
                  className="h-12 rounded-xl text-sm font-medium transition-all duration-300 data-[state=active]:bg-gradient-primary data-[state=active]:text-white data-[state=active]:shadow-primary"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <AnimatePresence mode="wait">
                {/* Login Form */}
                <TabsContent value="login" className="space-y-6">
                  <motion.form
                    key="login"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    {/* Email Input */}
                    <EnhancedInput
                      id="login-email"
                      name="email"
                      type="email"
                      label="Email Address"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                      icon={<Mail className="h-4 w-4" />}
                      error={errors.email}
                      success={isEmailValid}
                      required
                      aria-label="Email address"
                    />

                    {/* Password Input */}
                    <EnhancedInput
                      id="login-password"
                      name="password"
                      label="Password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleInputChange}
                      icon={<Lock className="h-4 w-4" />}
                      isPassword
                      showPassword={showPassword}
                      onTogglePassword={() => setShowPassword(!showPassword)}
                      error={errors.password}
                      success={isPasswordValid}
                      required
                      aria-label="Password"
                    />

                    {/* Remember Me & Forgot Password */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="remember-me"
                          name="rememberMe"
                          checked={formData.rememberMe}
                          onCheckedChange={(checked) => 
                            setFormData(prev => ({ ...prev, rememberMe: !!checked }))
                          }
                          className="border-input-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                          aria-label="Remember me"
                        />
                        <Label 
                          htmlFor="remember-me" 
                          className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                        >
                          Remember me
                        </Label>
                      </div>
                      <button
                        type="button"
                        className="text-sm text-primary hover:text-primary-hover transition-colors relative group"
                      >
                        Forgot Password?
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                      </button>
                    </div>

                    {/* Sign In Button */}
                    <EnhancedButton
                      type="submit"
                      className="w-full"
                      loading={loading}
                      disabled={loading}
                    >
                      {loading ? 'Signing In...' : 'Sign In'}
                      {!loading && <ArrowRight className="w-4 h-4 ml-2" />}
                    </EnhancedButton>
                  </motion.form>
                </TabsContent>

                {/* Signup Form */}
                <TabsContent value="signup" className="space-y-6">
                  <motion.form
                    key="signup"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    {/* Name Input */}
                    <EnhancedInput
                      id="signup-name"
                      name="name"
                      type="text"
                      label="Full Name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleInputChange}
                      icon={<User className="h-4 w-4" />}
                      error={errors.name}
                      success={isNameValid}
                      required
                      aria-label="Full name"
                    />

                    {/* Email Input */}
                    <EnhancedInput
                      id="signup-email"
                      name="email"
                      type="email"
                      label="Email Address"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                      icon={<Mail className="h-4 w-4" />}
                      error={errors.email}
                      success={isEmailValid}
                      required
                      aria-label="Email address"
                    />

                    {/* Password Input */}
                    <EnhancedInput
                      id="signup-password"
                      name="password"
                      label="Password"
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={handleInputChange}
                      icon={<Lock className="h-4 w-4" />}
                      isPassword
                      showPassword={showPassword}
                      onTogglePassword={() => setShowPassword(!showPassword)}
                      error={errors.password}
                      success={isPasswordValid}
                      required
                      aria-label="Password"
                    />

                    {/* Confirm Password Input */}
                    <EnhancedInput
                      id="confirm-password"
                      name="confirmPassword"
                      label="Confirm Password"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      icon={<Lock className="h-4 w-4" />}
                      isPassword
                      showPassword={showConfirmPassword}
                      onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
                      error={errors.confirmPassword}
                      success={isConfirmPasswordValid}
                      required
                      aria-label="Confirm password"
                    />

                    {/* Create Account Button */}
                    <EnhancedButton
                      type="submit"
                      className="w-full"
                      loading={loading}
                      disabled={loading}
                    >
                      {loading ? 'Creating Account...' : 'Create Account'}
                      {!loading && <ArrowRight className="w-4 h-4 ml-2" />}
                    </EnhancedButton>
                  </motion.form>
                </TabsContent>
              </AnimatePresence>
            </Tabs>

            {/* Social Login Section */}
            <div className="mt-8 space-y-4">
              <div className="relative">
                <Separator className="bg-card-border" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-card-solid px-4 text-sm text-muted-foreground">
                    or continue with
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <EnhancedButton
                  variant="social"
                  onClick={() => handleSocialLogin('Google')}
                  aria-label="Continue with Google"
                >
                  <Chrome className="w-4 h-4" />
                  Google
                </EnhancedButton>
                <EnhancedButton
                  variant="social"
                  onClick={() => handleSocialLogin('GitHub')}
                  aria-label="Continue with GitHub"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </EnhancedButton>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-xs text-muted-foreground">
                By continuing, you agree to our{' '}
                <button className="text-primary hover:text-primary-hover transition-colors underline">
                  Terms of Service
                </button>{' '}
                and{' '}
                <button className="text-primary hover:text-primary-hover transition-colors underline">
                  Privacy Policy
                </button>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PremiumAuthPage;