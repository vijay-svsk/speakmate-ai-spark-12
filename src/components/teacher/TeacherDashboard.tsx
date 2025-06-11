
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Users, BookOpen, Zap, PuzzleIcon, BarChart3, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { StudentPerformanceTable } from "./StudentPerformanceTable";
import { ReflexChallengeManager } from "./ReflexChallengeManager";
import { StoryBuilderManager } from "./StoryBuilderManager";
import { WordPuzzleManager } from "./WordPuzzleManager";
import { TeacherAnalytics } from "./TeacherAnalytics";

export function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState("students");
  const navigate = useNavigate();
  
  const userSession = JSON.parse(localStorage.getItem('userSession') || '{}');
  const teacherName = userSession.name || 'Teacher';
  const teacherClass = userSession.class || 'Class';
  const teacherSection = userSession.section || 'A';

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userSession');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                🧑‍🏫 Teacher Dashboard
              </h1>
              <p className="text-muted-foreground">
                Welcome back, {teacherName} | {teacherClass} - Section {teacherSection}
              </p>
            </div>
            <Button onClick={handleLogout} variant="outline" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="students" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Students</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="reflex" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              <span className="hidden sm:inline">Reflex</span>
            </TabsTrigger>
            <TabsTrigger value="stories" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Stories</span>
            </TabsTrigger>
            <TabsTrigger value="puzzles" className="flex items-center gap-2">
              <PuzzleIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Puzzles</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="students" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Student Performance Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <StudentPerformanceTable classId={teacherClass} section={teacherSection} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <TeacherAnalytics classId={teacherClass} section={teacherSection} />
          </TabsContent>

          <TabsContent value="reflex" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Reflex Challenge Manager
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ReflexChallengeManager classId={teacherClass} section={teacherSection} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stories" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Story Builder Manager
                </CardTitle>
              </CardHeader>
              <CardContent>
                <StoryBuilderManager classId={teacherClass} section={teacherSection} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="puzzles" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PuzzleIcon className="h-5 w-5" />
                  Word Puzzle Manager
                </CardTitle>
              </CardHeader>
              <CardContent>
                <WordPuzzleManager classId={teacherClass} section={teacherSection} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
