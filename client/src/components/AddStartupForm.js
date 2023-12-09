import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Alert from "@mui/material/Alert";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const AddStartupForm = () => {
  const navigate = useNavigate();
  const [startupData, setStartupData] = useState({
    date: null,
    name: "",
    vertical: "",
    sub_vertical: "",
    city_location: "",
    investors_name: [],
    investment_type: "",
    amount: "",
  });
  const [error, setError] = useState(false);

  const handleChange = (name, value) => {
    setStartupData((prevData) => ({ ...prevData, [name]: value }));
    setError(false);
  };

  const handleDateChange = (date) => {
    handleChange("date", date);
  };

  const handleInvestorsNameChange = (e) => {
    // Convert comma-separated string to an array of strings
    const investorsArray = e.target.value.split(",").map((name) => name.trim());
    handleChange("investors_name", investorsArray);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosInstance.post("/startups", startupData);
      navigate("/");
    } catch (error) {
      setError(true);
      console.error("Error adding startup:", error.message);
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit} style={{ marginTop: "2rem" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "16px",
            maxWidth: "800px",
            margin: "auto",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Date"
                  value={startupData.date}
                  onChange={handleDateChange}
                  required
                />
              </DemoContainer>
            </LocalizationProvider>
            <TextField
              label="Name"
              name="name"
              value={startupData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              required
            />
            <TextField
              label="Vertical"
              name="vertical"
              value={startupData.vertical}
              onChange={(e) => handleChange("vertical", e.target.value)}
            />
            <TextField
              label="Sub-Vertical"
              name="sub_vertical"
              value={startupData.sub_vertical}
              onChange={(e) => handleChange("sub_vertical", e.target.value)}
            />
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <TextField
              label="City Location"
              name="city_location"
              value={startupData.city_location}
              onChange={(e) => handleChange("city_location", e.target.value)}
            />
            <TextField
              label="Investors Name"
              name="investors_name"
              value={startupData.investors_name.join(", ")}
              onChange={handleInvestorsNameChange}
            />
            <TextField
              label="Investment Type"
              name="investment_type"
              value={startupData.investment_type}
              onChange={(e) => handleChange("investment_type", e.target.value)}
            />
            <TextField
              label="Amount ₹"
              name="amount"
              type="number"
              value={startupData.amount}
              onChange={(e) => handleChange("amount", e.target.value)}
            />
          </div>
        </div>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ margin: "auto", display: "block", marginTop: "2rem" }}
        >
          Add Startup
        </Button>
        {error && (
          <Alert
            style={{ margin: "auto", marginTop: "2rem", width: "50%" }}
            severity="error"
          >
            Form Submission Failed
          </Alert>
        )}
      </form>
    </Container>
  );
};

export default AddStartupForm;
