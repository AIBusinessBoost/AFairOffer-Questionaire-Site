import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, Phone, Mail } from 'lucide-react'

const Header: React.FC = () => {
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <Home className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">AFairOffer.com</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors ${
                isHomePage ? 'text-primary-600' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Home
            </Link>
            <a 
              href="tel:+1-555-FAIR-OFFER" 
              className="flex items-center space-x-1 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>(555) FAIR-OFFER</span>
            </a>
            <a 
              href="mailto:info@afairoffer.com" 
              className="flex items-center space-x-1 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>Contact</span>
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
