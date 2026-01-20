interface StatCardProps {
  title: string
  value: string
  icon: React.ReactNode
  onClick?: () => void
}

export default function StatCard({ title, value, icon, onClick }: StatCardProps) {
  return (
    <div 
      onClick={onClick}
      className={`bg-white p-8 rounded-2xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 hover:border-blue-300 group relative overflow-hidden ${onClick ? 'cursor-pointer' : ''}`}
    >
      {/* Animated background on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-blue-100/0 group-hover:from-blue-50 group-hover:to-blue-100 transition-all duration-500"></div>
      
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-3 group-hover:text-gray-700 transition-colors">
            {title}
          </p>
          <p className="text-4xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
            {value}
          </p>
        </div>
        <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl flex items-center justify-center text-blue-600 group-hover:from-blue-100 group-hover:to-blue-200 group-hover:scale-110 transition-all duration-300 shadow-md group-hover:shadow-xl">
          <div className="transform group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
        </div>
      </div>
      
      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  )
}
