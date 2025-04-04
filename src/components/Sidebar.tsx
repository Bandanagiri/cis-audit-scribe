
import React from 'react';
import { cn } from '@/lib/utils';
import { Shield, Monitor, FileText, Settings, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  return (
    <div className={cn("h-screen w-64 bg-sidebar border-r border-sidebar-border flex flex-col", className)}>
      <div className="p-6">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          <h1 className="text-lg font-bold text-sidebar-foreground">CIS Audit Scribe</h1>
        </div>
      </div>
      
      <div className="flex-1 px-3">
        <div className="space-y-1">
          <Button variant="ghost" className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent">
            <Monitor className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
          
          <div className="space-y-1">
            <div className="px-3 py-2 text-xs uppercase tracking-wider text-sidebar-foreground/70">
              Windows Benchmarks
            </div>
            <Button variant="ghost" className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent pl-6 text-sm">
              <ChevronRight className="mr-2 h-3 w-3" />
              Windows 11 Enterprise
            </Button>
            <Button variant="ghost" className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent pl-6 text-sm">
              <ChevronRight className="mr-2 h-3 w-3" />
              Windows 11 Standalone
            </Button>
          </div>
          
          <div className="space-y-1">
            <div className="px-3 py-2 text-xs uppercase tracking-wider text-sidebar-foreground/70">
              Linux Benchmarks
            </div>
            <Button variant="ghost" className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent pl-6 text-sm">
              <ChevronRight className="mr-2 h-3 w-3" />
              Red Hat Enterprise 8
            </Button>
            <Button variant="ghost" className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent pl-6 text-sm">
              <ChevronRight className="mr-2 h-3 w-3" />
              Red Hat Enterprise 9
            </Button>
            <Button variant="ghost" className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent pl-6 text-sm">
              <ChevronRight className="mr-2 h-3 w-3" />
              Ubuntu 20.04 LTS
            </Button>
            <Button variant="ghost" className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent pl-6 text-sm">
              <ChevronRight className="mr-2 h-3 w-3" />
              Ubuntu 22.04 LTS
            </Button>
          </div>
          
          <div className="pt-4">
            <Button variant="ghost" className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent">
              <FileText className="mr-2 h-4 w-4" />
              Reports
            </Button>
            <Button variant="ghost" className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </div>
        </div>
      </div>
      
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center justify-between">
          <div className="text-xs text-sidebar-foreground/70">
            v1.0.0
          </div>
          <div className="text-xs text-sidebar-foreground/70">
            CIS Audit Scribe
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
