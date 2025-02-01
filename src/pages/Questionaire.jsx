import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';

const questions = [
  {
    question: "How often do you feel overwhelmed by your daily responsibilities?",
    options: ["Rarely", "Sometimes", "Often", "Almost always"]
  },
  {
    question: "How well do you sleep on most nights?",
    options: ["Very well, I feel rested", "Okay, but sometimes restless", "Not great, I wake up often", "Poorly, I struggle to sleep"]
  },
  {
    question: "How frequently do you experience feelings of sadness or hopelessness?",
    options: ["Rarely or never", "Occasionally", "Frequently", "Almost all the time"]
  },
  {
    question: "How would you describe your ability to handle stress?",
    options: ["Very well, I manage stress effectively", "Somewhat well, but I struggle at times", "Not well, I feel stressed often", "Poorly, stress overwhelms me"]
  },
  {
    question: "How often do you engage in activities that help you relax and unwind?",
    options: ["Daily", "A few times a week", "Rarely", "Almost never"]
  }
];

function Questionaire() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [showError, setShowError] = useState(false);

  const handleOptionSelect = (option) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = option;
    setAnswers(newAnswers);
    setShowError(false);
  };

  const handleNext = () => {
    if (answers[currentQuestion] === null) {
      setShowError(true);
      return;
    }
    setCurrentQuestion(currentQuestion + 1);
    setShowError(false);
  };

  const handleSubmit = () => {
    if (answers[currentQuestion] === null) {
      setShowError(true);
      return;
    }
    if (answers.some(answer => answer === null)) {
      setShowError(true);
      return;
    }
    console.log('Submitted answers:', answers);
    alert('Thank you for completing the questionnaire!');
  };

  const goToQuestion = (index) => {
    setCurrentQuestion(index);
    setShowError(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-500 to-teal-600">
      <div className="max-w-4xl mx-auto pt-8 px-4">
        {/* Main Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden">
          {/* Inner Card */}
          <div className="bg-white/80 m-6 rounded-2xl p-8">
            {/* Question Header */}
            <div className="flex justify-between items-center mb-8">
              <div className="text-lg text-gray-600">
                Question {currentQuestion + 1} of {questions.length}
              </div>
            </div>

            {/* Question */}
            <h2 className="text-2xl font-medium text-gray-900 mb-8">
              {questions[currentQuestion].question}
            </h2>

            {/* Options */}
            <div className="space-y-4 mb-8">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(option)}
                  className={`w-full text-left px-6 py-4 rounded-xl border-2 ${
                    answers[currentQuestion] === option
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                      : 'border-gray-200 hover:border-emerald-300 hover:bg-emerald-50'
                  } transition-all duration-200`}
                >
                  <span className="font-medium">
                    {String.fromCharCode(65 + index)}.
                  </span>{" "}
                  {option}
                </button>
              ))}
            </div>

            {/* Error Message */}
            {showError && (
              <div className="flex items-center gap-2 text-red-600 mb-4">
                <AlertCircle className="w-5 h-5" />
                <span>Please select an answer before proceeding.</span>
              </div>
            )}

            {/* Navigation Button */}
            <div className="flex justify-end">
              {currentQuestion < questions.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="px-6 py-2 bg-emerald-800 text-white rounded-lg hover:bg-emerald-900 transition-colors"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-emerald-800 text-white rounded-lg hover:bg-emerald-900 transition-colors"
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Questionaire;