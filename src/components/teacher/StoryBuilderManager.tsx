import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, BookOpen } from "lucide-react";

interface Story {
  id: string;
  title: string;
  genre: string;
  description: string;
  content: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  isActive: boolean;
  createdAt: string;
  wordCount: number;
}

interface StoryBuilderManagerProps {
  classId: string;
  section: string;
}

export function StoryBuilderManager({ classId, section }: StoryBuilderManagerProps) {
  const [stories, setStories] = useState<Story[]>([
    {
      id: "1",
      title: "The Magic Library",
      genre: "Fantasy",
      description: "A young student discovers a magical library where books come to life",
      content: "Once upon a time, in a small town, there was a library that held an incredible secret...",
      difficulty: "Intermediate",
      isActive: true,
      createdAt: "2024-01-10",
      wordCount: 156
    },
    {
      id: "2",
      title: "The Robot Friend",
      genre: "Science Fiction",
      description: "A story about friendship between a child and a helpful robot",
      content: "In the year 2050, technology had advanced beyond imagination. Maya was 12 years old when...",
      difficulty: "Beginner",
      isActive: false,
      createdAt: "2024-01-12",
      wordCount: 98
    }
  ]);

  const [isCreating, setIsCreating] = useState(false);
  const [newStory, setNewStory] = useState({
    title: "",
    genre: "",
    description: "",
    content: "",
    difficulty: "Beginner" as const
  });

  const genres = ["Adventure", "Fantasy", "Science Fiction", "Mystery", "Comedy", "Drama", "Educational"];

  const handleCreateStory = () => {
    const story: Story = {
      id: Date.now().toString(),
      ...newStory,
      isActive: false,
      createdAt: new Date().toISOString().split('T')[0],
      wordCount: newStory.content.split(' ').filter(word => word.trim()).length
    };

    setStories([...stories, story]);
    setIsCreating(false);
    setNewStory({
      title: "",
      genre: "",
      description: "",
      content: "",
      difficulty: "Beginner"
    });
  };

  const toggleStoryStatus = (id: string) => {
    setStories(stories.map(story =>
      story.id === id
        ? { ...story, isActive: !story.isActive }
        : story
    ));
  };

  const deleteStory = (id: string) => {
    setStories(stories.filter(story => story.id !== id));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "success";
      case "Intermediate": return "warning";
      case "Advanced": return "destructive";
      default: return "default";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Create Button */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Story Library for {classId} - Section {section}</h3>
          <p className="text-sm text-muted-foreground">Create and manage stories for student reading practice</p>
        </div>
        <Button onClick={() => setIsCreating(true)} disabled={isCreating}>
          <Plus className="h-4 w-4 mr-2" />
          Create Story
        </Button>
      </div>

      {/* Create Story Form */}
      {isCreating && (
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle>Create New Story</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Story Title</label>
                <Input
                  placeholder="Enter story title"
                  value={newStory.title}
                  onChange={(e) => setNewStory({ ...newStory, title: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Genre</label>
                <select
                  className="w-full p-2 border border-input rounded-md"
                  value={newStory.genre}
                  onChange={(e) => setNewStory({ ...newStory, genre: e.target.value })}
                >
                  <option value="">Select a genre</option>
                  {genres.map(genre => (
                    <option key={genre} value={genre}>{genre}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Description</label>
              <Textarea
                placeholder="Brief description of the story"
                value={newStory.description}
                onChange={(e) => setNewStory({ ...newStory, description: e.target.value })}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Difficulty Level</label>
              <select
                className="w-full p-2 border border-input rounded-md"
                value={newStory.difficulty}
                onChange={(e) => setNewStory({ ...newStory, difficulty: e.target.value as any })}
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">Story Content</label>
              <Textarea
                placeholder="Write your story here..."
                className="min-h-32"
                value={newStory.content}
                onChange={(e) => setNewStory({ ...newStory, content: e.target.value })}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Word count: {newStory.content.split(' ').filter(word => word.trim()).length}
              </p>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleCreateStory}>
                Create Story
              </Button>
              <Button variant="outline" onClick={() => setIsCreating(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Existing Stories */}
      <div className="grid gap-4">
        {stories.map((story) => (
          <Card key={story.id} className={`${story.isActive ? 'border-green-500' : 'border-muted'}`}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    {story.title}
                    <Badge variant={getDifficultyColor(story.difficulty)}>
                      {story.difficulty}
                    </Badge>
                    {story.isActive && (
                      <Badge variant="success">Active</Badge>
                    )}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {story.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                    <span>📚 Genre: {story.genre}</span>
                    <span>📝 {story.wordCount} words</span>
                    <span>📅 Created: {story.createdAt}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleStoryStatus(story.id)}
                  >
                    {story.isActive ? 'Deactivate' : 'Activate'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteStory(story.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <details className="mt-2">
                <summary className="cursor-pointer text-sm font-medium">Preview Story Content</summary>
                <div className="mt-2 p-3 bg-muted/30 rounded text-sm">
                  {story.content.substring(0, 200)}
                  {story.content.length > 200 && "..."}
                </div>
              </details>
            </CardContent>
          </Card>
        ))}
      </div>

      {stories.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="py-8 text-center">
            <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No stories created yet.</p>
            <p className="text-sm text-muted-foreground mt-1">
              Create engaging stories for your students to practice reading and comprehension!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
