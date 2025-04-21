"use client"

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"
import axios from "axios";
import Link from "next/link";
import PersonalInfoForm from "@/components/resume/personal-info-form";
import EducationForm from "@/components/resume/education-form";
import SkillsForm from "@/components/resume/skills-form";
import ExperienceForm from "@/components/resume/experience-form";
import ProjectsForm from "@/components/resume/projects-form";
import AchievementsForm from "@/components/resume/achievements-form";
import useLatexStore from "@/lib/store";

const FORM_STEPS = [
  "personal",
  "education",
  "skills",
  "experience",
  "projects",
  "achievements",
];

export default function FormPage() {
  const setLatexOutput = useLatexStore((state) => state.setLatexOutput);
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    personal: {},
    education: [],
    skills: [],
    experience: [],
    projects: [],
    achievements: [],
  });
  const router = useRouter();

  useEffect(() => {
    console.log("Form Data -> ", formData);
  }, [formData]);

  const handleUpload = async (pdfData) => {
    try {
      const result = await axios.post(
        "/api/formResume",
        { pdfData: pdfData },
        { responseType: "text" }
      );
      setLatexOutput(result.data);
    } catch (error) {
      console.error("Error uploading PDF data:", error);
    }
  };

  const handleNext = (data) => {
    setFormData({
      ...formData,
      [FORM_STEPS[activeStep]]: data,
    });

    if (activeStep < FORM_STEPS.length - 1) {
      setActiveStep(activeStep + 1);
    } else {
      // Submit the form data to the server
      handleUpload(formData);
      router.push("/preview");
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (FORM_STEPS[activeStep]) {
      case "personal":
        return (
          <PersonalInfoForm
            onSubmit={handleNext}
            initialData={formData.personal}
          />
        );
      case "education":
        return (
          <EducationForm
            onSubmit={handleNext}
            initialData={formData.education}
          />
        );
      case "skills":
        return (
          <SkillsForm onSubmit={handleNext} initialData={formData.skills} />
        );
      case "experience":
        return (
          <ExperienceForm
            onSubmit={handleNext}
            initialData={formData.experience}
          />
        );
      case "projects":
        return (
          <ProjectsForm onSubmit={handleNext} initialData={formData.projects} />
        );
      case "achievements":
        return (
          <AchievementsForm
            onSubmit={handleNext}
            initialData={formData.achievements}
          />
        );
      default:
        return null;
    }
  };

  return (
    <main className="container mx-auto py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" size="sm">
              ← Back to Home
            </Button>
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-6">Create Your Resume</h1>

        <Tabs value={FORM_STEPS[activeStep]} className="w-full">
          <TabsList className="grid grid-cols-6 mb-8">
            <TabsTrigger
              value="personal"
              onClick={() => setActiveStep(0)}
              disabled={activeStep < 0}
              className="text-xs sm:text-sm"
            >
              Personal
            </TabsTrigger>
            <TabsTrigger
              value="education"
              onClick={() => setActiveStep(1)}
              disabled={activeStep < 1}
              className="text-xs sm:text-sm"
            >
              Education
            </TabsTrigger>
            <TabsTrigger
              value="skills"
              onClick={() => setActiveStep(2)}
              disabled={activeStep < 2}
              className="text-xs sm:text-sm"
            >
              Skills
            </TabsTrigger>
            <TabsTrigger
              value="experience"
              onClick={() => setActiveStep(3)}
              disabled={activeStep < 3}
              className="text-xs sm:text-sm"
            >
              Experience
            </TabsTrigger>
            <TabsTrigger
              value="projects"
              onClick={() => setActiveStep(4)}
              disabled={activeStep < 4}
              className="text-xs sm:text-sm"
            >
              Projects
            </TabsTrigger>
            <TabsTrigger
              value="achievements"
              onClick={() => setActiveStep(5)}
              disabled={activeStep < 5}
              className="text-xs sm:text-sm"
            >
              Achievements
            </TabsTrigger>
          </TabsList>

          <Card>
            <CardHeader>
              <CardTitle>
                {FORM_STEPS[activeStep].charAt(0).toUpperCase() +
                  FORM_STEPS[activeStep].slice(1)}{" "}
                Information
              </CardTitle>
            </CardHeader>
            <CardContent>{renderStepContent()}</CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                Back
              </Button>
              <Button form={`${FORM_STEPS[activeStep]}-form`} type="submit">
                {activeStep === FORM_STEPS.length - 1 ? "Submit" : "Next"}
              </Button>
            </CardFooter>
          </Card>
        </Tabs>
      </div>
    </main>
  );
}
