import { useEffect, useMemo, useState } from 'react';
import { Battery, Bell, HardHat, MapPin, Radio, Wifi } from 'lucide-react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import API from '../api/api';

const DeviceDashboard = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: '',
    location: '',
    firmwareVersion: '2.1.0',
    tags: '',
  });

  // ------------------------ FETCH DEVICES ------------------------
  const fetchDevices = async () => {
    try {
      setLoading(true);
      const { data } = await API.get('/devices');

      setDevices(data);

      if (!selectedId && data.length) {
        setSelectedId(data[0]._id);
      }

      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load devices');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  // ------------------------ FORM INPUT ------------------------
  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // ------------------------ CREATE DEVICE ------------------------
  const handleCreateDevice = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      await API.post('/devices', {
        name: form.name,
        location: form.location,
        firmwareVersion: form.firmwareVersion,
        tags: form.tags
          ? form.tags
              .split(',')
              .map((tag) => tag.trim())
              .filter(Boolean)
          : undefined,
      });

      setForm({
        name: '',
        location: '',
        firmwareVersion: '2.1.0',
        tags: '',
      });

      await fetchDevices();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add device');
    } finally {
      setSubmitting(false);
    }
  };

  // ------------------------ SELECTED DEVICE ------------------------
  const selectedDevice = useMemo(
    () => devices.find((device) => device._id === selectedId) || devices[0],
    [devices, selectedId]
  );

  // ------------------------ BATTERY FROM HISTORY ------------------------
  const latestBattery = useMemo(() => {
    if (!selectedDevice || !selectedDevice.history?.length) {
      return selectedDevice?.batteryLevel || 0;
    }
    return selectedDevice.history[selectedDevice.history.length - 1].battery;
  }, [selectedDevice]);

  // ------------------------ ALERTS (STATIC) ------------------------
  const alerts = useMemo(() => {
    if (!selectedDevice) return [];
    return [
      {
        id: `${selectedDevice._id}-1`,
        type: 'Gas spike',
        detail: 'CO concentration creeping toward warning threshold',
        severity: 'high',
        timestamp: '2 min ago',
      },
      {
        id: `${selectedDevice._id}-2`,
        type: 'Vitals',
        detail: 'Heartbeat irregularity auto-detected',
        severity: 'medium',
        timestamp: '8 min ago',
      },
    ];
  }, [selectedDevice]);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10">
      <div className="space-y-8">

        {/* ------------------------ HEADER ------------------------ */}
        <header className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
            Device Management
          </p>
          <h1 className="text-3xl font-bold text-[var(--color-text)]">Wearable Device Dashboard</h1>
          <p className="max-w-2xl text-sm text-[var(--color-text-muted)]">
            Monitor every MineGuard wearable and ensure sensor & connectivity health.
          </p>
        </header>

        {/* ------------------------ TOP CARDS ------------------------ */}
        <section className="grid gap-4 rounded-3xl border border-[var(--color-border)]
          bg-[var(--color-surface)] p-6 shadow-card sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: 'Connected Devices',
              value: devices.length || 0,
              icon: HardHat,
              accent: 'text-amber-500',
            },
            {
              title: 'LoRa / GSM Health',
              value: '99.2%',
              icon: Radio,
              accent: 'text-sky-500',
            },
            {
              title: 'Battery Avg',
              value: `${latestBattery}%`,
              icon: Battery,
              accent: 'text-emerald-500',
            },
            {
              title: 'Active Alerts',
              value: alerts.length,
              icon: Bell,
              accent: 'text-rose-500',
            },
          ].map(({ title, value, icon: Icon, accent }) => (
            <div key={title} className="rounded-2xl bg-[var(--color-surface-soft)] p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-[var(--color-text-muted)]">{title}</p>
                <Icon className={`h-4 w-4 ${accent}`} />
              </div>
              <p className="mt-3 text-2xl font-semibold text-[var(--color-text)]">{value}</p>
            </div>
          ))}
        </section>

        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">

          {/* ------------------------ DEVICE LIST ------------------------ */}
          <aside className="space-y-4">
            <div className="rounded-3xl border border-[var(--color-border)]
              bg-[var(--color-surface)] p-4 shadow-card">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-[var(--color-text)]">Devices</h2>
                <span className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
                  {devices.length} units
                </span>
              </div>

              <div className="mt-4 space-y-3 max-h-80 overflow-y-auto pr-2">
                {loading && <p className="text-sm">Loading devices...</p>}
                {error && <p className="text-sm text-rose-500">{error}</p>}

                {!loading &&
                  devices.map((device) => (
                    <button
                      key={device._id}
                      onClick={() => setSelectedId(device._id)}
                      className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                        selectedId === device._id
                          ? 'border-transparent bg-[var(--color-surface-strong)] shadow-card'
                          : 'border-[var(--color-border)] hover:bg-[var(--color-surface-soft)]'
                      }`}
                    >
                      <p className="font-semibold text-[var(--color-text)]">{device.name}</p>
                      <p className="text-xs text-[var(--color-text-muted)]">{device.location}</p>

                      <div className="mt-3 flex items-center justify-between text-xs">
                        <span className="flex items-center gap-1 text-[var(--color-text-muted)]">
                          <Wifi className="h-3 w-3" /> {device.status}
                        </span>

                        <span className="flex items-center gap-1 text-[var(--color-text-muted)]">
                          <Battery className="h-3 w-3" />
                          {device.history?.length
                            ? device.history[device.history.length - 1].battery
                            : device.batteryLevel}
                          %
                        </span>
                      </div>
                    </button>
                  ))}
              </div>
            </div>

            {/* ------------------------ ADD DEVICE FORM ------------------------ */}
            <form
              className="rounded-3xl border border-[var(--color-border)]
              bg-[var(--color-surface)] p-4 shadow-card space-y-4"
              onSubmit={handleCreateDevice}
            >
              <h3 className="text-lg font-semibold">Add Device</h3>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-[var(--color-text-muted)]">
                  Device Name
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border px-3 py-2 text-sm bg-[var(--color-surface-soft)]"
                  placeholder="Wearable Unit D5"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-[var(--color-text-muted)]">
                  Location
                </label>
                <input
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  className="w-full rounded-2xl border px-3 py-2 text-sm bg-[var(--color-surface-soft)]"
                  placeholder="Tunnel C1 - Level 4"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-[var(--color-text-muted)]">
                  Firmware
                </label>
                <input
                  name="firmwareVersion"
                  value={form.firmwareVersion}
                  onChange={handleChange}
                  className="w-full rounded-2xl border px-3 py-2 text-sm bg-[var(--color-surface-soft)]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-[var(--color-text-muted)]">
                  Tags
                </label>
                <input
                  name="tags"
                  value={form.tags}
                  onChange={handleChange}
                  className="w-full rounded-2xl border px-3 py-2 text-sm bg-[var(--color-surface-soft)]"
                  placeholder="gas, vitals"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-2xl bg-[var(--color-accent)] px-4 py-3
                text-sm font-semibold text-white hover:bg-[var(--color-accent-strong)]
                disabled:opacity-60"
              >
                {submitting ? 'Saving...' : 'Add Device'}
              </button>
            </form>
          </aside>

          {/* ------------------------ RIGHT PANEL ------------------------ */}
          <section className="space-y-6">

            {/* -------- SELECTED DEVICE CARD -------- */}
            <div className="rounded-3xl border border-[var(--color-border)]
              bg-[var(--color-surface)] p-6 shadow-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-text-muted)]">
                    Selected Device
                  </p>
                  <h2 className="text-2xl font-semibold">{selectedDevice?.name}</h2>
                  <p className="text-sm text-[var(--color-text-muted)] flex items-center gap-2">
                    <MapPin className="h-4 w-4" /> {selectedDevice?.location}
                  </p>
                </div>

                <div className="flex gap-4">
                  <div className="rounded-2xl bg-[var(--color-surface-soft)]
                    px-4 py-3 text-center">
                    <p className="text-xs uppercase text-[var(--color-text-muted)]">Battery</p>
                    <p className="text-xl font-semibold text-[var(--color-text)]">
                      {latestBattery}%
                    </p>
                  </div>

                  <div className="rounded-2xl bg-[var(--color-surface-soft)]
                    px-4 py-3 text-center">
                    <p className="text-xs uppercase text-[var(--color-text-muted)]">Status</p>
                    <p className="text-xl font-semibold capitalize">{selectedDevice?.status}</p>
                  </div>
                </div>
              </div>

              {/* -------- CHARTS ROW -------- */}
              <div className="mt-6 grid gap-4 md:grid-cols-2">

                {/* GAS CHART */}
                <div className="rounded-2xl border border-[var(--color-border)]
                  bg-[var(--color-surface-soft)] p-4">
                  <h4 className="text-sm font-semibold">Gas Sensors</h4>
                  <ResponsiveContainer width="100%" height={180}>
                    <AreaChart data={selectedDevice?.history || []}>
                      <defs>
                        <linearGradient id="gasGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#f97316" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="time" fontSize={12} stroke="var(--color-text-muted)" />
                      <YAxis fontSize={12} stroke="var(--color-text-muted)" />
                      <Tooltip />
                      <Area type="monotone" dataKey="co" stroke="#f97316"
                        fillOpacity={1} fill="url(#gasGradient)" />
                      <Area type="monotone" dataKey="ch4" stroke="#0ea5e9"
                        fillOpacity={0.2} fill="#0ea5e9" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* BATTERY / TEMP */}
                <div className="rounded-2xl border border-[var(--color-border)]
                  bg-[var(--color-surface-soft)] p-4">
                  <h4 className="text-sm font-semibold">Vitals & Battery</h4>
                  <ResponsiveContainer width="100%" height={180}>
                    <LineChart data={selectedDevice?.history || []}>
                      <XAxis dataKey="time" fontSize={12} stroke="var(--color-text-muted)" />
                      <YAxis fontSize={12} stroke="var(--color-text-muted)" />
                      <Tooltip />
                      <Line type="monotone" dataKey="battery" stroke="#22d3ee" strokeWidth={2} />
                      <Line type="monotone" dataKey="temperature" stroke="#f97316" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

              </div>
            </div>

            {/* -------- CONNECTIVITY + ALERTS -------- */}
            <div className="grid gap-6 lg:grid-cols-2">

              {/* CONNECTIVITY */}
              <div className="rounded-3xl border border-[var(--color-border)]
                bg-[var(--color-surface)] p-6 shadow-card">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Connectivity Health</h3>
                  <span className="text-xs font-semibold uppercase text-emerald-500">Stable</span>
                </div>

                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={selectedDevice?.history || []}>
                    <XAxis dataKey="time" fontSize={12} stroke="var(--color-text-muted)" />
                    <YAxis fontSize={12} stroke="var(--color-text-muted)" />
                    <Tooltip />
                    <Bar dataKey="battery" fill="#0ea5e9" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* ALERTS */}
              <div className="rounded-3xl border border-[var(--color-border)]
                bg-[var(--color-surface)] p-6 shadow-card">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Latest Alerts</h3>
                  <button
                    type="button"
                    onClick={() => fetchDevices()}
                    className="text-xs font-semibold text-[var(--color-highlight)]"
                  >
                    Refresh
                  </button>
                </div>

                <div className="mt-4 space-y-3">
                  {alerts.map((alert) => (
                    <div key={alert.id}
                      className="rounded-2xl border bg-[var(--color-surface-soft)] p-3">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold">{alert.type}</p>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            alert.severity === 'high'
                              ? 'bg-rose-500/10 text-rose-600'
                              : 'bg-amber-500/10 text-amber-600'
                          }`}
                        >
                          {alert.severity}
                        </span>
                      </div>
                      <p className="text-sm text-[var(--color-text-muted)]">{alert.detail}</p>
                      <p className="text-xs text-[var(--color-text-muted)]">{alert.timestamp}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DeviceDashboard;
