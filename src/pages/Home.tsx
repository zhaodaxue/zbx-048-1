import CountdownDisplay from '@/components/CountdownDisplay';
import PhaseBar from '@/components/PhaseBar';
import ModeToggle from '@/components/ModeToggle';
import SafetyWarning from '@/components/SafetyWarning';
import ScienceModal from '@/components/ScienceModal';
import TimeSimulator from '@/components/TimeSimulator';
import { ECLIPSE_DATE } from '@/data/eclipsePhases';

function formatDate(dateStr: string): string {
  const [y, m, d] = dateStr.split('-');
  return `${y}年${parseInt(m)}月${parseInt(d)}日`;
}

export default function Home() {
  return (
    <div className="min-h-screen w-full overflow-hidden relative flex flex-col">
      <div className="stars-layer" />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(26,26,62,0.4) 0%, rgba(10,14,39,1) 70%)' }} />

      <div className="relative z-10 flex items-center justify-between px-8 py-5">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#f0c040', boxShadow: '0 0 6px rgba(240,192,64,0.6)' }} />
            <span className="text-sm tracking-widest" style={{ color: '#8892b0' }}>
              日偏食观测倒计时
            </span>
          </div>
          <span className="text-xs tracking-wide ml-5" style={{ color: '#5a6080' }}>
            {formatDate(ECLIPSE_DATE)} · 当日有效
          </span>
        </div>
        <ModeToggle />
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center gap-10 pb-16">
        <SafetyWarning />
        <CountdownDisplay />
        <PhaseBar />
      </div>

      <div className="relative z-10 flex justify-center pb-6">
        <TimeSimulator />
      </div>

      <ScienceModal />
    </div>
  );
}
