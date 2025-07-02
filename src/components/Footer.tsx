import React from 'react'
import { Shield, Lock, Award } from 'lucide-react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">AFairOffer.com</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              We Buy All Types of Commercial, Residential Real Estate, Land & even Businesses. 
              Get your Fair Offer today with our streamlined process.
            </p>
          </div>
          
          <div>
            <h4 className="text-md font-semibold mb-4">Trust & Security</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-green-400" />
                <span className="text-sm text-gray-300">SSL Encrypted</span>
              </div>
              <div className="flex items-center space-x-2">
                <Lock className="w-4 h-4 text-green-400" />
                <span className="text-sm text-gray-300">Privacy Protected</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4 text-green-400" />
                <span className="text-sm text-gray-300">Licensed & Bonded</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-md font-semibold mb-4">Contact Info</h4>
            <div className="space-y-2 text-sm text-gray-300">
              <p>Phone: (555) FAIR-OFFER</p>
              <p>Email: info@afairoffer.com</p>
              <p>Available 24/7 for consultations</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-400">
            © 2024 AFairOffer™ Trust. All Rights Reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
