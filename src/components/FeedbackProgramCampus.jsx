import { Star } from "lucide-react";
import { Link } from "react-router";
import { Card } from "./ui/card";
import useGetFeedback from "@/hooks/hooksCampus/useGetFeedback";
import { useEffect } from "react";
import LoadingSkeletonCardFeedback, {
  LoadingSkeletonRatingProgram,
} from "./LoadingSkeletonCardFeedback";

export default function FeedbackProgramCampus({ token, idProgram }) {
  const { feedbackData, isLoading, error, getFeedbackByProgramId } =
    useGetFeedback();

  const displayFeedback = feedbackData ?? [];
  console.log(displayFeedback);

  // get average rating
  const averageRating =
    displayFeedback.length > 0
      ? (
          displayFeedback.reduce((acc, item) => acc + item.rating, 0) /
          displayFeedback.length
        ).toFixed(1)
      : 0;

  useEffect(() => {
    if (token) {
      getFeedbackByProgramId(token, idProgram);
    }
  }, [token, idProgram]);

  return (
    <>
      <h2 className="mb-4 text-xl font-semibold text-[#013B35]">
        Rating Program Anda
      </h2>
      {/* // average rating card */}
      {!isLoading && displayFeedback.length > 0 ? (
        <Card className="p-6 mb-6 w-full flex items-center gap-6">
          <div className="text-center">
            <span className="text-4xl font-bold text-[#013B35]">
              {averageRating}
            </span>
            <p className="text-xs text-muted-foreground mt-1">dari 5</p>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.round(averageRating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-gray-300 text-gray-300"
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Berdasarkan {displayFeedback.length} ulasan
            </p>
          </div>
        </Card>
      ) : (
        <LoadingSkeletonRatingProgram />
      )}

      <h2 className="mb-4 text-xl font-semibold text-[#013B35]">
        Feedback dari Mentee
      </h2>

      {isLoading ? (
        <LoadingSkeletonCardFeedback />
      ) : (
        // feedback card
        displayFeedback.map((item) => (
          <Card className="p-6 mb-4 w-full">
            <div className="flex items-start gap-3 mb-4">
              <img
                src={"https://placehold.co/48x48"}
                alt="Mentee Profile"
                width={48}
                height={48}
                className="rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-foreground">
                  {item.username}
                </h3>
                <p className="text-muted-foreground italic text-xs leading-relaxed ">
                  {item.email}
                </p>
                <div className="flex gap-0.5 mt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < item.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-gray-300 text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-muted-foreground italic text-sm leading-relaxed mb-4">
              {item.evaluation}
            </p>
            {/* <Link
          href={reviewUrl}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium inline-flex items-center gap-1"
        >
          Read full review →
        </Link> */}
          </Card>
        ))
      )}
    </>
  );
}
