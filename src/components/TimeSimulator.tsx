import { useEclipseStore } from '@/store/useEclipseStore';
import { ECLIPSE_PHASES, getPhaseDate } from '@/data/eclipsePhases';
import { Clock, RotateCcw } from 'lucide-react';

const QUICK_OFFSETS = [
  { label: '初亏前5分', offset: -5 * 60 * 1000, phase: 0 },
  { label: '初亏', offset: 0, phase: 0 },
  { label: '食甚前3分', offset: -3 * 60 * 1000, phase: 1 },
  { label: '食甚', offset: 0, phase: 1 },
  { label: '食甚后3分', offset: 3 * 60 * 1000, phase: 1 },
  { label: '复圆', offset: 0, phase: 2 },
  { label: '结束', offset: 0, phase: 3 },
  { label: '实时', offset: 0, phase: -1 },
];

export default function TimeSimulator() {
  const { timeOffset, setTimeOffset } = useEclipseStore();

  function applyOffset(phaseIndex: number, extraOffset: number) {
    if (phaseIndex === -1) {
      setTimeOffset(0);
      return;
    }
    const phaseTime = getPhaseDate(ECLIPSE_PHASES[phaseIndex].time);
    const diff = phaseTime.getTime() - Date.now() + extraOffset;
    setTimeOffset(diff);
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-2 text-xs" style={{ color: '#5a6080' }}>
        <Clock size={14} />
        <span>时间模拟（点击跳转至关键时刻）</span>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {QUICK_OFFSETS.map((item) => (
          <button
            key={item.label}
            onClick={() => applyOffset(item.phase, item.offset)}
            className="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 border"
            style={{
              background: 'rgba(255,255,255,0.04)',
              borderColor: 'rgba(255,255,255,0.1)',
              color: '#8892b0',
            }}
          >
            {item.label}
          </button>
        ))}
        {timeOffset !== 0 && (
          <button
            onClick={() => setTimeOffset(0)}
            className="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 border flex items-center gap-1"
            style={{
              background: 'rgba(100,255,218,0.08)',
              borderColor: 'rgba(100,255,218,0.2)',
              color: '#64ffda',
            }}
          >
            <RotateCcw size={12} />
            重置
          </button>
        )}
      </div>
    </div>
  );
}
