import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const AnswersList = ({ data }) => {
  return (
    <Box mt={4}>
      {data && (
        <>
          <Typography variant="h5">{data.length} Answers</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Situation</TableCell>
                  <TableCell>Task</TableCell>
                  <TableCell>Action</TableCell>
                  <TableCell>Result</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item, index) => (
                  <TableRow
                    hover
                    style={{ textDecoration: "none" }}
                    key={index}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.situation}</TableCell>
                    <TableCell>{item.task}</TableCell>
                    <TableCell>{item.action}</TableCell>
                    <TableCell>{item.result}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Box>
  );
};

export default AnswersList;
