
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import { Volume2, VolumeX, ArrowLeft } from "lucide-react";
import confetti from 'canvas-confetti';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [userRole, setUserRole] = useState("student");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);
  const navigate = useNavigate();

  // Mock data - in real app, this would come from a database
  const classes = ["Class 6", "Class 7", "Class 8", "Class 9", "Class 10"];
  const sections = ["A", "B", "C", "D"];

  useEffect(() => {
    const interval = setInterval(() => {
      const floatingElements = document.querySelectorAll('.floating-element');
      floatingElements.forEach((el) => {
        const randomX = Math.random() * 20 - 10;
        const randomY = Math.random() * 20 - 10;
        (el as HTMLElement).style.transform = `translate(${randomX}px, ${randomY}px)`;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create user session with role and class info
    const userSession = {
      name,
      email,
      role: userRole,
      class: selectedClass,
      section: selectedSection,
      age: userRole === "student" ? age : null,
      loginTime: new Date().toISOString()
    };

    localStorage.setItem('authToken', `${userRole}-token`);
    localStorage.setItem('userSession', JSON.stringify(userSession));
    
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 }
    });
    
    setTimeout(() => navigate('/'), 1500);
  };

  const handleElementHover = (element: string) => {
    setHoveredElement(element);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-indigo-900 dark:to-purple-900 p-4 relative overflow-hidden">
      {/* Floating decorative elements */}
      <img src="https://cdn.pixabay.com/photo/2014/04/03/10/24/alphabet-blocks-310536_1280.png" 
        alt="Blocks" 
        className="floating-element absolute w-20 h-20 top-20 left-[20%] opacity-60 transition-all duration-1000" />
      
      <img src="https://cdn.pixabay.com/photo/2013/07/13/12/12/ruler-159478_1280.png" 
        alt="Ruler" 
        className="floating-element absolute w-16 h-16 top-40 right-[20%] opacity-60 transition-all duration-1000" />
      
      <img src="https://cdn.pixabay.com/photo/2014/04/03/11/08/abc-311294_1280.png" 
        alt="ABC" 
        className="floating-element absolute w-24 h-24 bottom-20 left-[15%] opacity-60 transition-all duration-1000" />

      {/* Navigation back */}
      <div className="absolute top-4 left-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/login')}
          onMouseEnter={() => handleElementHover('back')}
          onMouseLeave={() => setHoveredElement(null)}
          className={`rounded-full hover:bg-primary/10 hover:scale-110 transition-all duration-300 ${
            hoveredElement === 'back' ? 'animate-pulse' : ''
          }`}
        >
          <ArrowLeft className="h-6 w-6 text-primary" />
        </Button>
      </div>

      {/* Sound toggle button */}
      <div className="absolute top-4 right-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {}}
          onMouseEnter={() => handleElementHover('sound')}
          onMouseLeave={() => setHoveredElement(null)}
          className={`rounded-full hover:bg-primary/10 hover:scale-110 transition-all duration-300 ${
            hoveredElement === 'sound' ? 'animate-pulse' : ''
          }`}
        >
          <VolumeX className="h-6 w-6 text-primary" />
        </Button>
      </div>

      {/* Logo */}
      <div className="mb-6 text-center">
        <h1 className="text-5xl font-playfair font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-bounce-light">
          Echo.ai
        </h1>
        <p className="text-muted-foreground mt-2">Join our fun learning adventure!</p>
      </div>

      <Card className="w-full max-w-md animate-fade-in shadow-xl border-primary/20 hover:border-primary/50 transition-all duration-500">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Create Your Account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role Selection */}
            <div className="space-y-3">
              <Label className="text-primary font-medium">I am a:</Label>
              <RadioGroup value={userRole} onValueChange={setUserRole} className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="student" id="student" />
                  <Label htmlFor="student" className="cursor-pointer">👩‍🎓 Student</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="teacher" id="teacher" />
                  <Label htmlFor="teacher" className="cursor-pointer">🧑‍🏫 Teacher</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name" className="text-primary">Full Name</Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-primary/20 focus:border-primary"
                required
              />
            </div>
            
            {/* Age field only for students */}
            {userRole === "student" && (
              <div className="space-y-2">
                <Label htmlFor="age" className="text-primary">Age</Label>
                <Input
                  id="age"
                  type="number"
                  min="5"
                  max="18"
                  placeholder="How old are you?"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="border-primary/20 focus:border-primary"
                  required
                />
              </div>
            )}

            {/* Class Selection */}
            <div className="space-y-2">
              <Label className="text-primary">
                {userRole === "teacher" ? "Class You Teach" : "Your Class"}
              </Label>
              <Select value={selectedClass} onValueChange={setSelectedClass} required>
                <SelectTrigger className="border-primary/20 focus:border-primary">
                  <SelectValue placeholder="Select a class" />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((className) => (
                    <SelectItem key={className} value={className}>
                      {className}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Section Selection */}
            <div className="space-y-2">
              <Label className="text-primary">
                {userRole === "teacher" ? "Section You Handle" : "Your Section"}
              </Label>
              <Select value={selectedSection} onValueChange={setSelectedSection} required>
                <SelectTrigger className="border-primary/20 focus:border-primary">
                  <SelectValue placeholder="Select a section" />
                </SelectTrigger>
                <SelectContent>
                  {sections.map((section) => (
                    <SelectItem key={section} value={section}>
                      Section {section}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-primary">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-primary/20 focus:border-primary"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-primary">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-primary/20 focus:border-primary"
                required
              />
            </div>
            
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary-dark hover:scale-105 transition-all duration-300"
              onMouseEnter={() => handleElementHover('register')}
              onMouseLeave={() => setHoveredElement(null)}
            >
              Create Account
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center w-full">
            <span className="text-muted-foreground">Already have an account? </span>
            <Link
              to="/login"
              className="text-accent hover:text-accent-dark hover:underline transition-colors"
              onMouseEnter={() => handleElementHover('login')}
              onMouseLeave={() => setHoveredElement(null)}
            >
              Log in
            </Link>
          </div>
        </CardFooter>
      </Card>

      {/* Decorative elements */}
      <div className="absolute bottom-10 right-10 animate-float">
        <div className="bg-primary/10 p-4 rounded-full">
          <img 
            src="https://cdn.pixabay.com/photo/2016/04/01/11/12/boy-1300231_1280.png" 
            alt="Happy student" 
            className="w-24 h-24 object-contain" 
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
