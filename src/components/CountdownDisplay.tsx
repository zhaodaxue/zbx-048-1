import { useCountdown } from '@/hooks/useCountdown';
import { ECLIPSE_PHASES } from '@/data/eclipsePhases';

function formatTime(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export default function CountdownDisplay() {
  const { currentPhaseIndex, nextPhaseIndex, remainingSeconds, isFinished, isBeforeStart } =
    useCountdown();

  let display = '';
  let label = '';
  let sublabel = '';

  if (isFinished) {
    display = '--:--';
    label = '观测已结束';
    sublabel = '感谢参与本次日偏食观测';
  } else if (isBeforeStart) {
    display = formatTime(remainingSeconds);
    label = '距离初亏';
    sublabel = '日偏食即将开始';
  } else {
    display = formatTime(remainingSeconds);
    const nextPhase = nextPhaseIndex !== null ? ECLIPSE_PHASES[nextPhaseIndex] : null;
    label = nextPhase ? `距离${nextPhase.name}` : '进行中';
    const currentPhase = ECLIPSE_PHASES[currentPhaseIndex];
    sublabel = currentPhase ? `当前阶段：${currentPhase.name}` : '';
  }

  return (
    <div className="flex flex-col items-center gap-4 select-none">
      <div className="relative">
        <span
          className="text-[8rem] md:text-[10rem] lg:text-[12rem] font-mono font-bold tracking-wider leading-none"
          style={{
            fontFamily: "'Orbitron', monospace",
            color: '#f0c040',
            textShadow:
              '0 0 20px rgba(240,192,64,0.6), 0 0 60px rgba(240,192,64,0.3), 0 0 100px rgba(240,192,64,0.15)',
          }}
        >
          {display}
        </span>
        <div
          className="absolute inset-0 rounded-full opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(240,192,64,0.4) 0%, transparent 70%)' }}
        />
      </div>
      <div
        className="text-2xl md:text-3xl font-medium tracking-widest"
        style={{ color: '#64ffda' }}
      >
        {label}
      </div>
      {sublabel && (
        <div className="text-lg md:text-xl tracking-wide" style={{ color: '#8892b0' }}>
          {sublabel}
        </div>
      )}
    </div>
  );
}
