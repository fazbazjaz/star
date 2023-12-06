import { FormControl, MenuItem, Select } from "@mui/material";
import { yellow } from "@mui/material/colors";

const Sort = ({ sort, setSort }) => {
  const handleChange = (event) => {
    setSort(event.target.value);
  };
  return (
    <FormControl>
      <Select
        sx={{ bgcolor: yellow[600], color: "black" }}
        id="sort"
        value={sort}
        onChange={handleChange}
        autoWidth
        label="sort">
        <MenuItem value="popular" sx={{ color: "black" }}>
          <em>Most Popular</em>
        </MenuItem>
        <MenuItem value="recentlyCreated" sx={{ color: "black" }}>
          <em>Most Recently Added</em>
        </MenuItem>
        <MenuItem value="recentlyUpdated" sx={{ color: "black" }}>
          <em>Most Recently Updated</em>
        </MenuItem>
      </Select>
    </FormControl>
  );
};
export default Sort;
