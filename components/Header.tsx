'use client'

import Logo from './Logo'

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <Logo size="sm" />
        <span className="text-2xl font-bold text-blue-600">ProQCChina</span>
      </div>

      {/* Search Bar */}
      <div className="flex-1 max-w-2xl mx-8">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search booking, invoices..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center space-x-4">
        <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
          Booking Guidance
        </button>
        
        <button className="relative p-2 text-gray-600 hover:text-gray-900">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-1 right-1 block h-2 w-2 bg-red-500 rounded-full"></span>
        </button>

        {/* TODO: Replace with actual user data from AuthContext */}
        <div className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg">
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          <div className="text-left">
            <div className="font-semibold text-sm text-gray-400">User</div>
            <div className="text-xs text-gray-400">Not configured</div>
          </div>
          <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </header>
  )
}

