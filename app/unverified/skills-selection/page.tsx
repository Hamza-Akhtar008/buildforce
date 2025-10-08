"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, ArrowRight, Users, Building, Wrench, HardHat, Cog, Star, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export default function SkillsSelectionPage() {
  const [currentScreen, setCurrentScreen] = useState(1)
  const totalScreens = 3
  const [selectedRole, setSelectedRole] = useState("workforce")
  const [selectedTrades, setSelectedTrades] = useState<string[]>([])
  const [selectedSkillLevel, setSelectedSkillLevel] = useState("")
  const [selectedExperience, setSelectedExperience] = useState("")
  const router = useRouter()

  // Role options for step 1
  // const roles = [
  //    {
  //       id: "workforce",
  //       title: "Work Force",
  //       description:
  //          "Skilled laborers, construction workers, and field personnel",
  //       details:
  //          "Hands-on construction work, equipment operation, and specialized labor tasks",
  //       examples: [
  //          "General Laborers",
  //          "Equipment Operators",
  //          "Skilled Tradespeople",
  //          "Site Workers",
  //       ],
  //       icon: HardHat,
  //       enabled: true,
  //    },
  //    {
  //       id: "contractors",
  //       title: "Contractors",
  //       description:
  //          "Independent contractors, subcontractors, and specialized service providers",
  //       details:
  //          "Business owners providing specialized construction services and project execution",
  //       examples: [
  //          "General Contractors",
  //          "Subcontractors",
  //          "Specialty Contractors",
  //          "Service Providers",
  //       ],
  //       icon: Briefcase,
  //       enabled: false,
  //    },
  //    {
  //       id: "project_owners",
  //       title: "Project Owners",
  //       description:
  //          "Project managers, developers, and construction supervisors",
  //       details:
  //          "Leadership roles in project planning, management, and strategic oversight",
  //       examples: [
  //          "Project Managers",
  //          "Site Supervisors",
  //          "Construction Managers",
  //          "Developers",
  //       ],
  //       icon: Building,
  //       enabled: false,
  //    },
  // ];

  // Trade categories and options for step 2
  const tradeCategories = [
    {
      category: "Labor",
      description: "Skilled trades and specialized construction work",
      icon: Wrench,
      trades: [
        "Mason",
        "Carpenter",
        "Electrician",
        "Plumber",
        "Welder",
        "Painter",
        "Tiler",
        "Roofer",
        "Glazier",
        "Steel Fixer",
        "Shuttering Carpenter",
        "Concrete Finisher",
        "POP Worker",
        "Waterproofer",
      ],
    },
    {
      category: "General Labor",
      description: "Entry-level and general construction support",
      icon: Users,
      trades: [
        "General Labor",
        "Helper",
        "Scaffolder",
        "Gardener",
        "Handyman",
        "Watchman",
        "Cleaner",
        "Loader/Unloader",
      ],
    },
    {
      category: "Machine Operators",
      description: "Heavy machinery and equipment operation",
      icon: Cog,
      trades: [
        "Excavator Operator",
        "Crane Operator",
        "JCB Backhoe Operator",
        "Loader Operator",
        "Grader Operator",
        "Forklift Operator",
        "Boom Lift Operator",
        "Roller Operator",
        "Dozer Operator",
        "Compressor Operator",
        "Dump Truck Driver",
        "Concrete Pump Operator",
      ],
    },
    {
      category: "Specialized Roles",
      description: "Technical and supervisory positions",
      icon: Star,
      trades: ["HVAC Technician", "MEP Technician", "Site Supervisor", "Safety Officer", "Estimator", "Site Engineer"],
    },
  ]

  // Skill level options for step 3
  const skillLevels = [
    {
      id: "beginner",
      title: "Beginner",
      description: "New to the field with basic knowledge",
      icon: Users,
    },
    {
      id: "intermediate",
      title: "Intermediate",
      description: "Some experience with good understanding",
      icon: Wrench,
    },
    {
      id: "expert",
      title: "Expert",
      description: "Highly skilled with extensive experience",
      icon: Star,
    },
    {
      id: "need_training",
      title: "Need Training",
      description: "Looking to learn and develop skills",
      icon: HardHat,
    },
  ]

  // Experience level options for step 4
  const experienceLevels = [
    {
      id: "1-3",
      title: "1-3 years",
      description: "Early career professional",
      icon: Users,
    },
    {
      id: "3-5",
      title: "3-5 years",
      description: "Mid-level professional",
      icon: Wrench,
    },
    {
      id: "5-10",
      title: "5-10 years",
      description: "Senior professional",
      icon: Star,
    },
    {
      id: "10+",
      title: "10+ years",
      description: "Veteran professional",
      icon: Building,
    },
  ]

  const persistSelections = () => {
    try {
      const payload = {
        trades: selectedTrades,
        skillLevel: selectedSkillLevel,
        experienceRange: selectedExperience,
      }
      localStorage.setItem("preinterviewSelections", JSON.stringify(payload))
      console.log("[v0] Persisted selections:", payload)
    } catch (err) {
      console.log("[v0] Failed to persist selections:", (err as Error).message)
    }
  }

  useEffect(() => {
    try {
      const raw = localStorage.getItem("preinterviewSelections")
      if (raw) {
        const s = JSON.parse(raw) as {
          trades?: string[]
          skillLevel?: string
          experienceRange?: string
        }
        if (s.trades) setSelectedTrades(s.trades)
        if (s.skillLevel) setSelectedSkillLevel(s.skillLevel)
        if (s.experienceRange) setSelectedExperience(s.experienceRange)
        console.log("[v0] Restored selections:", s)
      }
    } catch (err) {
      console.log("[v0] Failed to restore selections:", (err as Error).message)
    }
  }, [])

  const handleNext = () => {
    const isSkippingExperience = selectedSkillLevel === "need_training"
    const isFinalStep = currentScreen === effectiveTotalScreens

    if (isSkippingExperience || isFinalStep) {
      persistSelections()
      router.push("/unverified/preinterview-submissions")
      return
    }

    if (currentScreen < effectiveTotalScreens) {
      setCurrentScreen(currentScreen + 1)
    }
  }

  const handleBack = () => {
    if (currentScreen > 1) {
      setCurrentScreen(currentScreen - 1)
    }
  }

  // const handleRoleSelect = (roleId: string) => {
  //    const role = roles.find((r) => r.id === roleId);
  //    if (role && role.enabled) {
  //       setSelectedRole(roleId);
  //    }
  // };

  const handleTradeToggle = (trade: string) => {
    setSelectedTrades((prev) => (prev.includes(trade) ? prev.filter((t) => t !== trade) : [...prev, trade]))
  }

  const handleSkillLevelSelect = (skillLevelId: string) => {
    setSelectedSkillLevel(skillLevelId)
  }

  const handleExperienceSelect = (experienceId: string) => {
    setSelectedExperience(experienceId)
  }

  const canProceed = () => {
    if (selectedSkillLevel === "need_training" && currentScreen === 3) return true
    if (currentScreen === 1) return selectedTrades.length > 0
    if (currentScreen === 2) return selectedSkillLevel !== ""
    if (currentScreen === 3) return selectedExperience !== ""
    return true
  }

  const getScreenTitle = () => {
    switch (currentScreen) {
      case 1:
        return "Select Your Trade"
      case 2:
        return "Select Your Skill Level"
      case 3:
        return "Select Your Experience"
      default:
        return ""
    }
  }

  const getScreenDescription = () => {
    switch (currentScreen) {
      case 1:
        return "Select the trades that match your expertise"
      case 2:
        return "Choose your current skill level in your selected trades"
      case 3:
        return "Tell us about your years of experience in the field"
      default:
        return ""
    }
  }

  const renderStepContent = () => {
    switch (currentScreen) {
      case 1:
        return (
          <div className="space-y-8">
            {tradeCategories.map((category) => {
              const IconComponent = category.icon
              return (
                <div key={category.category} className="space-y-6">
                  <div className="border-l-4 border-primary pl-6">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">{category.category}</h3>
                        <p className="text-muted-foreground">{category.description}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pl-6">
                    {category.trades.map((trade) => (
                      <div
                        key={trade}
                        className={`flex items-center space-x-3 p-4 rounded-lg border transition-all duration-200 cursor-pointer ${
                          selectedTrades.includes(trade)
                            ? "border-primary bg-primary/5 shadow-sm"
                            : "border-border hover:border-primary/50 hover:bg-primary/5"
                        }`}
                        onClick={() => handleTradeToggle(trade)}
                      >
                        <Checkbox
                          id={trade}
                          checked={selectedTrades.includes(trade)}
                          onCheckedChange={() => handleTradeToggle(trade)}
                          className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                        <label htmlFor={trade} className="text-sm font-medium leading-none cursor-pointer flex-1">
                          {trade}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )

      case 2:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {skillLevels.map((skill) => {
              const IconComponent = skill.icon
              const isSelected = selectedSkillLevel === skill.id

              return (
                <div
                  key={skill.id}
                  className={`p-6 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "border-primary bg-primary/5 shadow-lg"
                      : "border-border hover:border-primary/50 hover:bg-primary/5 hover:shadow-md"
                  }`}
                  onClick={() => handleSkillLevelSelect(skill.id)}
                >
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-2 rounded-lg ${
                          isSelected ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
                        }`}
                      >
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-1">{skill.title}</h3>
                        {isSelected && <CheckCircle className="h-5 w-5 text-primary" />}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">{skill.description}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )

      case 3:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {experienceLevels.map((experience) => {
              const IconComponent = experience.icon
              const isSelected = selectedExperience === experience.id

              return (
                <div
                  key={experience.id}
                  className={`p-6 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "border-primary bg-primary/5 shadow-lg"
                      : "border-border hover:border-primary/50 hover:bg-primary/5 hover:shadow-md"
                  }`}
                  onClick={() => handleExperienceSelect(experience.id)}
                >
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-2 rounded-lg ${
                          isSelected ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
                        }`}
                      >
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-1">{experience.title}</h3>
                        {isSelected && <CheckCircle className="h-5 w-5 text-primary" />}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">{experience.description}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )

      default:
        return (
          <div className="text-center py-16">
            <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl font-bold text-primary">{currentScreen}</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">{getScreenTitle()}</h3>
            <p className="text-muted-foreground text-lg">
              Content for {getScreenTitle().toLowerCase()} will be added here
            </p>
          </div>
        )
    }
  }

  const effectiveTotalScreens = selectedSkillLevel === "need_training" ? 2 : totalScreens

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Fixed Header Section */}
      <div className="fixed top-0 left-0 right-0 bg-background border-b border-border z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Title Section */}
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <HardHat className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{getScreenTitle()}</h1>
                <p className="text-muted-foreground text-sm">{getScreenDescription()}</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-80">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-muted-foreground">
                  Step {Math.min(currentScreen, effectiveTotalScreens)} of {effectiveTotalScreens}
                </span>
                <span className="text-xs font-medium text-primary">
                  {Math.round((Math.min(currentScreen, effectiveTotalScreens) / effectiveTotalScreens) * 100)}% Complete
                </span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-500 shadow-sm"
                  style={{
                    width: `${(Math.min(currentScreen, effectiveTotalScreens) / effectiveTotalScreens) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Main Content */}
      <div className="flex-1 overflow-y-auto pt-[120px] pb-[120px]">
        <div className="max-w-7xl mx-auto px-6">
          <Card className="shadow-lg">
            <div className="p-6">{renderStepContent()}</div>
          </Card>
        </div>
      </div>

      {/* Fixed Navigation Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between w-full">
            <Button
              onClick={handleBack}
              variant="outline"
              disabled={currentScreen === 1}
              className="flex cursor-pointer items-center space-x-2 disabled:opacity-50 bg-transparent"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </Button>

            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              {currentScreen > 1 && (
                <span>
                  {selectedTrades.length > 0 && ` • ${selectedTrades.length} trades selected`}
                  {selectedSkillLevel && ` • ${skillLevels.find((s) => s.id === selectedSkillLevel)?.title}`}
                  {selectedExperience && ` • ${experienceLevels.find((e) => e.id === selectedExperience)?.title}`}
                </span>
              )}
            </div>

            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="flex cursor-pointer items-center space-x-2 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >
              <span>{currentScreen === effectiveTotalScreens ? "Complete Setup" : "Next Step"}</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
