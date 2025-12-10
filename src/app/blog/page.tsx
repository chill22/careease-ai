import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Clock, Heart } from "lucide-react";

const posts = [
  { slug: "signs-of-caregiver-burnout", title: "7 Hidden Signs of Caregiver Burnout (and What to Do Tonight)", date: "Dec 9, 2025", readTime: "5 min" },
  { slug: "free-respite-care", title: "How to Get Free Respite Care in 2025 – Real Programs That Actually Help", date: "Dec 8, 2025", readTime: "6 min" },
  { slug: "dementia-night-wandering", title: "Mom Keeps Wandering at Night: 9 Gentle Tricks That Worked for 1,200+ Families", date: "Dec 7, 2025", readTime: "7 min" },
];

export default function Blog() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-indigo-900">Caregiver Stories & Tips</h1>
          <p className="mt-4 text-xl text-indigo-700">Real advice from caregivers who’ve been exactly where you are</p>
        </div>

        {/* Featured AdSense rectangle */}
        <div className="my-12 bg-gray-200 border-2 border-dashed border-gray-400 text-center py-20 text-gray-600 font-medium text-lg">
          [AdSense – Large Rectangle 336×280 – Blog Hero]
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card className="h-full hover:shadow-xl transition-shadow cursor-pointer border-indigo-100">
                <div className="p-6">
                  <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <Heart className="h-8 w-8 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-indigo-900 mb-2">{post.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{post.readTime}</span>
                    <span>{post.date}</span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button asChild size="lg">
            <Link href="/">← Back to Free Care Plan Tool</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}