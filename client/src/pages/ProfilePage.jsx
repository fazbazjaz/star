import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { Box, Typography, CardMedia } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import Loading from "../components/Loading";
import Error from "../components/Loading";
import Question from "../components/Question";
import getAllQuestionsByUserId from "../api/getAllQuestionsByUserId";
import { consistentPageBackgroundImage } from "../themes/ConsistentStyles";

const ProfilePage = () => {
  // get the userCookie from AuthContext
  const { userCookie } = useContext(AuthContext);

  const userId = userCookie.id;

  const {
    isPending,
    isError,
    error,
    data: userQuestionsData,
  } = useQuery({
    queryKey: ["questions", "user", userId],
    queryFn: () => getAllQuestionsByUserId(userId),
  });

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
      {userQuestionsData && (
        <>
          <Box>
            <Typography variant={"pagetitle"}>Your Profile</Typography>
          </Box>
          <Box
            display={"flex"}
            flexWrap={"wrap"}
            gap={{ xs: 1, sm: 1.5 }}
            mt={1}>
            <CardMedia
              component={"img"}
              image={userCookie.picture}
              sx={{
                height: 48,
                width: 48,
                gridTemplateRows: "span 2",
                borderRadius: "0.5rem",
              }}
            />
            <Box>
              <Typography variant={"body2"}>User ID:</Typography>
              <Typography fontWeight={"bold"}>{userCookie.id}</Typography>
            </Box>
            <Box>
              <Typography variant={"body2"}>Name:</Typography>
              <Typography fontWeight={"bold"}>
                {userCookie.firstname} {userCookie.lastname}
              </Typography>
            </Box>
            <Box>
              <Typography variant={"body2"}>Questions:</Typography>
              <Typography fontWeight={"bold"} textAlign={"center"}>
                {userQuestionsData.length}
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
            <Typography variant={"pagetitle"}>
              Your Questions ({userQuestionsData.length})
            </Typography>
            <Box display={"grid"} gap={2} mt={1}>
              {userQuestionsData.map((userQuestionData) => {
                return (
                  <Question
                    key={userQuestionData.id}
                    questionData={userQuestionData}
                    currentPage={"profilePage"}
                  />
                );
              })}
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default ProfilePage;
