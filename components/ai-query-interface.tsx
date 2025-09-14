'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Loader2, Search, AlertCircle, CheckCircle } from 'lucide-react';
import { convertNaturalLanguageToSQL, executeSQLQuery, testGeminiConnection, simpleGeminiTest, QueryResult } from '@/lib/ai-query';

export function AIQueryInterface() {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [result, setResult] = useState<QueryResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [connectionTestResult, setConnectionTestResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleTestConnection = async () => {
    setIsTestingConnection(true);
    setConnectionTestResult(null);
    setError(null);

    try {
      console.log('🧪 Starting API connection test...');
      const testResult = await testGeminiConnection();
      setConnectionTestResult({
        success: testResult.success,
        message: testResult.message
      });
      console.log('🧪 Test result:', testResult);
    } catch (err) {
      console.error('🧪 Connection test error:', err);
      setConnectionTestResult({
        success: false,
        message: 'Connection test failed. Check console for details.'
      });
    } finally {
      setIsTestingConnection(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      // Convert natural language to SQL
      const queryResult = await convertNaturalLanguageToSQL(query);

      if (queryResult.error) {
        setError(queryResult.error);
        return;
      }

      // Execute the SQL query on Supabase
      if (queryResult.sql) {
        try {
          const data = await executeSQLQuery(queryResult.sql);
          queryResult.data = data;
          setResult(queryResult);
        } catch (execError) {
          console.error('Query execution error:', execError);
          setError('Failed to execute query. Please try a different query.');
        }
      }
    } catch (err) {
      console.error('Query processing error:', err);
      setError('Failed to process your query. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderTable = (data: any[]) => {
    if (!data || data.length === 0) {
      return (
        <div className="text-center py-8 text-muted-foreground">
          No data found for this query.
        </div>
      );
    }

    const columns = Object.keys(data[0]);

    return (
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column} className="font-semibold">
                  {column.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <TableCell key={column}>
                    {row[column]?.toString() || '-'}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          AI-Powered Data Query
        </CardTitle>
        <CardDescription>
          Ask questions in natural language to retrieve data from the database.
          Examples: "Show me all pilots", "Find personnel with security clearance above top secret", "List training records for the last month"
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Test Connection Button */}
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleTestConnection}
            disabled={isTestingConnection}
            className="flex-1"
          >
            {isTestingConnection ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Testing Connection...
              </>
            ) : (
              <>
                🔗 Test API Connection
              </>
            )}
          </Button>
        </div>

        {/* Connection Test Result */}
        {connectionTestResult && (
          <div className={`flex items-center gap-2 p-3 border rounded-lg ${
            connectionTestResult.success
              ? 'bg-green-50 border-green-200 text-green-800'
              : 'bg-red-50 border-red-200 text-red-800'
          }`}>
            {connectionTestResult.success ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <AlertCircle className="h-4 w-4" />
            )}
            <span>{connectionTestResult.message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="text"
            placeholder="Enter your query in natural language..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading || !query.trim()}>
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Search className="h-4 w-4 mr-2" />
                Query
              </>
            )}
          </Button>
        </form>

        {error && (
          <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive">
            <AlertCircle className="h-4 w-4" />
            <span>{error}</span>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg text-green-800">
              <CheckCircle className="h-4 w-4" />
              <span>Query executed successfully</span>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Generated SQL Query</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-3 rounded-lg text-sm overflow-x-auto">
                  <code>{result.sql}</code>
                </pre>
                <p className="text-sm text-muted-foreground mt-2">
                  {result.explanation}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center justify-between">
                  Query Results
                  <Badge variant="secondary">
                    {result.data?.length || 0} rows
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {renderTable(result.data)}
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
