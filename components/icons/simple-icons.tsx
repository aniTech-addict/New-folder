// Simple SVG icon components to replace lucide-react



export const Shield = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
  </svg>
)

export const Plane = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
  </svg>
)

export const Users = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm5 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm7.5 3c.83 0 1.5.67 1.5 1.5 0 .83-.67 1.5-1.5 1.5S15 13.33 15 12.5c0-.83.67-1.5 1.5-1.5zM2.5 11C3.33 11 4 11.67 4 12.5 4 13.33 3.33 14 2.5 14S1 13.33 1 12.5C1 11.67 1.67 11 2.5 11zm7.5 0c.83 0 1.5.67 1.5 1.5 0 .83-.67 1.5-1.5 1.5S8.5 13.33 8.5 12.5c0-.83.67-1.5 1.5-1.5z" />
  </svg>
)

export const Target = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="12" r="2" fill="currentColor" />
  </svg>
)

export const Award = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
    <polyline points="8.21,13.89 7,23 12,20 17,23 15.79,13.88" fill="none" stroke="currentColor" strokeWidth="2" />
  </svg>
)

export const BarChart3 = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M3 3v18h18" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M18 17V9" stroke="currentColor" strokeWidth="2" />
    <path d="M13 17V5" stroke="currentColor" strokeWidth="2" />
    <path d="M8 17v-3" stroke="currentColor" strokeWidth="2" />
  </svg>
)

export const Activity = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <polyline points="22,12 18,12 15,21 9,3 6,12 2,12" fill="none" stroke="currentColor" strokeWidth="2" />
  </svg>
)

export const UserCheck = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" fill="none" stroke="currentColor" strokeWidth="2" />
    <circle cx="9" cy="7" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
    <polyline points="16,11 18,13 22,9" fill="none" stroke="currentColor" strokeWidth="2" />
  </svg>
)

export const Clock = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
    <polyline points="12,6 12,12 16,14" fill="none" stroke="currentColor" strokeWidth="2" />
  </svg>
)

export const TrendingUp = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <polyline points="23,6 13.5,15.5 8.5,10.5 1,18" fill="none" stroke="currentColor" strokeWidth="2" />
    <polyline points="17,6 23,6 23,12" fill="none" stroke="currentColor" strokeWidth="2" />
  </svg>
)

export const AlertTriangle = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path
      d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
    <line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" strokeWidth="2" />
    <line x1="12" y1="17" x2="12.01" y2="17" stroke="currentColor" strokeWidth="2" />
  </svg>
)

export const LogOut = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" fill="none" stroke="currentColor" strokeWidth="2" />
    <polyline points="16,17 21,12 16,7" fill="none" stroke="currentColor" strokeWidth="2" />
    <line x1="21" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="2" />
  </svg>
)

export const CheckCircle = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" fill="none" stroke="currentColor" strokeWidth="2" />
    <polyline points="22,4 12,14.01 9,11.01" fill="none" stroke="currentColor" strokeWidth="2" />
  </svg>
)
