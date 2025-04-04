
import React from 'react';
import { cn } from '@/lib/utils';
import { Shield, Monitor, FileText, Settings, ChevronRight, Sun, Moon, Lock, Laptop } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useTheme } from './ThemeProvider';

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  const { theme, setTheme } = useTheme();

  return (
    <div className={cn("h-screen w-72 bg-sidebar border-r border-sidebar-border flex flex-col", className)}>
      <div className="p-6">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          <h1 className="text-lg font-bold text-sidebar-foreground">CIS Audit Scribe</h1>
        </div>
        <div className="text-xs text-sidebar-foreground/70 mt-1">
          by Team TREND CHANGER
        </div>
      </div>
      
      <ScrollArea className="flex-1 px-3">
        <div className="space-y-1">
          <Button variant="ghost" className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent">
            <Monitor className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
          
          <div className="space-y-1 mt-4">
            <div className="px-3 py-2 text-xs uppercase tracking-wider text-sidebar-foreground/70 flex items-center justify-between">
              <span>Windows Benchmarks</span>
              <Lock className="h-3 w-3" />
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
          
          <div className="space-y-1 mt-2">
            <div className="px-3 py-2 text-xs uppercase tracking-wider text-sidebar-foreground/70 flex items-center justify-between">
              <span>Linux Benchmarks</span>
              <Laptop className="h-3 w-3" />
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
          
          <Separator className="my-4 bg-sidebar-border" />
          
          <div>
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
      </ScrollArea>
      
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs text-sidebar-foreground/70">
            Theme
          </div>
          <div className="flex gap-1">
            <Button 
              variant="ghost" 
              size="icon" 
              className={`w-7 h-7 ${theme === 'light' ? 'bg-sidebar-accent text-sidebar-foreground' : ''}`}
              onClick={() => setTheme('light')}
            >
              <Sun className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className={`w-7 h-7 ${theme === 'dark' ? 'bg-sidebar-accent text-sidebar-foreground' : ''}`}
              onClick={() => setTheme('dark')}
            >
              <Moon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      
        <div className="flex items-center justify-between">
          <div className="text-xs text-sidebar-foreground/70">
            v1.0.0
          </div>
          <div className="text-xs text-sidebar-foreground/70">
            TREND CHANGER
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
