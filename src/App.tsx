import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./index.css";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { RollForm } from "./components/RollForm.tsx";
import { FormulaList } from "./components/FormulaList.tsx";

const darkTheme = createTheme({
  palette: {
    mode: "dark"
  }
});


function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <main className="p-6 grid grid-cols-[1fr_1fr] gap-8">
        <RollForm />
        <FormulaList />
      </main>
    </ThemeProvider>


  );
}

export default App;
