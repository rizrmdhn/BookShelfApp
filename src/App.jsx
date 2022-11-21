import { HashRouter, Route, Routes } from "react-router-dom";
import React from "react";
import "./styles/styles.css";
import AddBooksComponent from "./components/AddBooksComponent";
import DisplayHeader from "./components/DisplayHeader";
import BookListComponents from "./components/BookListComponents";
import UpdateBooksComponents from "./components/UpdateBooksComponents";
import ReadingBookComponent from "./components/ReadingBookComponent";
import FinishedBookComponent from "./components/FinishedBookComponent";


export default function App() {
  return (
    <div>
      <HashRouter>
        <DisplayHeader />
        <Routes>
          <Route exact path="/" element={<AddBooksComponent />} />
          <Route exact path="/Booklist" element={<BookListComponents/>} />
          <Route exact path="/Edit" element={<UpdateBooksComponents/>} />
          <Route exact path="/Reading" element={<ReadingBookComponent />} />
          <Route exact path="/Finished" element={<FinishedBookComponent />} />
        </Routes>
      </HashRouter>
    </div>
  );
}
