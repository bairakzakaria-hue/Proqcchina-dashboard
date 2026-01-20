export default function WhyInspaction() {
  const stats = [
    {
      value: '20',
      label: 'years of combined QC excellence',
    },
    {
      value: 'Leading',
      label: 'QC experts in China',
    },
    {
      value: 'Wholistic',
      label: 'knowledge of the Chinese business and legal ecosystems',
    },
    {
      value: 'Sharp',
      label: 'industry based expertise',
    },
    {
      value: 'Continuous',
      label: 'improvement',
    },
  ]

  return (
    <section className="py-20 bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          Why ProQCChina?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-5xl font-bold mb-4">{stat.value}</div>
              <div className="text-lg">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

