import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./index.css";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";

import { VTMapp } from "./apps/VTM/vtm-app";
import { DNDapp } from "./apps/DND/dnd-app";
import { DocApp } from "./apps/DOC/doc-app";

// main: "#3d392f",

const darkTheme = createTheme({
  palette: {
    background: {
      default: "#dbd6d5",
    },
    text: {
      primary: "#3b3534",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <div className="h-screen w-full flex justify-center items-center space-x-2">
                <Link to="/vtm">VTM</Link>
                <Link to="/dnd">DND</Link>
                <Link to="/doc">DOC</Link>
              </div>
            }
          />
          <Route path="/vtm" element={<VTMapp />} />
          <Route path="/dnd" element={<DNDapp />} />
          <Route path="/doc" element={<DocApp />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
