/**
 * API Service - Abstraction layer for database and backend logic
 * Currently mocked for UI development, will be replaced by Supabase / custom backend
 */

export interface Chat {
  id: string;
  title: string;
  lastActivity: Date;
}

export interface Document {
  id: string;
  title: string;
  author: string;
  year: string;
  category: string;
  fileType: string;
}

export const ApiService = {
  async getRecentChats(): Promise<Chat[]> {
    return [
      { id: '1', title: 'Ethics in Artificial Intelligence', lastActivity: new Date(Date.now() - 2 * 3600000) },
      { id: '2', title: 'Distributed Systems Fundamentals', lastActivity: new Date(Date.now() - 24 * 3600000) },
      { id: '3', title: 'Advanced Calculus Formulas', lastActivity: new Date(Date.now() - 3 * 24 * 3600000) }
    ];
  },

  async getLibraryDocuments(): Promise<Document[]> {
    return [
      { id: '1', title: 'Constitutional Interpretations in Modern Kenya', author: 'Dr. Kiprono', year: '2023', category: 'Law', fileType: 'PDF' },
      { id: '2', title: 'Quantum Computing Applications in...', author: 'Prof. Wanjiku', year: '2024', category: 'Science', fileType: 'PDF' },
      { id: '3', title: 'Microfinance Impacts on Sub-Saharan Economic Growth', author: 'Mutua & Co.', year: '2022', category: 'Business', fileType: 'PDF' },
      { id: '4', title: 'Epidemiological Modeling of Rift Valley Fever', author: 'Dr. Omondi', year: '2023', category: 'Medicine', fileType: 'PDF' }
    ];
  },
  
  async startChat(query: string) {
    console.log('[ApiService] Starting chat:', query);
    return { id: `chat-${Date.now()}` };
  }
};
