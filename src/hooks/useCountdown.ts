import { useState, useEffect, useCallback } from 'react';
import { ECLIPSE_PHASES, getPhaseDate } from '@/data/eclipsePhases';
import { useEclipseStore } from '@/store/useEclipseStore';

export interface CountdownState {
  now: Date;
  currentPhaseIndex: number;
  nextPhaseIndex: number | null;
  remainingSeconds: number;
  isFinished: boolean;
  isBeforeStart: boolean;
}

export function useCountdown(): CountdownState {
  const timeOffset = useEclipseStore((s) => s.timeOffset);
  const [now, setNow] = useState(() => new Date(Date.now() + timeOffset));

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date(Date.now() + timeOffset));
    }, 1000);
    return () => clearInterval(interval);
  }, [timeOffset]);

  const getNow = useCallback(() => new Date(Date.now() + timeOffset), [timeOffset]);

  const phases = ECLIPSE_PHASES.map((p) => getPhaseDate(p.time));

  const currentNow = getNow();
  const isBeforeStart = currentNow < phases[0];
  const isFinished = currentNow >= phases[phases.length - 1];

  let currentPhaseIndex = -1;
  let nextPhaseIndex: number | null = null;
  let remainingSeconds = 0;

  if (isBeforeStart) {
    currentPhaseIndex = -1;
    nextPhaseIndex = 0;
    remainingSeconds = Math.max(0, Math.floor((phases[0].getTime() - currentNow.getTime()) / 1000));
  } else if (isFinished) {
    currentPhaseIndex = phases.length - 1;
    nextPhaseIndex = null;
    remainingSeconds = 0;
  } else {
    for (let i = phases.length - 1; i >= 0; i--) {
      if (currentNow >= phases[i]) {
        currentPhaseIndex = i;
        nextPhaseIndex = i + 1 < phases.length ? i + 1 : null;
        if (nextPhaseIndex !== null) {
          remainingSeconds = Math.max(
            0,
            Math.floor((phases[nextPhaseIndex].getTime() - currentNow.getTime()) / 1000)
          );
        }
        break;
      }
    }
  }

  return {
    now,
    currentPhaseIndex,
    nextPhaseIndex,
    remainingSeconds,
    isFinished,
    isBeforeStart,
  };
}
