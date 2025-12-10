import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Clock, MapPin, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="text-center py-16 sm:py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-indigo-900 leading-tight">
            You don’t have to care alone.
          </h1>
          <p className="mt-6 text-xl sm:text-2xl text-indigo-700 font-medium">
            CareEase AI instantly creates a free, personalized care plan for your loved one — in under 60 seconds.
          </p>
          <div className="mt-10">
            <Button asChild size="lg" className="text-lg px-10 py-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg">
              <Link href="/intake">
                <Sparkles className="mr-2 h-6 w-6" />
                Start Your Free Care Plan
              </Link>
            </Button>
          </div>
          <p className="mt-6 text-sm text-gray-600">
            100% free • No login • Takes less than a minute
          </p>
        </div>
      </section>

      {/* Trust & Features */}
      <section className="py-16 bg-white/60">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-8 text-center border-indigo-200 bg-indigo-50/50">
            <Clock className="h-12 w-12 mx-auto text-indigo-600 mb-4" />
            <h3 className="text-xl font-semibold text-indigo-900">Daily Schedule</h3>
            <p className="mt-3 text-gray-700">Custom morning-to-bedtime routine built around your loved one’s needs.</p>
          </Card>

          <Card className="p-8 text-center border-teal-200 bg-teal-50/50">
            <MapPin className="h-12 w-12 mx-auto text-teal-600 mb-4" />
            <h3 className="text-xl font-semibold text-teal-900">Local Resources</h3>
            <p className="mt-3 text-gray-700">Meals on wheels, respite care, support groups — right in your zip code.</p>
          </Card>

          <Card className="p-8 text-center border-emerald-200 bg-emerald-50/50">
            <Heart className="h-12 w-12 mx-auto text-emerald-600 mb-4" />
            <h3 className="text-xl font-semibold text-emerald-900">Emotional Support</h3>
            <p className="mt-3 text-gray-700">Gentle tips and encouragement written by caregivers, for caregivers.</p>
          </Card>
        </div>
      </section>

      {/* Final gentle nudge */}
      <section className="py-20 text-center bg-gradient-to-r from-indigo-100 to-teal-100">
        <p className="text-2xl font-medium text-indigo-900">
          Over 53 million Americans are family caregivers.<br />
          You are not alone — and help is one click away.
        </p>
        <Button asChild size="lg" className="mt-8 text-lg px-10 py-6 bg-indigo-600 hover:bg-indigo-700">
          <Link href="/intake">
            Yes, I’m ready for my free plan →
          </Link>
        </Button>
      </section>
    </>
  );
}