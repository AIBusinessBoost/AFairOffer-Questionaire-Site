import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  DollarSign, 
  TrendingUp, 
  Calendar, 
  MapPin, 
  Home, 
  Phone, 
  Mail,
  CheckCircle,
  Clock,
  Award,
  ArrowRight
} from 'lucide-react'

interface SubmissionData {
  propertyType: string
  address: string
  city: string
  state: string
  condition: string
  currentValue: string
  desiredTimeline: string
  firstName: string
  lastName: string
  email: string
  phone: string
}

const ResultsPage: React.FC = () => {
  const [submissionData, setSubmissionData] = useState<SubmissionData | null>(null)
  const [estimatedOffer, setEstimatedOffer] = useState<number>(0)

  useEffect(() => {
    // Get submission data from localStorage
    const data = localStorage.getItem('questionnaireSubmission')
    if (data) {
      const parsedData = JSON.parse(data)
      setSubmissionData(parsedData)
      
      // Calculate estimated offer based on current value
      const calculateOffer = (valueRange: string) => {
        const ranges: { [key: string]: number } = {
          'Under $100,000': 75000,
          '$100,000 - $250,000': 175000,
          '$250,000 - $500,000': 375000,
          '$500,000 - $750,000': 625000,
          '$750,000 - $1,000,000': 875000,
          '$1,000,000 - $2,000,000': 1500000,
          'Over $2,000,000': 2500000
        }
        
        const baseValue = ranges[valueRange] || 200000
        // Apply condition-based multiplier
        const conditionMultipliers: { [key: string]: number } = {
          'excellent': 0.95,
          'good': 0.90,
          'fair': 0.85,
          'poor': 0.75
        }
        
        const multiplier = conditionMultipliers[parsedData.condition] || 0.85
        return Math.round(baseValue * multiplier)
      }
      
      setEstimatedOffer(calculateOffer(parsedData.currentValue))
    }
  }, [])

  if (!submissionData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No submission found</h2>
          <Link to="/questionnaire" className="btn-primary">
            Start Questionnaire
          </Link>
        </div>
      </div>
    )
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getTimelineText = (timeline: string) => {
    const timelineMap: { [key: string]: string } = {
      'asap': 'Within 1-2 weeks',
      '30days': 'Within 30 days',
      '60days': 'Within 60 days',
      '90days': 'Within 90 days',
      'flexible': 'Flexible timeline'
    }
    return timelineMap[timeline] || timeline
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Congratulations, {submissionData.firstName}!
          </h1>
          <p className="text-xl text-gray-600">
            Your property evaluation is complete
          </p>
        </motion.div>

        {/* Main Offer Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-primary-600 to-primary-800 text-white rounded-2xl p-8 mb-8 shadow-xl"
        >
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-2">Your Estimated Fair Offer</h2>
            <div className="text-5xl font-bold mb-4">
              {formatCurrency(estimatedOffer)}
            </div>
            <p className="text-blue-100 text-lg">
              Based on your property details and current market conditions
            </p>
          </div>
        </motion.div>

        {/* Property Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card mb-8"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Property Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium">{submissionData.address}, {submissionData.city}, {submissionData.state}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Home className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Property Type</p>
                  <p className="font-medium capitalize">{submissionData.propertyType}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Condition</p>
                  <p className="font-medium capitalize">{submissionData.condition}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Desired Timeline</p>
                  <p className="font-medium">{getTimelineText(submissionData.desiredTimeline)}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card mb-8"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-6">What Happens Next?</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-primary-600 font-semibold">1</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Property Review</h4>
                <p className="text-gray-600">Our team will review your submission and may contact you for additional details.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-primary-600 font-semibold">2</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Market Analysis</h4>
                <p className="text-gray-600">We'll conduct a comprehensive market analysis to refine your offer.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-primary-600 font-semibold">3</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Final Offer</h4>
                <p className="text-gray-600">You'll receive your final, no-obligation offer within 24 hours.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        >
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <span>{submissionData.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <span>{submissionData.phone}</span>
              </div>
            </div>
          </div>
          
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Questions?</h3>
            <p className="text-gray-600 mb-4">
              Our team is here to help with any questions about your offer or the process.
            </p>
            <div className="space-y-2">
              <a href="tel:+1-555-FAIR-OFFER" className="flex items-center space-x-2 text-primary-600 hover:text-primary-700">
                <Phone className="w-4 h-4" />
                <span>(555) FAIR-OFFER</span>
              </a>
              <a href="mailto:info@afairoffer.com" className="flex items-center space-x-2 text-primary-600 hover:text-primary-700">
                <Mail className="w-4 h-4" />
                <span>info@afairoffer.com</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-6 mb-8"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Award className="w-5 h-5 text-green-600 mr-2" />
            Why Choose AFairOffer.com?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <Clock className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h4 className="font-semibold text-gray-900">Fast Process</h4>
              <p className="text-sm text-gray-600">Close in as little as 7 days</p>
            </div>
            <div className="text-center">
              <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h4 className="font-semibold text-gray-900">Fair Offers</h4>
              <p className="text-sm text-gray-600">Market-based valuations</p>
            </div>
            <div className="text-center">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h4 className="font-semibold text-gray-900">No Obligations</h4>
              <p className="text-sm text-gray-600">Free evaluation, no pressure</p>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center"
        >
          <Link 
            to="/thank-you"
            className="inline-flex items-center btn-primary text-lg px-8 py-4"
          >
            Continue
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default ResultsPage
