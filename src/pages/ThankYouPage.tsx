import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { CheckCircle, Home, Phone, Mail, Clock, Star } from 'lucide-react'

const ThankYouPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Thank You!
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your property evaluation has been submitted successfully. 
            Our team will review your information and contact you within 24 hours.
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card mb-8"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            What to Expect Next
          </h2>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Within 2 Hours</h3>
                <p className="text-gray-600">
                  You'll receive a confirmation email with your submission details and next steps.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Within 24 Hours</h3>
                <p className="text-gray-600">
                  Our acquisition specialist will contact you with your personalized offer and answer any questions.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Your Decision</h3>
                <p className="text-gray-600">
                  Take your time to review the offer. There's no pressure or obligation to accept.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        >
          <div className="card">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Need to Reach Us?
            </h3>
            <p className="text-gray-600 mb-4">
              Our team is available to answer any questions about your submission or our process.
            </p>
            <div className="space-y-3">
              <a 
                href="tel:+1-555-FAIR-OFFER" 
                className="flex items-center space-x-3 text-primary-600 hover:text-primary-700 transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span className="font-medium">(555) FAIR-OFFER</span>
              </a>
              <a 
                href="mailto:info@afairoffer.com" 
                className="flex items-center space-x-3 text-primary-600 hover:text-primary-700 transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span className="font-medium">info@afairoffer.com</span>
              </a>
            </div>
          </div>
          
          <div className="card">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Business Hours
            </h3>
            <div className="space-y-2 text-gray-600">
              <p><span className="font-medium">Monday - Friday:</span> 8:00 AM - 8:00 PM</p>
              <p><span className="font-medium">Saturday:</span> 9:00 AM - 6:00 PM</p>
              <p><span className="font-medium">Sunday:</span> 10:00 AM - 4:00 PM</p>
              <p className="text-sm text-green-600 font-medium mt-3">
                Emergency consultations available 24/7
              </p>
            </div>
          </div>
        </motion.div>

        {/* Additional Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card mb-8"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            While You Wait
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Home className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Learn About Our Process</h4>
              <p className="text-sm text-gray-600">
                Understand how we evaluate properties and structure our offers.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Star className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Read Success Stories</h4>
              <p className="text-sm text-gray-600">
                See how we've helped other property owners achieve their goals.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Prepare Documents</h4>
              <p className="text-sm text-gray-600">
                Gather any relevant property documents for a smoother process.
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <p className="text-gray-600 mb-6">
            Have another property to evaluate?
          </p>
          <Link 
            to="/questionnaire"
            className="btn-primary inline-flex items-center"
          >
            Start New Evaluation
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default ThankYouPage
