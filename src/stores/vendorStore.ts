import { create } from 'zustand';

export interface SiteData {
  title: string;
  description: string;
  images: string[];
  solutionOwnerId?: string;
}

export type VendorType = 'creator' | 'produto' | 'solucao';

export interface VendorProfile {
  type: VendorType | null;
  url: string;
  siteData: SiteData | null;
  contextFiles: File[];
  suggestedPUV: string;
  suggestedICP: string[];
  isComplete: boolean;
}

interface VendorStore {
  profile: VendorProfile;
  currentStep: number;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setCurrentStep: (step: number) => void;
  setVendorType: (type: VendorType) => void;
  setUrl: (url: string) => void;
  setSiteData: (data: SiteData) => void;
  addContextFile: (file: File) => void;
  removeContextFile: (index: number) => void;
  setSuggestedPUV: (puv: string) => void;
  setSuggestedICP: (icp: string[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  resetProfile: () => void;
  completeProfile: () => void;
}

const initialProfile: VendorProfile = {
  type: null,
  url: '',
  siteData: null,
  contextFiles: [],
  suggestedPUV: '',
  suggestedICP: [],
  isComplete: false,
};

export const useVendorStore = create<VendorStore>((set, get) => ({
  profile: initialProfile,
  currentStep: 0,
  isLoading: false,
  error: null,

  setCurrentStep: (step) => set({ currentStep: step }),
  
  setVendorType: (type) => set(state => ({
    profile: { ...state.profile, type }
  })),
  
  setUrl: (url) => set(state => ({
    profile: { ...state.profile, url }
  })),
  
  setSiteData: (data) => set(state => ({
    profile: { ...state.profile, siteData: data }
  })),
  
  addContextFile: (file) => set(state => ({
    profile: { 
      ...state.profile, 
      contextFiles: [...state.profile.contextFiles, file]
    }
  })),
  
  removeContextFile: (index) => set(state => ({
    profile: { 
      ...state.profile, 
      contextFiles: state.profile.contextFiles.filter((_, i) => i !== index)
    }
  })),
  
  setSuggestedPUV: (puv) => set(state => ({
    profile: { ...state.profile, suggestedPUV: puv }
  })),
  
  setSuggestedICP: (icp) => set(state => ({
    profile: { ...state.profile, suggestedICP: icp }
  })),
  
  setLoading: (loading) => set({ isLoading: loading }),
  
  setError: (error) => set({ error }),
  
  resetProfile: () => set({
    profile: initialProfile,
    currentStep: 1,
    error: null
  }),
  
  completeProfile: () => set(state => ({
    profile: { ...state.profile, isComplete: true }
  })),
}));