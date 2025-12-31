// Professional WorkerCard component matching Home.jsx theme
import { MapPin, Phone, AlertTriangle, Clock, User } from 'lucide-react';

const statusConfig = {
  active: {
    badge: 'bg-green-500 text-white',
    text: 'Active',
    border: 'border-green-200 dark:border-green-800',
    bgGlow: 'bg-green-50 dark:bg-green-900/20'
  },
  warning: {
    badge: 'bg-yellow-500 text-white',
    text: 'Warning',
    border: 'border-yellow-200 dark:border-yellow-800',
    bgGlow: 'bg-yellow-50 dark:bg-yellow-900/20'
  },
  emergency: {
    badge: 'bg-red-500 text-white',
    text: 'Emergency',
    border: 'border-red-200 dark:border-red-800 animate-pulse',
    bgGlow: 'bg-red-50 dark:bg-red-900/20'
  },
  offline: {
    badge: 'bg-gray-500 text-white',
    text: 'Offline',
    border: 'border-gray-200 dark:border-gray-700',
    bgGlow: 'bg-gray-50 dark:bg-gray-900/20'
  }
};

export function WorkerCard({ worker, onEmergencyContact }) {
  const statusStyle = statusConfig[worker.status];
  
  // Get initials for avatar
  const initials = worker.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className={`rounded-2xl border-2 ${statusStyle.border} bg-[var(--color-surface)] overflow-hidden shadow-card transition-all hover:shadow-lg`}>
      {/* Header with Avatar and Status */}
      <div className={`${statusStyle.bgGlow} p-4 border-b border-slate-200 dark:border-slate-700`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="flex size-12 items-center justify-center rounded-full bg-[var(--color-accent)] text-white font-semibold">
              {worker.avatar ? (
                <img src={worker.avatar} alt={worker.name} className="size-full rounded-full object-cover" />
              ) : (
                <span>{initials}</span>
              )}
            </div>
            
            {/* Worker Info */}
            <div>
              <h4 className="font-semibold text-[var(--color-text)]">{worker.name}</h4>
              <p className="text-sm text-[var(--color-text-muted)]">{worker.position}</p>
            </div>
          </div>
          
          {/* Status Badge */}
          <span className={`${statusStyle.badge} rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide`}>
            {statusStyle.text}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Location */}
        <div className="flex items-start gap-2 text-sm">
          <MapPin className="size-4 text-[var(--color-text-muted)] flex-shrink-0 mt-0.5" />
          <span className="text-[var(--color-text)]">{worker.location}</span>
        </div>

        {/* Last Update */}
        <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
          <Clock className="size-4" />
          <span>Last update: {worker.lastUpdate}</span>
        </div>

        {/* Alerts */}
        {worker.alerts > 0 && (
          <div className="flex items-center gap-2 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 p-2 text-yellow-600 dark:text-yellow-400">
            <AlertTriangle className="size-4" />
            <span className="text-sm font-medium">
              {worker.alerts} active alert{worker.alerts > 1 ? 's' : ''}
            </span>
          </div>
        )}

        {/* Emergency Contact Button */}
        {(worker.status === 'warning' || worker.status === 'emergency') && (
          <button
            onClick={() => onEmergencyContact(worker.id)}
            className={`w-full flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
              worker.status === 'emergency'
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'border-2 border-[var(--color-border)] bg-[var(--color-surface-soft)] hover:bg-[var(--color-surface)] text-[var(--color-text)]'
            }`}
          >
            <Phone className="size-4" />
            Contact Worker
          </button>
        )}
      </div>
    </div>
  );
}
