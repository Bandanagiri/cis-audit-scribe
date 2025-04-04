
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Play, FileText, Download } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import OSSelector from './OSSelector';
import BenchmarkItem from './BenchmarkItem';
import { benchmarks } from '@/data/benchmarks';

const Dashboard = () => {
  return (
    <div className="flex-1 p-8 overflow-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">CIS Benchmark Audit</h1>
          <p className="text-muted-foreground">Audit your systems against CIS Benchmarks</p>
        </div>
        <OSSelector />
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="benchmarks">Benchmarks</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Compliance Score</CardTitle>
                <CardDescription>Current system compliance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-2">75%</div>
                <Progress value={75} className="h-2" />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Total Controls</CardTitle>
                <CardDescription>CIS benchmark controls</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">230</div>
                <div className="text-muted-foreground text-sm mt-2">170 passing / 60 failing</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Last Scan</CardTitle>
                <CardDescription>Most recent audit</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold">Not run yet</div>
                <div className="text-muted-foreground text-sm mt-2">Run a scan to see results</div>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex gap-4">
            <Button className="gap-2">
              <Play className="h-4 w-4" />
              Run Audit
            </Button>
            <Button variant="outline" className="gap-2">
              <FileText className="h-4 w-4" />
              Generate Report
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export Results
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="benchmarks">
          <Card>
            <CardHeader>
              <CardTitle>CIS Benchmarks</CardTitle>
              <CardDescription>Review and run CIS benchmark audits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {benchmarks.map((benchmark) => (
                  <BenchmarkItem key={benchmark.id} benchmark={benchmark} />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Audit Reports</CardTitle>
              <CardDescription>View and download previous audit reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                No reports available yet. Run an audit to generate reports.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Audit Settings</CardTitle>
              <CardDescription>Configure audit preferences and system paths</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                Settings configuration will be available in future versions.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
