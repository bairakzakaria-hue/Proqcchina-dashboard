export default function PersonalSpace() {
  const features = [
    'Track your bookings',
    'Get notified when your reports are ready',
    'Receive your inspection and audit reports',
    'Directly download all your deliveries on your devices',
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Your personal space
            </h2>
            <ul className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <svg className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-lg text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
            >
              Contact us
            </a>
          </div>
          <div className="bg-gray-100 rounded-lg p-8 min-h-[400px] flex items-center justify-center">
            <div className="text-center text-gray-400">
              <svg className="h-24 w-24 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p>Dashboard Preview</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

