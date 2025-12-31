import { useEffect, useRef, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  ArrowDown,
  Award,
  Battery,
  Bot,
  CheckCircle,
  Phone,
  Clock,
  Cpu,
  Gauge,
  HardHat,
  Heart,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  MessageSquare,
  Monitor,
  Radio,
  Send,
  Shield,
  Signal,
  Thermometer,
  TrendingDown,
  TrendingUp,
  User,
  Users,
  Watch,
  Wind,
  X,
  Zap,
} from 'lucide-react';
// Make sure these paths are correct for your project
import ImageWithFallback from '../components/ImageWithFallback';
import API from '../api/api';

const Separator = () => <div className="h-px w-full bg-slate-200" />;

const heroStats = [
  { label: 'Uptime with offline buffering', value: '99.9%' },
  { label: 'Wearable battery endurance', value: '12 hrs' },
];

const stats = [
  {
    icon: Shield,
    value: '99.9%',
    label: 'Safety Detection Rate',
    description: 'Accurate hazard identification',
  },
  {
    icon: Clock,
    value: '< 30s',
    label: 'Response Time',
    description: 'Instant alert delivery',
  },
  {
    icon: Users,
    value: '24/7',
    label: 'Continuous Monitoring',
    description: 'Round-the-clock protection',
  },
  {
    icon: TrendingUp,
    value: '85%',
    label: 'Accident Reduction',
    description: 'Proven safety improvement',
  },
];

const featureCards = [
  {
    icon: Activity,
    title: 'Real-Time Monitoring',
    description: 'Continuously tracks temperature, gas levels, and worker heartbeat',
    details: ['Temperature sensing', 'Gas level detection', 'Heart rate monitoring'],
    color: 'bg-red-500',
  },
  {
    icon: Zap,
    title: 'Instant Alerts',
    description: 'GSM module sends SMS alerts to supervisors during emergencies',
    details: ['SMS notifications', 'Emergency protocols', 'Supervisor alerts'],
    color: 'bg-orange-500',
  },
  {
    icon: Watch,
    title: 'Wearable & Lightweight',
    description: 'Designed for comfort and mobility in underground environments',
    details: ['Ergonomic design', 'Lightweight materials', 'Comfortable wear'],
    color: 'bg-blue-500',
  },
  {
    icon: Monitor,
    title: 'Local Display',
    description: 'Built-in display unit for immediate on-site status updates',
    details: ['LCD/LED screen', 'Real-time data', 'Status indicators'],
    color: 'bg-green-500',
  },
  {
    icon: HardHat,
    title: 'Durable Design',
    description: 'Shock-resistant and suitable for harsh mining conditions',
    details: ['Shock resistant', 'Dust protection', 'Water resistant'],
    color: 'bg-purple-500',
  },
  {
    icon: Cpu,
    title: 'Arduino-Based',
    description: 'Reliable microcontroller interfacing ensures accurate data processing',
    details: ['Arduino controller', 'Accurate processing', 'Reliable operation'],
    color: 'bg-teal-500',
  },
];

const specs = [
  {
    icon: Thermometer,
    title: 'Temperature Sensor',
    description: 'High-accuracy body/environmental readings',
    range: '±0.5°C accuracy',
    color: 'bg-red-500',
  },
  {
    icon: Heart,
    title: 'Heartbeat Sensor',
    description: 'Real-time pulse monitoring',
    range: '60-200 BPM range',
    color: 'bg-pink-500',
  },
  {
    icon: Wind,
    title: 'Gas Sensor',
    description: 'Detects hazardous gases (CH₄, CO, etc.)',
    range: 'PPM level detection',
    color: 'bg-yellow-500',
  },
  {
    icon: Radio,
    title: 'GSM Communication',
    description: 'SMS alerts and data transmission',
    range: 'Global coverage',
    color: 'bg-blue-500',
  },
  {
    icon: Monitor,
    title: 'Display Unit',
    description: 'LCD/LED screen for on-site info',
    range: 'Real-time updates',
    color: 'bg-green-500',
  },
  {
    icon: Cpu,
    title: 'Arduino Controller',
    description: 'Reliable microcontroller processing',
    range: 'High reliability',
    color: 'bg-purple-500',
  },
];

const performanceMetrics = [
  { label: 'Battery Life', value: 85, unit: '12+ hours', icon: Battery },
  { label: 'Accuracy Rate', value: 99, unit: '99.9%', icon: Gauge },
  { label: 'Signal Strength', value: 92, unit: 'Strong', icon: Signal },
  { label: 'Response Time', value: 95, unit: '< 30s', icon: Clock },
];

const safetyStats = [
  {
    icon: TrendingDown,
    title: '85% Reduction',
    subtitle: 'In Mining Accidents',
    value: 85,
    color: 'bg-green-500',
    description: 'Significant decrease in workplace incidents',
  },
  {
    icon: Clock,
    title: '30 Seconds',
    subtitle: 'Average Response Time',
    value: 95,
    color: 'bg-blue-500',
    description: 'Rapid emergency alert system',
  },
  {
    icon: Users,
    title: '500+ Workers',
    subtitle: 'Protected Daily',
    value: 78,
    color: 'bg-purple-500',
    description: 'Lives safeguarded by our system',
  },
  {
    icon: CheckCircle,
    title: '99.9% Uptime',
    subtitle: 'System Reliability',
    value: 99,
    color: 'bg-orange-500',
    description: 'Consistent monitoring without fail',
  },
];

const hazardTypes = [
  { name: 'Gas Leakage', detected: 98, prevented: 94 },
  { name: 'Heat Exposure', detected: 96, prevented: 91 },
  { name: 'Health Issues', detected: 94, prevented: 88 },
  { name: 'Equipment Failure', detected: 92, prevented: 85 },
];

const contactInfo = [
  {
    icon: Mail,
    title: 'Email Us',
    details: 'safety@smartminingsolutions.com',
    description: 'Get in touch for inquiries',
  },
  {
    icon: Phone,
    title: 'Call Us',
    details: '+1 (555) 123-4567',
    description: 'Speak with our safety experts',
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    details: '123 Mining Safety Blvd, Tech City',
    description: 'Schedule a demonstration',
  },
];

const whyChooseUs = [
  {
    icon: Award,
    title: 'Industry Leading',
    description: '15+ years in mining safety technology',
  },
  {
    icon: Users,
    title: 'Expert Team',
    description: 'Certified safety engineers & technicians',
  },
  {
    icon: CheckCircle,
    title: 'Proven Results',
    description: '500+ successful implementations',
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Round-the-clock technical assistance',
  },
];

const HeroSection = () => {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute left-0 top-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 translate-x-1/2 translate-y-1/2 rounded-full bg-blue-500 blur-3xl" />
      </div>

      {/* MODIFIED: Removed max-w-6xl. Kept px-6. Added py-16/py-24 for spacing. */}
      <div className="relative mx-auto w-full max-w-7xl px-6 py-16 sm:py-24">
        <div className="grid grid-cols-1 items-center gap-8 sm:gap-12 lg:grid-cols-2">
          <div className="space-y-6 text-center lg:text-left">
            <div className="flex justify-center lg:justify-start">
              <div className="rounded-full bg-orange-500 p-4">
                <Shield className="h-12 w-12 text-white" />
              </div>
            </div>
            <div>
              <h1 className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">Smart Wearable Alert System for Mining Safety</h1>
              <p className="text-base sm:text-lg text-slate-300">
                Protecting Lives with Real-Time Monitoring &amp; Instant Alerts. Advanced sensor technology meets GSM
                communication for ultimate mining safety.
              </p>
            </div>
            <div className="flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <button
                type="button"
                onClick={() => scrollToSection('contact')}
                className="rounded-md bg-orange-500 px-6 sm:px-8 py-3 font-medium text-white transition hover:bg-orange-600"
              >
                Get in Touch
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('features')}
                className="rounded-md border border-slate-400 px-6 sm:px-8 py-3 font-medium text-slate-300 transition hover:bg-slate-800"
              >
                Learn More
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1478427943966-1077bb65ca55?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bmRlcmdyb3VuZCUyMG1pbmluZyUyMHNhZmV0eSUyMGVxdWlwbWVudHxlbnwxfHx8fDE3NTQ5NzM0NzJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Mining safety equipment and wearable devices"
                className="w-full rounded-lg object-cover shadow-2xl aspect-video sm:aspect-auto"
              />
              <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            	 <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
              	 <p className="rounded bg-black/30 px-3 py-2 text-xs sm:text-sm text-white backdrop-blur-sm">
                	 Advanced wearable technology for underground mining safety
              	 </p>
            	 </div>
          	 </div>
          	 <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-orange-500/20 blur-xl" />
          	 <div className="absolute -bottom-4 -left-4 h-32 w-32 rounded-full bg-blue-500/20 blur-xl" />
        	 </div>
    	 </div>

    	 <div className="relative mt-12 sm:mt-16 text-center">
      	 <div className="animate-bounce">
        	 <ArrowDown className="mx-auto h-6 w-6 text-slate-400" />
      	 </div>
    	 </div>

    	 <div className="relative mt-8 sm:mt-12 grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2">
      	 {heroStats.map((stat) => (
        	 <div key={stat.label} className="rounded-xl border border-white/10 bg-white/5 p-4 sm:p-6 text-left backdrop-blur">
          	 <p className="text-2xl sm:text-3xl font-semibold text-white">{stat.value}</p>
          	 <p className="mt-1 text-xs sm:text-sm text-slate-200">{stat.label}</p>
        	 </div>
      	 ))}
    	 </div>
  	 </div>
  	 </section>
  );
};

const StatsSection = () => (
  <section className="bg-white dark:bg-slate-950 py-12 sm:py-16">
    {/* MODIFIED: Removed max-w-6xl. Kept px-6. */}
    <div className="mx-auto w-full max-w-7xl px-6">
      <div className="mb-8 sm:mb-12 text-center">
        <h2 className="mb-3 sm:mb-4 text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white">Why Choose Our Mining Safety System?</h2>
        <p className="mx-auto max-w-2xl text-sm sm:text-base text-slate-600 dark:text-slate-300">
          Backed by data and trusted by mining professionals worldwide
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ icon: Icon, value, label, description }) => (
          <div
            key={label}
            className="rounded-2xl border border-slate-200 dark:border-slate-700 p-4 sm:p-6 text-center transition-shadow hover:shadow-lg dark:bg-slate-800"
          >
            <div className="mx-auto mb-3 sm:mb-4 w-fit rounded-full bg-slate-100 dark:bg-slate-700 p-2 sm:p-3">
              <Icon className="h-6 sm:h-8 w-6 sm:w-8 text-slate-700 dark:text-slate-300" />
            </div>
            <div className="mb-1 sm:mb-2 text-xl sm:text-2xl font-bold text-slate-800 dark:text-white">{value}</div>
            <h4 className="mb-2 sm:mb-3 text-xs sm:text-sm font-semibold text-slate-800 dark:text-white">{label}</h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">{description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const FeaturesSection = () => (
  <section id="features" className="bg-slate-50 py-12 sm:py-16 dark:bg-slate-900">
    {/* MODIFIED: Removed max-w-6xl. Kept px-6. */}
    <div className="mx-auto w-full max-w-7xl px-6">
      <div className="mb-8 sm:mb-12 text-center">
        <h2 className="mb-3 sm:mb-4 text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white">Advanced Safety Features</h2>
        <p className="mx-auto max-w-2xl text-sm sm:text-base text-slate-600 dark:text-slate-300">
          Comprehensive monitoring and alert system designed specifically for mining environments
        </p>
      </div>

      <div className="mb-12 sm:mb-16 grid grid-cols-1 gap-8 sm:gap-12 lg:grid-cols-2">
        <div className="space-y-4 sm:space-y-6">
          <h3 className="text-lg sm:text-xl font-semibold text-slate-800 dark:text-white">Wearable Technology</h3>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            Our smart wearable device integrates seamlessly into existing safety protocols, providing continuous
            monitoring without hindering worker mobility.
          </p>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-2 sm:space-y-3">
              <div className="rounded-lg bg-blue-100 dark:bg-blue-900/30 p-3">
                <Watch className="h-5 sm:h-6 w-5 sm:w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h4 className="text-sm sm:text-base font-semibold text-slate-800 dark:text-white">Lightweight Design</h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">Ergonomic and comfortable for extended wear</p>
            </div>
            <div className="space-y-2 sm:space-y-3">
              <div className="rounded-lg bg-green-100 dark:bg-green-900/30 p-3">
                <Shield className="h-5 sm:h-6 w-5 sm:w-6 text-green-600 dark:text-green-400" />
              </div>
              <h4 className="text-sm sm:text-base font-semibold text-slate-800 dark:text-white">Durable Build</h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">Built to withstand harsh mining conditions</p>
            </div>
          </div>
        </div>
      	 <div className="relative">
        	 <ImageWithFallback
          	 src="https://images.unsplash.com/photo-1580943943004-6a4697b70059?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWFyYWJsZSUyMHRlY2hub2xvZ3klMjBkZXZpY2V8ZW58MXx8fHwxNzU0OTczNDc1fDA&ixlib=rb-4.1.0&q=80&w=1080"
          	 alt="Wearable technology device"
          	 className="w-full rounded-lg object-cover shadow-lg aspect-video sm:aspect-auto"
        	 />
        	 <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      	 </div>
      </div>

      <div className="mb-12 sm:mb-16 grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
      	 {featureCards.map(({ icon: Icon, title, description, details, color }) => (
        	 <div
          	 key={title}
          	 className="group rounded-2xl border border-slate-200 dark:border-slate-700 p-4 sm:p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg dark:bg-slate-800"
        	 >
          	 <div className={`${color} mb-3 sm:mb-4 w-fit rounded-full p-3 transition-transform group-hover:scale-110`}>
            	 <Icon className="h-5 sm:h-6 w-5 sm:w-6 text-white" />
          	 </div>
          	 <h3 className="mb-2 sm:mb-3 text-base sm:text-lg font-semibold text-slate-800 dark:text-white">{title}</h3>
          	 <p className="mb-3 sm:mb-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300">{description}</p>
          	 <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            	 {details.map((detail) => (
              	 <li key={detail} className="flex items-center">
                	 <span className="mr-2 h-2 w-2 rounded-full bg-slate-400 dark:bg-slate-500" />
                	 {detail}
              	 </li>
            	 ))}
          	 </ul>
        	 </div>
    	 ))}
    </div>

      <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 sm:p-8">
    	 <h3 className="mb-6 sm:mb-8 text-center text-lg sm:text-xl font-semibold text-slate-800 dark:text-white">System Architecture Overview</h3>
    	 <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-4">
    	 	 {[
        	 { icon: Thermometer, title: 'Sensors', description: 'Temperature, Heart Rate, Gas Detection', color: 'bg-red-100 dark:bg-red-900/30', iconColor: 'text-red-600 dark:text-red-400' },
        	 { icon: Cpu, title: 'Processing', description: 'Arduino Microcontroller', color: 'bg-blue-100 dark:bg-blue-900/30', iconColor: 'text-blue-600 dark:text-blue-400' },
        	 { icon: MessageSquare, title: 'Communication', description: 'GSM Module & Display', color: 'bg-green-100 dark:bg-green-900/30', iconColor: 'text-green-600 dark:text-green-400' },
        	 { icon: Shield, title: 'Safety', description: 'Alert System & Monitoring', color: 'bg-orange-100 dark:bg-orange-900/30', iconColor: 'text-orange-600 dark:text-orange-400' },
      	 ].map(({ icon: Icon, title, description, color, iconColor }) => (
        	 <div key={title} className="text-center">
          	 <div className={`mx-auto mb-2 sm:mb-3 w-fit rounded-full ${color} p-3 sm:p-4`}>
            	 <Icon className={`h-6 sm:h-8 w-6 sm:w-8 ${iconColor}`} />
          	 </div>
          	 <h4 className="mb-1 sm:mb-2 text-sm sm:text-base font-semibold text-slate-800 dark:text-white">{title}</h4>
          	 <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">{description}</p>
        	 </div>
      	 ))}
    	 </div>
    </div>
  </div>
</section>
);

const TechnicalSection = () => (
<section id="tech" className="bg-white dark:bg-slate-950 py-12 sm:py-16">
  {/* MODIFIED: Removed max-w-6xl. Kept px-6. */}
  <div className="mx-auto w-full max-w-7xl px-6">
    <div className="mb-8 sm:mb-12 text-center">
      <h2 className="mb-3 sm:mb-4 text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white">Technical Specifications</h2>
      <p className="mx-auto max-w-2xl text-sm sm:text-base text-slate-600 dark:text-slate-300">
        Enterprise-grade components engineered for maximum reliability in harsh environments
      </p>
    </div>

    <div className="mb-12 sm:mb-16 grid grid-cols-1 gap-8 sm:gap-12 lg:grid-cols-2">
      <div className="relative">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1753039495488-434a2fe53e41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMGRldmljZSUyMHNlbnNvcnN8ZW58MXx8fHwxNzU0OTczNDg0fDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Smart device sensors and components"
          className="w-full rounded-lg object-cover shadow-lg aspect-video sm:aspect-auto"
        />
        <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      	 <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
        	 <p className="rounded bg-black/30 px-3 py-2 text-xs sm:text-sm text-white backdrop-blur-sm">
          	 Advanced sensor technology for comprehensive monitoring
        	 </p>
      	 </div>
      </div>
      <div className="space-y-4 sm:space-y-6">
      	 <h3 className="text-lg sm:text-xl font-semibold text-slate-800 dark:text-white">Precision Engineering</h3>
      	 <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
        	 Every component is carefully selected and tested to ensure maximum accuracy and reliability in the most
        	 demanding underground mining environments.
      	 </p>
      	 <div className="space-y-3 sm:space-y-4">
        	 {[
          	 { icon: Thermometer, title: 'Environmental Monitoring', description: 'Continuous temperature and atmospheric tracking', color: 'bg-red-100 dark:bg-red-900/30', iconColor: 'text-red-600 dark:text-red-400' },
          	 { icon: Heart, title: 'Health Monitoring', description: 'Real-time vital sign detection and analysis', color: 'bg-pink-100 dark:bg-pink-900/30', iconColor: 'text-pink-600 dark:text-pink-400' },
          	 { icon: Wind, title: 'Gas Detection', description: 'Multi-gas sensor array for hazard identification', color: 'bg-yellow-100 dark:bg-yellow-900/30', iconColor: 'text-yellow-600 dark:text-yellow-400' },
        	 ].map(({ icon: Icon, title, description, color, iconColor }) => (
          	 <div key={title} className="flex items-start space-x-3">
            	 <div className={`rounded ${color} p-2 flex-shrink-0`}>
              	 <Icon className={`h-4 sm:h-5 w-4 sm:w-5 ${iconColor}`} />
            	 </div>
            	 <div>
              	 <h4 className="text-sm sm:text-base font-semibold text-slate-800 dark:text-white">{title}</h4>
              	 <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">{description}</p>
            	 </div>
          	 </div>
        	 ))}
      	 </div>
      </div>
    </div>

    <div className="mb-12 sm:mb-16 grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
    	 {specs.map(({ icon: Icon, title, description, range, color }) => (
      	 <div key={title} className="rounded-2xl border border-slate-200 dark:border-slate-700 p-4 sm:p-6 transition-shadow hover:shadow-md dark:bg-slate-800">
        	 <div className={`${color} mb-3 sm:mb-4 w-fit rounded-full p-3`}>
          	 <Icon className="h-5 sm:h-6 w-5 sm:w-6 text-white" />
        	 </div>
        	 <h4 className="mb-2 text-sm sm:text-base font-semibold text-slate-800 dark:text-white">{title}</h4>
        	 <p className="mb-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400">{description}</p>
        	 <div className="w-fit rounded bg-slate-100 dark:bg-slate-700 px-2 sm:px-3 py-1 text-xs sm:text-sm text-slate-700 dark:text-slate-200">{range}</div>
      	 </div>
    	 ))}
    </div>

    <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-6 sm:p-8 mb-8 sm:mb-12">
    	 <h3 className="mb-6 sm:mb-8 text-center text-lg sm:text-xl font-semibold text-slate-800 dark:text-white">Performance Metrics</h3>
    	 <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
      	 {performanceMetrics.map(({ icon: Icon, label, value, unit }) => (
        	 <div key={label} className="space-y-2 sm:space-y-3">
          	 <div className="flex items-center justify-between">
            	 <div className="flex items-center space-x-2">
              	 <Icon className="h-4 sm:h-5 w-4 sm:w-5 text-slate-600 dark:text-slate-400" />
              	 <span className="text-sm sm:text-base text-slate-700 dark:text-slate-300">{label}</span>
            	 </div>
            	 <span className="text-xs sm:text-sm font-medium text-slate-800 dark:text-white">{unit}</span>
          	 </div>
          	 <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
            	 <div className="h-full rounded-full bg-slate-700 dark:bg-slate-400" style={{ width: `${value}%` }} />
          	 </div>
        	 </div>
      	 ))}
    	 </div>
    </div>

    <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
    	 <div className="rounded-2xl border border-slate-200 dark:border-slate-700 p-4 sm:p-6 dark:bg-slate-800">
      	 <h4 className="mb-3 sm:mb-4 text-sm sm:text-base font-semibold text-slate-800 dark:text-white">Power Management</h4>
      	 <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
        	 <li className="flex items-center">
          	 <Battery className="mr-2 h-4 w-4 text-green-500" />
          	 Rechargeable lithium-ion battery
        	 </li>
        	 <li className="flex items-center">
          	 <Clock className="mr-2 h-4 w-4 text-blue-500" />
          	 12+ hours continuous operation
        	 </li>
        	 <li className="flex items-center">
          	 <Gauge className="mr-2 h-4 w-4 text-orange-500" />
          	 Low power consumption design
        	 </li>
      	 </ul>
    	 </div>
    	 <div className="rounded-2xl border border-slate-200 dark:border-slate-700 p-4 sm:p-6 dark:bg-slate-800">
      	 <h4 className="mb-3 sm:mb-4 text-sm sm:text-base font-semibold text-slate-800 dark:text-white">Durability Features</h4>
      	 <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
        	 {['IP67 water & dust resistance', 'Shock-resistant housing', 'Operating temp: -20°C to 60°C'].map(
          	 (item) => (
            	 <li key={item} className="flex items-center">
              	 <span className="mr-2 h-3 w-3 rounded-full bg-gray-500" />
              	 {item}
            	 </li>
          	 )
        	 )}
      	 </ul>
    	 </div>
  	 </div>
  </div>
</section>
);

const SafetyImpactSection = () => (
<section className="bg-slate-50 py-12 sm:py-16 dark:bg-slate-900">
  {/* MODIFIED: Removed max-w-6xl. Kept px-6. */}
  <div className="mx-auto w-full max-w-7xl px-6">
    <div className="mb-8 sm:mb-12 text-center">
      <h2 className="mb-3 sm:mb-4 text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white">Safety Impact &amp; Results</h2>
      <p className="mx-auto max-w-2xl text-sm sm:text-base text-slate-600 dark:text-slate-300">
        Real-world data demonstrating the effectiveness of our mining safety system
      </p>
    </div>

    <div className="mb-12 sm:mb-16 grid grid-cols-1 gap-8 sm:gap-12 lg:grid-cols-2">
    	 {[
      	 {
        	 title: 'Mining Environment Safety',
        	 description:
          	 'Our comprehensive monitoring system provides real-time safety data and instant alerts, dramatically reducing workplace incidents and improving overall mine safety standards.',
        	 image:
          	 'https://images.unsplash.com/photo-1579580033453-2327e067baa9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbmclMjB3b3JrZXIlMjBoZWxtZXR8ZW58MXx8fHwxNzU0OTczNDgxfDA&ixlib=rb-4.1.0&q=80&w=1080',
        	 caption: 'Protected workers in underground mining operations',
      	 },
      	 {
        	 title: 'Monitoring & Control',
        	 description:
          	 'Advanced control room systems provide supervisors with real-time visibility into worker safety status, enabling immediate response to emergency situations.',
        	 image:
          	 'https://images.unsplash.com/photo-1738918937796-743064feefa1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250cm9sJTIwcm9vbSUyMG1vbml0b3Jpbmd8ZW58MXx8fHwxNzU0OTczNDg3fDA&ixlib=rb-4.1.0&q=80&w=1080',
        	 caption: '24/7 monitoring and control systems',
      	 },
    	 ].map(({ title, description, image, caption }) => (
      	 <div key={title} className="space-y-4 sm:space-y-6">
        	 <h3 className="text-lg sm:text-xl font-semibold text-slate-800 dark:text-white">{title}</h3>
        	 <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">{description}</p>
        	 <div className="relative">
          	 <ImageWithFallback alt={title} src={image} className="w-full rounded-lg object-cover shadow-lg aspect-video" />
          	 <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          	 <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4">
            	 <p className="rounded bg-black/30 px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm text-white backdrop-blur-sm">{caption}</p>
          	 </div>
        	 </div>
      	 </div>
    	 ))}
    </div>

    <div className="mb-12 sm:mb-16 grid grid-cols-1 gap-3 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
    	 {safetyStats.map(({ icon: Icon, title, subtitle, value, color, description }) => (
      	 <div
        	 key={title}
        	 className="rounded-2xl border border-slate-200 dark:border-slate-700 p-4 sm:p-6 text-center transition-shadow hover:shadow-lg dark:bg-slate-800"
      	 >
        	 <div className={`${color} mx-auto mb-2 sm:mb-4 w-fit rounded-full p-3 sm:p-4`}>
          	 <Icon className="h-6 sm:h-8 w-6 sm:w-8 text-white" />
        	 </div>
        	 <h3 className="mb-1 text-sm sm:text-base font-semibold text-slate-800 dark:text-white">{title}</h3>
        	 <p className="mb-2 sm:mb-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400">{subtitle}</p>
        	 <div className="mb-2 sm:mb-3 h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
          	 <div className="h-full rounded-full bg-slate-700 dark:bg-slate-400" style={{ width: `${value}%` }} />
        	 </div>
        	 <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">{description}</p>
      	 </div>
    	 ))}
    </div>

    <div className="mb-8 sm:mb-12 rounded-2xl border border-slate-200 dark:border-slate-700 p-4 sm:p-8 dark:bg-slate-800">
    	 <h3 className="mb-4 sm:mb-6 text-center text-lg sm:text-xl font-semibold text-slate-800 dark:text-white">Hazard Detection &amp; Prevention Rates</h3>
    	 <div className="space-y-4 sm:space-y-6">
      	 {hazardTypes.map(({ name, detected, prevented }) => (
        	 <div key={name} className="space-y-2">
          	 <div className="flex items-center justify-between flex-wrap gap-2">
            	 <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">{name}</span>
            	 <div className="flex space-x-2 sm:space-x-4 text-xs sm:text-sm">
              	 <span className="text-blue-600 dark:text-blue-400">Detected: {detected}%</span>
              	 <span className="text-green-600 dark:text-green-400">Prevented: {prevented}%</span>
            	 </div>
          	 </div>
          	 <div className="flex space-x-2 sm:space-x-3">
            	 <div className="flex-1 overflow-hidden rounded-full bg-blue-100 dark:bg-blue-900/30">
              	 <div className="h-2 rounded-full bg-blue-500" style={{ width: `${detected}%` }} />
            	 </div>
            	 <div className="flex-1 overflow-hidden rounded-full bg-green-100 dark:bg-green-900/30">
              	 <div className="h-2 rounded-full bg-green-500" style={{ width: `${prevented}%` }} />
            	 </div>
          	 </div>
        	 </div>
      	 ))}
    	 </div>
    </div>

    <div className="grid grid-cols-1 gap-4 sm:gap-8 md:grid-cols-2">
    	 {[
      	 {
        	 title: 'Before Implementation',
        	 icon: AlertTriangle,
        	 color: 'text-red-500',
        	 bullets: [
          	 'High accident rates (15+ incidents/month)',
          	 'Delayed emergency response (5-10 minutes)',
          	 'Limited hazard detection capabilities',
          	 'Manual monitoring processes',
        	 ],
        	 dotColor: 'bg-red-500',
      	 },
      	 {
        	 title: 'After Implementation',
        	 icon: Shield,
        	 color: 'text-green-500',
        	 bullets: [
          	 'Reduced accidents (2-3 incidents/month)',
          	 'Rapid response time (< 30 seconds)',
          	 '99.9% hazard detection accuracy',
          	 'Automated 24/7 monitoring',
        	 ],
        	 dotColor: 'bg-green-500',
      	 },
    	 ].map(({ title, icon: Icon, color, bullets, dotColor }) => (
      	 <div key={title} className="rounded-2xl border border-slate-200 dark:border-slate-700 p-4 sm:p-6 dark:bg-slate-800">
        	 <div className={`mb-3 sm:mb-4 flex items-center ${color}`}>
          	 <Icon className="mr-2 h-5 sm:h-6 w-5 sm:w-6" />
          	 <h4 className="text-sm sm:text-base font-semibold text-slate-800 dark:text-white">{title}</h4>
        	 </div>
        	 <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          	 {bullets.map((item) => (
            	 <li key={item} className="flex items-start">
              	 <span className={`mr-2 h-2 w-2 rounded-full ${dotColor} flex-shrink-0 mt-1`} />
              	 <span>{item}</span>
            	 </li>
          	 ))}
        	 </ul>
      	 </div>
    	 ))}
  	 </div>
  </div>
</section>
);

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', company: '', message: '' });
    setTimeout(() => setSubmitted(false), 4000);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className="bg-white dark:bg-slate-950 py-12 sm:py-16">
      {/* MODIFIED: Removed max-w-6xl. Kept px-6. */}
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="mb-8 sm:mb-12 text-center">
          <h2 className="mb-3 sm:mb-4 text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white">Get in Touch</h2>
          <p className="mx-auto max-w-2xl text-sm sm:text-base text-slate-600 dark:text-slate-300">
            Ready to enhance your mining safety? Contact our team for a personalized consultation and demonstration.
          </p>
        </div>

        <div className="mb-12 sm:mb-16 grid grid-cols-1 gap-6 sm:gap-12 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 p-4 sm:p-8 dark:bg-slate-800">
            <h3 className="mb-4 sm:mb-6 text-lg sm:text-xl font-semibold text-slate-800 dark:text-white">Request Information</h3>
            <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
                <div className="space-y-1 sm:space-y-2">
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="name">
                    Full Name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Smith"
                    required
                    className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-400 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200 dark:focus:ring-slate-600"
                  />
                </div>
                <div className="space-y-1 sm:space-y-2">
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="email">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@company.com"
                    required
                  	 className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-400 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200 dark:focus:ring-slate-600"
              	 />
                </div>
          	   </div>
          	   <div className="space-y-1 sm:space-y-2">
            	 <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="company">
              	 Company/Organization
          	 	 </label>
          	 	 <input
            	 	 id="company"
            	 	 name="company"
            	 	 value={formData.company}
            	 	 onChange={handleChange}
            	 	 placeholder="Mining Corp Ltd."
            	 	 className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-400 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200 dark:focus:ring-slate-600"
          	 	 />
          	 </div>
          	 <div className="space-y-1 sm:space-y-2">
            	 <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="message">
              	 Message *
          	 	 </label>
          	 	 <textarea
            	 	 id="message"
            	 	 name="message"
            	 	 value={formData.message}
            	 	 onChange={handleChange}
            	 	 placeholder="Tell us about your safety requirements..."
            	 	 required
            	 	 className="h-24 sm:h-32 w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-400 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200 dark:focus:ring-slate-600"
          	 	 />
          	 </div>
          	 <button
          	 	 type="submit"
          	 	 className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-800 dark:bg-slate-700 px-4 py-2 sm:py-3 font-medium text-sm sm:text-base text-white transition hover:bg-slate-900 dark:hover:bg-slate-600"
          	 >
            	 <Send className="h-4 w-4" />
            	 Send Message
          	 </button>
          	 {submitted && (
            	 <p className="text-center text-xs sm:text-sm font-medium text-green-600 dark:text-green-400">
              	 Thank you! We will contact you soon.
            	 </p>
          	 )}
          	 </form>
        	 </div>
        	 <div className="space-y-4 sm:space-y-6">
        	 	 <div>
          	 	 <h3 className="mb-4 sm:mb-6 text-lg sm:text-xl font-semibold text-slate-800 dark:text-white">Contact Information</h3>
          	 	 <div className="space-y-4 sm:space-y-6">
            	 	 {contactInfo.map(({ icon: Icon, title, details, description }) => (
              	 	 <div key={title} className="flex items-start space-x-3 sm:space-x-4">
                	 	 <div className="rounded-lg bg-slate-100 dark:bg-slate-800 p-2 sm:p-3 flex-shrink-0">
                  	 	 <Icon className="h-5 sm:h-6 w-5 sm:w-6 text-slate-600 dark:text-slate-400" />
                	 	 </div>
                	 	 <div>
                  	 	 <h4 className="text-sm sm:text-base font-semibold text-slate-800 dark:text-white">{title}</h4>
                  	 	 <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">{details}</p>
                  	 	 <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">{description}</p>
                	 	 </div>
              	 	 </div>
            	 	 ))}
          	 	 </div>
        	 	 </div>
        	 	 <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-4 sm:p-6">
          	 	 <h4 className="mb-3 sm:mb-4 text-sm sm:text-base font-semibold text-slate-800 dark:text-white">Why Choose Smart Mining Solutions?</h4>
          	 	 <div className="space-y-2 sm:space-y-3">
            	 	 {whyChooseUs.map(({ icon: Icon, title, description }) => (
              	 	 <div key={title} className="flex items-start space-x-2 sm:space-x-3">
                	 	 <Icon className="h-4 sm:h-5 w-4 sm:w-5 text-slate-600 dark:text-slate-400 flex-shrink-0 mt-0.5" />
                	 	 <div>
                  	 	 <span className="text-xs sm:text-sm font-medium text-slate-800 dark:text-white">{title}: </span>
                  	 	 <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">{description}</span>
                	 	 </div>
              	 	 </div>
            	 	 ))}
          	 	 </div>
        	 	 </div>
        	 </div>
        </div>

      <div className="border-t border-slate-200 dark:border-slate-700 py-6 sm:py-8 text-center">
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">&copy; 2025 Smart Mining Solutions | All Rights Reserved</p>
        <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-500">Protecting lives through innovative safety technology</p>
      </div>
    </div>
  </section>
  );
};

// ==============================
// FLOATING CHAT WIDGET
// ==============================
const FloatingChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState(() => [
    {
      id: 'intro',
      content:
        "Hello! I'm here to help with MineGuard mining safety. How can I assist you?",
      role: 'bot',
      sentiment: 'Neutral',
      tier: 1,
    },
  ]);

  const viewportRef = useRef(null);

  // Show tooltip after 5 seconds
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => setShowTooltip(true), 5000);
      return () => clearTimeout(timer);
    }
    setShowTooltip(false);
  }, [isOpen]);

  // Auto-scroll (Will always scroll to bottom on new message)
  useEffect(() => {
    if (!isOpen) return;
    const viewport = viewportRef.current;
    if (!viewport) return;

    viewport.scrollTo({ top: viewport.scrollHeight, behavior: 'smooth' });
  }, [messages, isLoading, isOpen]);

  // SEND MESSAGE
  const sendMessage = async (text) => {
    setIsLoading(true);
    try {
      const { data } = await API.post('/chatbot/ask', { message: text });
      const tier = data?.tier || 1;

      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-bot`,
          content: data.answer || 'No response generated.',
          sentiment: data.sentiment || 'Neutral',
          tier,
          role: 'bot',
        },
      ]);
    } catch (error) {
      const message =
        error.response?.data?.error ||
        "Sorry, I'm having trouble connecting to the server. Please try again.";

      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-err`,
          content: message,
          sentiment: 'Neutral',
          tier: 1,
          role: 'bot',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // FORM SUBMIT
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const text = inputValue.trim();
    setMessages((prev) => [
      ...prev,
      { id: `${Date.now()}-user`, content: text, role: 'user', tier: 1 },
    ]);

    setInputValue('');
    await sendMessage(text);
  };

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-end gap-2 sm:gap-3">

      {/* Tooltip - UPDATED GLASS STYLE */}
      {showTooltip && (
        <div
          className="
            relative mr-1 animate-in fade-in slide-in-from-bottom-2
            text-white text-xs sm:text-sm shadow-lg pointer-events-auto
          "
        >
          <div
            className="
              relative rounded-lg px-3 sm:px-4 py-2
              bg-black/40 dark:bg-white/20 backdrop-blur-md
              before:content-[''] before:absolute before:top-1/2
              before:right-[-6px]    /* moved inward so it merges */
              before:-translate-y-1/2
              before:w-0 before:h-0
              before:border-t-[7px] before:border-b-[7px] before:border-l-[7px]
              before:border-t-transparent before:border-b-transparent
              before:border-l-black/40 dark:before:border-l-white/20
            "
          >
            Have a question? Ask me!
          </div>
        </div>
      )}

      {/* Open button */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="pointer-events-auto flex h-12 sm:h-14 w-12 sm:w-14 items-center justify-center rounded-full bg-teal-600 dark:bg-teal-700 text-white shadow-lg transition hover:scale-105 hover:bg-teal-700 dark:hover:bg-teal-600"
        >
          <MessageCircle className="h-5 sm:h-6 w-5 sm:w-6" />
        </button>
      )}

      {/* Chatbox */}
      {isOpen && (
        <div className="pointer-events-auto flex h-[70vh] max-h-96 sm:h-[28rem] w-full max-w-sm sm:w-96 flex-col overflow-hidden rounded-2xl border border-teal-200/50 dark:border-teal-800/50 bg-white/70 dark:bg-slate-800/70 backdrop-blur-md shadow-xl">

          {/* Header */}
          <div className="flex items-center justify-between bg-teal-600 dark:bg-teal-700 px-3 sm:px-4 py-2 sm:py-3 text-white">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium">
              <Bot className="h-3 sm:h-4 w-3 sm:w-4" />
              <span className="truncate">Mining Safety Assistant</span>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex h-6 w-6 items-center justify-center rounded-full text-white transition hover:bg-teal-700 dark:hover:bg-teal-600 flex-shrink-0"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages Viewport */}
          <div className="flex flex-1 flex-col overflow-hidden">
            <div
              ref={viewportRef}
              className="flex-1 space-y-3 sm:space-y-4 overflow-y-auto px-3 sm:px-4 py-4 sm:py-6"
            >
              {messages.map(({ id, content, role, sentiment, tier }) => (
                <div
                  key={id}
                  className={`flex w-full ${
                    role === 'user' ? 'justify-start' : 'justify-end'
                  } gap-1 sm:gap-2`}
                >
                  <div
                    className={`space-y-1 ${
                      role === 'bot' ? 'flex flex-col items-end' : ''
                    }`}
                  >
                    {role === 'bot' && (sentiment || tier) && (
                      <div className="flex flex-wrap gap-1 justify-end">
                        {sentiment && (
                          <span className="text-[10px] px-2 py-1 rounded bg-teal-800 dark:bg-teal-700 text-white opacity-80">
                            {sentiment.toUpperCase()}
                          </span>
                        )}

                        {tier >= 2 && (
                          <span
                            className={`text-[10px] px-2 py-1 rounded text-white flex items-center gap-1 ${
                              tier === 3 ? 'bg-red-600' : 'bg-orange-600'
                            }`}
                          >
                            <AlertTriangle className="h-2.5 w-2.5" />
                            TIER {tier}
                          </span>
                        )}
                      </div>
                    )}

                    <div
                      className={`rounded-lg text-xs sm:text-sm ${
                        role === 'user'
                          ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white px-4 sm:px-5 py-2.5 sm:py-3'
                          : 'max-w-[85%] sm:max-w-[80%] bg-teal-600 dark:bg-teal-700 text-white px-2 sm:px-3 py-1 sm:py-2'
                      }`}
                    >
                      {content}
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex w-full justify-end gap-1 sm:gap-2">
                  <div className="flex items-center gap-1 sm:gap-2 rounded-lg bg-teal-600/80 px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm text-white">
                    <Loader2 className="h-3 sm:h-4 w-3 sm:w-4 animate-spin text-white" />
                    <span className="hidden sm:inline">Thinking...</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Input Box */}
          <form
            onSubmit={handleSubmit}
            className="border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-2 sm:px-3 py-2 sm:py-3"
          >
            <div className="flex gap-1 sm:gap-2">
              <input
                type="text"
                placeholder="Ask..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isLoading}
                className="flex-1 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200 dark:focus:ring-teal-700"
              />

              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="flex h-8 sm:h-10 w-8 sm:w-10 items-center justify-center rounded-lg bg-teal-600 dark:bg-teal-700 text-white transition hover:bg-teal-700 dark:hover:bg-teal-600 disabled:opacity-60 flex-shrink-0"
              >
                <Send className="h-3 sm:h-4 w-3 sm:w-4" />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

const Home = () => {
  return (
    // This div controls the page content *below* your "MineGuard" navbar
    <div className="min-h-screen w-full bg-white text-[var(--color-text)] dark:bg-slate-950">
      <HeroSection />
      <Separator />
      <StatsSection />
      <Separator />
      <FeaturesSection />
      <Separator />
      <TechnicalSection />
      <Separator />
      <SafetyImpactSection />
      <Separator />
      <ContactSection />
      <FloatingChatWidget />
    </div>
  );
};

export default Home;