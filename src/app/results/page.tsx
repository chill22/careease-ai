"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import ReactMarkdown from "react-markdown"; // We'll add this next
import remarkGfm from "remark-gfm";

export default function Results() {
  const [plan, setPlan] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const intakeData = JSON.parse(localStorage.getItem("careease-intake") || "{}");
    if (!intakeData.lovedOneName) {
      router.push("/intake");
      return;
    }

    async function generatePlan() {
      const res = await fetch("/api/generate-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ intakeData }),
      });
      const data = await res.json();
      setPlan(data.plan);
      setIsLoading(false);
    }

    generatePlan();
  }, [router]);

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {isLoading ? (
          <div className="text-center py-20">
            <Loader2 className="h-12 w-12 animate-spin mx-auto text-indigo-600" />
            <p className="mt-6 text-xl text-indigo-700">Creating your personalized plan... just a moment ❤️</p>
          </div>
        ) : (
          <>
            <Button variant="ghost" className="mb-8" onClick={() => router.push("/intake")}>
              <ArrowLeft className="mr-2 h-5 w-5" /> Back to edit
            </Button>

            <Card className="p-8 bg-white rounded-2xl shadow-lg border border-indigo-100 prose prose-indigo max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{plan}</ReactMarkdown>
            </Card>

            {/* AdSense Placeholder in Results */}
            <div className="mt-12 bg-gray-200 border-2 border-dashed border-gray-400 text-center py-20 text-gray-600 font-medium text-lg">
              [AdSense – Rectangle 300×250 – Right after the plan]
            </div>

            <div className="mt-12 text-center">
              <Button asChild size="lg" className="text-lg px-10 py-6 bg-indigo-600 hover:bg-indigo-700">
                <a href="/intake">Make another plan for free</a>
              </Button>
              <p className="mt-4 text-sm text-gray-600">Share this with family? Coming soon!</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}