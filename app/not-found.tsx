import Link from "next/link";

export default function NotFound() {
  return (
    <section className="wrap page-top">
      <h1 className="insights-title">Page not found</h1>
      <p className="insights-intro type-md">
        That address does not match a page on this site.{" "}
        <Link href="/" className="link">
          Go to the home page
        </Link>
      </p>
    </section>
  );
}
