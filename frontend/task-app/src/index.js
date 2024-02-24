import React from "react";
import { createRoot } from 'react-dom/client';
import "./index.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import TaskProvider from "./context/TaskProvider";
import { BrowserRouter } from "react-router-dom";

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <ChakraProvider>
    <BrowserRouter>
      <TaskProvider>
        <App />
      </TaskProvider>
    </BrowserRouter>
  </ChakraProvider>,
);
