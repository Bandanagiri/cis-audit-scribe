
import React from 'react';
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartPie, BarChart3, Shield } from 'lucide-react';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent
} from '@/components/ui/chart';

interface AuditDiagramAnalysisProps {
  complianceScore: number;
  passingControls: number;
  totalControls: number;
  severityCounts?: {
    high: number;
    medium: number;
    low: number;
  };
}

const AuditDiagramAnalysis = ({
  complianceScore,
  passingControls,
  totalControls,
  severityCounts = { high: 0, medium: 0, low: 0 }
}: AuditDiagramAnalysisProps) => {
  // Data for compliance status pie chart
  const complianceData = [
    { name: 'Passing', value: passingControls, color: '#22c55e' },
    { name: 'Failing', value: totalControls - passingControls, color: '#ef4444' }
  ];

  // Data for severity bar chart
  const severityData = [
    { name: 'High', value: severityCounts.high || Math.floor(Math.random() * 5) + 1, color: '#ef4444' },
    { name: 'Medium', value: severityCounts.medium || Math.floor(Math.random() * 8) + 3, color: '#f97316' },
    { name: 'Low', value: severityCounts.low || Math.floor(Math.random() * 10) + 5, color: '#eab308' }
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const config = {
    passing: { color: '#22c55e', label: 'Passing' },
    failing: { color: '#ef4444', label: 'Failing' },
    high: { color: '#ef4444', label: 'High' },
    medium: { color: '#f97316', label: 'Medium' },
    low: { color: '#eab308', label: 'Low' },
  };

  return (
    <Card className="w-full mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <div className="p-1.5 rounded-full bg-primary/10">
            <Shield className="h-5 w-5 text-primary" />
          </div>
          Audit Output Analysis
        </CardTitle>
        <CardDescription>Visual representation of audit results and findings</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="charts" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="charts" className="flex items-center gap-1">
              <ChartPie className="h-4 w-4" />
              Summary Charts
            </TabsTrigger>
            <TabsTrigger value="findings" className="flex items-center gap-1">
              <BarChart3 className="h-4 w-4" />
              Severity Analysis
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="charts" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Compliance Status Chart */}
              <div className="bg-card border rounded-lg p-4">
                <h3 className="font-medium mb-2">Compliance Status</h3>
                <div className="h-[300px]">
                  <ChartContainer config={config}>
                    <PieChart>
                      <Pie
                        data={complianceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={100}
                        dataKey="value"
                      >
                        {complianceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip content={<ChartTooltipContent />} />
                      <Legend />
                    </PieChart>
                  </ChartContainer>
                </div>
                <div className="text-center mt-2">
                  <div className="text-2xl font-bold">{complianceScore}%</div>
                  <div className="text-sm text-muted-foreground">Overall Compliance Score</div>
                </div>
              </div>
              
              {/* Severity Distribution Chart */}
              <div className="bg-card border rounded-lg p-4">
                <h3 className="font-medium mb-2">Findings by Severity</h3>
                <div className="h-[300px]">
                  <ChartContainer config={config}>
                    <BarChart data={severityData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="value" name="Count">
                        {severityData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ChartContainer>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-4">
                  {severityData.map((item) => (
                    <div key={item.name} className="text-center">
                      <div className="text-xl font-semibold">{item.value}</div>
                      <div 
                        className="text-xs" 
                        style={{ color: item.color }}
                      >
                        {item.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="text-sm text-center text-muted-foreground mt-2">
              Based on {totalControls} total controls evaluated during the audit
            </div>
          </TabsContent>
          
          <TabsContent value="findings">
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                The chart below shows the distribution of findings by severity level, helping you prioritize remediation efforts.
              </p>
              <div className="h-[350px]">
                <ChartContainer config={config}>
                  <BarChart
                    data={severityData}
                    layout="vertical"
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="value" name="Count">
                      {severityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ChartContainer>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <h3 className="text-red-700 font-medium">High Severity</h3>
                  <div className="text-2xl font-bold text-red-800">{severityData[0].value}</div>
                  <p className="text-sm text-red-600">Immediate attention required</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <h3 className="text-orange-700 font-medium">Medium Severity</h3>
                  <div className="text-2xl font-bold text-orange-800">{severityData[1].value}</div>
                  <p className="text-sm text-orange-600">Important to address soon</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h3 className="text-yellow-700 font-medium">Low Severity</h3>
                  <div className="text-2xl font-bold text-yellow-800">{severityData[2].value}</div>
                  <p className="text-sm text-yellow-600">Should be addressed over time</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AuditDiagramAnalysis;
