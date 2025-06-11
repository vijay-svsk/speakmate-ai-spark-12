
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Users, Clock, Award } from "lucide-react";

interface TeacherAnalyticsProps {
  classId: string;
  section: string;
}

export function TeacherAnalytics({ classId, section }: TeacherAnalyticsProps) {
  // Mock analytics data
  const classPerformanceData = [
    { skill: "Speaking", average: 78, target: 80 },
    { skill: "Pronunciation", average: 72, target: 75 },
    { skill: "Vocabulary", average: 85, target: 80 },
    { skill: "Grammar", average: 80, target: 85 },
    { skill: "Story", average: 77, target: 75 },
    { skill: "Reflex", average: 82, target: 80 }
  ];

  const weeklyProgressData = [
    { week: "Week 1", students: 8, activeStudents: 6, avgScore: 72 },
    { week: "Week 2", students: 12, activeStudents: 10, avgScore: 75 },
    { week: "Week 3", students: 15, activeStudents: 13, avgScore: 78 },
    { week: "Week 4", students: 18, activeStudents: 16, avgScore: 81 }
  ];

  const engagementData = [
    { name: "Highly Engaged", value: 45, color: "#22c55e" },
    { name: "Moderately Engaged", value: 35, color: "#eab308" },
    { name: "Low Engagement", value: 20, color: "#ef4444" }
  ];

  const topPerformers = [
    { name: "Alice Johnson", score: 89 },
    { name: "Carol Davis", score: 86 },
    { name: "Bob Smith", score: 78 }
  ];

  const needsAttention = [
    { name: "David Wilson", score: 58 },
    { name: "Emma Brown", score: 62 },
    { name: "Frank Miller", score: 65 }
  ];

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="text-2xl font-bold">18</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Avg Performance</p>
                <p className="text-2xl font-bold">79%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Avg Time Spent</p>
                <p className="text-2xl font-bold">112m</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-sm text-muted-foreground">Active Students</p>
                <p className="text-2xl font-bold">16/18</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Class Performance by Skill */}
        <Card>
          <CardHeader>
            <CardTitle>Class Performance by Skill</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={classPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="skill" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="average" fill="#3b82f6" name="Class Average" />
                <Bar dataKey="target" fill="#10b981" name="Target" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Weekly Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Progress Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyProgressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="avgScore" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  name="Average Score"
                />
                <Line 
                  type="monotone" 
                  dataKey="activeStudents" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  name="Active Students"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Student Lists and Engagement */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Performers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-yellow-500" />
              Top Performers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topPerformers.map((student, index) => (
                <div key={student.name} className="flex items-center justify-between p-2 bg-green-50 dark:bg-green-900/20 rounded">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-xs">
                      {index + 1}
                    </span>
                    <span className="font-medium">{student.name}</span>
                  </div>
                  <span className="text-green-600 dark:text-green-400 font-bold">{student.score}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Students Needing Attention */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-orange-500" />
              Needs Attention
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {needsAttention.map((student) => (
                <div key={student.name} className="flex items-center justify-between p-2 bg-orange-50 dark:bg-orange-900/20 rounded">
                  <span className="font-medium">{student.name}</span>
                  <span className="text-orange-600 dark:text-orange-400 font-bold">{student.score}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Student Engagement */}
        <Card>
          <CardHeader>
            <CardTitle>Student Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={engagementData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  dataKey="value"
                >
                  {engagementData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {engagementData.map((item) => (
                <div key={item.name} className="flex items-center gap-2 text-sm">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span>{item.name}: {item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
