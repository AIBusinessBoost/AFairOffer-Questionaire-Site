import { create } from 'zustand'

export interface QuestionnaireData {
  // Property/Business Type
  propertyType: 'residential' | 'commercial' | 'land' | 'business' | ''
  
  // Basic Information
  address: string
  city: string
  state: string
  zipCode: string
  
  // Property Details
  propertySubtype: string
  squareFootage: string
  lotSize: string
  yearBuilt: string
  bedrooms: string
  bathrooms: string
  
  // Business Details (if applicable)
  businessType: string
  annualRevenue: string
  yearsInOperation: string
  numberOfEmployees: string
  
  // Condition & Features
  condition: 'excellent' | 'good' | 'fair' | 'poor' | ''
  recentUpdates: string[]
  specialFeatures: string[]
  
  // Financial Information
  currentValue: string
  mortgageBalance: string
  desiredTimeline: 'asap' | '30days' | '60days' | '90days' | 'flexible' | ''
  reasonForSelling: string
  
  // Contact Information
  firstName: string
  lastName: string
  email: string
  phone: string
  preferredContact: 'email' | 'phone' | 'text' | ''
  
  // Additional Information
  additionalInfo: string
}

interface QuestionnaireStore {
  data: QuestionnaireData
  currentStep: number
  totalSteps: number
  updateData: (updates: Partial<QuestionnaireData>) => void
  nextStep: () => void
  prevStep: () => void
  setStep: (step: number) => void
  resetQuestionnaire: () => void
}

const initialData: QuestionnaireData = {
  propertyType: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  propertySubtype: '',
  squareFootage: '',
  lotSize: '',
  yearBuilt: '',
  bedrooms: '',
  bathrooms: '',
  businessType: '',
  annualRevenue: '',
  yearsInOperation: '',
  numberOfEmployees: '',
  condition: '',
  recentUpdates: [],
  specialFeatures: [],
  currentValue: '',
  mortgageBalance: '',
  desiredTimeline: '',
  reasonForSelling: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  preferredContact: '',
  additionalInfo: ''
}

export const useQuestionnaireStore = create<QuestionnaireStore>((set, get) => ({
  data: initialData,
  currentStep: 1,
  totalSteps: 8,
  
  updateData: (updates) => set((state) => ({
    data: { ...state.data, ...updates }
  })),
  
  nextStep: () => set((state) => ({
    currentStep: Math.min(state.currentStep + 1, state.totalSteps)
  })),
  
  prevStep: () => set((state) => ({
    currentStep: Math.max(state.currentStep - 1, 1)
  })),
  
  setStep: (step) => set(() => ({
    currentStep: step
  })),
  
  resetQuestionnaire: () => set(() => ({
    data: initialData,
    currentStep: 1
  }))
}))
