"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Params {
  step: string;
}

const QuestionPage = ({ params }: { params: Params }) => {
  const router = useRouter();
  const { step } = params;
  const stepNumber = parseInt(step);

  const [questions, setQuestions] = useState<string[]>(() => {
    // Load questions from localStorage on initial render
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem('questions') || '[]');
    }
    return [];
  });

  const [loading, setLoading] = useState(() => questions.length === 0);
  const [answers, setAnswers] = useState<string[]>(() => {
    // Load answers from localStorage on initial render
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem('answers') || '[]');
    }
    return [];
  });

  useEffect(() => {
    // Ensure localStorage and fetch are only accessed on client side
    if (typeof window === 'undefined') return;

    const fetchQuestions = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/generate_questions`);
        const data = await response.json();
        setQuestions(data.questions);
        localStorage.setItem('questions', JSON.stringify(data.questions));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setLoading(false);
      }
    };

    if (stepNumber === 1) {
      // Fetch questions if it's the first step
      fetchQuestions();
    } else {
      // Load questions from localStorage for other steps
      const savedQuestions = JSON.parse(localStorage.getItem('questions') || '[]');
      setQuestions(savedQuestions);
      setLoading(false);
    }
  }, [stepNumber]); // Dependency on stepNumber to handle different steps

  const handleAnswer = (answer: string) => {
    const updatedAnswers = [...answers, answer];
    setAnswers(updatedAnswers);

    // Update localStorage with the new answers
    localStorage.setItem('answers', JSON.stringify(updatedAnswers));

    // Navigate to the next question or the voting page if finished
    if (stepNumber < questions.length) {
      router.push(`/questions/${stepNumber + 1}`);
    } else {
      router.push('/vote');
    }
  };

  if (loading) return <p className='text-center m-0 pt-80'>Loading...</p>;
  if (stepNumber > questions.length) return null;

  return (
    <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center max-h-screen p-4 pb- gap-16 sm:p-10 font-[family-name:var(--font-geist-sans)]'>
      <div className='flex flex-col gap-10 row-start-2 items-center max-w-[580px]'>
        <h1 className='text-lg text-center font-bold border-black'>{questions[stepNumber - 1]}</h1>
        <button
          onClick={() => handleAnswer('yes')}
          className="flex items-center text-white text-lg bg-[#58cc02] border-none px-28 py-3 shadow-[0_4px_0_#58a700] rounded-lg cursor-pointer active:shadow-none active:translate-y-1"
        >
          Yes
        </button>
        <button
          onClick={() => handleAnswer('no')}
          className="flex items-center text-white text-lg bg-[#1899D6] border-none px-28 py-3 shadow-[0_4px_0_#1CB0F6] rounded-lg cursor-pointer active:shadow-none active:translate-y-1"
        >
          No
        </button>
      </div>
    </div>
  );
};

export default QuestionPage;
