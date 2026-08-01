import Link from "next/link";

const posts = [
  { slug: "hello-world", title: "Hello World" },
  { slug: "static-sites-are-great", title: "Static Sites Are Great" },
];

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col gap-6 px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
        Polympiads Next.js Site
      </h1>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Posts</h2>
        <ul className="flex flex-col gap-2">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/posts/${post.slug}`}
                className="text-blue-600 hover:underline dark:text-blue-400"
              >
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
