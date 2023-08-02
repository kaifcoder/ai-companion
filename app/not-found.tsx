// app/not-found.js
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <h1 className="text-3xl font-semibold">Page Not Found</h1>
      <p className="text-xl text-muted-foreground">
        Sorry, there is nothing here.
      </p>
      <Link
        href="/"
        className="bg-background p-2 m-2 rounded-lg hover:bg-primary/10"
      >
        Go back home
      </Link>
    </div>
  );
}
