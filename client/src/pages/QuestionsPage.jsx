import { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { Box, Typography, Button } from "@mui/material";
import Loading from "../components/Loading";
import Error from "../components/Error";
import Question from "../components/Question";
import QuestionForm from "../components/QuestionForm";
import getQuestionsByPage from "../api/getQuestionsByPage";

const QuestionsPage = () => {
  const [showAddQuestionForm, setShowAddQuestionForm] = useState(false);
  const { ref, inView } = useInView({});

  const {
    data: questionsByPageData,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["questions"],

    queryFn: getQuestionsByPage,

    initialPageParam: 1,

    getNextPageParam: (lastPage, allPages) => {
      const nextPage =
        lastPage.data.length < 5 ? undefined : allPages.length + 1;
      return nextPage;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <Box py={2}>
      {status === "pending" && <Loading />}
      {status === "error" && <Error message={error.message} />}
      {questionsByPageData && (
        <>
          <Box>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Typography variant={"pagetitle"}>
                All Questions (
                {questionsByPageData.pages
                  .map((page) => page.data.length)
                  .reduce((acc, cv) => acc + cv, 0)}
                )
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
              {questionsByPageData?.pages.map((page) =>
                page?.data.map((questionData) => (
                  <div key={questionData.id} ref={ref}>
                    <Question questionData={questionData} />
                  </div>
                ))
              )}
            </Box>
          </Box>
          {isFetchingNextPage && <Loading />}
        </>
      )}
    </Box>
  );
};

export default QuestionsPage;
