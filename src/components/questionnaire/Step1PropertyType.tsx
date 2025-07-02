import React from 'react'
import { motion } from 'framer-motion'
import { Building, Home, MapPin, Briefcase } from 'lucide-react'
import { useQuestionnaireStore } from '../../store/questionnaireStore'

const Step1PropertyType: React.FC = () => {
  const { data, updateData, nextStep } = useQuestionnaireStore()

  const propertyTypes = [
    {
      id: 'residential',
      title: 'Residential Property',
      description: 'Houses, condos, townhomes, apartments',
      icon: Home,
      color: 'bg-blue-500'
    },
    {
      id: 'commercial',
      title: 'Commercial Real Estate',
      description: 'Office buildings, retail spaces, warehouses',
      icon: Building,
      color: 'bg-green-500'
    },
    {
      id: 'land',
      title: 'Land',
      description: 'Vacant land, developed lots, agricultural land',
      icon: MapPin,
      color: 'bg-yellow-500'
    },
    {
      id: 'business',
      title: 'Business',
      description: 'Operating businesses, franchises, partnerships',
      icon: Briefcase,
      color: 'bg-purple-500'
    }
  ]

  const handleSelect = (type: string) => {
    updateData({ propertyType: type as any })
    setTimeout(() => nextStep(), 300)
  }

  return (
    <div className="card">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          What type of property or asset are you looking to sell?
        </h2>
        <p className="text-gray-600">
          Select the option that best describes what you're selling
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {propertyTypes.map((type, index) => (
          <motion.button
            key={type.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={() => handleSelect(type.id)}
            className={`p-6 rounded-xl border-2 transition-all duration-200 text-left hover:shadow-lg ${
              data.propertyType === type.id
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-primary-300'
            }`}
          >
            <div className="flex items-start space-x-4">
              <div className={`w-12 h-12 ${type.color} rounded-lg flex items-center justify-center`}>
                <type.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {type.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {type.description}
                </p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  )
}

export default Step1PropertyType
