import { useState } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Box, Typography, Button } from "@mui/material";
import Loading from "../components/Loading";
import Error from "../components/Loading";
import Question from "../components/Question";
import QuestionForm from "../components/QuestionForm";
import getAllQuestions from "../api/getAllQuestions";
import { consistentPageBackgroundImage } from "../themes/ConsistentStyles";

const QuestionsPage = () => {
  const [showAddQuestionForm, setShowAddQuestionForm] = useState(false);

  const {
    isPending,
    isError,
    error,
    data: allQuestionsData,
  } = useQuery({
    queryKey: ["questions"],
    queryFn: getAllQuestions,
  });

  // TO DO: Implement Infinite Scroll

  // https://tanstack.com/query/latest/docs/react/guides/infinite-queries

  // data is now an object containing infinite query data
  // data.pages array containing the fetched pages
  // data.pageParams array containing the page params used to fetch the pages
  // The fetchNextPage and fetchPreviousPage functions are now available (fetchNextPage is required)
  // The initialPageParam option is now available (and required) to specify the initial page param
  // The getNextPageParam and getPreviousPageParam options are available for both determining if there is more data to load and the information to fetch it. This information is supplied as an additional parameter in the query function
  // A hasNextPage boolean is now available and is true if getNextPageParam returns a value other than null or undefined
  // A hasPreviousPage boolean is now available and is true if getPreviousPageParam returns a value other than null or undefined
  // The isFetchingNextPage and isFetchingPreviousPage booleans are now available to distinguish between a background refresh state and a loading more state
  // Note: Options initialData or placeholderData need to conform to the same structure of an object with data.pages and data.pageParams properties.
  // const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
  //   queryKey: ["questions"],
  //   // Required, but only if no default query function has been defined defaultQueryFn
  //   queryFn: ({ pageParam }) => fetchNextPage(pageParam),
  //   // The default page param to use when fetching the first page
  //   initialPageParam: 1,
  //   // When new data is received for this query, this function receives both
  //   // the last page of the infinite list of data
  //   // and the full array of all pages
  //   // as well as pageParam information.
  //   // It should return a single variable that will be passed as the last optional parameter to your query function.
  //   getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) =>
  //     lastPage.nextCursor,
  //   getPreviousPageParam: (
  //     firstPage,
  //     allPages,
  //     firstPageParam,
  //     allPageParams
  //   ) => firstPage.prevCursor,
  // });

  return (
    <Box
      p={3}
      color="white"
      sx={{
        backgroundImage: consistentPageBackgroundImage,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        overflow: "hidden",
      }}>
      {isPending && <Loading />}
      {isError && <Error message={error.message} />}
      {allQuestionsData && (
        <Box>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Typography variant={"pagetitle"}>
              All Questions ({allQuestionsData.length})
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setShowAddQuestionForm((prev) => !prev)}
              disabled={showAddQuestionForm}
              sx={{ display: "flex", gap: 0.5 }}>
              Add a Question
            </Button>
          </Box>
          {showAddQuestionForm && (
            <QuestionForm setShowAddQuestionForm={setShowAddQuestionForm} />
          )}
          <Box display={"grid"} gap={2} mt={1}>
            {allQuestionsData.map((questionData) => (
              <Question key={questionData.id} questionData={questionData} />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default QuestionsPage;
