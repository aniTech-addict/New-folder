import { GoogleGenerativeAI } from '@google/generative-ai';

// Simple direct approach - no lazy loading complexity
export function createGeminiClient(apiKey?: string): GoogleGenerativeAI {
  console.log('🚀 Creating Google Gemini client...');

  // Use provided API key or try to get from environment
  const keyToUse = apiKey || process.env.GOOGLE_GEMINI_API_KEY;

  if (!keyToUse) {
    throw new Error('No API key provided. Set GOOGLE_GEMINI_API_KEY environment variable, or pass the key directly.');
  }

  console.log('🔑 Using API key that starts with:', keyToUse.substring(0, 10) + '...');

  try {
    const client = new GoogleGenerativeAI(keyToUse.trim());
    console.log('✅ Google Gemini client created successfully');
    return client;
  } catch (error) {
    console.error('❌ Failed to create Google Gemini client:', error);
    throw error;
  }
}

// Simple test function
export async function simpleGeminiTest(apiKey?: string): Promise<{ success: boolean; message: string; response?: string }> {
  try {
    console.log('🧪 Starting simple Gemini test...');

    // Use the provided API key directly, or the user's specific key
    const testKey = apiKey || process.env.GOOGLE_GEMINI_API_KEY;
    if (!testKey) {
      throw new Error('No Google Gemini API key provided');
    }
    console.log('🔑 Testing with API key:', testKey.substring(0, 15) + '...');

    // Create client directly with the test key
    const client = new GoogleGenerativeAI(testKey.trim());
    const model = client.getGenerativeModel({ model: 'gemini-pro' });
    console.log('✅ Gemini client created with direct key');

    console.log('📤 Sending test prompt...');
    const result = await model.generateContent('Say "Hello from Google Gemini!" and nothing else.');
    const text = result.response.text();
    console.log('📥 Received response:', text);

    return {
      success: true,
      message: 'Google Gemini test successful!',
      response: text
    };
  } catch (error) {
    console.error('❌ Google Gemini test failed:', error);
    console.error('Error details:', error instanceof Error ? error.message : String(error));
    console.error('Error name:', error instanceof Error ? error.name : 'Unknown');
    return {
      success: false,
      message: `Test failed: ${error instanceof Error ? error.message : String(error)}`
    };
  }
}

export interface QueryResult {
  sql: string;
  explanation: string;
  data: any[];
  error?: string;
}

export async function convertNaturalLanguageToSQL(naturalQuery: string): Promise<QueryResult> {
  console.log('🚀 Starting convertNaturalLanguageToSQL with query:', naturalQuery);

  try {
    console.log('🔧 Creating Google Gemini client...');
    const client = createGeminiClient();
    const model = client.getGenerativeModel({ model: 'gemini-pro' });
    console.log('✅ Google Gemini client ready');

    const schemaDescription = `
Database Schema:
- profiles: Personnel information (id, service_number, rank, first_name, last_name, specialization, unit, command, base_location, phone, emergency_contact, date_of_birth, date_of_joining, security_clearance, mission_ready, created_at, updated_at)
- training_records: Training data (id, user_id, training_name, training_type, start_date, end_date, status, completion_score, instructor, location, notes, created_at, updated_at)
- personnel_analytics: Aggregated personnel data (id, date_recorded, rank, count, percentage, command)
- specialization_analytics: Specialization breakdown (id, date_recorded, specialization, personnel_count, color_code, command)
- mission_readiness_trends: Readiness metrics (id, month_year, readiness_percentage, training_completion, command)
- geographical_distribution: Location-based data (id, date_recorded, region, personnel_count, bases_count, command_type)
- skill_gap_analysis: Skill requirements (id, date_recorded, skill_name, demand_count, supply_count, gap_count, priority_level, command)
- security_metrics: Security data (id, date_recorded, metric_type, value, severity_level, command)
- audit_logs: System logs (id, user_id, user_name, action, classification, ip_address, user_agent, status, details, created_at)
- threat_intelligence: Threat data (id, threat_type, severity, detection_count, blocked_count, trend, source, last_detected, created_at, updated_at)
- compliance_status: Compliance information (id, framework, compliance_percentage, last_audit_date, next_audit_date, auditor, findings_count, status, created_at, updated_at)

Instructions:
1. Convert the natural language query to a valid PostgreSQL SELECT statement
2. Use appropriate JOINs when querying related data
3. Include proper WHERE clauses for filtering
4. Use LIMIT for large result sets (max 1000 rows)
5. Ensure the query is safe and doesn't modify data
6. Return only SELECT statements, no INSERT, UPDATE, DELETE, or DDL
7. Use table aliases for clarity
8. Format dates properly if needed
`;

    const prompt = `${schemaDescription}

Natural Language Query: "${naturalQuery}"

Please convert this to a PostgreSQL SELECT statement. Return the SQL query and a brief explanation of what it does.

Response format:
SQL: [your SQL query here]
Explanation: [brief explanation]
`;

    console.log('📤 Sending prompt to Google Gemini API...');
    console.log('Prompt length:', prompt.length);

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    console.log('📝 Raw response text length:', text.length);
    console.log('📝 Raw response preview:', text.substring(0, 200) + '...');

    // Parse the response to extract SQL and explanation
    console.log('🔍 Parsing response...');
    const lines = text.split('\n');
    let sql = '';
    let explanation = 'Query generated successfully';
    let inSqlSection = false;

    console.log('📋 Processing', lines.length, 'lines of response');

    for (const line of lines) {
      if (line.toLowerCase().startsWith('sql:')) {
        inSqlSection = true;
        sql = line.substring(4).trim();
        console.log('🔍 Found SQL section');
      } else if (line.toLowerCase().startsWith('explanation:')) {
        inSqlSection = false;
        explanation = line.substring(12).trim();
        console.log('🔍 Found explanation section');
      } else if (inSqlSection) {
        sql += '\n' + line;
      }
    }

    sql = sql.trim();
    console.log('✅ Parsed SQL query:', sql.substring(0, 100) + (sql.length > 100 ? '...' : ''));
    console.log('✅ Parsed explanation:', explanation);

    const queryResult = {
      sql,
      explanation,
      data: []
    };

    console.log('🎉 Successfully converted natural language to SQL');
    return queryResult;
  } catch (error) {
    console.error('❌ Error converting natural language to SQL:');
    console.error('Error type:', error?.constructor?.name || 'Unknown');
    console.error('Error message:', error instanceof Error ? error.message : String(error));
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');

    // Provide more specific error messages based on error type
    let errorMessage = 'Unknown error occurred';
    if (error instanceof Error) {
      if (error.message.includes('API_KEY') || error.message.includes('401')) {
        errorMessage = 'Google Gemini API key is invalid or expired';
      } else if (error.message.includes('quota') || error.message.includes('limit') || error.message.includes('429')) {
        errorMessage = 'Google Gemini API quota exceeded';
      } else if (error.message.includes('network') || error.message.includes('fetch')) {
        errorMessage = 'Network error connecting to Google Gemini API';
      } else {
        errorMessage = error.message;
      }
    }

    return {
      sql: '',
      explanation: '',
      data: [],
      error: errorMessage
    };
  }
}

// Test function to verify API key works
export async function testGeminiConnection(): Promise<{ success: boolean; message: string; details?: any }> {
  console.log('🧪 Testing Google Gemini API connection...');

  try {
    const client = createGeminiClient();
    console.log('✅ Client initialized for testing');

    // Try different models available on Google Gemini
    const modelsToTry = ['gemini-pro', 'gemini-1.5-flash'];

    for (const modelName of modelsToTry) {
      try {
        console.log(`🔄 Testing model: ${modelName}`);

        const model = client.getGenerativeModel({ model: modelName });
        // Simple test prompt
        const testPrompt = "Say 'Hello, API test successful!' and nothing else.";
        const result = await model.generateContent(testPrompt);
        const text = result.response.text();

        console.log(`✅ Model ${modelName} test successful:`, text.substring(0, 50) + '...');

        return {
          success: true,
          message: `API key works! Successfully connected using ${modelName}`,
          details: { model: modelName, response: text }
        };

      } catch (modelError) {
        console.warn(`⚠️ Model ${modelName} failed:`, modelError instanceof Error ? modelError.message : String(modelError));
        continue;
      }
    }

    return {
      success: false,
      message: 'All models failed to connect',
      details: { error: 'No working model found' }
    };

  } catch (error) {
    console.error('❌ API test failed:', error);
    return {
      success: false,
      message: `API test failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      details: { error: error instanceof Error ? error.message : String(error) }
    };
  }
}

export async function executeSQLQuery(sql: string): Promise<any[]> {
  console.log('🚀 Starting executeSQLQuery with SQL:', sql.substring(0, 100) + (sql.length > 100 ? '...' : ''));

  try {
    console.log('🔧 Importing Supabase client...');
    // Import Supabase client dynamically to avoid circular imports
    const { createClient } = await import('./supabase/client');
    const supabase = createClient();
    console.log('✅ Supabase client created');

    console.log('📤 Executing SQL query via RPC...');
    // Execute the query using the secure RPC function
    const { data, error } = await supabase.rpc('execute_dynamic_query', {
      query_text: sql
    });

    if (error) {
      console.error('❌ Supabase RPC error:', error);
      throw new Error(`Database query failed: ${error.message}`);
    }

    console.log('📥 Received data from Supabase RPC');
    console.log('📊 Data type:', typeof data);
    console.log('📊 Data is array:', Array.isArray(data));
    console.log('📊 Data length (if array):', Array.isArray(data) ? data.length : 'N/A');

    // Parse the JSONB response
    if (data && Array.isArray(data)) {
      console.log('✅ Returning array data with', data.length, 'rows');
      return data;
    } else if (data) {
      console.log('✅ Returning single object wrapped in array');
      // If data is a single object, wrap it in an array
      return [data];
    }

    console.log('⚠️ No data returned from query');
    return [];
  } catch (error) {
    console.error('❌ Error executing SQL query:', error);
    throw error;
  }
}
