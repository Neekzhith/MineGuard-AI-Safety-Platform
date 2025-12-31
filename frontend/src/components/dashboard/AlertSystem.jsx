// Professional AlertSystem component matching Home.jsx theme
import { AlertTriangle, Bell, Phone, Users, Siren } from 'lucide-react';

const severityConfig = {
  low: { 
    color: 'bg-blue-500 text-white', 
    icon: Bell,
    border: 'border-blue-200 dark:border-blue-800',
    bg: 'bg-blue-50 dark:bg-blue-900/20'
  },
  medium: { 
    color: 'bg-yellow-500 text-white', 
    icon: AlertTriangle,
    border: 'border-yellow-200 dark:border-yellow-800',
    bg: 'bg-yellow-50 dark:bg-yellow-900/20'
  },
  high: { 
    color: 'bg-orange-500 text-white', 
    icon: AlertTriangle,
    border: 'border-orange-200 dark:border-orange-800',
    bg: 'bg-orange-50 dark:bg-orange-900/20'
  },
  critical: { 
    color: 'bg-red-500 text-white', 
    icon: Siren,
    border: 'border-red-200 dark:border-red-800',
    bg: 'bg-red-50 dark:bg-red-900/20'
  }
};

const typeConfig = {
  environmental: 'Environmental',
  health: 'Health',
  equipment: 'Equipment',
  communication: 'Communication'
};

export function AlertSystem({ 
  alerts, 
  onAcknowledge, 
  onEmergencyBroadcast, 
  onContactEmergencyServices 
}) {
  const criticalAlerts = alerts.filter(alert => alert.severity === 'critical');
  const unacknowledgedAlerts = alerts.filter(alert => !alert.acknowledged);

  return (
    <div className="space-y-6">
      {/* Emergency Controls */}
      <div className="rounded-2xl border-2 border-red-200 dark:border-red-800 bg-[var(--color-surface)] p-6 shadow-card">
        <div className="flex items-center gap-3 mb-4">
          <div className="rounded-xl bg-red-50 dark:bg-red-900/20 p-3">
            <Siren className="size-5 text-red-600 dark:text-red-400" />
          </div>
          <h3 className="text-lg font-semibold text-red-600 dark:text-red-400">Emergency Controls</h3>
        </div>

        <div className="space-y-3">
          {/* Emergency Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={onEmergencyBroadcast}
              className="flex items-center justify-center gap-2 rounded-xl bg-red-500 hover:bg-red-600 px-4 py-3 text-sm font-semibold text-white transition"
            >
              <Users className="size-4" />
              Emergency Broadcast
            </button>
            <button
              onClick={onContactEmergencyServices}
              className="flex items-center justify-center gap-2 rounded-xl border-2 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 px-4 py-3 text-sm font-semibold text-red-600 dark:text-red-400 transition"
            >
              <Phone className="size-4" />
              Contact Emergency Services
            </button>
          </div>

          {/* Critical Alert Banner */}
          {criticalAlerts.length > 0 && (
            <div className="flex items-start gap-3 rounded-xl border-2 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 p-4">
              <AlertTriangle className="size-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-red-800 dark:text-red-200">
                <p className="font-semibold">
                  {criticalAlerts.length} critical alert{criticalAlerts.length > 1 ? 's' : ''} requiring immediate attention
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Active Alerts List */}
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-card">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-orange-50 dark:bg-orange-900/20 p-3">
              <Bell className="size-5 text-[var(--color-accent)]" />
            </div>
            <h3 className="text-lg font-semibold text-[var(--color-text)]">Active Alerts</h3>
          </div>
          <span className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface-soft)] px-3 py-1 text-sm font-medium text-[var(--color-text)]">
            {unacknowledgedAlerts.length} unacknowledged
          </span>
        </div>

        {/* Alerts List */}
        {alerts.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center size-16 rounded-full bg-green-50 dark:bg-green-900/20 mb-4">
              <Bell className="size-8 text-green-500" />
            </div>
            <p className="text-[var(--color-text-muted)] text-sm font-medium">
              No active alerts - All systems normal
            </p>
          </div>
        ) : (
          <div className="space-y-3 max-h-[500px] overflow-y-auto">
            {alerts.map((alert) => {
              const config = severityConfig[alert.severity];
              const Icon = config.icon;
              
              return (
                <div
                  key={alert.id}
                  className={`rounded-xl border-2 ${
                    alert.acknowledged ? 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/20' : config.border + ' ' + config.bg
                  } p-4 ${
                    alert.severity === 'critical' && !alert.acknowledged ? 'animate-pulse' : ''
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`${alert.acknowledged ? 'bg-gray-200 dark:bg-gray-700' : config.color} rounded-lg p-2.5 flex-shrink-0`}>
                      <Icon className="size-5" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      {/* Badges */}
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className={`${config.color} rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide`}>
                          {alert.severity}
                        </span>
                        <span className="rounded-full bg-slate-200 dark:bg-slate-700 px-2.5 py-0.5 text-xs font-medium text-slate-700 dark:text-slate-300">
                          {typeConfig[alert.type]}
                        </span>
                      </div>

                      {/* Message */}
                      <p className="text-sm text-[var(--color-text)] mb-2">{alert.message}</p>

                      {/* Worker Info */}
                      {alert.workerName && (
                        <p className="text-xs text-[var(--color-text-muted)] mb-1">
                          Worker: <span className="font-medium">{alert.workerName}</span>
                        </p>
                      )}

                      {/* Timestamp */}
                      <p className="text-xs text-[var(--color-text-muted)]">
                        {alert.timestamp}
                      </p>
                    </div>

                    {/* Acknowledge Button */}
                    {!alert.acknowledged && (
                      <button
                        onClick={() => onAcknowledge(alert.id)}
                        className="flex-shrink-0 rounded-lg border-2 border-[var(--color-border)] bg-[var(--color-surface-soft)] hover:bg-[var(--color-surface)] px-3 py-1.5 text-sm font-medium text-[var(--color-text)] transition"
                      >
                        Acknowledge
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
