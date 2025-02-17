
# Uzbek IT Specialists Salary Data

This is an open-source project that aims to collect, analyze, and visualize salary data for IT professionals in Uzbekistan. The goal of this project is to provide valuable insights for job seekers, companies, and policymakers about the state of the IT job market in the country.

## Table of Contents

- [Project Overview](#project-overview)
- [Data Sources](#data-sources)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

This project focuses on gathering data about salaries, positions, and other relevant job market details of IT specialists in Uzbekistan. The data is collected from multiple sources, analyzed, and visualized to help make informed decisions about career development, hiring trends, and salary expectations.

## Data Sources

The salary data is sourced from the following:
- Online job portals
- Surveys and feedback from professionals in the field
- Publicly available industry reports
- Social media platforms and forums

## Features

- **Salary Insights**: Interactive graphs and charts showcasing salary distributions by role, experience, and location in Uzbekistan.
- **Position Breakdown**: Overview of common IT job roles and their corresponding salary ranges.
- **Experience Level**: Insights into how experience influences salaries.
- **Location Analysis**: Comparison of salaries across different cities in Uzbekistan.

## Installation

### Prerequisites

Before running the project, ensure you have the following installed:

- **Node.js**: [Download and install Node.js](https://nodejs.org/)
- **PostgreSQL**: [Download and install PostgreSQL](https://www.postgresql.org/download/)

Make sure both Node.js and PostgreSQL are properly installed and running on your system.

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/bekforever/it-salary.git
   ```
2. Navigate to the project directory:
   ```bash
   cd it-salary
   ```

### Server Setup

1. Open a terminal and navigate to the `server` folder:
   ```bash
   cd server
   ```
2. Install server dependencies:
   ```bash
   npm install
   ```

3. Set up the PostgreSQL database:
   - Create a new database in PostgreSQL:
     ```bash
     psql -U postgres -c "CREATE DATABASE your_db_name;"
     ```
   - Set up your `.env` file with the PostgreSQL connection details (usually inside the `server` folder).
     Example:
     ```
     DB_USER='your_postgres_user'
     DB_HOST='localhost'
     DB_DATABASE='your_postgres_database'
     DB_PASSWORD='your_postgres_password'
     DB_PORT='5432'
     ```

### Client Setup

1. Open a second terminal and navigate to the `client` folder:
   ```bash
   cd client
   ```
2. Install client dependencies:
   ```bash
   npm install
   ```

## Usage

### Running the Project

To run the project, you need to have both the client and server running in parallel.

1. In the first terminal (inside the `server` folder), start the server:
   ```bash
   npm start
   ```

2. In the second terminal (inside the `client` folder), start the client:
   ```bash
   npm start
   ```

3. Open your browser and go to:
   ```bash
   http://localhost:3000
   ```
   The frontend will interact with the backend API, and you'll see the salary data visualizations.

## Contributing

We welcome contributions! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature-name`)
3. Make your changes and commit them (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature-name`)
5. Create a pull request

Please make sure to follow the coding standards and write clear commit messages.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
