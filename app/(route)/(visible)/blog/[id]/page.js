// Fetch single blog
async function getBlog(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs/${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) throw new Error("Failed to fetch blog");
  return res.json();
}

// Format date
function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPage({ params }) {
  const blog = await getBlog(params.id);

  return (
    <article className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <header className="relative">
        <div className="max-w-5xl mx-auto px-4 pt-20 pb-12">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight mb-4">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <span>
              ✍️ By{" "}
              <span className="font-semibold text-blue-600">
                {blog.author}
              </span>
            </span>
            <span>•</span>
            <time>{formatDate(blog.createdAt)}</time>
          </div>
        </div>

        {/* Cover Image */}
        {blog.imageUrl && (
          <div className="max-w-5xl mx-auto px-4">
            <img
              src={blog.imageUrl}
              alt={blog.title}
              className="w-full max-h-[420px] object-cover rounded-2xl shadow-xl"
            />
          </div>
        )}
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-4 py-14">
        <div
          className="
            prose prose-lg md:prose-xl 
            prose-headings:font-bold
            prose-headings:text-gray-900
            prose-p:text-gray-700
            prose-a:text-blue-600
            prose-a:no-underline hover:prose-a:underline
            prose-blockquote:border-l-blue-500
            prose-blockquote:text-gray-700
            max-w-none
          "
        >
          {/* If content is plain text */}
          <p>{blog.content}</p>

          {/* 
            If later you support rich HTML / markdown,
            you can replace above with:
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          */}
        </div>

        {/* Footer Meta */}
        <div className="mt-14 pt-6 border-t flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 text-sm text-gray-500">
          <p>
            Written by{" "}
            <span className="font-semibold text-gray-800">
              {blog.author}
            </span>
          </p>
          <p>Published on {formatDate(blog.createdAt)}</p>
        </div>
      </main>
    </article>
  );
}
