import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import Question from "../components/Question";
import { consistentPageBackgroundImage } from "../themes/ConsistentStyles";

const QuestionsPage = () => {
  const [allQuestionsData, setAllQuestionsData] = useState(null);

  useEffect(() => {
    const fetchAllQuestionsData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/api/questions`,
          {
            credentials: "include",
          }
        );
        // console.log("response:", response);
        if (!response.ok) {
          throw response;
        }
        const data = await response.json();
        // console.log("data:", data);
        setAllQuestionsData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllQuestionsData();
  }, []);

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
      {allQuestionsData && (
        <Box>
          <Box display={"flex"} justifyContent={"space-between"} mb={1}>
            <Typography variant={"pagetitle"}>
              All Questions ({allQuestionsData.length})
            </Typography>
            <Button
              variant={"contained"}
              component={NavLink}
              to="/questions/add">
              Add a Question
            </Button>
          </Box>
          <Box display={"grid"} gap={2}>
            {allQuestionsData.map((questionData) => (
              <Question
                key={questionData.id}
                questionData={questionData}
                questionAsLink={true}
              />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default QuestionsPage;
