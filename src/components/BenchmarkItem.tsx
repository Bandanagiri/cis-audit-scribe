
import React from 'react';
import { CheckCircle, XCircle, AlertCircle, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Benchmark } from '@/data/benchmarks';

interface BenchmarkItemProps {
  benchmark: Benchmark;
}

const BenchmarkItem = ({ benchmark }: BenchmarkItemProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'fail':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-amber-500" />;
    }
  };

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="border rounded-md bg-card"
    >
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className="flex w-full justify-between p-4 text-left hover:bg-accent"
        >
          <div className="flex items-center gap-3 font-medium">
            {getStatusIcon(benchmark.status)}
            <span>{benchmark.id} - {benchmark.title}</span>
          </div>
          <ChevronRight 
            className={`h-4 w-4 transition-transform ${isOpen ? "rotate-90" : ""}`} 
          />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="p-4 pt-0 border-t">
        <div className="space-y-3">
          <div>
            <h4 className="font-semibold">Description</h4>
            <p className="text-sm text-muted-foreground">{benchmark.description}</p>
          </div>
          
          <div>
            <h4 className="font-semibold">Remediation</h4>
            <p className="text-sm text-muted-foreground">{benchmark.remediation}</p>
          </div>
          
          <div>
            <h4 className="font-semibold">Impact</h4>
            <div className="flex items-center gap-2">
              <div className="text-sm font-medium">
                Severity:
              </div>
              <div className="text-sm font-medium px-2 py-1 rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                {benchmark.severity}
              </div>
            </div>
          </div>

          <div className="pt-2">
            <Button size="sm" className="mr-2">Run Check</Button>
            <Button size="sm" variant="outline">View Details</Button>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default BenchmarkItem;
