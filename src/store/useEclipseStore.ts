import { create } from 'zustand';

export type ViewMode = 'indoor' | 'outdoor';

interface EclipseStore {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  toggleViewMode: () => void;
  activeModal: string | null;
  setActiveModal: (id: string | null) => void;
  timeOffset: number;
  setTimeOffset: (offset: number) => void;
}

export const useEclipseStore = create<EclipseStore>((set) => ({
  viewMode: 'indoor',
  setViewMode: (mode) => set({ viewMode: mode }),
  toggleViewMode: () =>
    set((state) => ({
      viewMode: state.viewMode === 'indoor' ? 'outdoor' : 'indoor',
    })),
  activeModal: null,
  setActiveModal: (id) => set({ activeModal: id }),
  timeOffset: 0,
  setTimeOffset: (offset) => set({ timeOffset: offset }),
}));
