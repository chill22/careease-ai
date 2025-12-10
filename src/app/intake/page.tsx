// src/app/intake/page.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  lovedOneName: z.string().min(1, "Name is required"),
  age: z.string().min(1, "Age is required"),
  zipCode: z.string().min(5, "Valid zip code required").max(5),
  relationship: z.string().min(1, "Relationship is required"),
  conditions: z.array(z.string()).min(1, "Select at least one"),
  mainChallenges: z.string().min(10, "Tell us a little about your day-to-day"),
  mobility: z.string().min(1, "Required"),
  memoryIssues: z.boolean(),
  needsHelpEating: z.boolean(),
  needsHelpBathing: z.boolean(),
});

export default function Intake() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lovedOneName: "",
      age: "",
      zipCode: "",
      relationship: "",
      conditions: [],
      mainChallenges: "",
      mobility: "",
      memoryIssues: false,
      needsHelpEating: false,
      needsHelpBathing: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    localStorage.setItem("careease-intake", JSON.stringify(values));
    router.push("/results");
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-indigo-900">
            Let’s create your free care plan
          </h1>
          <p className="mt-4 text-xl text-indigo-700">
            Takes less than 60 seconds • 100% private • Made just for you
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Basic Info */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-indigo-100">
              <h2 className="text-2xl font-semibold text-indigo-900 mb-6">
                About your loved one
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="lovedOneName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First name (or nickname)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Mom, Dad, Maria" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="78" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your zip code</FormLabel>
                      <FormControl>
                        <Input placeholder="90210" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="relationship"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your relationship</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select one" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="spouse">Spouse / Partner</SelectItem>
                          <SelectItem value="parent">Parent</SelectItem>
                          <SelectItem value="child">Adult Child</SelectItem>
                          <SelectItem value="sibling">Sibling</SelectItem>
                          <SelectItem value="friend">Friend / Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Health & Daily Needs */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-teal-100">
              <h2 className="text-2xl font-semibold text-teal-900 mb-6">
                Health & daily needs (check all that apply)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="conditions"
                  render={() => (
                    <FormItem>
                      <FormLabel>Common conditions</FormLabel>
                      {[
                        "Dementia / Alzheimer’s",
                        "Parkinson’s",
                        "Stroke recovery",
                        "Diabetes",
                        "Heart disease",
                        "Cancer",
                        "Arthritis",
                        "None of these",
                      ].map((item) => (
                        <FormField
                          key={item}
                          control={form.control}
                          name="conditions"
                          render={({ field }) => (
                            <FormItem className="flex items-center space-x-3 mt-3">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, item])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {item}
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                      ))}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="mobility"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mobility</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="How do they get around?" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="independent">
                              Walks independently
                            </SelectItem>
                            <SelectItem value="cane">
                              Uses cane or walker
                            </SelectItem>
                            <SelectItem value="wheelchair">
                              Uses wheelchair
                            </SelectItem>
                            <SelectItem value="bedbound">
                              Mostly bedbound
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="memoryIssues"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-3">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Has memory issues or confusion
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="needsHelpEating"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-3">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Needs help eating or preparing meals
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="needsHelpBathing"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-3">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Needs help bathing or dressing
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Main Challenges */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-emerald-100">
              <FormField
                control={form.control}
                name="mainChallenges"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      What’s the hardest part of caregiving right now?
                    </