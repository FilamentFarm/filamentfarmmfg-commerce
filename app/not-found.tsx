export const dynamic = "force-dynamic";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="p-12 text-center text-white">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="mt-4">Sorry, we couldn’t find that page.</p>
      <Link href="/" className="text-blue-400 underline mt-6 block">
        ← Return Home
      </Link>
    </div>
  );
}
