"use client"
import { useForm, useFieldArray } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"

interface ProjectsFormProps {
  onSubmit: (data: any) => void
  initialData?: any[]
}

export default function ProjectsForm({ onSubmit, initialData = [] }: ProjectsFormProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      projects:
        initialData.length > 0
          ? initialData
          : [
              {
                name: "",
                link: "",
                technologies: "",
                description: "",
              },
            ],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "projects",
  })

  return (
    <form id="projects-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {fields.map((field, index) => (
        <Card key={field.id} className="relative">
          <CardContent className="pt-6">
            <div className="absolute top-3 right-3">
              {fields.length > 1 && (
                <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <Label htmlFor={`projects.${index}.name`}>
                  Project Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id={`projects.${index}.name`}
                  {...register(`projects.${index}.name`, {
                    required: "Project name is required",
                  })}
                  placeholder="E-commerce Platform"
                />
                {errors.projects?.[index]?.name && (
                  <p className="text-sm text-red-500">{errors.projects[index]?.name?.message as string}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor={`projects.${index}.link`}>Project Link</Label>
                <Input
                  id={`projects.${index}.link`}
                  {...register(`projects.${index}.link`)}
                  placeholder="github.com/username/project"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor={`projects.${index}.technologies`}>
                  Technologies Used <span className="text-red-500">*</span>
                </Label>
                <Input
                  id={`projects.${index}.technologies`}
                  {...register(`projects.${index}.technologies`, {
                    required: "Technologies are required",
                  })}
                  placeholder="React, Node.js, MongoDB, etc."
                />
                <p className="text-xs text-muted-foreground">Separate multiple technologies with commas</p>
                {errors.projects?.[index]?.technologies && (
                  <p className="text-sm text-red-500">{errors.projects[index]?.technologies?.message as string}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`projects.${index}.description`}>
                Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id={`projects.${index}.description`}
                {...register(`projects.${index}.description`, {
                  required: "Description is required",
                })}
                placeholder="• Built a full-stack e-commerce platform
• Implemented user authentication and payment processing
• Designed responsive UI with React and Tailwind CSS"
                rows={4}
              />
              <p className="text-xs text-muted-foreground">Use bullet points (•) for better formatting</p>
              {errors.projects?.[index]?.description && (
                <p className="text-sm text-red-500">{errors.projects[index]?.description?.message as string}</p>
              )}
            </div>
          </CardContent>
        </Card>
      ))}

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() =>
          append({
            name: "",
            link: "",
            technologies: "",
            description: "",
          })
        }
        className="flex items-center"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Project
      </Button>
    </form>
  )
}
