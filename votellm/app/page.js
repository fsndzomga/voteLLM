"use client";
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  const startQuiz = () => {
    router.push('/questions/1');
  };

  return (
    <div>
      <h1>What Kind of US Battleground Voter Are You?</h1>
      <button onClick={startQuiz}>Start</button>
    </div>
  );
}
