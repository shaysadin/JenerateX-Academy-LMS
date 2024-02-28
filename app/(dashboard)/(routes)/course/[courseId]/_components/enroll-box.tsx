"use client";



import { cn } from "@/lib/utils";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { EnrollButton } from "./enroll-button";
import { ContinueButton } from "./continue-button";


interface CourseEnrollBoxProps {
    price: number;
    courseId: string;
    chapterId: string;
    purchase: boolean;
}


export const CourseEnrollBox = ({
    price,
    courseId,
    chapterId,
    purchase,
}: CourseEnrollBoxProps) => {
    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {
        try {
            setIsLoading(true);

            const response = await axios.post(`/api/courses/${courseId}/chapters/${chapterId}`)

            window.location.assign(response.data.url);
        } catch {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="border rounded-md p-6 text-secondary bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-sky-900 via-sky-950 to-gray-900">
            <div className="mb-7">
                <h4 className="font-semibold text-xl mb-4">{purchase ? "Continue where you left off." : "Enroll now to start learning!"}</h4>
                <p className="text-sm text-neutral-200">
                    {purchase ? "Watch from the last completed chapter." : "Start now"}
                </p>
            </div>
            <div className="w-full">
            {!purchase && (
                <EnrollButton
                    price={price}
                    courseId={courseId}
                />
            )}
            {purchase && (
                <ContinueButton
                    chapterId={chapterId}
                    price={price}
                    courseId={courseId}
                />
            )}
            </div>
        </div>
    )
}