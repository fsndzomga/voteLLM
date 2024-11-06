import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "VoteLLM",
  description: "Discover the hypothetical battleground voter within you!",
};

export const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-white  border-b border-gray-150">
      {/* GitHub Link */}
      <a
        href="https://github.com/fsndzomga"
        target="_blank"
        className="flex items-center space-x-2 text-black hover:text-gray-600 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.11.82-.26.82-.578v-2.043c-3.338.727-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.088-.745.084-.73.084-.73 1.205.084 1.838 1.234 1.838 1.234 1.07 1.83 2.81 1.302 3.495.995.108-.775.42-1.303.762-1.603-2.665-.3-5.467-1.334-5.467-5.93 0-1.31.468-2.382 1.235-3.22-.124-.303-.535-1.523.117-3.176 0 0 1.007-.323 3.3 1.23.957-.266 1.983-.398 3.004-.404 1.02.006 2.047.138 3.006.404 2.29-1.553 3.295-1.23 3.295-1.23.656 1.653.245 2.873.12 3.176.77.838 1.235 1.91 1.235 3.22 0 4.61-2.807 5.625-5.478 5.92.432.372.818 1.1.818 2.217v3.285c0 .32.218.694.825.575C20.565 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
        </svg>
      </a>

      {/* Twitter Link */}
      <a
        href="https://twitter.com/ndzfs"
        target="_blank"
        className="flex items-center space-x-2 text-black hover:text-gray-600 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path d="M23.954 4.569c-.885.392-1.83.656-2.825.775 1.014-.611 1.794-1.574 2.163-2.724-.951.555-2.005.959-3.127 1.184-.897-.959-2.173-1.559-3.594-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124-4.091-.205-7.719-2.165-10.148-5.144-.422.723-.664 1.561-.664 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.829-.413.111-.849.171-1.296.171-.314 0-.615-.03-.911-.086.631 1.953 2.445 3.377 4.6 3.416-1.68 1.318-3.809 2.103-6.102 2.103-.397 0-.79-.023-1.17-.067 2.189 1.394 4.768 2.208 7.557 2.208 9.054 0 14.002-7.496 14.002-13.986 0-.209 0-.42-.015-.63.961-.694 1.8-1.562 2.46-2.549z" />
        </svg>
      </a>
    </header>
  );
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
