import { RollForm } from "./components/RollForm";
import { FormulaList } from "./components/FormulaList";
import { useEffect } from "react";
import { Link, Routes, Route } from "react-router-dom";

import { changeFavicon } from "../../utils";
import { RollPage } from "./pages/roll-page";

const setupHeader = () => {
  document.title = "VtM helper";
  changeFavicon("/Camarilla_Logo.svg");
};

export const rollRoute = "/vtm/roll";
export const libRoute = "/vtm/lib";

export const VTMRoutes = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center space-x-2">
      <div className="h-screen w-full flex justify-center items-center space-x-2">
        <Link to={rollRoute}>Роличная</Link>
        <Link to={libRoute}>Библиотека</Link>
      </div>
    </div>
  );
};

export const VTMLib = () => {
  return <FormulaList />;
};

export const VTMRoll = () => {
  return <RollPage />;
};

export const VTMapp = () => {
  useEffect(() => {
    setupHeader();
  }, []);
  return (
    <Routes>
      <Route
        path="/vtm"
        element={
          <div className="h-screen w-full flex justify-center items-center space-x-2">
            <div className="h-screen w-full flex justify-center items-center space-x-2">
              <Link to={rollRoute}>Роличная</Link>
              <Link to={libRoute}>Библиотека</Link>
            </div>
          </div>
        }
      />
      <Route
        path={rollRoute}
        element={<RollForm initialValues={{ difficulty: 6 }} />}
      />
      <Route path={libRoute} element={<FormulaList />} />
    </Routes>
  );
};
