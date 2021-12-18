import { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login/Login";
import Nav from "./components/Navbar/Nav";
import Sidebar from "./components/Sidebar/Sidebar";
import ProtectedRoutes from "./ProtectedRoutes";
import AddBook from "./components/AddBook.jsx/AddBook";
import AddUser from "./components/AddUser/AddUser";
import AddVideo from "./components/AddBook.jsx/AddVideo";
import ErrorPage from "./components/ErrorPage";
import Donation from "./components/Donation";
import SingleView from "./components/SingleView";
import Dashboard from "./components/Dashboard/Dashboard";
import CategoryCard from "./components/HomePage/languageCard";
import AddCategory from "./components/AddBook.jsx/AddCategory";
import AddLink from "./components/AddBook.jsx/AddLink";
import SubCategory from "./components/AddBook.jsx/SubCategory";
import LinkCard from "./components/HomePage/LinkCard";
import StudentCorner from "./components/Dashboard/StudentCorner";
import AddStudentData from "./components/AddBook.jsx/AddStudentData";
import AllCategory from "./components/HomePage/AllCategory";
import FeedbackTable from "./components/Dashboard/FeedbackTable";
import EditLink from "./components/Edits/EditLink";
import UserProtected from "./components/UserProtected";
import UserLogin from "./components/Normal User/UserLogin";
import UserSignup from "./components/Normal User/UserSignup";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    document.body.classList.add("app-bg");
    return () => {
      document.body.classList.remove("app-bg");
    };
  });
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/js/index.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);
  return (
    <BrowserRouter>
      <Nav toggle={toggle} />
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/arabic">
          <CategoryCard url="ARABIC" title={"ARABIC"} />
        </Route>
        <Route path="/journals">
          <CategoryCard url="JOURNAL" title={"JOURNALS"} />
        </Route>
        <Route path="/all-collections">
          <AllCategory />
        </Route>
        <Route path="/english">
          <CategoryCard url="ENGLISH" title="ENGLISH" />
        </Route>
        <Route path="/urdu">
          <CategoryCard url="URDU" title="URDU" />
        </Route>
        <Route path="/kulliyyah">
          <CategoryCard url="KULLIYYAH" title="KULLIYYAH" />
        </Route>
        <Route path="/links">
          <LinkCard />
        </Route>
        <Route path="/student-corner">
          <StudentCorner />
        </Route>
        <Route path="/donation">
          <Donation />
        </Route>
        <Route path="/view/:bookId" component={SingleView} />
        <Route path="/add-user">
          <ProtectedRoutes component={AddUser} />
        </Route>
        <Route path="/add-book">
          <ProtectedRoutes component={AddBook} />
        </Route>
        <Route path="/add-video">
          <ProtectedRoutes component={AddVideo} />
        </Route>
        <Route path="/add-category">
          <ProtectedRoutes component={AddCategory} />
        </Route>
        <Route path="/sub-category">
          <ProtectedRoutes component={SubCategory} />
        </Route>
        <Route path="/dashboard">
          <ProtectedRoutes component={Dashboard} />
        </Route>
        <Route path="/add-link">
          <ProtectedRoutes component={AddLink} />
        </Route>
        <Route path="/add-studentCorner">
          <ProtectedRoutes component={AddStudentData} />
        </Route>
        <Route path="/feedbacks">
          <ProtectedRoutes component={FeedbackTable} />
        </Route>
        <Route path="/edit-link">
          <ProtectedRoutes component={EditLink} />
        </Route>
        <Route path={"/user-login"}>
          <UserLogin />
        </Route>
        <Route path={"/signup"}>
          <UserSignup />
        </Route>
        <Route path="*">
          <ErrorPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
