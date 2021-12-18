import "./App.css";
import NavBar from "./Components/NavBar";
import News from "./Components/News";
import { Routes, Route } from "react-router-dom";
import React, { Component } from "react";

const pageSize = 12

export default class App extends Component {
  render() {
    return (
      <div>
      <NavBar />
        <Routes>
          <Route exact path="/" element={<News key='sports' category="sports" pageSize={pageSize} categoryColor={'danger'}/>} />
          <Route exact path="/politics" element={<News key='politics' category="politics" pageSize={pageSize} categoryColor={'success'}/>} />
          <Route exact path="/business" element={<News key='business' category="business" pageSize={pageSize} categoryColor={'primary'}/>} />
          <Route exact path="/entertainment" element={<News key='entertainment' category="entertainment" pageSize={pageSize} categoryColor={'warning'}/>} />
          <Route exact path="/health" element={<News key='health' category="health" pageSize={pageSize} categoryColor={'info'}/>} />
          <Route exact path="/science" element={<News key='science' category="science" pageSize={pageSize} categoryColor={'dark'}/>} />
          <Route exact path="/sports" element={<News key='sports' category="sports" pageSize={pageSize} />} categoryColor={'success'}/>
          <Route exact path="/technology" element={<News key='technology' category="technology" pageSize={pageSize} categoryColor={'danger'}/>} />
        </Routes>

        
      </div>
    );
  }
}
