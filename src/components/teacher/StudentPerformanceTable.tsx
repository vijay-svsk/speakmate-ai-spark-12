
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Eye, Download, Search } from "lucide-react";
import { StudentDetailModal } from "./StudentDetailModal";

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
  timeSpent: number; // in minutes
  overallPercentage: number;
  rank: number;
  lastActive: string;
}

interface StudentPerformanceTableProps {
  classId: string;
  section: string;
}

export function StudentPerformanceTable({ classId, section }: StudentPerformanceTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<StudentData | null>(null);
  const [sortField, setSortField] = useState<keyof StudentData>("rank");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Mock student data - in real app, this would come from a database
  const mockStudents: StudentData[] = [
    {
      id: "1",
      name: "Alice Johnson",
      email: "alice.j@school.edu",
      speakingScore: 85,
      pronunciationScore: 78,
      vocabularyScore: 92,
      grammarScore: 88,
      storyScore: 90,
      reflexScore: 82,
      timeSpent: 120,
      overallPercentage: 86,
      rank: 1,
      lastActive: "2024-01-15"
    },
    {
      id: "2", 
      name: "Bob Smith",
      email: "bob.s@school.edu",
      speakingScore: 72,
      pronunciationScore: 70,
      vocabularyScore: 75,
      grammarScore: 74,
      storyScore: 68,
      reflexScore: 76,
      timeSpent: 95,
      overallPercentage: 73,
      rank: 2,
      lastActive: "2024-01-14"
    },
    {
      id: "3",
      name: "Carol Davis",
      email: "carol.d@school.edu", 
      speakingScore: 91,
      pronunciationScore: 89,
      vocabularyScore: 87,
      grammarScore: 93,
      storyScore: 85,
      reflexScore: 88,
      timeSpent: 150,
      overallPercentage: 89,
      rank: 3,
      lastActive: "2024-01-15"
    }
  ];

  const filteredStudents = mockStudents.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    const aVal = a[sortField];
    const bVal = b[sortField];
    
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return sortDirection === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    }
    
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
    }
    
    return 0;
  });

  const handleSort = (field: keyof StudentData) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 90) return "success";
    if (score >= 75) return "default";
    if (score >= 60) return "warning";
    return "destructive";
  };

  const exportToCSV = () => {
    const headers = [
      "Name", "Email", "Speaking", "Pronunciation", "Vocabulary", 
      "Grammar", "Story", "Reflex", "Time Spent (min)", "Overall %", "Rank"
    ];
    
    const csvContent = [
      headers.join(","),
      ...sortedStudents.map(student => [
        student.name,
        student.email,
        student.speakingScore,
        student.pronunciationScore,
        student.vocabularyScore,
        student.grammarScore,
        student.storyScore,
        student.reflexScore,
        student.timeSpent,
        student.overallPercentage,
        student.rank
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${classId}_Section_${section}_Performance.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      {/* Search and Export */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button onClick={exportToCSV} variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Performance Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="cursor-pointer" onClick={() => handleSort("name")}>
                Name {sortField === "name" && (sortDirection === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("speakingScore")}>
                Speaking {sortField === "speakingScore" && (sortDirection === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("pronunciationScore")}>
                Pronunciation {sortField === "pronunciationScore" && (sortDirection === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("vocabularyScore")}>
                Vocabulary {sortField === "vocabularyScore" && (sortDirection === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("grammarScore")}>
                Grammar {sortField === "grammarScore" && (sortDirection === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("overallPercentage")}>
                Overall % {sortField === "overallPercentage" && (sortDirection === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("timeSpent")}>
                Time (min) {sortField === "timeSpent" && (sortDirection === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("rank")}>
                Rank {sortField === "rank" && (sortDirection === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedStudents.map((student) => (
              <TableRow key={student.id}>
                <TableCell className="font-medium">
                  <div>
                    <div className="font-medium">{student.name}</div>
                    <div className="text-sm text-muted-foreground">{student.email}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={getScoreBadgeVariant(student.speakingScore)}>
                    {student.speakingScore}%
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={getScoreBadgeVariant(student.pronunciationScore)}>
                    {student.pronunciationScore}%
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={getScoreBadgeVariant(student.vocabularyScore)}>
                    {student.vocabularyScore}%
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={getScoreBadgeVariant(student.grammarScore)}>
                    {student.grammarScore}%
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={getScoreBadgeVariant(student.overallPercentage)} className="text-lg">
                    {student.overallPercentage}%
                  </Badge>
                </TableCell>
                <TableCell>{student.timeSpent}</TableCell>
                <TableCell>
                  <Badge variant="outline">#{student.rank}</Badge>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedStudent(student)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Student Detail Modal */}
      {selectedStudent && (
        <StudentDetailModal
          student={selectedStudent}
          isOpen={!!selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}
    </div>
  );
}
