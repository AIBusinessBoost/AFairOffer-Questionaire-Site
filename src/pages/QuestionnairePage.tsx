import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useQuestionnaireStore } from '../store/questionnaireStore'
import ProgressBar from '../components/ProgressBar'
import Step1PropertyType from '../components/questionnaire/Step1PropertyType'
import Step2BasicInfo from '../components/questionnaire/Step2BasicInfo'
import Step3PropertyDetails from '../components/questionnaire/Step3PropertyDetails'
import Step4Condition from '../components/questionnaire/Step4Condition'
import Step5Financial from '../components/questionnaire/Step5Financial'
import Step6Timeline from '../components/questionnaire/Step6Timeline'
import Step7Contact from '../components/questionnaire/Step7Contact'
import Step8Additional from '../components/questionnaire/Step8Additional'

const QuestionnairePage: React.FC = () => {
  const { currentStep, totalSteps } = useQuestionnaireStore()

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <Step1PropertyType />
      case 2: return <Step2BasicInfo />
      case 3: return <Step3PropertyDetails />
      case 4: return <Step4Condition />
      case 5: return <Step5Financial />
      case 6: return <Step6Timeline />
      case 7: return <Step7Contact />
      case 8: return <Step8Additional />
      default: return <Step1PropertyType />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">
            Property Evaluation Questionnaire
          </h1>
          <p className="text-gray-600 text-center">
            Step {currentStep} of {totalSteps} - This will take about 3-5 minutes
          </p>
        </div>

        <ProgressBar current={currentStep} total={totalSteps} />

        <div className="mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default QuestionnairePage
