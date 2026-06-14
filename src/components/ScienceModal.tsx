import { X } from 'lucide-react';
import { useEffect } from 'react';
import { ECLIPSE_PHASES } from '@/data/eclipsePhases';
import { useEclipseStore } from '@/store/useEclipseStore';

export default function ScienceModal() {
  const { activeModal, setActiveModal } = useEclipseStore();

  useEffect(() => {
    if (!activeModal) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setActiveModal(null);
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activeModal, setActiveModal]);

  if (!activeModal) return null;

  const phase = ECLIPSE_PHASES.find((p) => p.id === activeModal);
  if (!phase) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={() => setActiveModal(null)}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative mx-4 p-8 rounded-2xl max-w-md w-full"
        style={{
          background: 'linear-gradient(135deg, rgba(26,26,62,0.95) 0%, rgba(10,14,39,0.98) 100%)',
          border: '1px solid rgba(100,255,218,0.2)',
          boxShadow: '0 0 40px rgba(100,255,218,0.1), 0 25px 50px rgba(0,0,0,0.5)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setActiveModal(null)}
          className="absolute top-4 right-4 p-1 rounded-full transition-colors"
          style={{ color: '#8892b0' }}
          aria-label="关闭"
        >
          <X size={20} />
        </button>
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: '#64ffda', boxShadow: '0 0 8px rgba(100,255,218,0.6)' }}
          />
          <h2
            className="text-2xl font-bold tracking-wide"
            style={{ color: '#64ffda' }}
          >
            {phase.name}
          </h2>
          <span className="text-sm ml-2" style={{ color: '#5a6080' }}>
            {phase.time}
          </span>
        </div>
        <p className="text-lg leading-relaxed" style={{ color: '#e8eaf6' }}>
          {phase.description}
        </p>
        <div className="mt-6 text-xs" style={{ color: '#5a6080' }}>
          按 Esc 键或点击空白处关闭
        </div>
      </div>
    </div>
  );
}
