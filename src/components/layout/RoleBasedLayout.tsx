
import React from "react";
import { AppLayout } from "./AppLayout";
import { TeacherDashboard } from "../teacher/TeacherDashboard";

interface RoleBasedLayoutProps {
  children: React.ReactNode;
}

export function RoleBasedLayout({ children }: RoleBasedLayoutProps) {
  const userSession = JSON.parse(localStorage.getItem('userSession') || '{}');
  const isTeacher = userSession.role === 'teacher';

  // If user is a teacher, show teacher dashboard instead of regular app layout
  if (isTeacher) {
    return <TeacherDashboard />;
  }

  // Regular student layout
  return <AppLayout>{children}</AppLayout>;
}
