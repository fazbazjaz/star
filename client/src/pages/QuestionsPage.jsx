import { useState, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Box, Typography, Button } from "@mui/material";
import Loading from "../components/Loading";
import Error from "../components/Error";
import SearchBar from "../components/SearchBar";
import Question from "../components/Question";
import QuestionForm from "../components/QuestionForm";
import getQuestionsByPage from "../api/getQuestionsByPage";
import Sort from "../components/Sort";
import getQuestionsBySearch from "../api/getQuestionsBySearch";

const QuestionsPage = () => {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const [sort, setSort] = useState("popular");

  const [showAddQuestionForm, setShowAddQuestionForm] = useState(false);

  const {
    data: questionsByPageData,
    error,
    fetchNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: debouncedSearchTerm
      ? ["questions", sort, debouncedSearchTerm]
      : ["questions", sort],
    queryFn: debouncedSearchTerm ? getQuestionsBySearch : getQuestionsByPage,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.length < 5 ? undefined : allPages.length + 1;
      return nextPage;
    },
  });

  useEffect(() => {
    const allQuestions = document.querySelectorAll(".individual-question");
    const lastQuestion = allQuestions[allQuestions.length - 1];

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log("❓🔃 QuestionsPage useEffect 🟠 fetchNextPage()");
          console.log(
            "❓🔃 QuestionsPage useEffect 🟠 THIS WILL CAUSE RE-RENDER ???"
          );
          fetchNextPage();
        }
      });
    });
    if (lastQuestion) {
      observer.observe(lastQuestion);
      return () => {
        observer.unobserve(lastQuestion);
      };
    }
  }, [questionsByPageData, fetchNextPage]);

  return (
    <Box py={2}>
      <Box>
        <Box
          display={"flex"}
          flexWrap={"wrap"}
          justifyContent={"space-between"}
          alignItems={"center"}
          gap={1}>
          <Box display={"flex"} flexWrap={"wrap"} alignItems={"center"} gap={2}>
            <Typography variant={"pagetitle"}>
              All Questions (
              {questionsByPageData &&
                questionsByPageData.pages
                  .map((page) => page.length)
                  .reduce((acc, cv) => acc + cv, 0)}
              )
            </Typography>
            <Box
              display={"flex"}
              flexWrap={"wrap"}
              alignItems={"center"}
              gap={1}>
              <Sort sort={sort} setSort={setSort} />
              <SearchBar setDebouncedSearchTerm={setDebouncedSearchTerm} />
            </Box>
          </Box>
          <Box>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setShowAddQuestionForm((prev) => !prev)}
              disabled={showAddQuestionForm}
              sx={{ display: "flex", gap: 0.5 }}>
              Add a Question
            </Button>
          </Box>
        </Box>
        {showAddQuestionForm && (
          <QuestionForm
            setShowAddQuestionForm={setShowAddQuestionForm}
            sort={sort}
          />
        )}
        {status === "pending" && <Loading />}
        {status === "error" && <Error message={error.message} />}
        {questionsByPageData && (
          <Box display={"grid"} gap={2} mt={1}>
            {questionsByPageData?.pages.map((page) =>
              page?.map((questionData) => (
                <Question key={questionData.id} questionData={questionData} />
              ))
            )}
          </Box>
        )}
      </Box>
      {isFetchingNextPage && <Loading />}
    </Box>
  );
};

export default QuestionsPage;
