import Link from 'next/link';

export default function ServerError() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-4xl font-bold mb-4">500 - Server-side Error</h1>
      <p className="text-lg mb-8">
        Oops! Something went wrong on our end. Please try again later.
      </p>
      <Link href="/">
        <a className="bg-blue-600 text-white px-4 py-2 rounded-md">Go back home</a>
      </Link>
    </div>
  );
}
