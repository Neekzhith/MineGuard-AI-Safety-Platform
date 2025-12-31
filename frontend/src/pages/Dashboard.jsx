// Professional Mining Safety Dashboard - Matching Home.jsx Theme
import { useState, useEffect } from 'react';
import { 
  HardHat, 
  Users, 
  Activity, 
  RefreshCw,
  MapPin,
  Bell
} from 'lucide-react';
import { SensorCard } from '../components/dashboard/SensorCard';
import { WorkerCard } from '../components/dashboard/WorkerCard';
import { AlertSystem } from '../components/dashboard/AlertSystem';

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState('overview');
  const [sensorData, setSensorData] = useState({
    temperature: 28,
    heartbeat: 75,
    gasLevel: 25
  });
  
  const [workers] = useState([
    {
      id: '1',
      name: 'John Martinez',
      position: 'Mining Engineer',
      location: 'Tunnel A-1, Level 3',
      status: 'active',
      lastUpdate: '2 min ago',
      alerts: 0
    },
    {
      id: '2',
      name: 'Sarah Chen',
      position: 'Safety Inspector',
      location: 'Tunnel B-2, Level 2',
      status: 'warning',
      lastUpdate: '1 min ago',
      alerts: 1
    },
    {
      id: '3',
      name: 'Mike Rodriguez',
      position: 'Equipment Operator',
      location: 'Central Chamber',
      status: 'emergency',
      lastUpdate: '30 sec ago',
      alerts: 3
    },
    {
      id: '4',
      name: 'Emma Thompson',
      position: 'Geologist',
      location: 'Tunnel C-1, Level 1',
      status: 'active',
      lastUpdate: '3 min ago',
      alerts: 0
    }
  ]);

  const [alerts, setAlerts] = useState([
    {
      id: '1',
      type: 'health',
      severity: 'critical',
      message: 'Heart rate elevated above safe threshold - immediate medical attention required',
      timestamp: '2 minutes ago',
      workerId: '3',
      workerName: 'Mike Rodriguez',
      acknowledged: false
    },
    {
      id: '2',
      type: 'environmental',
      severity: 'high',
      message: 'Gas concentration approaching dangerous levels in Tunnel B-2',
      timestamp: '5 minutes ago',
      workerId: '2',
      workerName: 'Sarah Chen',
      acknowledged: false
    },
    {
      id: '3',
      type: 'equipment',
      severity: 'medium',
      message: 'Temperature sensor calibration required',
      timestamp: '15 minutes ago',
      acknowledged: true
    }
  ]);

  // Simulate real-time sensor updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      
      setSensorData(prev => ({
        temperature: Math.max(15, Math.min(45, prev.temperature + (Math.random() - 0.5) * 2)),
        heartbeat: Math.max(50, Math.min(130, prev.heartbeat + (Math.random() - 0.5) * 5)),
        gasLevel: Math.max(0, Math.min(100, prev.gasLevel + (Math.random() - 0.5) * 3))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleAcknowledgeAlert = (alertId) => {
    setAlerts(prev => 
      prev.map(alert => 
        alert.id === alertId ? { ...alert, acknowledged: true } : alert
      )
    );
  };

  const handleEmergencyBroadcast = () => {
    alert('Emergency broadcast sent to all workers');
  };

  const handleContactEmergencyServices = () => {
    alert('Contacting emergency services...');
  };

  const handleEmergencyContact = (workerId) => {
    const worker = workers.find(w => w.id === workerId);
    alert(`Contacting ${worker?.name}...`);
  };

  const handleRefresh = () => {
    setCurrentTime(new Date());
    alert('Dashboard refreshed');
  };

  const getSensorStatus = (value, type) => {
    const thresholds = {
      temperature: { min: 15, max: 35, criticalMin: 10, criticalMax: 40 },
      heartbeat: { min: 60, max: 100, criticalMin: 50, criticalMax: 120 },
      gasLevel: { min: 0, max: 50, criticalMin: 0, criticalMax: 100 }
    };

    const threshold = thresholds[type];
    if (value <= threshold.criticalMin || value >= threshold.criticalMax) return 'critical';
    if (value <= threshold.min || value >= threshold.max) return 'warning';
    return 'normal';
  };

  const activeWorkers = workers.filter(w => w.status !== 'offline').length;
  const emergencyWorkers = workers.filter(w => w.status === 'emergency').length;

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'workers', label: 'Workers' },
    { id: 'alerts', label: 'Alerts' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'system', label: 'System' }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-orange-50 dark:bg-orange-900/20 p-3">
              <HardHat className="size-8 text-[var(--color-accent)]" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-text)]">Mining Safety Monitor</h1>
              <p className="text-sm text-[var(--color-text-muted)]">Underground Worker Alert System</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs text-[var(--color-text-muted)]">Current Time</p>
              <p className="font-mono text-sm text-[var(--color-text)]">{currentTime.toLocaleString()}</p>
            </div>
            <button
              onClick={handleRefresh}
              className="flex items-center gap-2 rounded-xl border-2 border-[var(--color-border)] bg-[var(--color-surface-soft)] hover:bg-[var(--color-surface)] px-4 py-2 text-sm font-medium text-[var(--color-text)] transition"
            >
              <RefreshCw className="size-4" />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 flex items-center gap-3">
            <div className="rounded-xl bg-blue-50 dark:bg-blue-900/20 p-3">
              <Users className="size-5 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-[var(--color-text-muted)]">Active Workers</p>
              <p className="text-2xl font-bold text-[var(--color-text)]">{activeWorkers}</p>
            </div>
          </div>
          
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 flex items-center gap-3">
            <div className="rounded-xl bg-green-50 dark:bg-green-900/20 p-3">
              <MapPin className="size-5 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-[var(--color-text-muted)]">Areas Monitored</p>
              <p className="text-2xl font-bold text-[var(--color-text)]">8</p>
            </div>
          </div>
          
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 flex items-center gap-3">
            <div className="rounded-xl bg-orange-50 dark:bg-orange-900/20 p-3">
              <Activity className="size-5 text-[var(--color-accent)]" />
            </div>
            <div>
              <p className="text-sm text-[var(--color-text-muted)]">Active Alerts</p>
              <p className="text-2xl font-bold text-[var(--color-text)]">{alerts.filter(a => !a.acknowledged).length}</p>
            </div>
          </div>
          
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 flex items-center gap-3">
            <div className="rounded-xl bg-red-50 dark:bg-red-900/20 p-3">
              <HardHat className="size-5 text-red-500" />
            </div>
            <div>
              <p className="text-sm text-[var(--color-text-muted)]">Emergency Status</p>
              <span className={`inline-block mt-1 rounded-full px-3 py-1 text-xs font-semibold ${
                emergencyWorkers > 0 ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
              }`}>
                {emergencyWorkers > 0 ? `${emergencyWorkers} Emergency` : 'All Clear'}
              </span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-2 shadow-card">
          <div className="flex flex-wrap gap-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                  activeTab === tab.id
                    ? 'bg-[var(--color-accent)] text-white'
                    : 'text-[var(--color-text)] hover:bg-[var(--color-surface-soft)]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Real-time Sensors */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <SensorCard
                type="temperature"
                value={sensorData.temperature}
                unit="°C"
                status={getSensorStatus(sensorData.temperature, 'temperature')}
                threshold={{ min: 15, max: 35 }}
              />
              <SensorCard
                type="heartbeat"
                value={sensorData.heartbeat}
                unit="BPM"
                status={getSensorStatus(sensorData.heartbeat, 'heartbeat')}
                threshold={{ min: 60, max: 100 }}
              />
              <SensorCard
                type="gas"
                value={sensorData.gasLevel}
                unit="PPM"
                status={getSensorStatus(sensorData.gasLevel, 'gasLevel')}
                threshold={{ min: 0, max: 50 }}
              />
            </div>

            {/* Critical Workers and Recent Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[var(--color-text)] flex items-center gap-2">
                  <Users className="size-5 text-[var(--color-accent)]" />
                  Critical Workers
                </h3>
                <div className="space-y-3">
                  {workers
                    .filter(w => w.status === 'emergency' || w.status === 'warning')
                    .map(worker => (
                      <WorkerCard 
                        key={worker.id} 
                        worker={worker}
                        onEmergencyContact={handleEmergencyContact}
                      />
                    ))}
                </div>
              </div>
              
              <AlertSystem
                alerts={alerts.slice(0, 3)}
                onAcknowledge={handleAcknowledgeAlert}
                onEmergencyBroadcast={handleEmergencyBroadcast}
                onContactEmergencyServices={handleContactEmergencyServices}
              />
            </div>
          </div>
        )}

        {activeTab === 'workers' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {workers.map(worker => (
              <WorkerCard 
                key={worker.id} 
                worker={worker}
                onEmergencyContact={handleEmergencyContact}
              />
            ))}
          </div>
        )}

        {activeTab === 'alerts' && (
          <AlertSystem
            alerts={alerts}
            onAcknowledge={handleAcknowledgeAlert}
            onEmergencyBroadcast={handleEmergencyBroadcast}
            onContactEmergencyServices={handleContactEmergencyServices}
          />
        )}

        {activeTab === 'analytics' && (
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center">
            <Bell className="size-16 mx-auto text-[var(--color-text-muted)] mb-4" />
            <h3 className="text-lg font-semibold text-[var(--color-text)] mb-2">Analytics Coming Soon</h3>
            <p className="text-sm text-[var(--color-text-muted)]">
              Historical charts and trend analysis will be available here
            </p>
          </div>
        )}

        {activeTab === 'system' && (
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center">
            <Activity className="size-16 mx-auto text-[var(--color-text-muted)] mb-4" />
            <h3 className="text-lg font-semibold text-[var(--color-text)] mb-2">System Status Coming Soon</h3>
            <p className="text-sm text-[var(--color-text-muted)]">
              Device health and connectivity monitoring will be available here
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
