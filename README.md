# Startup Directory Web App

Welcome to the Startup Directory Web App! This MERN (MongoDB, Express, React, Node.js) application serves as an interactive platform for exploring and filtering startup data. The project showcases various startups, allowing users to discover details such as company name, city, starting year, and funding amount.

## Project Overview

The app comprises both frontend and backend components, offering a visually appealing grid of startup cards and detailed views. Users can explore startups, filter them based on industry type/domain, and utilize a search bar for specific queries.

## Features

### Frontend Development

1. **Card-Based UI:**
   - Display startups in a visually appealing grid with simple card-based UI.
   - Showcase company name, city, starting year, and funding amount.

2. **Detailed View:**
   - Clicking on a card opens a detailed view of the startup, presenting all available data.
   - Includes a close button for easy dismissal.

3. **Filtering:**
   - Implement a dropdown menu for filtering the list of startups based on industry type/domain.

### Backend Development

#### Routes

| **Route**              | **Method** | **Description**                                     |
|------------------------|------------|-----------------------------------------------------|
| `/count`               | GET        | Count the total number of startups.                 |
| `/`                    | GET        | Get all startups with optional search and filters. |
| `/:id`                 | GET        | Get details of a specific startup by ID.           |
| `/`                    | POST       | Create a new startup.                               |
| `/batch`               | POST       | Add a batch of startups to the database.           |
| `/:id`                 | PUT        | Update details of an existing startup by ID.       |
| `/:id`                 | DELETE     | Delete a specific startup by ID.                    |

### Bonus Features (Optional)

1. **Submit a Startup:**
   - Allow users to submit new startup companies directly from the frontend.
   - Implement a user-friendly form capturing essential details.

2. **Search Functionality:**
   - Integrate a search bar for users to find specific startups based on keywords, industries, or other relevant criteria.

## Installation

1. Clone the repository
2. Install dependencies for both frontend and backend:
   ```bash
   cd startup/client && npm install
   cd ../server && npm install
   ```

3. Set up your MongoDB database and update the connection string in the backend `.env` file.

4. Start the frontend and backend servers:
   ```bash
   # In startup/client
   npm start

   # In startup/server
   npm start
   ```

Visit [http://localhost:3000](http://localhost:3000) to access the Startup Directory Web App.

