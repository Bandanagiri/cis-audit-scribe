
import React from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

interface OsOption {
  label: string;
  value: string;
  group: 'windows' | 'linux';
}

const osOptions: OsOption[] = [
  { label: 'Windows 11 Enterprise', value: 'win11-ent', group: 'windows' },
  { label: 'Windows 11 Standalone', value: 'win11-std', group: 'windows' },
  { label: 'Red Hat Enterprise 8', value: 'rhel8', group: 'linux' },
  { label: 'Red Hat Enterprise 9', value: 'rhel9', group: 'linux' },
  { label: 'Ubuntu 20.04 LTS', value: 'ubuntu2004', group: 'linux' },
  { label: 'Ubuntu 22.04 LTS', value: 'ubuntu2204', group: 'linux' },
  { label: 'Ubuntu Server 12.04 LTS', value: 'ubuntu-server-1204', group: 'linux' },
  { label: 'Ubuntu Server 14.04 LTS', value: 'ubuntu-server-1404', group: 'linux' },
];

const OSSelector = () => {
  const [selectedOS, setSelectedOS] = React.useState<OsOption>(osOptions[0]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex min-w-[200px] justify-between">
          {selectedOS.label}
          <ChevronDown className="ml-2 h-4 w-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px]" align="end">
        <div className="px-2 py-1.5 text-xs font-semibold">Windows</div>
        {osOptions
          .filter((os) => os.group === 'windows')
          .map((os) => (
            <DropdownMenuItem
              key={os.value}
              onClick={() => setSelectedOS(os)}
              className={cn(
                "flex items-center justify-between",
                selectedOS.value === os.value && "bg-accent"
              )}
            >
              {os.label}
              {selectedOS.value === os.value && (
                <Check className="h-4 w-4" />
              )}
            </DropdownMenuItem>
          ))}
          
        <div className="px-2 py-1.5 text-xs font-semibold">Linux</div>
        {osOptions
          .filter((os) => os.group === 'linux')
          .map((os) => (
            <DropdownMenuItem
              key={os.value}
              onClick={() => setSelectedOS(os)}
              className={cn(
                "flex items-center justify-between",
                selectedOS.value === os.value && "bg-accent"
              )}
            >
              {os.label}
              {selectedOS.value === os.value && (
                <Check className="h-4 w-4" />
              )}
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default OSSelector;
