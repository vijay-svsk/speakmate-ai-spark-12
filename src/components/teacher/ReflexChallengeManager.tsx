import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Eye } from "lucide-react";

interface ReflexChallenge {
  id: string;
  title: string;
  description: string;
  prompts: string[];
  difficulty: "Easy" | "Medium" | "Hard";
  timeLimit: number;
  isActive: boolean;
  createdAt: string;
}

interface ReflexChallengeManagerProps {
  classId: string;
  section: string;
}

export function ReflexChallengeManager({ classId, section }: ReflexChallengeManagerProps) {
  const [challenges, setChallenges] = useState<ReflexChallenge[]>([
    {
      id: "1",
      title: "Quick Thinking Challenge",
      description: "Rapid response questions to test speaking fluency",
      prompts: [
        "What's your favorite season and why?",
        "If you could have dinner with anyone, who would it be?",
        "Describe your perfect weekend."
      ],
      difficulty: "Easy",
      timeLimit: 30,
      isActive: true,
      createdAt: "2024-01-10"
    },
    {
      id: "2",
      title: "Debate Challenge",
      description: "Present arguments on various topics",
      prompts: [
        "Should schools have longer summer breaks?",
        "Is technology making us more or less social?",
        "Should homework be banned?"
      ],
      difficulty: "Medium",
      timeLimit: 60,
      isActive: false,
      createdAt: "2024-01-12"
    }
  ]);

  const [isCreating, setIsCreating] = useState(false);
  const [editingChallenge, setEditingChallenge] = useState<ReflexChallenge | null>(null);
  const [newChallenge, setNewChallenge] = useState({
    title: "",
    description: "",
    prompts: [""],
    difficulty: "Easy" as const,
    timeLimit: 30
  });

  const handleCreateChallenge = () => {
    const challenge: ReflexChallenge = {
      id: Date.now().toString(),
      ...newChallenge,
      prompts: newChallenge.prompts.filter(p => p.trim()),
      isActive: false,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setChallenges([...challenges, challenge]);
    setIsCreating(false);
    setNewChallenge({
      title: "",
      description: "",
      prompts: [""],
      difficulty: "Easy",
      timeLimit: 30
    });
  };

  const toggleChallengeStatus = (id: string) => {
    setChallenges(challenges.map(challenge =>
      challenge.id === id
        ? { ...challenge, isActive: !challenge.isActive }
        : challenge
    ));
  };

  const deleteChallenge = (id: string) => {
    setChallenges(challenges.filter(challenge => challenge.id !== id));
  };

  const addPrompt = () => {
    setNewChallenge({
      ...newChallenge,
      prompts: [...newChallenge.prompts, ""]
    });
  };

  const updatePrompt = (index: number, value: string) => {
    const updatedPrompts = [...newChallenge.prompts];
    updatedPrompts[index] = value;
    setNewChallenge({
      ...newChallenge,
      prompts: updatedPrompts
    });
  };

  const removePrompt = (index: number) => {
    setNewChallenge({
      ...newChallenge,
      prompts: newChallenge.prompts.filter((_, i) => i !== index)
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "success";
      case "Medium": return "warning";
      case "Hard": return "destructive";
      default: return "default";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Create Button */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Reflex Challenges for {classId} - Section {section}</h3>
          <p className="text-sm text-muted-foreground">Create and manage speaking challenges for your students</p>
        </div>
        <Button onClick={() => setIsCreating(true)} disabled={isCreating}>
          <Plus className="h-4 w-4 mr-2" />
          Create Challenge
        </Button>
      </div>

      {/* Create/Edit Challenge Form */}
      {isCreating && (
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle>Create New Reflex Challenge</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Challenge Title</label>
                <Input
                  placeholder="Enter challenge title"
                  value={newChallenge.title}
                  onChange={(e) => setNewChallenge({ ...newChallenge, title: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Time Limit (seconds)</label>
                <Input
                  type="number"
                  min="10"
                  max="300"
                  value={newChallenge.timeLimit}
                  onChange={(e) => setNewChallenge({ ...newChallenge, timeLimit: parseInt(e.target.value) })}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Description</label>
              <Textarea
                placeholder="Describe the challenge"
                value={newChallenge.description}
                onChange={(e) => setNewChallenge({ ...newChallenge, description: e.target.value })}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Difficulty Level</label>
              <select
                className="w-full p-2 border border-input rounded-md"
                value={newChallenge.difficulty}
                onChange={(e) => setNewChallenge({ ...newChallenge, difficulty: e.target.value as any })}
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium">Challenge Prompts</label>
                <Button type="button" variant="outline" size="sm" onClick={addPrompt}>
                  Add Prompt
                </Button>
              </div>
              <div className="space-y-2">
                {newChallenge.prompts.map((prompt, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder={`Prompt ${index + 1}`}
                      value={prompt}
                      onChange={(e) => updatePrompt(index, e.target.value)}
                    />
                    {newChallenge.prompts.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removePrompt(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleCreateChallenge}>
                Create Challenge
              </Button>
              <Button variant="outline" onClick={() => setIsCreating(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Existing Challenges */}
      <div className="grid gap-4">
        {challenges.map((challenge) => (
          <Card key={challenge.id} className={`${challenge.isActive ? 'border-green-500' : 'border-muted'}`}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {challenge.title}
                    <Badge variant={getDifficultyColor(challenge.difficulty)}>
                      {challenge.difficulty}
                    </Badge>
                    {challenge.isActive && (
                      <Badge variant="success">Active</Badge>
                    )}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {challenge.description}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleChallengeStatus(challenge.id)}
                  >
                    {challenge.isActive ? 'Deactivate' : 'Activate'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingChallenge(challenge)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteChallenge(challenge.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>⏱️ {challenge.timeLimit}s per response</span>
                  <span>📅 Created: {challenge.createdAt}</span>
                  <span>📝 {challenge.prompts.length} prompts</span>
                </div>
                <details className="mt-2">
                  <summary className="cursor-pointer text-sm font-medium">View Prompts</summary>
                  <div className="mt-2 space-y-1">
                    {challenge.prompts.map((prompt, index) => (
                      <div key={index} className="text-sm p-2 bg-muted/30 rounded">
                        {index + 1}. {prompt}
                      </div>
                    ))}
                  </div>
                </details>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {challenges.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground">No reflex challenges created yet.</p>
            <p className="text-sm text-muted-foreground mt-1">
              Create your first challenge to engage your students!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
