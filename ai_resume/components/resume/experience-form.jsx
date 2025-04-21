"use client"
import { useForm, useFieldArray } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"

export default function ExperienceForm({ onSubmit, initialData = [] }) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      experiences:
        initialData.length > 0
          ? initialData
          : [
              {
                title: "",
                company: "",
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
    name: "experiences",
  })

  return (
    <form id="experience-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                <Label htmlFor={`experiences.${index}.title`}>Job Title</Label>
                <Input
                  id={`experiences.${index}.title`}
                  {...register(`experiences.${index}.title`)}
                  placeholder="Software Engineer"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`experiences.${index}.company`}>Company</Label>
                <Input
                  id={`experiences.${index}.company`}
                  {...register(`experiences.${index}.company`)}
                  placeholder="Tech Solutions Inc."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`experiences.${index}.location`}>Location</Label>
                <Input
                  id={`experiences.${index}.location`}
                  {...register(`experiences.${index}.location`)}
                  placeholder="City, State or Remote"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label htmlFor={`experiences.${index}.startDate`}>Start Date</Label>
                  <Input
                    id={`experiences.${index}.startDate`}
                    {...register(`experiences.${index}.startDate`)}
                    placeholder="MM/YYYY"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`experiences.${index}.endDate`}>End Date</Label>
                  <Input
                    id={`experiences.${index}.endDate`}
                    {...register(`experiences.${index}.endDate`)}
                    placeholder="MM/YYYY or Present"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`experiences.${index}.description`}>Description</Label>
              <Textarea
                id={`experiences.${index}.description`}
                {...register(`experiences.${index}.description`)}
                placeholder="• Developed and maintained web applications
• Implemented new features and fixed bugs
• Collaborated with cross-functional teams"
                rows={5}
              />
              <p className="text-xs text-muted-foreground">Use bullet points (•) for better formatting</p>
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
            title: "",
            company: "",
            location: "",
            startDate: "",
            endDate: "",
            description: "",
          })
        }
        className="flex items-center"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Experience
      </Button>
    </form>
  )
}
