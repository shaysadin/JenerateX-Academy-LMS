import { getChapter } from "@/actions/get-chapter";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { VideoPlayer } from "./_components/video-player";
import { CourseProgress } from "@/components/course-progress";
import { CourseEnrollBox } from "./_components/enroll-box";

const CourseIdFrontPage = async ({
    params
}: {
    params: { courseId: string; chapterId: string; }
}) => {
    const { userId } = auth();

    if (!userId) {
        return redirect("/");
    }

    const course = await db.course.findUnique({
        where: {
            id: params.courseId,
            userId
        },
        include: {
            chapters: {
                orderBy: {
                    position: "asc",
                },
            }, 
        },
    });

    const firstChapterId = course?.chapters[0]?.id;

    const category = course
        ? await db.category.findUnique({
            where: {
                id: course.categoryId ?? undefined,
            },
        })
        : null;

    const {
        chapter: chapterData,
        course: courseData,
        muxData,
        attachments,
        nextChapter,
        userProgress,
        purchase,
    } = await getChapter({
        userId,
        chapterId: firstChapterId || '',
        courseId: params.courseId,
    });

    const isLocked = !chapterData?.isFree && !purchase;
    const completeOnEnd = !!purchase && !userProgress?.isCompleted;

    const booleanPurchase = !!purchase;

    return (
        <div className="p-6 max-w-screen-2xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="order-1 col-span-1 lg:col-span-3 flex flex-col space-y-6">
                    <div className="border rounded-md overflow-hidden bg-slate-100">
                        {/* <div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-8 w-8 animate-spin"
                >
                  <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
                </svg>
                <p className="text-sm mt-1">Loading video...</p>
              </div> */}
                        <div className="w-full h-full aspect-video mb-[-6px]">
                            <VideoPlayer
                                chapterId={firstChapterId || ''}
                                title={chapterData?.title || ''}
                                courseId={params.courseId}
                                nextChapterId={nextChapter?.id}
                                playbackId={muxData?.playbackId!}
                                isLocked={isLocked}
                                completeOnEnd={completeOnEnd}
                            />
                        </div>

                    </div>
                    <div className="border rounded-md p-6">
                        <h3 className="font-semibold text-lg md:text-2xl mb-2 capitalize">{course?.title}</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            {course?.description}
                        </p>
                        <div className="flex gap-1 flex-wrap">
                            <div className="border px-2.5 py-0.5 text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground font-semibold rounded-md text-center flex items-center justify-center">
                                {category?.name}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="order-2 lg:col-span-2 flex flex-col space-y-6">
                    <CourseEnrollBox 
                        price={course?.price || 0}
                        courseId={params.courseId}
                        chapterId={firstChapterId || ''}
                        purchase={booleanPurchase}
                    />
                </div>
            </div>
        </div>
    );
}

export default CourseIdFrontPage;