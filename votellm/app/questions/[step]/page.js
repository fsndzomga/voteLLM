"use client";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { use } from 'react';

const QuestionPage = ({ params }) => {
  const router = useRouter();

  // Unwrap `params` using `use` to access `step` directly
  const { step } = use(params);
  const stepNumber = parseInt(step); // Convert to integer

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/generate_questions');
        const data = await response.json();
        setQuestions(data.questions);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();
  }, []);

  const handleAnswer = (answer) => {
    const updatedAnswers = JSON.parse(localStorage.getItem('answers') || '[]');
    updatedAnswers.push(answer);
    localStorage.setItem('answers', JSON.stringify(updatedAnswers));

    if (stepNumber < questions.length) {
      router.push(`/questions/${stepNumber + 1}`);
    } else {
      router.push('/vote');
    }
  };

  if (loading) return <p>Loading...</p>;

  if (stepNumber > questions.length) return null;

  return (
    <div>
      <h1>{questions[stepNumber - 1]}</h1>
      <button onClick={() => handleAnswer('yes')}>Yes</button>
      <button onClick={() => handleAnswer('no')}>No</button>
    </div>
  );
};

export default QuestionPage;
