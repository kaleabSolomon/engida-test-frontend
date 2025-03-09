# JOT

## Overview

**Jot** is a web application built using **React**, **Redux**, **Ant Design**, and **TypeScript**. It allows users to manage tasks by performing operations like creating, updating, and deleting tasks. The app provides a clean and interactive UI with dark mode support, leveraging Ant Design's UI components for smooth user interaction.

## Features

- **Task List**: Display a list of tasks with title, description, status, and creation date.
- **Create Task**: Add new tasks with required fields (title, description, status).
- **Edit Task**: Modify the title, description, and status of existing tasks.
- **Delete Task**: Remove tasks from the list.
- **Error Notifications**: Show error messages when something goes wrong during API calls.

## Tech Stack

- **React**: Frontend library for building the user interface.
- **Redux**: State management for managing tasks and application state.
- **Ant Design**: UI component library for a polished and responsive design.
- **TypeScript**: Superset of JavaScript that provides static typing.

## Setup

To run the project locally, follow the steps below:

### 1. Clone the repository

```
git clone https://github.com/kaleabSolomon/engida-test-frontend
cd engida-test-frontend
```

### 2. Install dependencies

Make sure you have **Node.js** installed. Then, run:

```
pnpm install
```

### 3. Start the app

```
pnpm start
```

This will start the development server and open the app in your default web browser.

### 4. Build for production (optional)

To create a production-ready build, run:

```
pnpm run build
```

## API Integration

This app interacts with a backend API to manage tasks. Ensure the API is running and correctly set up to handle the following endpoints:

- `POST /auth/signup`: Sign up.
- `POST /auth/signin`: Sign in.
- `POST /tasks`: Create a new task.
- `PATCH /tasks/:id`: Update an existing task.
- `DELETE /tasks/:id`: Delete a task.
- `GET /tasks`: Fetch all tasks.

## Contributing

Feel free to fork the repository, make changes, and submit a pull request. Contributions are welcome!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
