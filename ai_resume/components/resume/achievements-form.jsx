"use client"
import { useForm, useFieldArray } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"


export default function AchievementsForm({ onSubmit, initialData = [] }) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      achievements:
        initialData.length > 0
          ? initialData
          : [
              {
                title: "",
                date: "",
                description: "",
              },
            ],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "achievements",
  })

  return (
    <form id="achievements-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                <Label htmlFor={`achievements.${index}.title`}>
                  Achievement Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id={`achievements.${index}.title`}
                  {...register(`achievements.${index}.title`, {
                    required: "Achievement title is required",
                  })}
                  placeholder="Hackathon Winner, Certification, Award, etc."
                />
                {errors.achievements?.[index]?.title && (
                  <p className="text-sm text-red-500">{errors.achievements[index]?.title?.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor={`achievements.${index}.date`}>Date</Label>
                <Input
                  id={`achievements.${index}.date`}
                  {...register(`achievements.${index}.date`)}
                  placeholder="Month Year"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`achievements.${index}.description`}>Description</Label>
              <Textarea
                id={`achievements.${index}.description`}
                {...register(`achievements.${index}.description`)}
                placeholder="Brief description of the achievement and its significance"
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
            title: "",
            date: "",
            description: "",
          })
        }
        className="flex items-center"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Achievement
      </Button>
    </form>
  )
}
