# IAF Human Management System Documentation

## Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm or pnpm package manager
- Supabase account and project
- Google AI API key (for AI query features)

### Installation
1. Clone the repository and navigate to the project directory
2. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   ```

### Database Setup
1. Create a new Supabase project
2. Run the database setup scripts in order:
   ```bash
   # Create core tables
   psql -d your_database -f scripts/001_create_profiles.sql
   psql -d your_database -f scripts/002_create_training_records.sql
   psql -d your_database -f scripts/003_create_missions.sql
   psql -d your_database -f scripts/004_profile_trigger.sql
   psql -d your_database -f scripts/005_enable_rls.sql

   # Create analytics tables
   psql -d your_database -f scripts/006_create_analytics_tables.sql

   # Populate with sample data
   psql -d your_database -f scripts/007_populate_analytics_data.sql

   # Create dynamic query function
   psql -d your_database -f scripts/008_create_dynamic_query_function.sql

   # Update RLS policies
   psql -d your_database -f scripts/update_rls_policies.sql
   ```

### Environment Configuration
Create a `.env.local` file with the following variables:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
GOOGLE_AI_API_KEY=your_google_ai_api_key
```

### Running the Application
Start the development server:
```bash
npm run dev
# or
pnpm dev
```

The application will be available at `http://localhost:3000`

## Features and Scope

### Overview Dashboard
Provides a high-level view of key personnel metrics including total personnel count, mission readiness percentage, training progress, and active commands. Includes quick action buttons for common operations and real-time system health indicators.

### Personnel Analytics
Displays detailed breakdowns of personnel by rank, specialization, mission readiness trends over time, and geographical distribution across different commands. Uses real-time data from the database with fallback to mock data if needed.

### Workforce Optimization
Analyzes skill gaps and efficiency metrics to optimize personnel deployment. Identifies areas where additional training or recruitment may be required to meet operational demands.

### Predictive Analytics
Uses historical data and AI models to forecast future personnel requirements, predict skill shortages, and provide insights for strategic planning.

### AI Query Interface
Allows users to query the database using natural language. Converts plain English questions into SQL queries and executes them against the Supabase database. Includes connection testing and result visualization in tabular format.

### Security Panel
Manages access levels, security clearances, and monitors system security metrics. Tracks security incidents, threat intelligence, and compliance status.

### Data Entry
Provides forms for entering new personnel records, training data, and mission information. Supports CSV import for bulk data operations.

### Profile Management
Allows users to view and update their personal information, service details, and preferences. Includes profile completion prompts for new users.

### Authentication System
Handles user login, signup, and session management using Supabase Auth. Supports multiple authentication methods and secure password policies.
