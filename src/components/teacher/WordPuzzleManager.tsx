import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, PuzzleIcon } from "lucide-react";

interface WordPuzzle {
  id: string;
  title: string;
  type: "Word Search" | "Crossword" | "Word Scramble" | "Fill in the Blanks";
  description: string;
  words: string[];
  hints: string[];
  difficulty: "Easy" | "Medium" | "Hard";
  isActive: boolean;
  createdAt: string;
}

interface WordPuzzleManagerProps {
  classId: string;
  section: string;
}

export function WordPuzzleManager({ classId, section }: WordPuzzleManagerProps) {
  const [puzzles, setPuzzles] = useState<WordPuzzle[]>([
    {
      id: "1",
      title: "Animals Vocabulary",
      type: "Word Search",
      description: "Find animal names hidden in the grid",
      words: ["elephant", "tiger", "monkey", "penguin", "dolphin"],
      hints: ["Large gray animal", "Striped big cat", "Swings from trees", "Black and white bird", "Smart sea mammal"],
      difficulty: "Easy",
      isActive: true,
      createdAt: "2024-01-10"
    },
    {
      id: "2",
      title: "Science Terms",
      type: "Word Scramble",
      description: "Unscramble these science vocabulary words",
      words: ["gravity", "molecule", "energy", "matter", "physics"],
      hints: ["Force that pulls objects down", "Smallest unit of substance", "Power to do work", "Everything that has mass", "Study of natural world"],
      difficulty: "Medium",
      isActive: false,
      createdAt: "2024-01-12"
    }
  ]);

  const [isCreating, setIsCreating] = useState(false);
  const [newPuzzle, setNewPuzzle] = useState({
    title: "",
    type: "Word Search" as const,
    description: "",
    words: [""],
    hints: [""],
    difficulty: "Easy" as const
  });

  const puzzleTypes = ["Word Search", "Crossword", "Word Scramble", "Fill in the Blanks"];

  const handleCreatePuzzle = () => {
    const puzzle: WordPuzzle = {
      id: Date.now().toString(),
      ...newPuzzle,
      words: newPuzzle.words.filter(w => w.trim()),
      hints: newPuzzle.hints.filter(h => h.trim()),
      isActive: false,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setPuzzles([...puzzles, puzzle]);
    setIsCreating(false);
    setNewPuzzle({
      title: "",
      type: "Word Search",
      description: "",
      words: [""],
      hints: [""],
      difficulty: "Easy"
    });
  };

  const togglePuzzleStatus = (id: string) => {
    setPuzzles(puzzles.map(puzzle =>
      puzzle.id === id
        ? { ...puzzle, isActive: !puzzle.isActive }
        : puzzle
    ));
  };

  const deletePuzzle = (id: string) => {
    setPuzzles(puzzles.filter(puzzle => puzzle.id !== id));
  };

  const addWord = () => {
    setNewPuzzle({
      ...newPuzzle,
      words: [...newPuzzle.words, ""],
      hints: [...newPuzzle.hints, ""]
    });
  };

  const updateWord = (index: number, value: string) => {
    const updatedWords = [...newPuzzle.words];
    updatedWords[index] = value;
    setNewPuzzle({ ...newPuzzle, words: updatedWords });
  };

  const updateHint = (index: number, value: string) => {
    const updatedHints = [...newPuzzle.hints];
    updatedHints[index] = value;
    setNewPuzzle({ ...newPuzzle, hints: updatedHints });
  };

  const removeWord = (index: number) => {
    setNewPuzzle({
      ...newPuzzle,
      words: newPuzzle.words.filter((_, i) => i !== index),
      hints: newPuzzle.hints.filter((_, i) => i !== index)
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

  const getPuzzleTypeColor = (type: string) => {
    switch (type) {
      case "Word Search": return "default";
      case "Crossword": return "secondary";
      case "Word Scramble": return "outline";
      case "Fill in the Blanks": return "default";
      default: return "default";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Create Button */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Word Puzzles for {classId} - Section {section}</h3>
          <p className="text-sm text-muted-foreground">Create interactive word puzzles to enhance vocabulary</p>
        </div>
        <Button onClick={() => setIsCreating(true)} disabled={isCreating}>
          <Plus className="h-4 w-4 mr-2" />
          Create Puzzle
        </Button>
      </div>

      {/* Create Puzzle Form */}
      {isCreating && (
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle>Create New Word Puzzle</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Puzzle Title</label>
                <Input
                  placeholder="Enter puzzle title"
                  value={newPuzzle.title}
                  onChange={(e) => setNewPuzzle({ ...newPuzzle, title: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Puzzle Type</label>
                <select
                  className="w-full p-2 border border-input rounded-md"
                  value={newPuzzle.type}
                  onChange={(e) => setNewPuzzle({ ...newPuzzle, type: e.target.value as any })}
                >
                  {puzzleTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Description</label>
              <Textarea
                placeholder="Describe the puzzle"
                value={newPuzzle.description}
                onChange={(e) => setNewPuzzle({ ...newPuzzle, description: e.target.value })}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Difficulty Level</label>
              <select
                className="w-full p-2 border border-input rounded-md"
                value={newPuzzle.difficulty}
                onChange={(e) => setNewPuzzle({ ...newPuzzle, difficulty: e.target.value as any })}
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium">Words & Hints</label>
                <Button type="button" variant="outline" size="sm" onClick={addWord}>
                  Add Word
                </Button>
              </div>
              <div className="space-y-3">
                {newPuzzle.words.map((word, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <Input
                      placeholder={`Word ${index + 1}`}
                      value={word}
                      onChange={(e) => updateWord(index, e.target.value)}
                    />
                    <div className="flex gap-2">
                      <Input
                        placeholder={`Hint ${index + 1}`}
                        value={newPuzzle.hints[index] || ""}
                        onChange={(e) => updateHint(index, e.target.value)}
                      />
                      {newPuzzle.words.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removeWord(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleCreatePuzzle}>
                Create Puzzle
              </Button>
              <Button variant="outline" onClick={() => setIsCreating(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Existing Puzzles */}
      <div className="grid gap-4">
        {puzzles.map((puzzle) => (
          <Card key={puzzle.id} className={`${puzzle.isActive ? 'border-green-500' : 'border-muted'}`}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <PuzzleIcon className="h-5 w-5" />
                    {puzzle.title}
                    <Badge variant={getPuzzleTypeColor(puzzle.type)}>
                      {puzzle.type}
                    </Badge>
                    <Badge variant={getDifficultyColor(puzzle.difficulty)}>
                      {puzzle.difficulty}
                    </Badge>
                    {puzzle.isActive && (
                      <Badge variant="success">Active</Badge>
                    )}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {puzzle.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                    <span>📝 {puzzle.words.length} words</span>
                    <span>📅 Created: {puzzle.createdAt}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => togglePuzzleStatus(puzzle.id)}
                  >
                    {puzzle.isActive ? 'Deactivate' : 'Activate'}
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
                    onClick={() => deletePuzzle(puzzle.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <details className="mt-2">
                <summary className="cursor-pointer text-sm font-medium">View Words & Hints</summary>
                <div className="mt-2 space-y-1">
                  {puzzle.words.map((word, index) => (
                    <div key={index} className="text-sm p-2 bg-muted/30 rounded flex justify-between">
                      <span className="font-medium">{word}</span>
                      <span className="text-muted-foreground">{puzzle.hints[index]}</span>
                    </div>
                  ))}
                </div>
              </details>
            </CardContent>
          </Card>
        ))}
      </div>

      {puzzles.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="py-8 text-center">
            <PuzzleIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No word puzzles created yet.</p>
            <p className="text-sm text-muted-foreground mt-1">
              Create engaging puzzles to help students learn new vocabulary!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
