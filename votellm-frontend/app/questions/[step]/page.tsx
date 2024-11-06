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

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState<string[]>([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/generate_questions`);
        const data = await response.json();
        setQuestions(data.questions);
        // store questions in localStorage
        localStorage.setItem('questions', JSON.stringify(data.questions));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();

    // Load answers from localStorage once on mount
    const savedAnswers = JSON.parse(localStorage.getItem('answers') || '[]');
    setAnswers(savedAnswers);
  }, []);

  const handleAnswer = (answer: string) => {
    const updatedAnswers = [...answers, answer];
    setAnswers(updatedAnswers);

    // Only write to localStorage when navigating to the next page
    localStorage.setItem('answers', JSON.stringify(updatedAnswers));


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
