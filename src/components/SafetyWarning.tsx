import { ECLIPSE_PHASES, getPhaseDate, SAFETY_WINDOW_MINUTES } from '@/data/eclipsePhases';
import { useEclipseStore } from '@/store/useEclipseStore';
import { useCountdown } from '@/hooks/useCountdown';
import { AlertTriangle } from 'lucide-react';

export default function SafetyWarning() {
  const { viewMode } = useEclipseStore();
  const { now } = useCountdown();
  const isOutdoor = viewMode === 'outdoor';

  if (!isOutdoor) return null;

  const maximumPhaseTime = getPhaseDate(ECLIPSE_PHASES[1].time);
  const safetyStart = new Date(maximumPhaseTime.getTime() - SAFETY_WINDOW_MINUTES * 60 * 1000);
  const safetyEnd = new Date(maximumPhaseTime.getTime() + SAFETY_WINDOW_MINUTES * 60 * 1000);
  const isInSafetyWindow = now >= safetyStart && now <= safetyEnd;

  if (!isInSafetyWindow) return null;

  return (
    <div className="safety-warning-bar flex items-center justify-center gap-3 py-3 px-6 rounded-xl w-full max-w-[900px] mx-auto">
      <AlertTriangle size={24} className="warning-icon" />
      <span className="text-xl md:text-2xl font-bold tracking-widest warning-text">
        禁止直视
      </span>
      <AlertTriangle size={24} className="warning-icon" />
      <span className="text-sm ml-2" style={{ color: 'rgba(255,255,255,0.7)' }}>
        食甚前后{SAFETY_WINDOW_MINUTES}分钟，请勿裸眼观测
      </span>
    </div>
  );
}
