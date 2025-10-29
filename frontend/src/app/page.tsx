import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
              Task<span className="text-indigo-600">Flow</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Organize your tasks efficiently with our modern task management platform.
              Stay productive, track progress, and achieve your goals.
            </p>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="text-3xl mb-4">📋</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Task Management</h3>
                <p className="text-gray-600">Create, organize, and track your tasks with ease</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="text-3xl mb-4">🎯</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Priority System</h3>
                <p className="text-gray-600">Set priorities and categories for better organization</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="text-3xl mb-4">📊</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Progress Tracking</h3>
                <p className="text-gray-600">Monitor your productivity with detailed statistics</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
              <Link
                href="/register"
                className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors shadow-lg"
              >
                Get Started Free
                <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors shadow-lg"
              >
                Sign In
              </Link>
            </div>

            {/* Demo Link */}
            <div className="mt-8">
              <Link
                href="/dashboard"
                className="text-indigo-600 hover:text-indigo-800 text-sm font-medium underline"
              >
                👀 View Live Demo
              </Link>
            </div>
          </div>
        </div>

        {/* Background Pattern */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <svg className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]" aria-hidden="true">
            <defs>
              <pattern id="e813992c-7d03-4cc4-a2bd-151760b470a0" width={200} height={200} x="50%" y={-1} patternUnits="userSpaceOnUse">
                <path d="M100 200V.5M.5 .5H200" fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" strokeWidth={0} fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" />
          </svg>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-500 text-sm">
            <p>&copy; 2024 TaskFlow. Built with Next.js and Tailwind CSS.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
