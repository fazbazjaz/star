import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Box, Typography, Avatar } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import Loading from "../components/Loading";
import Error from "../components/Loading";
import Sort from "../components/Sort";
import Question from "../components/Question";
import getAllQuestionsByUserId from "../api/getAllQuestionsByUserId";

const ProfilePage = () => {
  const { authenticatedUser } = useContext(AuthContext);
  const userId = authenticatedUser.id;

  const [sort, setSort] = useState("popular");

  const {
    isPending,
    isError,
    error,
    data: userQuestionsData,
  } = useQuery({
    queryKey: ["questions", userId, sort],
    queryFn: () => getAllQuestionsByUserId(userId, sort),
  });

  return (
    <Box py={2}>
      <Box>
        <Typography variant={"pagetitle"}>Your Profile</Typography>
      </Box>
      <Box display={"flex"} flexWrap={"wrap"} gap={{ xs: 1, sm: 1.5 }} mt={1}>
        <Avatar
          src={authenticatedUser.picture}
          sx={{
            height: 48,
            width: 48,
          }}
        />
        <Box>
          <Typography variant={"body2"}>Name:</Typography>
          <Typography fontWeight={"bold"}>
            {authenticatedUser.firstName} {authenticatedUser.lastName}
          </Typography>
        </Box>
        <Box>
          <Typography variant={"body2"}>Questions:</Typography>
          <Typography fontWeight={"bold"} textAlign={"center"}>
            {userQuestionsData?.length}
          </Typography>
        </Box>
        <Box>
          <Typography variant={"body2"}>Answers:</Typography>
          <Typography fontWeight={"bold"} textAlign={"center"}>
            {0}
          </Typography>
        </Box>
        <Box>
          <Typography variant={"body2"}>Comments:</Typography>
          <Typography fontWeight={"bold"} textAlign={"center"}>
            {0}
          </Typography>
        </Box>
      </Box>
      <Box mt={2}>
        <Box display={"flex"} flexWrap={"wrap"} alignItems={"center"} gap={1}>
          <Typography variant={"pagetitle"} width={"180px"}>
            Your Questions ({userQuestionsData?.length})
          </Typography>
          <Sort sort={sort} setSort={setSort} />
        </Box>
        {userQuestionsData && (
          <Box display={"grid"} gap={2} mt={1}>
            {userQuestionsData.map((userQuestionData) => {
              return (
                <Question
                  key={userQuestionData.id}
                  questionData={userQuestionData}
                />
              );
            })}
          </Box>
        )}
      </Box>
      {isPending && <Loading />}
      {isError && <Error message={error.message} />}
    </Box>
  );
};

export default ProfilePage;
