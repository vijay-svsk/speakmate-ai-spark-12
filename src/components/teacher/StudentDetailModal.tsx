
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, TrendingUp, Award } from "lucide-react";

interface StudentData {
  id: string;
  name: string;
  email: string;
  speakingScore: number;
  pronunciationScore: number;
  vocabularyScore: number;
  grammarScore: number;
  storyScore: number;
  reflexScore: number;
  timeSpent: number;
  overallPercentage: number;
  rank: number;
  lastActive: string;
}

interface StudentDetailModalProps {
  student: StudentData;
  isOpen: boolean;
  onClose: () => void;
}

export function StudentDetailModal({ student, isOpen, onClose }: StudentDetailModalProps) {
  const getScoreBadgeVariant = (score: number) => {
    if (score >= 90) return "success";
    if (score >= 75) return "default";
    if (score >= 60) return "warning";
    return "destructive";
  };

  const skillAreas = [
    { name: "Speaking", score: student.speakingScore, icon: "🗣️" },
    { name: "Pronunciation", score: student.pronunciationScore, icon: "🎤" },
    { name: "Vocabulary", score: student.vocabularyScore, icon: "📖" },
    { name: "Grammar", score: student.grammarScore, icon: "✏️" },
    { name: "Story Building", score: student.storyScore, icon: "📚" },
    { name: "Reflex Challenge", score: student.reflexScore, icon: "⚡" }
  ];

  // Mock activity data
  const recentActivities = [
    { date: "2024-01-15", activity: "Completed Grammar Quiz", score: 88 },
    { date: "2024-01-14", activity: "Pronunciation Practice", score: 76 },
    { date: "2024-01-13", activity: "Reflex Challenge", score: 92 },
    { date: "2024-01-12", activity: "Story Builder", score: 85 }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span>📊 Student Performance Detail</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Student Info Header */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold">{student.name}</h3>
                  <p className="text-muted-foreground">{student.email}</p>
                </div>
                <div className="text-right">
                  <Badge variant={getScoreBadgeVariant(student.overallPercentage)} className="text-lg p-2">
                    {student.overallPercentage}% Overall
                  </Badge>
                  <p className="text-sm text-muted-foreground mt-1">Rank #{student.rank}</p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Total Time: {student.timeSpent} minutes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Last Active: {student.lastActive}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Class Rank: #{student.rank}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skill Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Skill Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {skillAreas.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        {skill.icon} {skill.name}
                      </span>
                      <Badge variant={getScoreBadgeVariant(skill.score)}>
                        {skill.score}%
                      </Badge>
                    </div>
                    <Progress value={skill.score} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div>
                      <p className="font-medium">{activity.activity}</p>
                      <p className="text-sm text-muted-foreground">{activity.date}</p>
                    </div>
                    <Badge variant={getScoreBadgeVariant(activity.score)}>
                      {activity.score}%
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Performance Insights */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {student.vocabularyScore >= 90 && (
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <p className="text-green-800 dark:text-green-200">
                      🎉 <strong>Vocabulary Excellence:</strong> Outstanding vocabulary skills! Keep up the great work.
                    </p>
                  </div>
                )}
                {student.pronunciationScore < 75 && (
                  <div className="p-3 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg">
                    <p className="text-orange-800 dark:text-orange-200">
                      💡 <strong>Improvement Area:</strong> Focus on pronunciation practice to boost speaking confidence.
                    </p>
                  </div>
                )}
                {student.timeSpent > 100 && (
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <p className="text-blue-800 dark:text-blue-200">
                      ⭐ <strong>Dedicated Learner:</strong> Excellent engagement with {student.timeSpent} minutes of practice!
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
