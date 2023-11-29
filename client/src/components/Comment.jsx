import { Box, Typography } from "@mui/material";
import MessageRoundedIcon from "@mui/icons-material/MessageRounded";
import formatDate from "../utils/formatDate";
import {
  consistentBorder,
  consistentBorderRadius,
  consistentBgColor,
  consistentBoxShadow,
  consistentBackdropFilter,
} from "../themes/ConsistentStyles";

const Comment = ({ commentData }) => {
  return (
    <>
      {commentData && (
        <Box
          mt={1}
          py={1}
          px={2}
          border={consistentBorder}
          borderRadius={consistentBorderRadius}
          bgcolor={consistentBgColor}
          boxShadow={consistentBoxShadow}
          sx={{
            backdropFilter: consistentBackdropFilter,
          }}>
          <Box display={"flex"} alignItems={"center"} gap={0.5}>
            <MessageRoundedIcon fontSize={"0.75rem"} color="primary" />
            <Typography variant={"commentitle"} color={"primary"}>
              Comment
            </Typography>
            <Typography variant={"body2"}>(id: {commentData.id})</Typography>
            <Typography variant={"body2"}>
              by userId: {commentData.userId}
            </Typography>
          </Box>
          <Box>
            <Typography mt={0.5} variant={"commentbody"}>
              {commentData.comment}
            </Typography>
          </Box>
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"flex-end"}
            alignItems={"flex-end"}>
            <Typography variant={"body2"}>
              updated {formatDate(commentData.updatedAt)}
            </Typography>
            <Typography variant={"body2"}>
              created {formatDate(commentData.createdAt)}
            </Typography>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Comment;
