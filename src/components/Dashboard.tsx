
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { AlertCircle, FileText, Download, Play, Shield, AlertTriangle, CheckCircle, Coffee } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import OSSelector from './OSSelector';
import BenchmarkItem from './BenchmarkItem';
import { benchmarks } from '@/data/benchmarks';
import { auditService } from '@/services/auditService';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useTheme } from './ThemeProvider';
import TeamBanner from './TeamBanner';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [isRunningAudit, setIsRunningAudit] = useState(false);
  const [lastScanDate, setLastScanDate] = useState<string | null>(null);
  const [complianceScore, setComplianceScore] = useState(0);
  const [passingControls, setPassingControls] = useState(0);
  const [totalControls, setTotalControls] = useState(benchmarks.length);
  const { toast } = useToast();
  const { theme } = useTheme();

  const runAudit = async () => {
    setIsRunningAudit(true);
    
    toast({
      title: "Audit Started",
      description: "Running security audit against CIS benchmarks...",
    });
    
    try {
      // Simulate a delay for the audit process
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const report = await auditService.runAudit(benchmarks, "Windows 11");
      
      setComplianceScore(report.score);
      setPassingControls(report.results.filter(r => r.passed).length);
      setLastScanDate(new Date().toLocaleString());
      
      toast({
        title: "Audit Complete",
        description: `Compliance score: ${report.score}%`,
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Audit Failed",
        description: "An error occurred while running the audit.",
        variant: "destructive",
      });
    } finally {
      setIsRunningAudit(false);
    }
  };

  const generateReport = () => {
    toast({
      title: "Report Generation",
      description: "Your report is being generated and will download shortly.",
    });
    
    // Simulate a delay
    setTimeout(() => {
      toast({
        title: "Report Ready",
        description: "Your report has been generated and downloaded.",
      });
    }, 2000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="flex-1 p-8 overflow-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight">CIS Benchmark Audit</h1>
          </div>
          <p className="text-muted-foreground">Comprehensive security audit against CIS Benchmarks</p>
        </div>
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            className="gap-2"
            asChild
          >
            <Link to="/java-implementation">
              <Coffee className="h-4 w-4" />
              Java Implementation
            </Link>
          </Button>
          <OSSelector />
        </div>
      </div>

      {/* Team Banner - Prominent display */}
      <TeamBanner />

      <Tabs defaultValue="overview" className="mt-6">
        <TabsList className="mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="benchmarks">Benchmarks</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className={theme === 'dark' ? 'border-slate-700' : ''}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <div className={`p-1.5 rounded-full ${complianceScore >= 70 ? 'bg-green-100' : 'bg-yellow-100'}`}>
                    {complianceScore >= 70 ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    )}
                  </div>
                  Compliance Score
                </CardTitle>
                <CardDescription>Current system compliance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className={`text-4xl font-bold mb-2 ${getScoreColor(complianceScore)}`}>{complianceScore}%</div>
                <Progress value={complianceScore} className="h-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  {complianceScore >= 80 ? 'Great! Your system is well secured.' : 
                   complianceScore >= 60 ? 'Your system needs some security improvements.' :
                   'Your system requires significant security enhancements.'}
                </p>
              </CardContent>
            </Card>
            
            <Card className={theme === 'dark' ? 'border-slate-700' : ''}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <div className="p-1.5 rounded-full bg-blue-100">
                    <Shield className="h-5 w-5 text-blue-500" />
                  </div>
                  Total Controls
                </CardTitle>
                <CardDescription>CIS benchmark controls</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{totalControls}</div>
                <div className="text-muted-foreground text-sm mt-2">
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 mr-2">
                    {passingControls} passing
                  </Badge>
                  <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                    {totalControls - passingControls} failing
                  </Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card className={theme === 'dark' ? 'border-slate-700' : ''}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <div className="p-1.5 rounded-full bg-purple-100">
                    <FileText className="h-5 w-5 text-purple-500" />
                  </div>
                  Last Scan
                </CardTitle>
                <CardDescription>Most recent audit</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold">
                  {lastScanDate ? lastScanDate : 'Not run yet'}
                </div>
                <div className="text-muted-foreground text-sm mt-2">
                  {lastScanDate ? 'View detailed results below' : 'Run a scan to see results'}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <Button 
              onClick={runAudit} 
              disabled={isRunningAudit}
              className="gap-2 hover:scale-105 transition-transform"
            >
              <Play className="h-4 w-4" />
              {isRunningAudit ? 'Running Audit...' : 'Run Audit'}
            </Button>
            <Button 
              variant="outline" 
              className="gap-2 hover:bg-accent transition-all"
              onClick={generateReport}
            >
              <FileText className="h-4 w-4" />
              Generate Report
            </Button>
            <Button 
              variant="outline" 
              className="gap-2 hover:bg-accent transition-all"
            >
              <Download className="h-4 w-4" />
              Export Results
            </Button>
          </div>

          {lastScanDate && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Recent Findings</CardTitle>
                <CardDescription>Summary of latest security audit results</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-yellow-600 bg-yellow-50 p-3 rounded-md">
                    <AlertCircle className="h-5 w-5" />
                    <span className="font-medium">Password policy requires at least 14 characters</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-md">
                    <AlertCircle className="h-5 w-5" />
                    <span className="font-medium">Firewall settings need to be updated</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-md">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-medium">BitLocker encryption is properly configured</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="benchmarks">
          <Card>
            <CardHeader>
              <CardTitle>CIS Benchmarks</CardTitle>
              <CardDescription>Review and run CIS benchmark audits</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-4">
                  {benchmarks.map((benchmark) => (
                    <BenchmarkItem key={benchmark.id} benchmark={benchmark} />
                  ))}
                </div>
              </ScrollArea>
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
              {lastScanDate ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 border rounded-lg hover:bg-accent/50 cursor-pointer">
                    <div>
                      <h3 className="font-medium">Windows 11 Enterprise Audit</h3>
                      <p className="text-sm text-muted-foreground">{lastScanDate}</p>
                    </div>
                    <Download className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No reports available yet. Run an audit to generate reports.
                </div>
              )}
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
              <div className="space-y-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Default OS Type</label>
                  <select className="p-2 border rounded-md">
                    <option>Windows 11 Enterprise</option>
                    <option>Windows 11 Standalone</option>
                    <option>Red Hat Enterprise 8</option>
                    <option>Red Hat Enterprise 9</option>
                    <option>Ubuntu 20.04 LTS</option>
                    <option>Ubuntu 22.04 LTS</option>
                  </select>
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Script Execution Path</label>
                  <input 
                    type="text" 
                    className="p-2 border rounded-md"
                    placeholder="/usr/local/bin/cis-scripts"
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Report Export Format</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input type="radio" name="report-format" defaultChecked />
                      <span>PDF</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="report-format" />
                      <span>HTML</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="report-format" />
                      <span>CSV</span>
                    </label>
                  </div>
                </div>
                
                <Button className="mt-4">Save Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
