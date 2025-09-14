"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { toast } from "@/hooks/use-toast"
import {
  Shield,
  User,
  UserPlus,
  Award,
  Activity,
  Save,
  Upload,
  FileText,
  Users,
  Plane,
  Target,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import Papa from "papaparse"

export default function DataEntryPage() {
  const [activeTab, setActiveTab] = useState("personnel")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bulkFile, setBulkFile] = useState<File | null>(null)
  const [csvData, setCsvData] = useState<any[]>([])
  const [bulkErrors, setBulkErrors] = useState<string[]>([])
  const [isProcessingBulk, setIsProcessingBulk] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)
    const supabase = createClient()
    console.log("Supabase Client URL (from data-entry):", process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log("Supabase Anon Key (from data-entry):", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      toast({
        title: "Authentication Error",
        description: "User not logged in. Cannot submit personnel data.",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    const serviceNumber = formData.get("serviceNumber") as string
    const rank = formData.get("rank") as string
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const specialization = formData.get("specialization") as string
    const command = formData.get("command") as string
    const baseLocation = formData.get("base") as string
    const dateOfJoining = formData.get("dateOfJoining") as string
    const qualifications = formData.get("qualifications") as string

    try {
      const { error } = await supabase.from("profiles").insert({
        user_id: user.id, // Add the user's ID to match RLS policy
        service_number: serviceNumber,
        rank,
        first_name: firstName,
        last_name: lastName,
        specialization,
        command,
        base_location: baseLocation,
        date_of_joining: dateOfJoining,
        // Assuming 'qualifications' might be stored in a different table or as part of a JSONB column if needed.
        // For now, we'll omit it if there's no direct column in 'profiles' based on 001_create_profiles.sql
        // If it needs to be stored, a new column or a related table would be required.
      })

      if (error) {
        throw error
      }
    

      toast({
        title: "Data Submitted Successfully",
        description: "Personnel record has been added to the system.",
      })
    } catch (error: any) {
      console.error("Supabase insert error:", error);
      toast({
        title: "Error Submitting Data",
        description: error.message || "An unexpected error occurred.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }
  const handleSubmitTraining = async (formData: FormData) => {
    setIsSubmitting(true)
    const supabase = createClient()

    const trainingName = formData.get("program-name") as string
    const duration = parseInt(formData.get("duration") as string)
    const startDate = formData.get("start-date") as string
    const capacity = parseInt(formData.get("capacity") as string)
    const description = formData.get("description") as string

    // For simplicity, assuming a fixed user_id for now. In a real app, this would come from auth.uid()
    // or be passed from the parent component.
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      toast({
        title: "Authentication Error",
        description: "User not logged in.",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    try {
      const { error } = await supabase.from("training_records").insert({
        user_id: user.id,
        training_name: trainingName,
        training_type: "Program", // Assuming a default type for now
        start_date: startDate,
        // end_date: calculateEndDate(startDate, duration), // This would require a helper function
        status: "scheduled", // Default status
        // completion_score: null,
        // instructor: null,
        // location: null,
        notes: description,
      })

      if (error) {
        throw error
      }

      toast({
        title: "Training Program Created",
        description: "The new training program has been added.",
      })
    } catch (error: any) {
      toast({
        title: "Error Creating Training Program",
        description: error.message || "An unexpected error occurred.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }
  const handleSubmitMission = async (formData: FormData) => {
    setIsSubmitting(true)
    const supabase = createClient()

    const missionName = formData.get("mission-code") as string
    const priority = formData.get("priority") as string
    const location = formData.get("location") as string
    const aircraftRequired = parseInt(formData.get("aircraft-required") as string)
    const description = formData.get("mission-brief") as string

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      toast({
        title: "Authentication Error",
        description: "User not logged in.",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    try {
      const { error: missionError, data: newMission } = await supabase.from("missions").insert({
        mission_name: missionName,
        mission_type: "Assignment", // Assuming a default type
        description: description,
        start_date: new Date().toISOString(), // Assuming current date as start date
        status: "planned", // Default status
        priority: priority,
        location: location,
        commander_id: user.id, // Assigning current user as commander
      }).select().single()

      if (missionError) {
        throw missionError
      }

      // Optionally, if there's a separate mission_assignments table and logic for it
      // For now, we'll assume mission creation implies assignment to the commander.
      // If more complex assignment is needed, this would be expanded.

      toast({
        title: "Mission Created Successfully",
        description: `Mission ${missionName} has been created.`,
      })
    } catch (error: any) {
      toast({
        title: "Error Creating Mission",
        description: error.message || "An unexpected error occurred.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setBulkFile(file)
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        transformHeader: (header: string) => header.trim().toLowerCase(),
        complete: (results) => {
          console.log('Parsed CSV data:', results.data)
          console.log('CSV headers:', results.meta.fields)
          setCsvData(results.data)
          setBulkErrors([])
        },
        error: (error) => {
          setBulkErrors([`CSV parsing error: ${error.message}`])
        }
      })
    }
  }

  const handleProcessImport = async () => {
    if (!csvData.length) return
    setIsProcessingBulk(true)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      toast({
        title: "Authentication Error",
        description: "User not logged in.",
        variant: "destructive",
      })
      setIsProcessingBulk(false)
      return
    }

    const errors: string[] = []

    // Field mapping for flexible CSV headers
    const fieldMappings = {
      service_number: ['service_number', 'service number', 'service_no', 'service no', 'service'],
      rank: ['rank'],
      first_name: ['first_name', 'first name', 'firstname', 'fname'],
      last_name: ['last_name', 'last name', 'lastname', 'lname'],
      specialization: ['specialization', 'speciality', 'role', 'position'],
      command: ['command', 'cmd'],
      base_location: ['base_location', 'base location', 'base', 'airbase', 'air_base', 'air base'],
      date_of_joining: ['date_of_joining', 'date of joining', 'joining_date', 'joining date', 'doj'],
      phone: ['phone', 'contact', 'mobile', 'telephone', 'contact information'],
      emergency_contact: ['emergency_contact', 'emergency contact', 'emergency', 'next_of_kin', 'emergency contact']
    }

    const validData = csvData.filter((row, index) => {
      console.log(`Processing row ${index + 1}:`, row)

      const required = ['service_number', 'rank', 'first_name', 'last_name', 'specialization', 'command']

      for (const field of required) {
        const possibleNames = fieldMappings[field as keyof typeof fieldMappings]
        let found = false

        for (const name of possibleNames) {
          if (row[name] && row[name].trim()) {
            found = true
            break
          }
        }

        if (!found) {
          const availableFields = Object.keys(row).filter(key => row[key] && row[key].trim())
          errors.push(`Row ${index + 1}: Missing ${field}. Available fields: ${availableFields.join(', ')}`)
          return false
        }
      }
      return true
    })

    if (errors.length) {
      setBulkErrors(errors)
      setIsProcessingBulk(false)
      return
    }

    try {
      const dataToInsert = validData.map(row => {
        // Helper function to get field value with fallbacks
        const getFieldValue = (field: string) => {
          const possibleNames = fieldMappings[field as keyof typeof fieldMappings]
          for (const name of possibleNames) {
            if (row[name] && row[name].trim()) {
              return row[name].trim()
            }
          }
          return null
        }

        return {
          user_id: user.id, // Note: This will create multiple profiles for the same user, for demo purposes
          service_number: getFieldValue('service_number'),
          rank: getFieldValue('rank'),
          first_name: getFieldValue('first_name'),
          last_name: getFieldValue('last_name'),
          specialization: getFieldValue('specialization'),
          command: getFieldValue('command'),
          base_location: getFieldValue('base_location'),
          date_of_joining: getFieldValue('date_of_joining') ? new Date(getFieldValue('date_of_joining')!).toISOString() : null,
          phone: getFieldValue('phone'),
          emergency_contact: getFieldValue('emergency_contact'),
        }
      })

      console.log('Data to insert:', dataToInsert)

      const { error } = await supabase.from("profiles").insert(dataToInsert)

      if (error) {
        throw error
      }

      toast({
        title: "Bulk Import Successful",
        description: `Imported ${validData.length} personnel records.`,
      })
      setBulkFile(null)
      setCsvData([])
      setBulkErrors([])
    } catch (error: any) {
      console.error('Import error:', error)
      setBulkErrors([error.message])
    } finally {
      setIsProcessingBulk(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Enhanced Header with IAF branding */}
      <header className="border-b bg-gradient-to-r from-primary/5 to-accent/5 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <ArrowLeft className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-primary">Back to Dashboard</span>
              </Link>
              <div className="h-6 w-px bg-border mx-2" />
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground font-[family-name:var(--font-space-grotesk)]">
                    Data Entry Portal
                  </h1>
                  <p className="text-sm text-muted-foreground font-[family-name:var(--font-dm-sans)]">
                    Indian Air Force Personnel Management
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="text-primary border-primary bg-primary/5">
                <Activity className="h-3 w-3 mr-1" />
                Secure Connection
              </Badge>
              <Avatar>
                <AvatarFallback className="bg-primary text-primary-foreground font-semibold">ADM</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/20 rounded-lg">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Personnel</p>
                    <p className="text-lg font-bold text-foreground">45,892</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-accent/20 rounded-lg">
                    <Plane className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Squadrons</p>
                    <p className="text-lg font-bold text-foreground">127</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-500/5 to-green-500/10 border-green-500/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-chart-3/20 rounded-lg">
                    <Target className="h-5 w-5 text-chart-3" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Mission Ready</p>
                    <p className="text-lg font-bold text-foreground">89.2%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-500/5 to-blue-500/10 border-blue-500/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-chart-4/20 rounded-lg">
                    <Award className="h-5 w-5 text-chart-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Training Programs</p>
                    <p className="text-lg font-bold text-foreground">34</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-muted/50">
              <TabsTrigger
                value="personnel"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <User className="h-4 w-4 mr-2" />
                Personnel
              </TabsTrigger>
              <TabsTrigger
                value="training"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Award className="h-4 w-4 mr-2" />
                Training
              </TabsTrigger>
              <TabsTrigger
                value="mission"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Target className="h-4 w-4 mr-2" />
                Mission
              </TabsTrigger>
              <TabsTrigger
                value="bulk"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Upload className="h-4 w-4 mr-2" />
                Bulk Import
              </TabsTrigger>
            </TabsList>

            <TabsContent value="personnel">
              <Card className="shadow-lg border-primary/10">
                <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
                  <CardTitle className="flex items-center gap-2">
                    <UserPlus className="h-5 w-5 text-primary" />
                    Add New Personnel
                  </CardTitle>
                  <CardDescription>Enter complete personnel information for IAF database</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <form action={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="service-number" className="text-sm font-semibold">
                          Service Number *
                        </Label>
                        <Input
                          id="service-number"
                          name="serviceNumber"
                          placeholder="e.g., IAF123456"
                          required
                          className="border-primary/20 focus:border-primary"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="rank" className="text-sm font-semibold">
                          Rank *
                        </Label>
                        <Select name="rank" required>
                          <SelectTrigger className="border-primary/20 focus:border-primary">
                            <SelectValue placeholder="Select rank" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="air-marshal">Air Marshal</SelectItem>
                            <SelectItem value="air-vice-marshal">Air Vice Marshal</SelectItem>
                            <SelectItem value="air-commodore">Air Commodore</SelectItem>
                            <SelectItem value="group-captain">Group Captain</SelectItem>
                            <SelectItem value="wing-commander">Wing Commander</SelectItem>
                            <SelectItem value="squadron-leader">Squadron Leader</SelectItem>
                            <SelectItem value="flight-lieutenant">Flight Lieutenant</SelectItem>
                            <SelectItem value="flying-officer">Flying Officer</SelectItem>
                            <SelectItem value="pilot-officer">Pilot Officer</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="first-name" className="text-sm font-semibold">
                          First Name *
                        </Label>
                        <Input
                          id="first-name"
                          name="firstName"
                          placeholder="Enter first name"
                          required
                          className="border-primary/20 focus:border-primary"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name" className="text-sm font-semibold">
                          Last Name *
                        </Label>
                        <Input
                          id="last-name"
                          name="lastName"
                          placeholder="Enter last name"
                          required
                          className="border-primary/20 focus:border-primary"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="specialization" className="text-sm font-semibold">
                          Specialization *
                        </Label>
                        <Select name="specialization" required>
                          <SelectTrigger className="border-primary/20 focus:border-primary">
                            <SelectValue placeholder="Select specialization" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pilot">Pilot</SelectItem>
                            <SelectItem value="navigator">Navigator</SelectItem>
                            <SelectItem value="engineer">Engineer</SelectItem>
                            <SelectItem value="technician">Technician</SelectItem>
                            <SelectItem value="logistics">Logistics</SelectItem>
                            <SelectItem value="intelligence">Intelligence</SelectItem>
                            <SelectItem value="medical">Medical</SelectItem>
                            <SelectItem value="administration">Administration</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="command" className="text-sm font-semibold">
                          Command *
                        </Label>
                        <Select name="command" required>
                          <SelectTrigger className="border-primary/20 focus:border-primary">
                            <SelectValue placeholder="Select command" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="western">Western Air Command</SelectItem>
                            <SelectItem value="eastern">Eastern Air Command</SelectItem>
                            <SelectItem value="central">Central Air Command</SelectItem>
                            <SelectItem value="southern">Southern Air Command</SelectItem>
                            <SelectItem value="south-western">South Western Air Command</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="base" className="text-sm font-semibold">
                          Air Base *
                        </Label>
                        <Input
                          id="base"
                          name="base"
                          placeholder="e.g., Hindon Air Base"
                          required
                          className="border-primary/20 focus:border-primary"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="date-of-joining" className="text-sm font-semibold">
                          Date of Joining *
                        </Label>
                        <Input
                          id="date-of-joining"
                          name="dateOfJoining"
                          type="date"
                          required
                          className="border-primary/20 focus:border-primary"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="qualifications" className="text-sm font-semibold">
                        Qualifications
                      </Label>
                      <Textarea
                        id="qualifications"
                        name="qualifications"
                        placeholder="Enter educational qualifications and certifications"
                        className="border-primary/20 focus:border-primary min-h-[100px]"
                      />
                    </div>

                    <div className="flex justify-end gap-4 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        className="border-primary/20 text-primary hover:bg-primary/5 bg-transparent"
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Save as Draft
                      </Button>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Submitting...
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4 mr-2" />
                            Submit Personnel Record
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="training">
              <Card className="shadow-lg border-accent/10">
                <CardHeader className="bg-gradient-to-r from-accent/5 to-primary/5">
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-accent" />
                    Training Program Entry
                  </CardTitle>
                  <CardDescription>Add new training programs and assign personnel</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <form action={handleSubmitTraining} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="program-name" className="text-sm font-semibold">
                          Program Name *
                        </Label>
                        <Input
                          id="program-name"
                          placeholder="e.g., Advanced Fighter Training"
                          required
                          className="border-accent/20 focus:border-accent"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="duration" className="text-sm font-semibold">
                          Duration (weeks) *
                        </Label>
                        <Input
                          id="duration"
                          type="number"
                          placeholder="e.g., 12"
                          required
                          className="border-accent/20 focus:border-accent"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="start-date" className="text-sm font-semibold">
                          Start Date *
                        </Label>
                        <Input id="start-date" type="date" required className="border-accent/20 focus:border-accent" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="capacity" className="text-sm font-semibold">
                          Capacity *
                        </Label>
                        <Input
                          id="capacity"
                          type="number"
                          placeholder="e.g., 25"
                          required
                          className="border-accent/20 focus:border-accent"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description" className="text-sm font-semibold">
                        Program Description
                      </Label>
                      <Textarea
                        id="description"
                        placeholder="Enter detailed program description and objectives"
                        className="border-accent/20 focus:border-accent min-h-[120px]"
                      />
                    </div>

                    <div className="flex justify-end gap-4 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        className="border-accent/20 text-accent hover:bg-accent/5 bg-transparent"
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Save as Draft
                      </Button>
                      <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                        <Save className="h-4 w-4 mr-2" />
                        Create Training Program
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="mission">
              <Card className="shadow-lg border-green-500/10">
                <CardHeader className="bg-gradient-to-r from-green-500/5 to-blue-500/5">
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-green-600" />
                    Mission Assignment
                  </CardTitle>
                  <CardDescription>Create and assign mission parameters</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <form action={handleSubmitMission} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="mission-code" className="text-sm font-semibold">
                          Mission Code *
                        </Label>
                        <Input
                          id="mission-code"
                          placeholder="e.g., OP-GUARDIAN-2024"
                          required
                          className="border-green-500/20 focus:border-green-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="priority" className="text-sm font-semibold">
                          Priority Level *
                        </Label>
                        <Select required>
                          <SelectTrigger className="border-green-500/20 focus:border-green-500">
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="critical">Critical</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="low">Low</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="location" className="text-sm font-semibold">
                          Location *
                        </Label>
                        <Input
                          id="location"
                          placeholder="e.g., Ladakh Sector"
                          required
                          className="border-green-500/20 focus:border-green-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="aircraft-required" className="text-sm font-semibold">
                          Aircraft Required *
                        </Label>
                        <Input
                          id="aircraft-required"
                          type="number"
                          placeholder="e.g., 4"
                          required
                          className="border-green-500/20 focus:border-green-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="mission-brief" className="text-sm font-semibold">
                        Mission Brief
                      </Label>
                      <Textarea
                        id="mission-brief"
                        placeholder="Enter detailed mission objectives and parameters"
                        className="border-green-500/20 focus:border-green-500 min-h-[120px]"
                      />
                    </div>

                    <div className="flex justify-end gap-4 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        className="border-green-500/20 text-green-600 hover:bg-green-500/5 bg-transparent"
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Save as Draft
                      </Button>
                      <Button className="bg-green-600 hover:bg-green-700 text-white">
                        <Save className="h-4 w-4 mr-2" />
                        Create Mission
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="bulk">
              <Card className="shadow-lg border-blue-500/10">
                <CardHeader className="bg-gradient-to-r from-blue-500/5 to-purple-500/5">
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="h-5 w-5 text-blue-600" />
                    Bulk Data Import
                  </CardTitle>
                  <CardDescription>Upload CSV files for bulk personnel data entry</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept=".csv"
                      style={{ display: 'none' }}
                    />
                    <div className="border-2 border-dashed border-blue-500/20 rounded-lg p-8 text-center hover:border-blue-500/40 transition-colors">
                      <Upload className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Upload CSV File</h3>
                      <p className="text-muted-foreground mb-4">Drag and drop your CSV file here, or click to browse</p>
                      <Button
                        variant="outline"
                        className="border-blue-500/20 text-blue-600 hover:bg-blue-500/5 bg-transparent"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        Choose File
                      </Button>
                    </div>

                    {bulkFile && (
                      <div className="text-sm text-muted-foreground">
                        Selected file: {bulkFile.name}
                      </div>
                    )}

                    {csvData.length > 0 && (
                      <div className="text-sm text-muted-foreground">
                        Parsed {csvData.length} rows.
                      </div>
                    )}

                    {bulkErrors.length > 0 && (
                      <div className="text-red-600 text-sm">
                        <ul>
                          {bulkErrors.map((error, index) => <li key={index}>{error}</li>)}
                        </ul>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="bg-blue-50/50 dark:bg-blue-950/20">
                        <CardContent className="p-4">
                          <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Required Columns</h4>
                          <ul className="text-sm text-blue-600 dark:text-blue-400 space-y-1">
                            <li>• service_number</li>
                            <li>• rank</li>
                            <li>• first_name</li>
                            <li>• last_name</li>
                            <li>• specialization</li>
                            <li>• command</li>
                          </ul>
                        </CardContent>
                      </Card>

                      <Card className="bg-green-50/50 dark:bg-green-950/20">
                        <CardContent className="p-4">
                          <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">Optional Columns</h4>
                          <ul className="text-sm text-green-600 dark:text-green-400 space-y-1">
                            <li>• base_location</li>
                            <li>• date_of_joining</li>
                            <li>• phone</li>
                            <li>• emergency_contact</li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="flex justify-end gap-4 pt-4">
                      <Button
                        variant="outline"
                        className="border-blue-500/20 text-blue-600 hover:bg-blue-500/5 bg-transparent"
                      >
                        Download Template
                      </Button>
                      <Button
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={handleProcessImport}
                        disabled={!csvData.length || isProcessingBulk}
                      >
                        {isProcessingBulk ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Processing...
                          </>
                        ) : (
                          <>
                            <Upload className="h-4 w-4 mr-2" />
                            Process Import
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
