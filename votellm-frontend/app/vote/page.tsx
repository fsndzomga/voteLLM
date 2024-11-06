"use client";
import { useRouter } from 'next/navigation';

const VotePage = () => {
  const router = useRouter();

  const handleVote = (choice: string) => {
    localStorage.setItem('voteChoice', choice);
    router.push('/results');
  };

  return (
    <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center max-h-screen p-4 pb- gap-16 sm:p-10 font-[family-name:var(--font-geist-sans)]'>
      <div className='flex flex-col gap-10 row-start-2 items-center max-w-[580px]'>
      <h1 className='text-lg text-center font-bold border-black'>Who would you vote for?</h1>
      <button
        onClick={() => handleVote('Trump')}
        className="flex items-center text-white text-lg bg-[#58cc02] border-none px-28 py-3 shadow-[0_4px_0_#58a700] rounded-lg cursor-pointer active:shadow-none active:translate-y-1"
      >
        Donald Trump
      </button>
      <button
        onClick={() => handleVote('Kamala Harris')}
        className="flex items-center text-white text-lg bg-[#1899D6] border-none px-28 py-3 shadow-[0_4px_0_#1CB0F6] rounded-lg cursor-pointer active:shadow-none active:translate-y-1"
      >
        Kamala Harris
      </button>

      </div>
    </div>
  );
};

export default VotePage;
