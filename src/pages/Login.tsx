
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import { Volume2, VolumeX, Eye, EyeOff } from "lucide-react";
import confetti from 'canvas-confetti';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState("student");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if already authenticated
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      
      // Set authentication token with role
      localStorage.setItem('authToken', `${userRole}-token`);
      localStorage.setItem('userSession', JSON.stringify({
        email,
        name: email.split('@')[0],
        role: userRole,
        // Mock class/section for demo - in real app this would come from database
        class: userRole === "teacher" ? "Class 8" : "Class 7",
        section: "A",
        loginTime: new Date().toISOString()
      }));
      
      setIsLoading(false);
      navigate('/');
    }, 1500);
  };

  const handleGuestLogin = () => {
    localStorage.setItem('authToken', 'guest-token');
    localStorage.setItem('userSession', JSON.stringify({
      email: 'guest@echo.ai',
      name: 'Guest User',
      role: 'student',
      class: 'Class 7',
      section: 'A',
      loginTime: new Date().toISOString()
    }));
    navigate('/');
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-4 bg-gradient-to-br from-background to-muted/30">
        <div className="w-full max-w-md space-y-6">
          {/* Logo and Title */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-playfair font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Echo.ai
            </h1>
            <p className="text-muted-foreground">
              Welcome back! Please sign in to your account.
            </p>
          </div>

          {/* Login Card */}
          <Card className="border-2 border-border/50 shadow-xl">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-2xl text-center">Sign In</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Role Selection */}
                <div className="space-y-3">
                  <Label className="text-primary font-medium">I am a:</Label>
                  <RadioGroup value={userRole} onValueChange={setUserRole} className="flex flex-row space-x-6">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="student" id="login-student" />
                      <Label htmlFor="login-student" className="cursor-pointer">👩‍🎓 Student</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="teacher" id="login-teacher" />
                      <Label htmlFor="login-teacher" className="cursor-pointer">🧑‍🏫 Teacher</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    placeholder="your.email@example.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 border-2 focus:border-primary transition-colors"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      to="/forgot-password"
                      className="text-sm text-primary hover:text-primary/80 transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12 border-2 focus:border-primary transition-colors pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1 h-10 w-10 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-all duration-300 transform hover:scale-[1.02]"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Signing in...
                    </div>
                  ) : (
                    `Sign In as ${userRole === 'teacher' ? 'Teacher' : 'Student'}`
                  )}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button
                variant="outline"
                className="w-full h-12 border-2 hover:bg-muted/50 transition-colors"
                onClick={handleGuestLogin}
              >
                Continue as Guest Student
              </Button>
              <div className="text-center">
                <span className="text-muted-foreground">New to Echo.ai? </span>
                <Link
                  to="/register"
                  className="text-primary hover:text-primary/80 font-semibold transition-colors"
                >
                  Create an account
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Right side - Hero Image/Content (Hidden on mobile) */}
      <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-primary/10 to-accent/10 relative overflow-hidden">
        <div className="flex items-center justify-center w-full p-12">
          <div className="text-center space-y-6 max-w-md">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-foreground">
                Master English with AI
              </h2>
              <p className="text-lg text-muted-foreground">
                {userRole === 'teacher' 
                  ? "Empower your students with AI-driven learning tools and comprehensive analytics."
                  : "Join thousands of learners improving their English skills with our AI-powered platform."
                }
              </p>
            </div>
            
            {/* Feature highlights */}
            <div className="space-y-3 text-left">
              {(userRole === 'teacher' ? [
                "📊 Student performance analytics",
                "📚 Content management tools", 
                "⚡ Custom challenge creation",
                "👥 Class & section management"
              ] : [
                "🎯 Personalized learning paths",
                "🗣️ Real-time pronunciation feedback",
                "🧩 Interactive word puzzles",
                "📈 Track your progress"
              ]).map((featureText, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg border border-border/30">
                  <span className="text-sm font-medium">{featureText}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-10 right-10 animate-float">
          <div className="bg-primary/20 p-4 rounded-full">
            <div className="w-12 h-12 bg-primary/30 rounded-full"></div>
          </div>
        </div>
        <div className="absolute bottom-20 left-10 animate-float" style={{ animationDelay: '1s' }}>
          <div className="bg-accent/20 p-3 rounded-full">
            <div className="w-8 h-8 bg-accent/30 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Sound toggle - positioned absolutely */}
      <div className="absolute top-4 right-4">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-primary/10 hover:scale-110 transition-all duration-300"
        >
          <VolumeX className="h-5 w-5 text-primary" />
        </Button>
      </div>
    </div>
  );
};

export default Login;
