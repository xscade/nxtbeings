"use client";

import { motion } from "framer-motion";
import { SidebarProvider, useSidebar } from "./SidebarContext";
import { DashboardSidebar } from "./DashboardSidebar";
import { TalentSidebar } from "./TalentSidebar";
import { DashboardHeader } from "./DashboardHeader";

interface User {
  id?: string;
  name?: string | null;
  email?: string | null;
  role: "company" | "talent";
}

interface DashboardLayoutClientProps {
  children: React.ReactNode;
  user: User;
  isCompany: boolean;
}

function DashboardContent({ children, user, isCompany }: DashboardLayoutClientProps) {
  const { isCollapsed } = useSidebar();

  return (
    <>
      {/* Sidebar */}
      {isCompany ? (
        <DashboardSidebar user={user} />
      ) : (
        <TalentSidebar user={user} />
      )}
      
      {/* Main Content */}
      <motion.div 
        initial={false}
        animate={{ paddingLeft: isCollapsed ? 80 : 288 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="relative z-10 hidden lg:block"
      >
        <DashboardHeader user={user} />
        <main className="p-6 lg:p-8">{children}</main>
      </motion.div>

      {/* Mobile Layout (no sidebar animation needed) */}
      <div className="lg:hidden relative z-10">
        <DashboardHeader user={user} />
        <main className="p-6">{children}</main>
      </div>
    </>
  );
}

export function DashboardLayoutClient({ children, user, isCompany }: DashboardLayoutClientProps) {
  return (
    <SidebarProvider>
      <DashboardContent user={user} isCompany={isCompany}>
        {children}
      </DashboardContent>
    </SidebarProvider>
  );
}

