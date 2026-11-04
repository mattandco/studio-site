"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useContactForm } from "@/components/ContactForm";

// Opens the contact form; without JavaScript it falls back to the contact section.
export default function DiscussLink({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const { open } = useContactForm();
  return (
    <Link
      href="/#contact"
      className={className}
      onClick={(event) => {
        event.preventDefault();
        open();
      }}
    >
      {children}
    </Link>
  );
}
