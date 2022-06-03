import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Profile from "./components/candidate/profile/Profile";
import CreateProfile from "./components/candidate/profile/CreateProfile";
import UpdateProfile from "./components/candidate/profile/UpdateProfile";
import CreateRecruitment from "./components/recruiter/recruitment/CreateRecruitment";
import MyRecruitment from "./components/recruiter/recruitment/MyRecruitment";
import RecruitmentNotAccept from "./components/recruiter/recruitment/RecruitmentNotAccept";
import UpdateRecruitment from "./components/recruiter/recruitment/UpdateRecruitment";
import ScrollBackTop from "./components/scroll_back_top/ScrollBackTop";
import DetailRecruitment from "./components/recruiter/recruitment/DetailRecruitment";
import Cv from "./components/recruiter/cv/Cv";
import "./App.css";
import { ToastContainer } from "react-toastify";
import Header from "./components/header/Header";
import ManagerRecruitment from "./components/admin/manager/ManagerRecruitment";
import ManagerAccount from "./components/admin/manager/ManagerAccount";
import UpdatePass from "./components/updatePass/UpdatePass";
import CreateAccountByAdmin from "./components/admin/manager/CreateAccountByAdmin";
import Footer from "./components/footer/Footer";

function Root() {
  function App({ children }: any) {
    return (
      <div className="App">
        <Header />
        {children}
        <ToastContainer
          position="bottom-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          limit={3}
          draggable
          pauseOnHover
        />
        <ScrollBackTop />
        <Footer />
      </div>
    );
  }
  return (
    <Routes>
      <Route
        path="/"
        element={
          <App>
            <Home />
          </App>
        }
      />
      <Route
        path="/login"
        element={
          <App>
            <Login />
          </App>
        }
      />
      <Route
        path="/register"
        element={
          <App>
            <Register />
          </App>
        }
      />
      <Route
        path="/updatePass"
        element={
          <App>
            <UpdatePass />
          </App>
        }
      />
      <Route
        path="/profile"
        element={
          <App>
            <Profile />
          </App>
        }
      />
      <Route
        path="/profile/create"
        element={
          <App>
            <CreateProfile />
          </App>
        }
      />
      <Route
        path="/profile/update"
        element={
          <App>
            <UpdateProfile />
          </App>
        }
      />
      <Route
        path="/recruitment/create"
        element={
          <App>
            <CreateRecruitment />
          </App>
        }
      />
      <Route
        path="/recruitment/detail/:id"
        element={
          <App>
            <DetailRecruitment />
          </App>
        }
      />
      <Route
        path="/recruitment/myRecruitment"
        element={
          <App>
            <MyRecruitment />
          </App>
        }
      />
      <Route
        path="/recruitment/update/:id"
        element={
          <App>
            <UpdateRecruitment />
          </App>
        }
      />
      <Route
        path="/recruitment/warning"
        element={
          <App>
            <RecruitmentNotAccept />
          </App>
        }
      />
      <Route
        path="/recruitment/manager"
        element={
          <App>
            <ManagerRecruitment />
          </App>
        }
      />
      <Route
        path="/profile/manager"
        element={
          <App>
            <Cv />
          </App>
        }
      />
      <Route
        path="/account/manager"
        element={
          <App>
            <ManagerAccount />
          </App>
        }
      />
      <Route
        path="/account/create"
        element={
          <App>
            <CreateAccountByAdmin />
          </App>
        }
      />
    </Routes>
  );
}

export default Root;
