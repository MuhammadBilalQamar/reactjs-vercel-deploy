import React, { useEffect, useState } from "react";

// MUI COMPONENTS IMPORTS
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

// SECTOR SERVICE IMPORT
import SectorService from "services/sectors";

// MUI CUSTOM TABLE CELL STYLING
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

// MUI CUSTOM TABLE ROW STYLING
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function SectorListing() {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  // FETCH SECTORS WHEN COMPONENT RENDER
  useEffect(() => {
    (async (_) => {
      const sectors = await SectorService.getAllSectors();
      if (!sectors?.error) setRows(Object.values(sectors?.data));
    })();
  }, []);

  // NAVIGATE TO EDIT SECTOR PAGE WITH SELECTED ID
  const editRecord = (id) => {
    navigate("/edit-sector/" + id);
  };

  // RENDER COMPONENT
  return (
    <>
      {/* MAIN TABLE SECTORS LISTING */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650, marginTop: 2 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">Sectors</StyledTableCell>
              <StyledTableCell align="right">Terms</StyledTableCell>
              <StyledTableCell align="right">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* DYNAMIC ROW MAPPING */}
            {rows.map((row, index) => (
              <StyledTableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.sectors.join(", ")}</TableCell>
                <TableCell align="right">
                  {row.agreeTerms ? "Agree" : "Disagree"}
                </TableCell>
                <TableCell align="right">
                  <div className="EditIcon" onClick={() => editRecord(row.id)}>
                    <EditIcon />
                  </div>
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {rows.length === 0 && <span>No records found</span>}
    </>
  );
}
