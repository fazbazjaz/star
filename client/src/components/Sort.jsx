import { FormControl, MenuItem, Select, InputLabel } from "@mui/material";

const Sort = ({ sort, setSort }) => {
  const handleChange = (event) => {
    setSort(event.target.value);
  };
  return (
    <FormControl variant="filled" size="small">
      <InputLabel id="sort" labelId="sort" sx={{ color: "white" }}>
        Sort
      </InputLabel>
      <Select id="sort" value={sort} label="Sort" onChange={handleChange}>
        <MenuItem value="popular" sx={{ color: "black" }}>
          Most Upvoted
        </MenuItem>
        <MenuItem value="recentlyCreated" sx={{ color: "black" }}>
          Recently Added
        </MenuItem>
        <MenuItem value="recentlyUpdated" sx={{ color: "black" }}>
          Recently Updated
        </MenuItem>
      </Select>
    </FormControl>
  );
};
export default Sort;
