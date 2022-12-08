import React, { useState, useEffect } from "react";

// MUI COMPONENTS
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useNavigate } from "react-router-dom";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";

// SERVICES
import SectorService from "services/sectors";

// CONSTANTS
import { Sectors } from "utils/constants";

// STYLE CONSTANTS
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 400,
    },
  },
};

// INTERNAL STYLES FOR MUI COMPONENTS
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

// EDIT SECTOR COMPONENT
export default function AddSector() {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [NameErrorText, setNameErrorText] = useState("");
  const [personName, setPersonName] = useState([]);
  const [sectorErrorText, setsectorErrorText] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreeTermsErrorText, setAgreeTermsErrorText] = useState("");
  const navigate = useNavigate();

  // THIS IS CALL WHEN SECTOR IS GOING TO ADD
  const onSubmit = async (e) => {
    e.preventDefault();

    // NAME FIELD VALIDATION
    if (!name || name.trim().length === 0) {
      setNameErrorText("Please enter Name");
    } else {
      setNameErrorText("");
    }

    // PERSON NAME FIELD VALIDATION
    if (personName.length === 0) {
      setsectorErrorText("Please select at least one Sector");
    } else {
      setsectorErrorText("");
    }

    // AGREE TERMS FIELD VALIDATION
    if (!agreeTerms) {
      setAgreeTermsErrorText("Please agree to the terms and conditions");
    } else {
      setAgreeTermsErrorText("");
    }

    // IF ALL IS GOOD THEN HIT THE API
    if (name && name.trim().length!==0 && personName.length > 0 && agreeTerms) {
      const body = {
        name: name.trim(),
        sectors: personName,
        agreeTerms: agreeTerms,
      };

      // sector add service will hit
      const sector = await SectorService.addSector(body);
      if (!sector.error) navigate("/sector-listing");
      console.log(sector);
    }
  };

  // CHANGE INPUT HANDLER
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div className="Sectors">
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        {/* MAIN CONTENT */}
        <div className={classes.paper}>
          {/* HEADING */}
          <Typography component="h5" variant="h5">
            Add Sector
          </Typography>
          <span>
            Please enter your name and pick the Sectors you are currently
            involved in.
          </span>

          {/* ADD SECTOR FORM */}
          <form className={classes.form} noValidate>
            {/* NAME FIELD */}
            <TextField
              variant="outlined"
              margin="normal"
              required
              type="text"
              fullWidth
              id="Name"
              label="Name "
              name="Name"
              value={name}
              error={!!NameErrorText}
              helperText={NameErrorText}
              onChange={(e) => setName(e.target.value)}
            />

            {/* MULTI SELECTION SELECTOR FIELD */}
            <FormControl sx={{ width: 400 }}>
              <InputLabel id="demo-multiple-checkbox-label">Sectors</InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={personName}
                onChange={handleChange}
                input={<OutlinedInput label="Sectors" />}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
                required
                error={!!sectorErrorText}
              >
                {/* SECTORS MAPPING*/}
                {Sectors.map((item, index) => (
                  <MenuItem key={index} value={item.label}>
                    <Checkbox checked={personName.indexOf(item.label) > -1} />
                    <ListItemText primary={item.label} />
                  </MenuItem>
                ))}
              </Select>

              <span className="SectorError">{sectorErrorText}</span>
            </FormControl>

            {/* AGREEMENT CHECKBOX*/}
            <FormControlLabel
              control={
                <Checkbox
                  value={agreeTerms}
                  onChange={() => setAgreeTerms(!agreeTerms)}
                  color="primary"
                />
              }
              label="Agree to terms"
            />
            <br />
            <span className="SectorError">{agreeTermsErrorText}</span>

            {/* BUTTON GROUP */}
            <div>
              <Button
                type="submit"
                fullWidth
                className={classes.submit}
                variant="contained"
                color="primary"
                onClick={onSubmit}
              >
                Save
              </Button>
              <Button
                fullWidth
                color="primary"
                className={classes.submit}
                onClick={() => navigate("/")}
              >
                Go Back
              </Button>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
}
