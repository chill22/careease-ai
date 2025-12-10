import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const posts = {
  "signs-of-caregiver-burnout": "src/posts/signs-of-caregiver-burnout.mdx",
  "free-respite-care": "src/posts/free-respite-care.mdx",
  "dementia-night-wandering": "src/posts/dementia-night-wandering.mdx",
};

export default async function Post({ params }: { params: { slug: string } }) {
  const postModule = posts[params.slug as keyof typeof posts];
  if (!postModule) notFound();

  const { default: Content } = await import(`../../../${postModule}`);

  return (
    <article className="max-w-3xl mx-auto py-12 px-4">
      <Button variant="ghost" className="mb-8" href="/blog">← All articles</Button>
      <div className="prose prose-indigo max-w-none">
        <Content />
      </div>

      <div className="my-12 bg-gray-200 border-2 border-dashed border-gray-400 text-center py-20 text-lg">
        [AdSense – Rectangle inside article]
      </div>
    </article>
  );
}