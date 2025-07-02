import React from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { ArrowLeft, ArrowRight, Clock, Zap, Calendar, Hourglass, Infinity } from 'lucide-react'
import { useQuestionnaireStore } from '../../store/questionnaireStore'

interface FormData {
  desiredTimeline: 'asap' | '30days' | '60days' | '90days' | 'flexible'
}

const Step6Timeline: React.FC = () => {
  const { data, updateData, nextStep, prevStep } = useQuestionnaireStore()
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      desiredTimeline: data.desiredTimeline
    }
  })

  const watchedTimeline = watch('desiredTimeline')

  const onSubmit = (formData: FormData) => {
    updateData(formData)
    nextStep()
  }

  const timelineOptions = [
    {
      value: 'asap',
      title: 'ASAP',
      description: 'I need to sell immediately',
      subtitle: 'Within 1-2 weeks',
      icon: Zap,
      color: 'bg-red-500',
      borderColor: 'border-red-500',
      bgColor: 'bg-red-50'
    },
    {
      value: '30days',
      title: '30 Days',
      description: 'I can wait up to a month',
      subtitle: 'Within 30 days',
      icon: Clock,
      color: 'bg-orange-500',
      borderColor: 'border-orange-500',
      bgColor: 'bg-orange-50'
    },
    {
      value: '60days',
      title: '60 Days',
      description: 'I have some flexibility',
      subtitle: 'Within 60 days',
      icon: Calendar,
      color: 'bg-yellow-500',
      borderColor: 'border-yellow-500',
      bgColor: 'bg-yellow-50'
    },
    {
      value: '90days',
      title: '90 Days',
      description: 'I can wait for the right offer',
      subtitle: 'Within 90 days',
      icon: Hourglass,
      color: 'bg-blue-500',
      borderColor: 'border-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      value: 'flexible',
      title: 'Flexible',
      description: 'No rush, exploring options',
      subtitle: 'No specific timeline',
      icon: Infinity,
      color: 'bg-green-500',
      borderColor: 'border-green-500',
      bgColor: 'bg-green-50'
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          What's Your Timeline?
        </h2>
        <p className="text-gray-600">
          Understanding your timeline helps us structure the best offer and closing process
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">
            When would you like to close? *
          </label>
          
          <div className="space-y-4">
            {timelineOptions.map((option, index) => (
              <motion.label
                key={option.value}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`cursor-pointer block p-6 rounded-xl border-2 transition-all ${
                  watchedTimeline === option.value
                    ? `${option.borderColor} ${option.bgColor}`
                    : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
                }`}
              >
                <input
                  {...register('desiredTimeline', { required: 'Please select a timeline' })}
                  type="radio"
                  value={option.value}
                  className="sr-only"
                />
                
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 ${option.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <option.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {option.title}
                      </h3>
                      <span className="text-sm font-medium text-gray-500">
                        {option.subtitle}
                      </span>
                    </div>
                    <p className="text-gray-600">
                      {option.description}
                    </p>
                  </div>
                </div>
              </motion.label>
            ))}
          </div>
          
          {errors.desiredTimeline && (
            <p className="mt-2 text-sm text-red-600">{errors.desiredTimeline.message}</p>
          )}
        </div>

        {/* Timeline Benefits */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-blue-900 mb-2">
            Why Timeline Matters
          </h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Faster timelines may qualify for quick-close bonuses</li>
            <li>• Flexible timelines allow for optimal market positioning</li>
            <li>• We can accommodate most timeline preferences</li>
          </ul>
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

export default Step6Timeline
