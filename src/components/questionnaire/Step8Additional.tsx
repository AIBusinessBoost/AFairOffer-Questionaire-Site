import React from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Send, MessageSquare, CheckCircle } from 'lucide-react'
import { useQuestionnaireStore } from '../../store/questionnaireStore'
import toast from 'react-hot-toast'

interface FormData {
  additionalInfo: string
}

const Step8Additional: React.FC = () => {
  const navigate = useNavigate()
  const { data, updateData, prevStep } = useQuestionnaireStore()
  
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      additionalInfo: data.additionalInfo
    }
  })

  const onSubmit = async (formData: FormData) => {
    updateData(formData)
    
    // Simulate API submission
    toast.loading('Processing your information...', { id: 'submit' })
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Store submission data (in real app, this would be sent to backend)
      const submissionData = { ...data, ...formData }
      localStorage.setItem('questionnaireSubmission', JSON.stringify(submissionData))
      
      toast.success('Information submitted successfully!', { id: 'submit' })
      
      // Navigate to results page
      setTimeout(() => {
        navigate('/results')
      }, 1000)
      
    } catch (error) {
      toast.error('Something went wrong. Please try again.', { id: 'submit' })
    }
  }

  const benefits = [
    'Receive your personalized offer within 24 hours',
    'No obligation to accept our offer',
    'Free property evaluation and market analysis',
    'Direct contact with our acquisition team',
    'Flexible closing timeline to meet your needs'
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Almost Done!
        </h2>
        <p className="text-gray-600">
          Any additional information that might help us provide the best offer?
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Additional Information */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Additional Information (Optional)
          </label>
          <div className="relative">
            <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <textarea
              {...register('additionalInfo')}
              rows={4}
              className="input-field pl-10 resize-none"
              placeholder="Tell us about any unique features, recent improvements, special circumstances, or anything else that might affect the value of your property..."
            />
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Examples: Recent renovations, unique architectural features, zoning information, 
            tenant details, or any challenges we should be aware of.
          </p>
        </div>

        {/* What Happens Next */}
        <div className="bg-gradient-to-r from-primary-50 to-blue-50 border border-primary-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <CheckCircle className="w-5 h-5 text-primary-600 mr-2" />
            What Happens Next?
          </h3>
          <ul className="space-y-2">
            {benefits.map((benefit, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start space-x-2 text-sm text-gray-700"
              >
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>{benefit}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Terms Agreement */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-600">
            By submitting this form, you agree to receive communications from AFairOffer.com 
            regarding your property evaluation. You can opt out at any time. 
            Your information is secure and will never be shared with third parties.
          </p>
        </div>

        <div className="flex justify-between pt-6">
          <button
            type="button"
            onClick={prevStep}
            className="btn-secondary flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </button>
          
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-primary flex items-center text-lg px-8 py-4"
          >
            Submit & Get My Offer
            <Send className="w-5 h-5 ml-2" />
          </motion.button>
        </div>
      </form>
    </motion.div>
  )
}

export default Step8Additional
