import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import Iconify from "src/components/iconify";

const PaginationComponent = ({
  name,
  totalcount,
  limit,
  handleLimitChange,
  handlePrevPage,
  handleNextPage,
  currentPage,
  totalPages,
}) => {
  return (
    <div className="" style={{display:"flex", justifyContent:"space-between",alignItems:"center"}}>
      <p className="fs-14 fw-bold mb-0">
        Total {name}: {totalcount}
      </p>
      <div className="mt-sm-0 mt-4 limit-sec">
        <FormControl variant="outlined" size="small">
          <InputLabel id="limit-label">Limit</InputLabel>
          <Select
            labelId="limit-label"
            id="limit-select"
            value={limit}
            onChange={handleLimitChange}
            label="Limit"
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
            <MenuItem value={totalcount}>All</MenuItem>
          </Select>
        </FormControl>
        <Button onClick={handlePrevPage} disabled={currentPage <= 1}>
          <Iconify icon={"grommet-icons:previous"} />
        </Button>
        <Button onClick={handleNextPage} disabled={currentPage >= totalPages}>
          <Iconify icon={"grommet-icons:next"} />
        </Button>
      </div>
    </div>
  );
};

export default PaginationComponent;
