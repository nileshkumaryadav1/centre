export default function AboutUs() {
  return (
    <section className="relative md:min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 flex items-center">
      <div className="max-w-6xl mx-auto w-full px-4 md:px-10 py-24">
        {/* Header */}
        <div className="space-y-2 mb-16 flex flex-col items-center">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            About{" "}
            <span className="text-blue-600 dark:text-blue-500">Centre</span>
          </h2>
          <p className="text-base md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Built by students, for students — beyond academics.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left – Text Flow */}
          <div className="space-y-10">
            <div className="space-y-3">
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white">
                Who We Are
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We are a student-led organization formed by motivated
                engineering students with a shared goal of creating
                opportunities beyond classrooms. From technical fests and events
                to clubs, seminars, and competitions, we focus on real-world
                learning and meaningful collaboration.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white">
                Our Vision
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                To build a strong and inclusive student community that
                encourages curiosity, creativity, teamwork, and personal growth
                — preparing students for challenges beyond college life.
              </p>
            </div>
          </div>

          {/* Right – Values */}
          <div className="relative bg-white/70 dark:bg-gray-900/60 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
            <h3 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Our Core Values
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {["Collaboration", "Consistency", "Growth", "Integrity"].map(
                (value) => (
                  <div
                    key={value}
                    className="group rounded-xl px-4 py-3 text-sm md:text-base font-medium
                               text-gray-800 dark:text-gray-200
                               bg-gray-100 dark:bg-gray-800
                               transition-all duration-200
                               hover:bg-blue-50 dark:hover:bg-gray-700
                               hover:scale-[1.02]"
                  >
                    {value}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
