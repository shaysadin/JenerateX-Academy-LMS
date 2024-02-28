"use client";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { redirect, useRouter } from "next/navigation";


import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";

interface ContinueButtonProps {
  price: number;
  courseId: string;
  chapterId: string;
}

export const ContinueButton = ({
  price,
  courseId,
  chapterId,
}: ContinueButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onClick = async () => {
    try {
        setIsLoading(true);

        router.push(`/courses/${courseId}/chapters/${chapterId}`)

        
    } catch {
        toast.error("Something went wrong");
    } finally {
        setIsLoading(false);
    }
}

  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      size="lg"
      className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-9 rounded-md px-3 w-full"
    >
      Continue the course
    </Button>
  )
}