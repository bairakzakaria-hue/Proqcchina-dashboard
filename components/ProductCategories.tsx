export default function ProductCategories() {
  const categories = [
    'Construction',
    'Production lines',
    'Spare parts',
    'Raw materials',
    'FMCG',
    'Household products',
    'Furniture',
    'Chemicals',
    'Consumer goods',
    'Automotive',
    'Oil & gas equipment',
    'Sports',
    'Electronics',
    'Renewables',
    'Packaging',
    'Toys',
    'Textile',
    'Medical equipment',
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-12">
          Product categories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-gray-50 p-4 rounded-lg text-center hover:bg-blue-50 hover:text-blue-600 transition cursor-pointer"
            >
              <span className="font-medium">{category}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

