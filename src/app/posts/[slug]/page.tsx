import Link from "next/link";
import { notFound } from "next/navigation";

const posts = {
  "hello-world": {
    title: "Hello World",
    content: "This is the first post. It was pre-rendered to a real static HTML file at build time.",
  },
  "static-sites-are-great": {
    title: "Static Sites Are Great",
    content: "No server needed, fast to serve, easy to deploy to GitHub Pages.",
  },
};

type Slug = keyof typeof posts;

export function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts[slug as Slug];

  if (!post) {
    notFound();
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col gap-6 px-6 py-16">
      <Link href="/" className="text-sm text-blue-600 hover:underline dark:text-blue-400">
        &larr; Back home
      </Link>
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
        {post.title}
      </h1>
      <p className="text-gray-600 dark:text-gray-300">{post.content}</p>
    </main>
  );
}
