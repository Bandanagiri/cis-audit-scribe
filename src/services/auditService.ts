
import { Benchmark } from "@/data/benchmarks";
import { runBenchmarkCheck } from "@/utils/auditUtils";

export interface AuditResult {
  benchmarkId: string;
  title: string;
  passed: boolean;
  details: string;
  timestamp: string;
}

export interface AuditReport {
  id: string;
  name: string;
  osType: string;
  timestamp: string;
  score: number;
  results: AuditResult[];
}

// In-memory storage for demo purposes
// In a real application, this would be a database
let auditReports: AuditReport[] = [];

export const auditService = {
  /**
   * Run an audit on the selected benchmarks
   */
  runAudit: async (benchmarks: Benchmark[], osType: string): Promise<AuditReport> => {
    console.log(`Running audit for ${osType} with ${benchmarks.length} benchmarks`);
    
    const results: AuditResult[] = [];
    
    for (const benchmark of benchmarks) {
      const checkResult = await runBenchmarkCheck(benchmark);
      
      results.push({
        benchmarkId: benchmark.id,
        title: benchmark.title,
        passed: checkResult.passed,
        details: checkResult.details,
        timestamp: new Date().toISOString(),
      });
    }
    
    const passedCount = results.filter(r => r.passed).length;
    const score = benchmarks.length > 0 ? Math.round((passedCount / benchmarks.length) * 100) : 0;
    
    const report: AuditReport = {
      id: `audit-${Date.now()}`,
      name: `${osType} Audit ${new Date().toLocaleDateString()}`,
      osType,
      timestamp: new Date().toISOString(),
      score,
      results,
    };
    
    // Store the report
    auditReports.push(report);
    
    return report;
  },
  
  /**
   * Get all audit reports
   */
  getReports: (): AuditReport[] => {
    return [...auditReports];
  },
  
  /**
   * Get a specific audit report
   */
  getReport: (id: string): AuditReport | undefined => {
    return auditReports.find(report => report.id === id);
  },
  
  /**
   * Clear all reports (for testing/demo purposes)
   */
  clearReports: (): void => {
    auditReports = [];
  }
};
