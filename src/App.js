import "./App.css";
import NavBar from "./Components/NavBar";
import News from "./Components/News";
import { Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import React, { useState } from "react";

const App = (props) => {

  const [progress, setProgress] = useState(0)
  
  const pageSize = 12;
  const apikey = process.env.REACT_APP_NEWS_API 


    return (
      <div>
        <LoadingBar color="#f11946" progress={progress} height={2}/>
        <NavBar />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <News
                setProgress={setProgress}
                key="sports"
                category="sports"
                pageSize={pageSize}
                apikey={apikey}
                categoryColor={"danger"}
              />
            }
          />
          <Route
            exact
            path="/politics"
            element={
              <News
                setProgress={setProgress}
                key="politics"
                category="politics"
                pageSize={pageSize}
                apikey={apikey}
                categoryColor={"success"}
              />
            }
          />
          <Route
            exact
            path="/business"
            element={
              <News
                setProgress={setProgress}
                key="business"
                category="business"
                pageSize={pageSize}
                apikey={apikey}
                categoryColor={"primary"}
              />
            } 
          />
          <Route
            exact
            path="/entertainment"
            element={
              <News
                setProgress={setProgress}
                key="entertainment"
                category="entertainment"
                pageSize={pageSize}
                apikey={apikey}
                categoryColor={"warning"}
              />
            }
          />
          <Route
            exact
            path="/health"
            element={
              <News
                setProgress={setProgress}
                key="health"
                category="health"
                pageSize={pageSize}
                apikey={apikey}
                categoryColor={"info"}
              />
            }
          />
          <Route
            exact
            path="/science"
            element={
              <News
                setProgress={setProgress}
                key="science"
                category="science"
                pageSize={pageSize}
                apikey={apikey}
                categoryColor={"dark"}
              />
            }
          />
          <Route
            exact
            path="/sports"
            element={
              <News
                setProgress={setProgress}
                key="sports"
                category="sports"
                pageSize={pageSize}
                apikey={apikey}
              />
            }
            categoryColor={"success"}
          />
          <Route
            exact
            path="/technology"
            element={
              <News
                setProgress={setProgress}
                key="technology"
                category="technology"
                pageSize={pageSize}
                apikey={apikey}
                categoryColor={"danger"}
              />
            }
          />
        </Routes>
      </div>
    );
}

export default App;
