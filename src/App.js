import React from "react";
import "./Scss/App.scss";
import FileSharing from "./Container/FileSharing/FileSharing";
import { Route, Routes } from "react-router-dom";
import GetFile from "./Container/GetFile/GetFile";
import NotFound from "./Container/NotFound/NotFound.jsx";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="filesharing/" element={<FileSharing />} />
        <Route path="filesharing/getfile" element={<GetFile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
