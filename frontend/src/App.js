import { Route, Routes} from "react-router";
import Content from "./components/Content";

const App = () => {
  return (
    <>
      <div className="firstFlex">
        <div className="columna">
          <div className="content">
            <Routes>
              <Route path="/" element={<Content />}></Route>
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
