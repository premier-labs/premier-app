import { create } from "zustand";

interface SceneStore {
  isLoaded: boolean;
  setLoaded: (bool: boolean) => void;
}

export const useSceneStore = create<SceneStore>((set) => ({
  isLoaded: false,
  setLoaded: (bool) => set((state) => ({ isLoaded: bool })),
}));
