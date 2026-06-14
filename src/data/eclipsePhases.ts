export interface EclipsePhase {
  id: string;
  name: string;
  time: string;
  description: string;
}

export const ECLIPSE_DATE = new Date().toISOString().split('T')[0];

export const ECLIPSE_PHASES: EclipsePhase[] = [
  {
    id: 'first-contact',
    name: '初亏',
    time: '08:26',
    description: '月球边缘刚接触太阳圆面，日偏食开始，太阳出现微小缺口。',
  },
  {
    id: 'maximum',
    name: '食甚',
    time: '09:43',
    description: '月球遮住太阳面积最大时刻，此时日面缺损最显著。',
  },
  {
    id: 'last-contact',
    name: '复圆',
    time: '11:03',
    description: '月球完全离开太阳圆面，日偏食结束，太阳恢复圆形。',
  },
  {
    id: 'end',
    name: '结束',
    time: '11:15',
    description: '整个日偏食观测活动结束，感谢观测。',
  },
];

export function getPhaseDate(phaseTime: string): Date {
  const [h, m] = phaseTime.split(':').map(Number);
  const d = new Date();
  d.setHours(h, m, 0, 0);
  return d;
}

export const SAFETY_WINDOW_MINUTES = 3;
