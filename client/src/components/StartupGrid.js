import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Grid, Pagination, TextField, Button } from "@mui/material";
import Mycard from "./Mycard";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const StartupGrid = () => {
  const [startups, setStartups] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limitPerPage = 20;
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOptions, setFilterOptions] = useState({
    investment_type: "",
    vertical: "",
  });

  const fetchUsers = async () => {
    try {
      console.log("Fetching users...");
      const response = await axiosInstance.get(
        `/startups?page=${currentPage}&limit=${limitPerPage}&search=${searchQuery}&investment_type=${filterOptions.investment_type}&vertical=${filterOptions.vertical}`
      );

      const { startups, totalPages, currentPage: newPage } = response.data;

      setStartups(startups);
      setTotalPages(totalPages);

      if (startups.length === 0 && newPage > 1) {
        setCurrentPage(newPage - 1);
      } else {
        setCurrentPage(newPage);
      }
    } catch (error) {
      console.error("Error fetching startups:", error.message);
    }
  };

  const fetchTotalPages = async () => {
    try {
      const response = await axiosInstance.get("/startups/count");
      const totalUsers = response.data.numberOfUsers;
      const calculatedTotalPages = Math.ceil(totalUsers / limitPerPage);
      setTotalPages(calculatedTotalPages || 1);
    } catch (error) {
      console.error("Error fetching total pages:", error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      // await fetchTotalPages();
      await fetchUsers();
    };
    fetchData();
  }, [currentPage, searchQuery, filterOptions]);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleTypeChange = (event) => {
    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      investment_type: event.target.value,
    }));
  };
  const handleVerticalChange = (event) => {
    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      vertical: event.target.value,
    }));
  };
  const handleResetFilters = () => {
    setFilterOptions({
      investment_type: "",
      vertical: "",
    });
    setSearchQuery("");
  };

  const handleDeleteStartup = async (startupId) => {
    try {
      await axiosInstance.delete(`/startups/${startupId}`);

      const response = await axiosInstance.get(
        `/startups?page=${currentPage}&limit=${limitPerPage}`
      );
      if (response.data.length === 0 && currentPage > 1) {
        setCurrentPage((prevPage) => prevPage - 1);
      }

      await fetchTotalPages();
      await fetchUsers();
    } catch (error) {
      console.error("Error deleting startup:", error.message);
    }
  };

  return (
    <Container>
      <div>
        <TextField
          label="Search by Name"
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ margin: "1rem" }}
        />
        <TextField
          label="Search by Investment_Type"
          value={filterOptions.investment_type}
          onChange={handleTypeChange}
          style={{ margin: "1rem" }}
        />
        <TextField
          label="Search by Vertical"
          value={filterOptions.vertical}
          onChange={handleVerticalChange}
          style={{ margin: "1rem" }}
        />

        <Button
          variant="outlined"
          style={{ margin: "1rem", marginTop: "1.5rem" }}
          onClick={handleResetFilters}
        >
          Reset Filters
        </Button>
      </div>

      <Grid container spacing={2}>
        {startups.map((startup) => (
          <Grid key={startup._id} item xs={12} sm={6} md={3}>
            <Mycard startup={startup} onDelete={handleDeleteStartup} />
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        size="large"
        style={{ marginTop: "2rem", marginLeft: "auto", marginBottom: "2rem" }}
      />
    </Container>
  );
};

export default StartupGrid;
