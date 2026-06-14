import { Monitor, Sun } from 'lucide-react';
import { useEclipseStore } from '@/store/useEclipseStore';

export default function ModeToggle() {
  const { viewMode, toggleViewMode } = useEclipseStore();
  const isOutdoor = viewMode === 'outdoor';

  return (
    <button
      onClick={toggleViewMode}
      className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium tracking-wide transition-all duration-500 border"
      style={{
        background: isOutdoor
          ? 'rgba(255,45,45,0.15)'
          : 'rgba(100,255,218,0.08)',
        borderColor: isOutdoor
          ? 'rgba(255,45,45,0.4)'
          : 'rgba(100,255,218,0.2)',
        color: isOutdoor ? '#ff6b6b' : '#64ffda',
        backdropFilter: 'blur(12px)',
      }}
    >
      {isOutdoor ? (
        <>
          <Sun size={18} />
          <span>户外裸眼</span>
        </>
      ) : (
        <>
          <Monitor size={18} />
          <span>室内投影</span>
        </>
      )}
    </button>
  );
}
