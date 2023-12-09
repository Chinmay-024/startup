import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {
  CardActionArea,
  IconButton,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Mycard({ startup, onDelete }) {
  const [open, setOpen] = useState(false);

  const formattedDate = new Date(startup.date).toLocaleDateString("en-GB");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card sx={{ maxWidth: 300, margin: "1rem", boxShadow: 4 }}>
      <CardActionArea onClick={handleOpen}>
        <CardContent>
          <Typography variant="h6" gutterBottom color="primary">
            {startup.name}
          </Typography>

          {startup.vertical && (
            <Typography variant="body2" color="textSecondary" mb={1}>
              Vertical: {startup.vertical}
            </Typography>
          )}

          {startup.investment_type && (
            <Typography variant="body2" color="textSecondary" mb={1}>
              Investment Type: {startup.investment_type}
            </Typography>
          )}

          <Stack direction="column" spacing={1}>
            {startup.city_location && (
              <Typography variant="body2" color="textSecondary" mb={1}>
                City: {startup.city_location}
              </Typography>
            )}
            <Typography variant="body2" color="textSecondary" mb={1}>
              Start Date: {formattedDate}
            </Typography>
            <Typography
              variant="body2"
              color={
                startup.amount && startup.amount !== 0
                  ? "success.dark"
                  : "error.dark"
              }
            >
              Funding Amount: ₹ {startup.amount || 0}
            </Typography>
            <div>
              <IconButton
                aria-label="delete"
                onClick={() => onDelete(startup._id)}
                sx={{ position: "absolute", bottom: "0.5rem", right: "0.5rem" }}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          </Stack>
        </CardContent>
      </CardActionArea>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle style={{ background: "#2196F3", color: "#fff" }}>
          {startup.name} - Detailed View
        </DialogTitle>
        <DialogContent>
          <TableContainer component={Paper} mb={3}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Field</TableCell>
                  <TableCell>Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>City</TableCell>
                  <TableCell>{startup.city_location || "None"}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Start Date</TableCell>
                  <TableCell>{formattedDate}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Funding Amount</TableCell>
                  <TableCell>₹ {startup.amount || 0}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Vertical</TableCell>
                  <TableCell>{startup.vertical || "None"}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Sub-Vertical</TableCell>
                  <TableCell>{startup.sub_vertical || "None"}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Investors</TableCell>
                  <TableCell>
                    {startup.investors_name.join(", ") || "None"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Investment Type</TableCell>
                  <TableCell>{startup.investment_type || "None"}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
