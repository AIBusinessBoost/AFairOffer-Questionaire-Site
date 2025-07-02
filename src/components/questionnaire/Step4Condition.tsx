import React from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { ArrowLeft, ArrowRight, Star } from 'lucide-react'
import { useQuestionnaireStore } from '../../store/questionnaireStore'

interface FormData {
  condition: 'excellent' | 'good' | 'fair' | 'poor'
  recentUpdates: string[]
  specialFeatures: string[]
}

const Step4Condition: React.FC = () => {
  const { data, updateData, nextStep, prevStep } = useQuestionnaireStore()
  
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      condition: data.condition,
      recentUpdates: data.recentUpdates,
      specialFeatures: data.specialFeatures
    }
  })

  const watchedCondition = watch('condition')
  const watchedUpdates = watch('recentUpdates') || []
  const watchedFeatures = watch('specialFeatures') || []

  const onSubmit = (formData: FormData) => {
    updateData(formData)
    nextStep()
  }

  const conditions = [
    {
      value: 'excellent',
      title: 'Excellent',
      description: 'Move-in ready, recently updated',
      stars: 5,
      color: 'text-green-600'
    },
    {
      value: 'good',
      title: 'Good',
      description: 'Well-maintained, minor updates needed',
      stars: 4,
      color: 'text-blue-600'
    },
    {
      value: 'fair',
      title: 'Fair',
      description: 'Some updates needed, livable condition',
      stars: 3,
      color: 'text-yellow-600'
    },
    {
      value: 'poor',
      title: 'Poor',
      description: 'Significant repairs needed',
      stars: 2,
      color: 'text-red-600'
    }
  ]

  const updateOptions = [
    'New Roof',
    'Updated Kitchen',
    'Renovated Bathrooms',
    'New Flooring',
    'Fresh Paint',
    'New HVAC System',
    'Updated Electrical',
    'New Plumbing',
    'New Windows',
    'Landscaping'
  ]

  const featureOptions = [
    'Swimming Pool',
    'Garage',
    'Fireplace',
    'Deck/Patio',
    'Basement',
    'Attic Storage',
    'Security System',
    'Solar Panels',
    'Smart Home Features',
    'Workshop/Shed'
  ]

  const handleCheckboxChange = (value: string, field: 'recentUpdates' | 'specialFeatures') => {
    const currentValues = field === 'recentUpdates' ? watchedUpdates : watchedFeatures
    const newValues = currentValues.includes(value)
      ? currentValues.filter(item => item !== value)
      : [...currentValues, value]
    
    setValue(field, newValues)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Property Condition & Features
        </h2>
        <p className="text-gray-600">
          Help us understand the current state and features of your property
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Condition Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Overall Condition *
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {conditions.map((condition) => (
              <motion.label
                key={condition.value}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`cursor-pointer p-4 rounded-lg border-2 transition-all ${
                  watchedCondition === condition.value
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-primary-300'
                }`}
              >
                <input
                  {...register('condition', { required: 'Please select a condition' })}
                  type="radio"
                  value={condition.value}
                  className="sr-only"
                />
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{condition.title}</h3>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < condition.stars
                            ? `${condition.color} fill-current`
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-600">{condition.description}</p>
              </motion.label>
            ))}
          </div>
          {errors.condition && (
            <p className="mt-2 text-sm text-red-600">{errors.condition.message}</p>
          )}
        </div>

        {/* Recent Updates */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Recent Updates (Select all that apply)
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {updateOptions.map((update) => (
              <label
                key={update}
                className={`cursor-pointer p-3 rounded-lg border transition-all text-sm ${
                  watchedUpdates.includes(update)
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-200 hover:border-primary-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={watchedUpdates.includes(update)}
                  onChange={() => handleCheckboxChange(update, 'recentUpdates')}
                  className="sr-only"
                />
                {update}
              </label>
            ))}
          </div>
        </div>

        {/* Special Features */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Special Features (Select all that apply)
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {featureOptions.map((feature) => (
              <label
                key={feature}
                className={`cursor-pointer p-3 rounded-lg border transition-all text-sm ${
                  watchedFeatures.includes(feature)
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-200 hover:border-primary-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={watchedFeatures.includes(feature)}
                  onChange={() => handleCheckboxChange(feature, 'specialFeatures')}
                  className="sr-only"
                />
                {feature}
              </label>
            ))}
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

export default Step4Condition
