import { HashRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import SendCall from "./SendCall/SendCall";
import SignIn from "./LoginPage/SignIn";
import SignUp from "./RegistrationPage/Signup";
import { AuthProvider } from "./LoginPage/AuthContext";
import LiveCall from "./LiveCall/LiveCall";
import Dashboard from "./Dashboard/Dashboard";
import React, { useContext, useEffect, useState } from "react";
import Review from "./Review/Review";
import Complaint from "./Complaint/Complaint";
import FAQ from "./Faq/Faq";
import Support from "./Support/Support";
import AddReview from "./Review/AddReview";
import AddClientList from "./ClientList/AddClientList";
import AddComplaint from "./Complaint/AddComplaint";
import AddFaq from "./Faq/AddFaq";
import AddSupport from "./Support/AddSupport";
import AddUser from "./Users/AddUser";
import User from "./Users/User";
import Profile from "./Profile/Profile";
import AddProfile from "./Profile/AddProfile";
import FactSheet from "./FactSheet/FactSheet";
import Services from "./Services/Services";
import { GlobalContextProvider } from "./LoginPage/GlobalContext";
import ProtectedRoute from "./ProtectedRoute";
import NewAddProduct from "./ProductList/NewAddProduct";
import NewProductList from "./ProductList/NewProductList";
import EditNewProductList from "./ProductList/EditNewProductList";
import EditComplaint from "./Complaint/EditComplaint";
import EditFaq from "./Faq/EditFaq";
import EditProfile from "./Profile/EditProfile";
import EditUser from "./Users/EditUser";
import AllClients from "./ClientList/ClientList";
import EditClient from "./ClientList/EditClient";
import ComplaintTable from "./complaintTable/complaintTable";
import CouponList from "./coupon/couponList";
import SuggestionList from "./suggestions/suggestionList";
import AddCoupon from "./coupon/addCoupon";
import EditCoupon from "./coupon/editCoupon";
import AddComplaintRow from "./complaintTable/addComplaintRow";
import EditComplaintRow from "./complaintTable/editComplaintRow";
import AddAnnualComplaintRow from "./annualComplaintTable/addAnnualComplaintRow";
import AnnualComplaintTable from "./annualComplaintTable/annualComplaintTable";
import EditAnnualComplaintRow from "./annualComplaintTable/editAnnualComplaintTable";
import ClientComplaintTable from "./clientComplaintTable/clientComplaintTable";
import AddClientComplaintRow from "./clientComplaintTable/addClientComplaintRow";
import EditClientComplaintRow from "./clientComplaintTable/editClientComplaintRow";
import SendNotifications from "./SendNotifications/SendNotifications";

import { ClientContext } from "../src/ClientList/clientContext.jsx/ClientContext";
import MarqueeList from "./marqueeForApp/marqueeList";
import AddMarquee from "./marqueeForApp/addMarquee";


const api_url = process.env.REACT_APP_API_URL;

const App = () => {
  const [isValidUser, setIsValidUser] = useState(false);
  const { localLocation } = useContext(ClientContext);
  const { pathname } = localLocation || {};

  return (
    <AuthProvider>
      <GlobalContextProvider>
        <Router>
          <Routes>
            <Route
              path="/"
              element={<ProtectedRoute path="/" element={<SignIn />} />}
            />
            <Route
              path="/signup"
              element={<ProtectedRoute path={"/signup"} element={<SignIn />} />}
            />
            {/* <Route
              path="/signup"
              element={<ProtectedRoute path={"/signup"} element={<SignUp />} />}
            /> */}
            <Route
              path="/dashboard"
              element={<ProtectedRoute element={<Dashboard />} />}
            />
            <Route
              path="/sendcall"
              element={<ProtectedRoute element={<SendCall />} />}
            />
            <Route
              path="/livecall"
              element={<ProtectedRoute element={<LiveCall />} />}
            />
            <Route
              path="/reviews"
              element={<ProtectedRoute element={<Review />} />}
            />
            <Route
              path="/addclientlist"
              element={<ProtectedRoute element={<AddClientList />} />}
            />
            <Route
              path="/clientlist"
              element={<ProtectedRoute element={<AllClients />} />}
            />
            <Route
              path="/editclient"
              element={<ProtectedRoute element={<EditClient />} />}
            />
            <Route
              path="/complaint"
              element={<ProtectedRoute element={<Complaint />} />}
            />
            <Route path="/faq" element={<ProtectedRoute element={<FAQ />} />} />
            {/* <Route
              path="/support"
              element={<ProtectedRoute element={<Support />} />}
            /> */}
            <Route
              path="/users"
              element={<ProtectedRoute element={<User />} />}
            />
            <Route
              path="/profile"
              element={<ProtectedRoute element={<Profile />} />}
            />
            <Route
              path="/factsheet"
              element={<ProtectedRoute element={<FactSheet />} />}
            />
            <Route
              path="/addproductlist"
              element={<ProtectedRoute element={<NewAddProduct />} />}
            />
            <Route
              path="/addreview"
              element={<ProtectedRoute element={<AddReview />} />}
            />
            <Route
              path="/addcomplaint"
              element={<ProtectedRoute element={<AddComplaint />} />}
            />
            <Route
              path="/addfaq"
              element={<ProtectedRoute element={<AddFaq />} />}
            />
            <Route
              path="/addsupport"
              element={<ProtectedRoute element={<AddSupport />} />}
            />
            <Route
              path="/adduser"
              element={<ProtectedRoute element={<AddUser />} />}
            />
            <Route
              path="/addprofile"
              element={<ProtectedRoute element={<AddProfile />} />}
            />
            <Route
              path="/services"
              element={<ProtectedRoute element={<Services />} />}
            />
            <Route
              path="/productlist"
              element={<ProtectedRoute element={<NewProductList />} />}
            />
            <Route
              path="/editnewproductlist"
              element={<ProtectedRoute element={<EditNewProductList />} />}
            />
            <Route
              path="/editcomplaint"
              element={<ProtectedRoute element={<EditComplaint />} />}
            />
            <Route
              path="/editfaq"
              element={<ProtectedRoute element={<EditFaq />} />}
            />
            <Route
              path="/edituser"
              element={<ProtectedRoute element={<EditUser />} />}
            />
            <Route
              path="/editprofile"
              element={<ProtectedRoute element={<EditProfile />} />}
            />
            <Route
              path="/newProduct"
              element={<ProtectedRoute element={<NewAddProduct />} />}
            />
            <Route
              path="/coupon"
              element={<ProtectedRoute element={<CouponList />} />}
            />
            <Route
              path="/addCoupon"
              element={<ProtectedRoute element={<AddCoupon />} />}
            />
            <Route
              path="/editCoupon"
              element={<ProtectedRoute element={<EditCoupon />} />}
            />
            <Route
              path="/complaintTable"
              element={<ProtectedRoute element={<ComplaintTable />} />}
            />
            <Route
              path="/addcomplaintRow"
              element={<ProtectedRoute element={<AddComplaintRow />} />}
            />
            <Route
              path="/editComplaintRow"
              element={<ProtectedRoute element={<EditComplaintRow />} />}
            />
            <Route
              path="/addAnnualComplaintRow"
              element={<ProtectedRoute element={<AddAnnualComplaintRow />} />}
            />
            <Route
              path="/AnnualComplaintRow"
              element={<ProtectedRoute element={<AnnualComplaintTable />} />}
            />
            <Route
              path="/editAnnualComplaintRow"
              element={<ProtectedRoute element={<EditAnnualComplaintRow />} />}
            />
            <Route
              path="/ClientComplaintRow"
              element={<ProtectedRoute element={<ClientComplaintTable />} />}
            />
            <Route
              path="/editClientComplaintRow"
              element={<ProtectedRoute element={<EditClientComplaintRow />} />}
            />
            <Route
              path="/addClientComplaintRow"
              element={<ProtectedRoute element={<AddClientComplaintRow />} />}
            />
            <Route
              path="/suggestions"
              element={<ProtectedRoute element={<SuggestionList />} />}
            />
            <Route
              path="/sendnotifications"
              element={<ProtectedRoute element={<SendNotifications />} />}
            />
            <Route
              path="/appMarquee"
              element={<ProtectedRoute element={<MarqueeList />} />}
            />
            <Route
              path="/addMarquee"
              element={<ProtectedRoute element={<AddMarquee />} />}
            />




            {/* Add your other routes here */}
          </Routes>
        </Router>
      </GlobalContextProvider>
    </AuthProvider>
  );
};

export default App;
