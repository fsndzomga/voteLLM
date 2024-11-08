"use client";

import Image from "next/image";
import { useEffect } from "react";


export default function Home() {


  useEffect(() => {
    // Clear the localStorage only on the client side
    if (typeof window !== "undefined") {
      localStorage.clear();
    }
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center max-h-screen p-4 pb- gap-16 sm:p-10 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center max-w-[580px]">
        <Image
          className="dark:invert"
          src="/hero.webp"
          alt="VoteLLM logo"
          width={180}
          height={38}
          priority
        />
        <div className="text-center font-[family-name:var(--font-geist-mono)]">
          <h1 className="mb-2 text-lg font-bold">
            What Kind of US Battleground Voter Are You?
          </h1>
          <p className="text-sm font-medium">Take this interactive quiz to discover your political profile and where you’d fit in a battleground state!</p>
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="/questions/1"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/abralincblack.webp"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Start Quiz
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nebius.com/studio/inference?utm_medium=cpc&utm_source=voteLLM&utm_campaign=Network_en_all_lgen_inference_cloud&utm_term=voteLLM"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/nebius logo.png"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Built with Nebius AI Studio →
        </a>
      </footer>
    </div>
  );
}
