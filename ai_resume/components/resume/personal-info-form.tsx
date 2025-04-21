"use client"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface PersonalInfoFormProps {
  onSubmit: (data: any) => void
  initialData?: any
}

export default function PersonalInfoForm({ onSubmit, initialData = {} }: PersonalInfoFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: initialData.fullName || "",
      email: initialData.email || "",
      phone: initialData.phone || "",
      location: initialData.location || "",
      linkedin: initialData.linkedin || "",
      website: initialData.website || "",
      summary: initialData.summary || "",
    },
  })

  return (
    <form id="personal-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">
            Full Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="fullName"
            {...register("fullName", { required: "Full name is required" })}
            placeholder="John Doe"
          />
          {errors.fullName && <p className="text-sm text-red-500">{errors.fullName.message as string}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">
            Email <span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            placeholder="john.doe@example.com"
          />
          {errors.email && <p className="text-sm text-red-500">{errors.email.message as string}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" {...register("phone")} placeholder="(123) 456-7890" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input id="location" {...register("location")} placeholder="City, State" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn Profile</Label>
          <Input id="linkedin" {...register("linkedin")} placeholder="linkedin.com/in/johndoe" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="website">Personal Website</Label>
          <Input id="website" {...register("website")} placeholder="johndoe.com" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="summary">
          Professional Summary <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="summary"
          {...register("summary", { required: "Professional summary is required" })}
          placeholder="A brief overview of your professional background and career goals"
          rows={4}
        />
        {errors.summary && <p className="text-sm text-red-500">{errors.summary.message as string}</p>}
      </div>
    </form>
  )
}
