"use client";
import { useEffect, useState, useRef } from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useRouter } from 'next/navigation';
import { images } from './images';
import Image from 'next/image';

function SkeletonCard() {
  return (
    <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center max-h-screen p-4 font-[family-name:var(--font-geist-sans)]'>
      <div className='flex flex-col gap-[0.5rem] row-start-2 items-center max-w-[580px]'>
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <p className='text-center font-medium'>Please wait while the AGI generates your profile...</p>
      </div>
    </div>
  );
}

function CarouselPlugin({ state }: { state: string }) {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  const stateImages = images[state as keyof typeof images] || [];

  return (
    <Carousel
      plugins={[plugin.current]}
      className="min-h-[222px] min-w-[16rem] mb-3"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {stateImages.map((src, index) => (
          <CarouselItem key={index} className="flex justify-center max-h-80">
            <Image
              src={src.image_url}
              alt={`${state} attraction ${index + 1}`}
              height={320}
              width={480}
              className="h-full rounded-lg"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

function TextareaWithButton({ description }: { description: string }) {
  const router = useRouter();

  return (
    <div className="grid w-full gap-2">
      <Textarea value={description} readOnly className="min-h-[222px] flex-grow-1 overflow-y-auto resize-y p-3 border rounded-lg" />
      <Button onClick={() => router.push('/')}>Try again</Button>
    </div>
  );
}

type Profile = {
  description: string;
  state: string;
  city: string;
};

function ResultCard({ profile }: { profile: Profile }) {
  return (
    <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center max-h-screen p-4 font-[family-name:var(--font-geist-sans)]'>
      <div className='flex flex-col gap-[0.5rem] row-start-2 items-center max-w-[580px]'>
        <CarouselPlugin state={profile.state} />
        <TextareaWithButton description={profile?.description} />
      </div>
    </div>
  );
}

const ResultsPage = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (profile) return; // Prevent additional fetch if profile is already set

    const getProfile = async () => {
      const answers = JSON.parse(localStorage.getItem('answers') || '[]');
      const voteChoice = localStorage.getItem('voteChoice');
      const questions = JSON.parse(localStorage.getItem('questions') || '[]');

      if (answers && voteChoice) {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/submit_answers`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ questions, answers, voteChoice }),
          });

          const data = await response.json();
          setProfile(data.profile);
        } catch (error) {
          console.error("Error fetching profile:", error);
        } finally {
          setLoading(false); // Ensure loading state is updated
        }
      }
    };

    getProfile();
  }, [profile, loading]);

  return profile ? (
    <ResultCard profile={profile} />
  ) : (
    <SkeletonCard />
  );
};

export default ResultsPage;
