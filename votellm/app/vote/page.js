"use client";
import { useRouter } from 'next/navigation';

const VotePage = () => {
  const router = useRouter();

  const handleVote = (choice) => {
    localStorage.setItem('voteChoice', choice);
    router.push('/results');
  };

  return (
    <div>
      <h1>Who would you vote for?</h1>
      <button onClick={() => handleVote('Trump')}>Trump</button>
      <button onClick={() => handleVote('Kamala Harris')}>Kamala Harris</button>
    </div>
  );
};

export default VotePage;
