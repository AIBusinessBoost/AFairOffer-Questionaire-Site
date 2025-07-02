import React from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { ArrowLeft, ArrowRight, DollarSign, Info } from 'lucide-react'
import { useQuestionnaireStore } from '../../store/questionnaireStore'

interface FormData {
  currentValue: string
  mortgageBalance: string
  reasonForSelling: string
}

const Step5Financial: React.FC = () => {
  const { data, updateData, nextStep, prevStep } = useQuestionnaireStore()
  
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      currentValue: data.currentValue,
      mortgageBalance: data.mortgageBalance,
      reasonForSelling: data.reasonForSelling
    }
  })

  const onSubmit = (formData: FormData) => {
    updateData(formData)
    nextStep()
  }

  const valueRanges = [
    'Under $100,000',
    '$100,000 - $250,000',
    '$250,000 - $500,000',
    '$500,000 - $750,000',
    '$750,000 - $1,000,000',
    '$1,000,000 - $2,000,000',
    'Over $2,000,000'
  ]

  const mortgageRanges = [
    'No mortgage/Paid off',
    'Under $50,000',
    '$50,000 - $100,000',
    '$100,000 - $250,000',
    '$250,000 - $500,000',
    '$500,000 - $750,000',
    'Over $750,000'
  ]

  const sellingReasons = [
    'Relocating for work',
    'Downsizing',
    'Upgrading to larger home',
    'Financial difficulties',
    'Inherited property',
    'Investment liquidation',
    'Divorce/separation',
    'Retirement',
    'Job loss',
    'Medical reasons',
    'Other'
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Financial Information
        </h2>
        <p className="text-gray-600">
          This information helps us provide the most accurate offer
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Current Value */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Estimated Current Value *
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              {...register('currentValue', { required: 'Please select an estimated value' })}
              className="input-field pl-10"
            >
              <option value="">Select estimated value range</option>
              {valueRanges.map(range => (
                <option key={range} value={range}>{range}</option>
              ))}
            </select>
          </div>
          {errors.currentValue && (
            <p className="mt-1 text-sm text-red-600">{errors.currentValue.message}</p>
          )}
          <div className="mt-2 flex items-start space-x-2">
            <Info className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-gray-600">
              This can be based on recent appraisals, tax assessments, or your best estimate
            </p>
          </div>
        </div>

        {/* Mortgage Balance */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Outstanding Mortgage Balance
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              {...register('mortgageBalance')}
              className="input-field pl-10"
            >
              <option value="">Select mortgage balance range</option>
              {mortgageRanges.map(range => (
                <option key={range} value={range}>{range}</option>
              ))}
            </select>
          </div>
          <div className="mt-2 flex items-start space-x-2">
            <Info className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-gray-600">
              This helps us understand your net equity and structure the best offer
            </p>
          </div>
        </div>

        {/* Reason for Selling */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Primary Reason for Selling *
          </label>
          <select
            {...register('reasonForSelling', { required: 'Please select a reason' })}
            className="input-field"
          >
            <option value="">Select your primary reason</option>
            {sellingReasons.map(reason => (
              <option key={reason} value={reason}>{reason}</option>
            ))}
          </select>
          {errors.reasonForSelling && (
            <p className="mt-1 text-sm text-red-600">{errors.reasonForSelling.message}</p>
          )}
        </div>

        {/* Privacy Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-medium text-blue-900 mb-1">
                Your Information is Secure
              </h4>
              <p className="text-sm text-blue-700">
                All financial information is encrypted and used solely for generating your personalized offer. 
                We never share your data with third parties.
              </p>
            </div>
          </div>
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
          
          <button
            type="submit"
            className="btn-primary flex items-center"
          >
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </form>
    </motion.div>
  )
}

export default Step5Financial
