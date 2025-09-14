export interface User {
  id: string
  email: string
  user_metadata?: {
    first_name?: string
    last_name?: string
  }
}

export interface Profile {
  id: string
  service_number: string
  rank: string
  first_name: string
  last_name: string
  specialization: string
  unit: string
  command: string
  base_location?: string
  phone?: string
  emergency_contact?: string
  security_clearance?: string
  mission_ready: boolean
}

// Mock user data
const mockUser: User = {
  id: "mock-user-123",
  email: "wing.commander@iaf.gov.in",
  user_metadata: {
    first_name: "Rajesh",
    last_name: "Kumar",
  },
}

const mockProfile: Profile = {
  id: "mock-user-123",
  service_number: "IAF-2024-001",
  rank: "Wing Commander",
  first_name: "Rajesh",
  last_name: "Kumar",
  specialization: "Fighter Pilot",
  unit: "No. 1 Squadron",
  command: "Western Air Command",
  base_location: "Ambala Air Force Station",
  phone: "+91-9876543210",
  emergency_contact: "Mrs. Priya Kumar - +91-9876543211",
  security_clearance: "Secret",
  mission_ready: true,
}

// Mock authentication functions
export const mockAuth = {
  getUser: async () => {
    // Simulate authenticated user
    return { data: { user: mockUser }, error: null }
  },

  signInWithPassword: async (credentials: { email: string; password: string }) => {
    // Mock login - accept any credentials for demo
    return { data: { user: mockUser }, error: null }
  },

  signUp: async (credentials: { email: string; password: string }) => {
    // Mock signup
    return { data: { user: mockUser }, error: null }
  },

  signOut: async () => {
    return { error: null }
  },
}

// Mock database functions
export const mockDatabase = {
  from: (table: string) => ({
    select: (columns = "*") => ({
      eq: (column: string, value: string) => ({
        single: async () => {
          if (table === "profiles") {
            return { data: mockProfile, error: null }
          }
          return { data: null, error: null }
        },
        order: (column: string, options?: any) => ({
          async then(callback: any) {
            if (table === "training_records") {
              return callback({ data: [], error: null })
            }
            if (table === "mission_assignments") {
              return callback({ data: [], error: null })
            }
            return callback({ data: [], error: null })
          },
        }),
      }),
      order: (column: string, options?: any) => ({
        async then(callback: any) {
          return callback({ data: [], error: null })
        },
      }),
    }),
    update: (data: any) => ({
      eq: (column: string, value: string) => ({
        async then(callback: any) {
          return callback({ data: mockProfile, error: null })
        },
      }),
    }),
  }),
}
