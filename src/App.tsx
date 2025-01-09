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

const darkTheme = createTheme({
  palette: {
    mode: "dark",
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
              <div className="h-screen w-full flex justify-center items-center space-x-2 space-y-2">
                <Link to="/vtm">VTM</Link>
              </div>
            }
          />
          <Route path="/vtm" element={<VTMapp />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
