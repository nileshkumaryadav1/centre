export default function JoinUs() {
  return (
    <div className="md:min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center md:p-10 p-4">
      <div className="max-w-4xl w-full text-center space-y-10">
        {/* Heading */}
        <div className="space-y-4">
          <h2 className="md:text-4xl text-2xl font-extrabold text-gray-900 dark:text-white">
            Join Us
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Be part of a student community that learns, builds, and grows
            together.
          </p>
        </div>

        {/* Who Can Join */}
        <div className="bg-white/70 dark:bg-gray-900/60 backdrop-blur rounded-2xl p-6 md:p-8 shadow text-left">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Who Can Join?
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Any student who is motivated to learn, explore new ideas, and
            contribute to a collaborative environment is welcome. No matter your
            skill level — curiosity and commitment matter most.
          </p>
        </div>

        {/* What You Gain */}
        <div className="bg-white/70 dark:bg-gray-900/60 backdrop-blur rounded-2xl p-6 md:p-8 shadow">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            What You Gain
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            {[
              "Hands-on experience through events, fests, and clubs",
              "Opportunities to lead, organize, and build projects",
              "Exposure to tech, startups, and creative domains",
              "A strong peer network and collaborative culture",
            ].map((item) => (
              <div
                key={item}
                className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
              >
                ✅ {item}
              </div>
            ))}
          </div>
        </div>

        {/* Expectations */}
        <div className="bg-white/70 dark:bg-gray-900/60 backdrop-blur rounded-2xl p-6 md:p-8 shadow text-left">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            What We Expect
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Being part of Centre means showing up with discipline, respect for
            time, and a willingness to learn and collaborate. Even small,
            consistent efforts make a big difference.
          </p>
        </div>

        {/* Call to Action */}
        <div className="bg-white/70 dark:bg-gray-900/60 backdrop-blur rounded-2xl p-6 md:p-8 shadow">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Get Started
          </h3>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a
              href="#"
              className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            >
              🤝 Join the Organization
            </a>

            <a
              href="#"
              className="px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-200 font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              🎯 Join a Club
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
