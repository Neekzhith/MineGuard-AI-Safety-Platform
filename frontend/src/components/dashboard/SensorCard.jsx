// Professional SensorCard component matching Home.jsx theme
import { AlertTriangle, Heart, Thermometer, Wind } from 'lucide-react';

const sensorConfig = {
  temperature: {
    icon: Thermometer,
    label: 'Temperature',
    color: 'text-orange-500',
    bgColor: 'bg-orange-50 dark:bg-orange-900/20'
  },
  heartbeat: {
    icon: Heart,
    label: 'Heart Rate',
    color: 'text-red-500',
    bgColor: 'bg-red-50 dark:bg-red-900/20'
  },
  gas: {
    icon: Wind,
    label: 'Gas Level',
    color: 'text-blue-500',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20'
  }
};

const statusConfig = {
  normal: {
    badge: 'bg-green-500 text-white',
    progress: 'bg-green-500',
    text: 'Normal',
    border: 'border-green-200 dark:border-green-800'
  },
  warning: {
    badge: 'bg-yellow-500 text-white',
    progress: 'bg-yellow-500',
    text: 'Warning',
    border: 'border-yellow-200 dark:border-yellow-800'
  },
  critical: {
    badge: 'bg-red-500 text-white',
    progress: 'bg-red-500',
    text: 'Critical',
    border: 'border-red-200 dark:border-red-800 animate-pulse'
  }
};

export function SensorCard({ type, value, unit, status, threshold }) {
  const config = sensorConfig[type];
  const statusStyle = statusConfig[status];
  const Icon = config.icon;
  
  const percentage = Math.min(100, Math.max(0, ((value - threshold.min) / (threshold.max - threshold.min)) * 100));

  return (
    <div className={`rounded-2xl border-2 ${statusStyle.border} bg-[var(--color-surface)] p-6 shadow-card transition-all hover:shadow-lg`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`${config.bgColor} rounded-xl p-3`}>
            <Icon className={`size-6 ${config.color}`} />
          </div>
          <h3 className="font-semibold text-[var(--color-text)]">{config.label}</h3>
        </div>
        <span className={`${statusStyle.badge} rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide`}>
          {statusStyle.text}
        </span>
      </div>

      {/* Value */}
      <div className="mb-4">
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold text-[var(--color-text)]">{Math.round(value)}</span>
          <span className="text-lg text-[var(--color-text-muted)]">{unit}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-[var(--color-text-muted)]">
          <span>{threshold.min} {unit}</span>
          <span>{threshold.max} {unit}</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
          <div 
            className={`h-full rounded-full ${statusStyle.progress} transition-all duration-500 ${
              status === 'critical' ? 'animate-pulse' : ''
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Critical Warning */}
      {status === 'critical' && (
        <div className="mt-4 flex items-center gap-2 rounded-lg bg-red-50 dark:bg-red-900/20 p-3 text-red-600 dark:text-red-400 animate-pulse">
          <AlertTriangle className="size-4 flex-shrink-0" />
          <span className="text-sm font-medium">Immediate attention required!</span>
        </div>
      )}
    </div>
  );
}
