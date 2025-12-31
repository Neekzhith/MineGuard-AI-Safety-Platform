const express = require('express');
const Device = require('../models/Device');
const authenticate = require('../middleware/auth');

const router = express.Router();

// ------------------------------------------------------
// RANDOM REALISTIC HISTORY GENERATOR
// ------------------------------------------------------
let highBatteryAssigned = false; // ensures at least one device has 95–100%

function generateHistory() {
  const history = [];

  // ---------------------------------------------
  // PICK BATTERY PROFILE
  // ---------------------------------------------

  let battery;

  // If no device has high battery yet → force one
  if (!highBatteryAssigned) {
    battery = Math.floor(95 + Math.random() * 6); // 95–100%
    highBatteryAssigned = true;
  } 
  else {
    // Otherwise pick a mixed realistic range
    const ranges = [
      [90, 100],  // high
      [70, 90],   // medium
      [55, 75],   // medium-low
      [40, 60],   // low
    ];
    const [min, max] = ranges[Math.floor(Math.random() * ranges.length)];
    battery = Math.floor(min + Math.random() * (max - min));
  }

  // ---------------------------------------------
  // GENERATE 8 HISTORY POINTS
  // ---------------------------------------------
  for (let i = 0; i < 8; i++) {
    history.push({
      time: `${8 + i}:00`,
      battery: battery,
      co: Math.floor(8 + Math.random() * 20),   // 8–28 ppm
      ch4: Math.floor(4 + Math.random() * 10),  // 4–14 ppm
      temperature: Math.floor(25 + Math.random() * 5), // 25–30°C
    });

    // Battery drops gently 1–3% per hour
    battery -= Math.floor(1 + Math.random() * 3);
    if (battery < 10) battery = 10;
  }

  return history;
}
// ------------------------------------------------------
// DEMO DEVICES ON FIRST LAUNCH
// ------------------------------------------------------
const demoDevices = [
  {
    name: 'Wearable Unit A1',
    location: 'Tunnel B - Level 2',
    status: 'online',
    batteryLevel: 82,
    firmwareVersion: '2.1.0',
    notes: 'Assigned to shift alpha',
    tags: ['gas', 'vitals'],
  },
  {
    name: 'Wearable Unit C3',
    location: 'Central Chamber',
    status: 'alert',
    batteryLevel: 45,
    firmwareVersion: '2.0.8',
    notes: 'CO spike detected earlier',
    tags: ['gas'],
  },
];

// ------------------------------------------------------
// GET ALL DEVICES
// ------------------------------------------------------
router.get('/', authenticate, async (req, res) => {
  try {
    let devices = await Device.find({ userId: req.user.id }).sort({ updatedAt: -1 });

    // Load demo devices only once
    if (devices.length === 0) {
      devices = await Device.insertMany(
        demoDevices.map((device) => ({
          ...device,
          userId: req.user.id,
          history: generateHistory(),
          lastActive: new Date(Date.now() - Math.random() * 3600000),
        }))
      );
    }

    res.json(devices);
  } catch (error) {
    console.error('Fetch devices error:', error);
    res.status(500).json({ message: 'Failed to fetch devices.' });
  }
});

// ------------------------------------------------------
// CREATE DEVICE
// ------------------------------------------------------
router.post('/', authenticate, async (req, res) => {
  try {
    const { name, location, status, batteryLevel, firmwareVersion, notes, tags } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Device name is required.' });
    }

    const device = await Device.create({
      userId: req.user.id,
      name,
      location,
      status: status || 'online',
      batteryLevel: typeof batteryLevel === 'number' ? batteryLevel : 100,
      firmwareVersion: firmwareVersion || '2.1.0',
      notes,
      tags,
      lastActive: new Date(),
      history: generateHistory(), // NEW DEVICES ALSO GET CHART DATA
    });

    res.status(201).json(device);
  } catch (error) {
    console.error('Create device error:', error);
    res.status(500).json({ message: 'Failed to create device.' });
  }
});

module.exports = router;
