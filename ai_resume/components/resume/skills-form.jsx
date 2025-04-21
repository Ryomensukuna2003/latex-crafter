"use client"
import { useForm, useFieldArray } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"



export default function SkillsForm({ onSubmit, initialData = [] }) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      skillCategories:
        initialData.length > 0
          ? initialData
          : [
              {
                category: "Languages",
                skills: "",
              },
              {
                category: "Frameworks",
                skills: "",
              },
            ],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "skillCategories",
  })

  return (
    <form id="skills-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor={`skillCategories.${index}.category`}>
                  Category <span className="text-red-500">*</span>
                </Label>
                <Input
                  id={`skillCategories.${index}.category`}
                  {...register(`skillCategories.${index}.category`, {
                    required: "Category is required",
                  })}
                  placeholder="Languages, Frameworks, Tools, etc."
                />
                {errors.skillCategories?.[index]?.category && (
                  <p className="text-sm text-red-500">{errors.skillCategories[index]?.category?.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor={`skillCategories.${index}.skills`}>
                  Skills <span className="text-red-500">*</span>
                </Label>
                <Input
                  id={`skillCategories.${index}.skills`}
                  {...register(`skillCategories.${index}.skills`, {
                    required: "Skills are required",
                  })}
                  placeholder="JavaScript, TypeScript, React, Node.js, etc."
                />
                <p className="text-xs text-muted-foreground">Separate multiple skills with commas</p>
                {errors.skillCategories?.[index]?.skills && (
                  <p className="text-sm text-red-500">{errors.skillCategories[index]?.skills?.message}</p>
                )}
              </div>
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
            category: "",
            skills: "",
          })
        }
        className="flex items-center"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Skill Category
      </Button>
    </form>
  )
}
