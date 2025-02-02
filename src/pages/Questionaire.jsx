import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { AlertCircle, ArrowRight, CheckCircle2 } from "lucide-react"
import React from "react"

const questions = [
  {
    question: "How often do you feel overwhelmed by your daily responsibilities?",
    options: ["Rarely", "Sometimes", "Often", "Almost always"],
  },
  {
    question: "How well do you sleep on most nights?",
    options: [
      "Very well, I feel rested",
      "Okay, but sometimes restless",
      "Not great, I wake up often",
      "Poorly, I struggle to sleep",
    ],
  },
  {
    question: "How frequently do you experience feelings of sadness or hopelessness?",
    options: ["Rarely or never", "Occasionally", "Frequently", "Almost all the time"],
  },
  {
    question: "How would you describe your ability to handle stress?",
    options: [
      "Very well, I manage stress effectively",
      "Somewhat well, but I struggle at times",
      "Not well, I feel stressed often",
      "Poorly, stress overwhelms me",
    ],
  },
  {
    question: "How often do you engage in activities that help you relax and unwind?",
    options: ["Daily", "A few times a week", "Rarely", "Almost never"],
  },
]

function Questionnaire() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState(Array(questions.length).fill(null))
  const [showError, setShowError] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const navigate = useNavigate()

  const handleOptionSelect = (option) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = option
    setAnswers(newAnswers)
    setShowError(false)
  }

  const handleNext = () => {
    if (answers[currentQuestion] === null) {
      setShowError(true)
      return
    }
    setCurrentQuestion(currentQuestion + 1)
    setShowError(false)
  }

  const handleSubmit = () => {
    if (answers[currentQuestion] === null || answers.some((answer) => answer === null)) {
      setShowError(true)
      return
    }
    setIsSubmitted(true)
    console.log("Submitted answers:", answers)
    // Store answers in localStorage
    localStorage.setItem("questionnaireAnswers", JSON.stringify(answers))
    // Redirect to ChatBot page after a short delay
    setTimeout(() => {
      navigate("/chatbot")
    }, 2000)
  }

  const progressPercentage = ((currentQuestion + 1) / questions.length) * 100

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-violet-900 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full animate-fade-in">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 text-center">
            <div className="flex flex-col items-center space-y-4">
              <CheckCircle2 className="w-16 h-16 text-green-400 animate-scale-in" />
              <h2 className="text-3xl font-bold text-white">Thank You!</h2>
              <p className="text-purple-200">Your responses have been submitted successfully.</p>
              <p className="text-purple-200">Redirecting to the chat...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-violet-900 p-4">
      <div className="max-w-4xl mx-auto pt-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="h-2 bg-purple-800/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-purple-400 transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="mt-2 text-purple-200 text-sm">
            Question {currentQuestion + 1} of {questions.length}
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden transition-all duration-300">
          <div className="m-6 rounded-2xl p-8">
            {/* Question */}
            <h2 className="text-2xl font-medium text-white mb-8 animate-fade-in">
              {questions[currentQuestion].question}
            </h2>

            {/* Options */}
            <div className="space-y-4 mb-8">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(option)}
                  className={`w-full text-left px-6 py-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-[1.02] ${
                    answers[currentQuestion] === option
                      ? "border-purple-400 bg-purple-400/20 text-white"
                      : "border-purple-800/30 hover:border-purple-400/50 text-purple-100 hover:bg-purple-900/30"
                  }`}
                >
                  <span
                    className={`inline-block w-8 h-8 rounded-full mr-3 text-center leading-8
                    ${answers[currentQuestion] === option ? "bg-purple-400 text-purple-900" : "bg-purple-800/30"}`}
                  >
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option}
                </button>
              ))}
            </div>

            {/* Error Message */}
            {showError && (
              <div className="flex items-center gap-2 text-red-300 mb-4 animate-shake">
                <AlertCircle className="w-5 h-5" />
                <span>Please select an answer before proceeding.</span>
              </div>
            )}

            {/* Navigation Button */}
            <div className="flex justify-end">
              {currentQuestion < questions.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all duration-300 flex items-center gap-2 group"
                >
                  Next
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all duration-300"
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Questionnaire

