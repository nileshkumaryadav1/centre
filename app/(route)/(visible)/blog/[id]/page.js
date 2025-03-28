// Fetch single blog
async function getBlog(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs/${id}`
  );
  return res.json();
}

// Format date function
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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 flex justify-center items-center p-6">
      <div className="max-w-3xl w-full bg-white shadow-2xl rounded-xl p-8">
        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-6 text-center">
          {blog.title}
        </h1>

        <img
          src={blog.imageUrl}
          alt={blog.title}
          className="w-full mb-6 rounded-lg shadow-lg"
        />

        <p className="text-gray-800 text-lg leading-relaxed border-l-4 border-blue-500 pl-4 italic">
          {blog.content}
        </p>

        <div className="mt-8 border-t pt-4 flex justify-between text-gray-600 text-sm">
          <p className="font-semibold">
            ✍️ By <span className="text-blue-600">{blog.author}</span>
          </p>
          <p>{formatDate(blog.createdAt)}</p>
        </div>
      </div>
    </div>
  );
}
