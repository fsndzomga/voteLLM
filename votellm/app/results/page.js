"use client";
import { useEffect, useState } from 'react';

const ResultsPage = () => {
  const [profile, setProfile] = useState('');

  useEffect(() => {
    // Move localStorage and fetch logic inside useEffect to ensure it runs only in the browser
    const getProfile = async () => {
      const answers = JSON.parse(localStorage.getItem('answers') || '[]');
      const voteChoice = localStorage.getItem('voteChoice');

      if (answers && voteChoice) {
        try {
          const response = await fetch('http://127.0.0.1:5000/submit_answers', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              answers,
              voteChoice,
            }),
          });

          const data = await response.json();
          setProfile(data.profile);
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      }
    };

    getProfile();
  }, []);

  return (
    <div>
      <h1>Your Battleground Voter Profile</h1>
      <p>{profile}</p>
    </div>
  );
};

export default ResultsPage;
