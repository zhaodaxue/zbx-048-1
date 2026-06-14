import { ECLIPSE_PHASES, getPhaseDate, SAFETY_WINDOW_MINUTES } from '@/data/eclipsePhases';
import { useCountdown } from '@/hooks/useCountdown';
import { useEclipseStore } from '@/store/useEclipseStore';

export default function PhaseBar() {
  const { currentPhaseIndex } = useCountdown();
  const { viewMode, setActiveModal } = useEclipseStore();
  const isOutdoor = viewMode === 'outdoor';

  const now = new Date(Date.now() + useEclipseStore.getState().timeOffset);
  const maxTime = getPhaseDate(ECLIPSE_PHASES[ECLIPSE_PHASES.length - 1].time);
  const startTime = getPhaseDate(ECLIPSE_PHASES[0].time);
  const totalDuration = maxTime.getTime() - startTime.getTime();

  const maximumPhaseTime = getPhaseDate(ECLIPSE_PHASES[1].time);
  const safetyStart = new Date(maximumPhaseTime.getTime() - SAFETY_WINDOW_MINUTES * 60 * 1000);
  const safetyEnd = new Date(maximumPhaseTime.getTime() + SAFETY_WINDOW_MINUTES * 60 * 1000);
  const isInSafetyWindow = now >= safetyStart && now <= safetyEnd;

  const safetyStartPct = Math.max(
    0,
    ((safetyStart.getTime() - startTime.getTime()) / totalDuration) * 100
  );
  const safetyEndPct = Math.min(
    100,
    ((safetyEnd.getTime() - startTime.getTime()) / totalDuration) * 100
  );

  function getSegmentStyle(segIndex: number): React.CSSProperties {
    const phaseTime = getPhaseDate(ECLIPSE_PHASES[segIndex].time);
    const prevTime =
      segIndex > 0
        ? getPhaseDate(ECLIPSE_PHASES[segIndex - 1].time)
        : startTime;
    const segStart = ((prevTime.getTime() - startTime.getTime()) / totalDuration) * 100;
    const segWidth = ((phaseTime.getTime() - prevTime.getTime()) / totalDuration) * 100;

    const isCompleted = currentPhaseIndex >= segIndex;
    const isCurrent = currentPhaseIndex === segIndex - 1;

    let bgColor = 'rgba(255,255,255,0.08)';
    if (isCompleted) bgColor = 'rgba(240,192,64,0.5)';
    if (isCurrent && !isCompleted) bgColor = 'rgba(100,255,218,0.3)';

    return {
      position: 'absolute',
      left: `${segStart}%`,
      width: `${segWidth}%`,
      height: '100%',
      borderRadius: '9999px',
      backgroundColor: bgColor,
      transition: 'background-color 0.8s ease',
    };
  }

  function getNodeStyle(index: number): React.CSSProperties {
    const phaseTime = getPhaseDate(ECLIPSE_PHASES[index].time);
    const position = ((phaseTime.getTime() - startTime.getTime()) / totalDuration) * 100;

    const isCompleted = currentPhaseIndex >= index;
    const isCurrent = currentPhaseIndex === index;

    let nodeColor = 'rgba(255,255,255,0.2)';
    let shadow = 'none';
    if (isCompleted) {
      nodeColor = '#f0c040';
      shadow = '0 0 12px rgba(240,192,64,0.6)';
    }
    if (isCurrent) {
      nodeColor = '#64ffda';
      shadow = '0 0 16px rgba(100,255,218,0.8)';
    }

    return {
      position: 'absolute',
      left: `${position}%`,
      top: '50%',
      transform: 'translate(-50%, -50%)',
      width: '16px',
      height: '16px',
      borderRadius: '50%',
      backgroundColor: nodeColor,
      boxShadow: shadow,
      transition: 'all 0.8s ease',
      zIndex: 10,
    };
  }

  function getLabelStyle(index: number): React.CSSProperties {
    const phaseTime = getPhaseDate(ECLIPSE_PHASES[index].time);
    const position = ((phaseTime.getTime() - startTime.getTime()) / totalDuration) * 100;

    const isCurrent = currentPhaseIndex === index;

    return {
      position: 'absolute',
      left: `${position}%`,
      top: '32px',
      transform: 'translateX(-50%)',
      color: isCurrent ? '#64ffda' : currentPhaseIndex >= index ? '#f0c040' : '#8892b0',
      fontSize: '0.9rem',
      fontWeight: isCurrent ? 700 : 400,
      whiteSpace: 'nowrap',
      transition: 'color 0.8s ease',
      cursor: 'pointer',
    };
  }

  return (
    <div className="w-[80%] max-w-[900px] mx-auto">
      <div className="relative h-3 rounded-full" style={{ background: 'rgba(255,255,255,0.05)' }}>
        {ECLIPSE_PHASES.slice(1).map((_, segIndex) => (
          <div key={`seg-${segIndex}`} style={getSegmentStyle(segIndex + 1)} />
        ))}

        {isOutdoor && isInSafetyWindow && (
          <div
            style={{
              position: 'absolute',
              left: `${safetyStartPct}%`,
              width: `${safetyEndPct - safetyStartPct}%`,
              height: '100%',
              borderRadius: '9999px',
              backgroundColor: 'rgba(255,45,45,0.7)',
              boxShadow: '0 0 16px rgba(255,45,45,0.5)',
              transition: 'all 0.8s ease',
              zIndex: 5,
              animation: 'pulse-warning 1.5s ease-in-out infinite',
            }}
          />
        )}

        {ECLIPSE_PHASES.map((phase, i) => (
          <div
            key={`node-${i}`}
            style={getNodeStyle(i)}
            className={currentPhaseIndex === i ? 'animate-pulse' : ''}
          />
        ))}
      </div>
      <div className="relative h-16">
        {ECLIPSE_PHASES.map((phase, i) => (
          <div
            key={`label-${i}`}
            style={getLabelStyle(i)}
            onClick={() => setActiveModal(phase.id)}
            className="hover:underline underline-offset-4"
          >
            <div>{phase.name}</div>
            <div className="text-xs mt-0.5" style={{ color: '#5a6080' }}>
              {phase.time}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
