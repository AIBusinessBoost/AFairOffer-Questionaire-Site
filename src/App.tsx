import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import QuestionnairePage from './pages/QuestionnairePage'
import ResultsPage from './pages/ResultsPage'
import ThankYouPage from './pages/ThankYouPage'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <motion.main 
        className="flex-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/questionnaire" element={<QuestionnairePage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
        </Routes>
      </motion.main>
      <Footer />
    </div>
  )
}

export default App
