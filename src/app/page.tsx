"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OverviewPage() {
  const router = useRouter();

  useEffect(() => {
    // Force redirect to waiting list page
    router.push("/waiting-list");
  }, [router]);

  return null;
}
