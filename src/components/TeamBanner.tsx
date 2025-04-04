
import React from 'react';
import { Trophy, Coffee } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const TeamBanner = () => {
  return (
    <div className="bg-gradient-to-r from-primary/20 to-primary/5 rounded-lg p-4 mb-6 border border-primary/20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-primary/10 opacity-30" />
      
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary/20 p-2 rounded-full">
            <Trophy className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-primary">Developed by Team TREND CHANGER</h2>
            <p className="text-sm text-muted-foreground">
              Advanced CIS Benchmark Auditing Solution for Enterprise Security
            </p>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-3">
          <Badge variant="outline" className="flex items-center gap-1 bg-orange-50 text-orange-700 border-orange-200">
            <Coffee className="h-3.5 w-3.5" />
            Java-Powered
          </Badge>
          <div className="text-sm text-muted-foreground">
            Enterprise Security Platform
          </div>
          <div className="text-xs text-muted-foreground">
            v1.0.0 • CIS Certified
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamBanner;
