import { create } from 'zustand'

export const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) => set({selectedConversation}),

  messages:[],
  setMessage:(messages)=>set({messages}),
  refreshConversations: false,
  toggleRefreshConversations: () => set((state) => ({ refreshConversations: !state.refreshConversations })),
}))