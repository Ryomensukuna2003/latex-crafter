"use client"
import { useForm, useFieldArray } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"


export default function EducationForm({ onSubmit, initialData = [] }) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      education:
        initialData.length > 0
          ? initialData
          : [
              {
                degree: "",
                institution: "",
                location: "",
                startDate: "",
                endDate: "",
                description: "",
              },
            ],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  })

  return (
    <form id="education-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                <Label htmlFor={`education.${index}.degree`}>
                  Degree/Certificate <span className="text-red-500">*</span>
                </Label>
                <Input
                  id={`education.${index}.degree`}
                  {...register(`education.${index}.degree`, {
                    required: "Degree is required",
                  })}
                  placeholder="Bachelor of Science in Computer Science"
                />
                {errors.education?.[index]?.degree && (
                  <p className="text-sm text-red-500">{errors.education[index]?.degree?.message }</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor={`education.${index}.institution`}>
                  Institution <span className="text-red-500">*</span>
                </Label>
                <Input
                  id={`education.${index}.institution`}
                  {...register(`education.${index}.institution`, {
                    required: "Institution is required",
                  })}
                  placeholder="University of Technology"
                />
                {errors.education?.[index]?.institution && (
                  <p className="text-sm text-red-500">{errors.education[index]?.institution?.message }</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor={`education.${index}.location`}>Location</Label>
                <Input
                  id={`education.${index}.location`}
                  {...register(`education.${index}.location`)}
                  placeholder="City, State"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label htmlFor={`education.${index}.startDate`}>Start Date</Label>
                  <Input
                    id={`education.${index}.startDate`}
                    {...register(`education.${index}.startDate`)}
                    placeholder="MM/YYYY"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`education.${index}.endDate`}>End Date</Label>
                  <Input
                    id={`education.${index}.endDate`}
                    {...register(`education.${index}.endDate`)}
                    placeholder="MM/YYYY or Present"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`education.${index}.description`}>Description</Label>
              <Textarea
                id={`education.${index}.description`}
                {...register(`education.${index}.description`)}
                placeholder="Relevant coursework, achievements, or activities"
                rows={3}
              />
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
            degree: "",
            institution: "",
            location: "",
            startDate: "",
            endDate: "",
            description: "",
          })
        }
        className="flex items-center"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Education
      </Button>
    </form>
  )
}
