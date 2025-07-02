import React from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useQuestionnaireStore } from '../../store/questionnaireStore'

interface FormData {
  propertySubtype: string
  squareFootage: string
  lotSize: string
  yearBuilt: string
  bedrooms: string
  bathrooms: string
  businessType: string
  annualRevenue: string
  yearsInOperation: string
  numberOfEmployees: string
}

const Step3PropertyDetails: React.FC = () => {
  const { data, updateData, nextStep, prevStep } = useQuestionnaireStore()
  
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      propertySubtype: data.propertySubtype,
      squareFootage: data.squareFootage,
      lotSize: data.lotSize,
      yearBuilt: data.yearBuilt,
      bedrooms: data.bedrooms,
      bathrooms: data.bathrooms,
      businessType: data.businessType,
      annualRevenue: data.annualRevenue,
      yearsInOperation: data.yearsInOperation,
      numberOfEmployees: data.numberOfEmployees
    }
  })

  const onSubmit = (formData: FormData) => {
    updateData(formData)
    nextStep()
  }

  const getSubtypeOptions = () => {
    switch (data.propertyType) {
      case 'residential':
        return [
          'Single Family Home',
          'Condominium',
          'Townhouse',
          'Duplex/Triplex',
          'Apartment Building',
          'Mobile Home',
          'Other'
        ]
      case 'commercial':
        return [
          'Office Building',
          'Retail Space',
          'Warehouse',
          'Industrial',
          'Restaurant',
          'Hotel/Motel',
          'Mixed Use',
          'Other'
        ]
      case 'land':
        return [
          'Vacant Residential Lot',
          'Commercial Land',
          'Agricultural Land',
          'Industrial Land',
          'Recreational Land',
          'Other'
        ]
      case 'business':
        return [
          'Restaurant',
          'Retail Store',
          'Service Business',
          'Manufacturing',
          'Technology',
          'Healthcare',
          'Franchise',
          'Other'
        ]
      default:
        return []
    }
  }

  const isResidential = data.propertyType === 'residential'
  const isBusiness = data.propertyType === 'business'
  const isLand = data.propertyType === 'land'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Property Details
        </h2>
        <p className="text-gray-600">
          Tell us more about your {data.propertyType} property
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {isBusiness ? 'Business Type' : 'Property Type'} *
          </label>
          <select
            {...register('propertySubtype', { required: 'This field is required' })}
            className="input-field"
          >
            <option value="">Select Type</option>
            {getSubtypeOptions().map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          {errors.propertySubtype && (
            <p className="mt-1 text-sm text-red-600">{errors.propertySubtype.message}</p>
          )}
        </div>

        {!isBusiness && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Square Footage
              </label>
              <input
                {...register('squareFootage')}
                type="text"
                className="input-field"
                placeholder="e.g., 2,500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lot Size
              </label>
              <input
                {...register('lotSize')}
                type="text"
                className="input-field"
                placeholder="e.g., 0.25 acres"
              />
            </div>
          </div>
        )}

        {!isLand && !isBusiness && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Year Built
              </label>
              <input
                {...register('yearBuilt')}
                type="text"
                className="input-field"
                placeholder="e.g., 1995"
              />
            </div>

            {isResidential && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bedrooms
                  </label>
                  <select {...register('bedrooms')} className="input-field">
                    <option value="">Select</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                      <option key={num} value={num}>{num}{num === 8 ? '+' : ''}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bathrooms
                  </label>
                  <select {...register('bathrooms')} className="input-field">
                    <option value="">Select</option>
                    {['1', '1.5', '2', '2.5', '3', '3.5', '4', '4.5', '5+'].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
              </>
            )}
          </div>
        )}

        {isBusiness && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Annual Revenue
                </label>
                <select {...register('annualRevenue')} className="input-field">
                  <option value="">Select Range</option>
                  <option value="under-100k">Under $100K</option>
                  <option value="100k-500k">$100K - $500K</option>
                  <option value="500k-1m">$500K - $1M</option>
                  <option value="1m-5m">$1M - $5M</option>
                  <option value="over-5m">Over $5M</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Years in Operation
                </label>
                <input
                  {...register('yearsInOperation')}
                  type="text"
                  className="input-field"
                  placeholder="e.g., 5"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Employees
              </label>
              <select {...register('numberOfEmployees')} className="input-field">
                <option value="">Select Range</option>
                <option value="1-5">1-5 employees</option>
                <option value="6-10">6-10 employees</option>
                <option value="11-25">11-25 employees</option>
                <option value="26-50">26-50 employees</option>
                <option value="over-50">Over 50 employees</option>
              </select>
            </div>
          </div>
        )}

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

export default Step3PropertyDetails
