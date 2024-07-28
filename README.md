# Project Setup Guide

## Client-Side Setup

1. **Navigate to the client-side project directory and install the dependencies:**
    ```sh
    cd dandb-task-client
    npm install
    ```

2. **Build the client-side project:**
    ```sh
    npm run build
    ```

3. **Start the client-side project:**
    ```sh
    npm run start
    ```
    The client-side application should now be running at [http://localhost:3000](http://localhost:3000).

4. **Create a `.env` file with the following content:**
    ```plaintext
    API_BASE_URL=http://localhost:3001
    ```

## Server-Side Setup

1. **Navigate to the server-side project directory and install the dependencies:**
    ```sh
    cd ../dandb-task
    npm install
    ```

2. **Build the server-side project:**
    ```sh
    npm run build
    ```

3. **Start the server-side project:**
    ```sh
    npm run start
    ```
    The server-side application should now be running at [http://localhost:3001](http://localhost:3001).
