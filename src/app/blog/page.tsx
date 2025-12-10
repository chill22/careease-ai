import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Clock, Heart } from "lucide-react";

export default function Blog() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-indigo-900">Caregiver Stories & Tips</h1>
          <p className="mt-4 text-xl text-indigo-700">Real advice from caregivers who’ve been exactly where you are</p>
          <p className="mt-6 text-gray-600">Coming soon — sign up for updates!</p>
        </div>

        {/* Featured AdSense rectangle */}
        <div className="my-12 bg-gray-200 border-2 border-dashed border-gray-400 text-center py-20 text-gray-600 font-medium text-lg">
          [AdSense – Large Rectangle 336×280 – Blog Hero]
        </div>

        <div className="text-center">
          <Button asChild size="lg" className="text-lg">
            <Link href="/intake">← Get Your Free Care Plan First</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}