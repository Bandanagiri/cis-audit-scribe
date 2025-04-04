
export interface Benchmark {
  id: string;
  title: string;
  description: string;
  remediation: string;
  severity: 'High' | 'Medium' | 'Low';
  status: 'pass' | 'fail' | 'unknown';
  osType: 'windows' | 'linux';
  category: string;
}

export const benchmarks: Benchmark[] = [
  {
    id: '1.1.1',
    title: 'Ensure filesystem integrity is regularly checked',
    description: 'Periodic checking of the filesystem integrity is key to the security of the system. By default, Unix systems provide a utility called fsck to validate the underlying filesystem. Periodic checks can detect corruption, which could indicate possible tampering.',
    remediation: 'Configure cron job to run filesystem integrity checks regularly using fsck or similar tools.',
    severity: 'High',
    status: 'fail',
    osType: 'linux',
    category: 'Initial Setup'
  },
  {
    id: '1.1.2',
    title: 'Ensure separate partition exists for /tmp',
    description: 'The /tmp directory is a world-writable directory used for temporary storage by all users and some applications. Placing /tmp on its own partition enables options to be set that can increase security.',
    remediation: 'Create a separate partition for /tmp during system installation or resize the existing partitions to create space for a separate /tmp partition.',
    severity: 'Medium',
    status: 'pass',
    osType: 'linux',
    category: 'Initial Setup'
  },
  {
    id: '2.2.1',
    title: 'Ensure password creation requirements are configured',
    description: 'Strong passwords protect systems from being hacked through brute force methods. Password creation policies can be set to enforce minimum standards for password complexity.',
    remediation: 'Edit the /etc/security/pwquality.conf file to include settings for password requirements.',
    severity: 'High',
    status: 'fail',
    osType: 'linux',
    category: 'Account Management'
  },
  {
    id: '18.9.45.1',
    title: 'Ensure Windows Defender Credential Guard is enabled',
    description: 'Windows Defender Credential Guard uses virtualization-based security to isolate secrets so that only privileged system software can access them.',
    remediation: 'Enable Windows Defender Credential Guard through Group Policy: Computer Configuration\\Administrative Templates\\System\\Device Guard\\Turn On Virtualization Based Security.',
    severity: 'High',
    status: 'unknown',
    osType: 'windows',
    category: 'Advanced Security'
  },
  {
    id: '18.9.47.1',
    title: 'Ensure User Account Control is enabled',
    description: 'User Account Control (UAC) is a security feature that requires users to provide approval before allowing elevation of privilege for applications.',
    remediation: 'Configure the policy value for Computer Configuration\\Windows Settings\\Security Settings\\Local Policies\\Security Options\\User Account Control to be enabled.',
    severity: 'Medium',
    status: 'pass',
    osType: 'windows',
    category: 'User Account Control'
  }
];
