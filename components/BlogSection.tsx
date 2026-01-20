export default function BlogSection() {
  const articles = [
    {
      title: 'Quality control checklist for China manufacturing',
      excerpt: 'Practical steps importers can use to keep every batch on-spec before shipment...',
      link: '#',
    },
    {
      title: 'Preventing defects: how ProQCChina supports production runs',
      excerpt: 'See how layered inspections and supplier monitoring cut rework and delays...',
      link: '#',
    },
    {
      title: 'Inspection and audit timelines for importers',
      excerpt: 'What to expect at each stage—from factory audit to CLS—when buying from China...',
      link: '#',
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Latest articles
          </h2>
          <a href="#blog" className="text-blue-600 hover:text-blue-700 font-semibold">
            See all articles →
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <article key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
              <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4">{article.excerpt}</p>
                <a
                  href={article.link}
                  className="text-blue-600 hover:text-blue-700 font-semibold"
                >
                  read more →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

