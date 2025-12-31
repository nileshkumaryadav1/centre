export default function Contact() {
  return (
    <div className="md:min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center md:p-10 p-4">
      <div className="max-w-4xl w-full text-center space-y-10">
        {/* Heading */}
        <div className="space-y-4">
          <h2 className="md:text-4xl text-2xl font-extrabold text-gray-900 dark:text-white">
            📬Contact Us
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            We&apos;d love to connect — reach out through any platform below.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid gap-6">
          {/* Email */}
          <div className="bg-white/70 dark:bg-gray-900/60 backdrop-blur rounded-2xl p-6 md:p-8 shadow text-left">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              📧 Email
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              For collaborations, queries, or participation
            </p>
            <a
              href="mailto:centre@example.com"
              className="inline-block mt-2 text-blue-600 dark:text-blue-400 font-medium hover:underline"
            >
              keccentreorg@gmail.com
            </a>
          </div>

          {/* Social Links */}
          <div className="bg-white/70 dark:bg-gray-900/60 backdrop-blur rounded-2xl p-6 md:p-8 shadow">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              🌐 Social Media
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a
                href="https://www.instagram.com/centreorganization/"
                className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-medium hover:scale-[1.02] transition"
              >
                📸 Instagram
              </a>

              <a
                href="#"
                className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-medium hover:scale-[1.02] transition"
              >
                💼 LinkedIn
              </a>

              <a
                href="https://chat.whatsapp.com/JSrqwbsqGz3BnB7zUNrfOE"
                className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-medium hover:scale-[1.02] transition"
              >
                💬 WhatsApp Group
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
