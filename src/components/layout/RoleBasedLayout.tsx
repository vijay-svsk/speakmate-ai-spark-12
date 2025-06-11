
import React from "react";
import { AppLayout } from "./AppLayout";
import { TeacherDashboard } from "../teacher/TeacherDashboard";

interface RoleBasedLayoutProps {
  children: React.ReactNode;
}

export function RoleBasedLayout({ children }: RoleBasedLayoutProps) {
  const userSession = JSON.parse(localStorage.getItem('userSession') || '{}');
  const isTeacher = userSession.role === 'teacher';

  console.log('RoleBasedLayout - User session:', userSession);
  console.log('RoleBasedLayout - Is teacher:', isTeacher);

  // If user is a teacher, show teacher dashboard instead of regular app layout
  if (isTeacher) {
    return <TeacherDashboard />;
  }

  // Regular student layout - children should be the page content
  return <AppLayout>{children}</AppLayout>;
}
