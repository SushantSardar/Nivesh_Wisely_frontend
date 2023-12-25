import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import "../Home/Home.css";
import { Link, useLocation } from "react-router-dom";
import { ClientContext } from "../ClientList/clientContext.jsx/ClientContext"

const Home = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const {setLocalLocation } = useContext(ClientContext);
  // const [user, setDropdownOpen] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const [displayUserName, setDisplayUserName] = useState(() =>
    sessionStorage.getItem("displayName")
  );

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const navigate = useNavigate();

  function handleLogout() {
    sessionStorage.removeItem("loginSession");
    setIsLogout(true);
  }

  useEffect(() => {
    if (isLogout) {
      navigate("/");
    }
  }, [isLogout]);

  useEffect(() => {
    setDisplayUserName(() => sessionStorage.getItem("displayName"));
  }, [displayUserName]);
  useEffect(() => {
    const storedDisplayName = sessionStorage.getItem("displayName");
    if (storedDisplayName !== displayUserName) {
      setDisplayUserName(storedDisplayName);
    }
  }, []);

  // link highlight logic starts here
  const location = useLocation();
  setLocalLocation(location)
  const [selectedIndex, setSelectedIndex] = useState();

  useEffect(() => {
    const path = location.pathname;
    switch (path) {
      case "/dashboard":
        setSelectedIndex(0);
        break;
      case "/sendcall":
        setSelectedIndex(1);
        break;
      case "/livecall":
        setSelectedIndex(2);
        break;
      case "/productlist":
        setSelectedIndex(3);
        break;
      case "/reviews":
        setSelectedIndex(4);
        break;
      case "/clientlist":
        setSelectedIndex(5);
        break;
      case "/complaint":
        setSelectedIndex(6);
        break;
      case "/editcomplaint":
        setSelectedIndex(6);
        break;
      case "/faq":
        setSelectedIndex(7);
        break;
      case "/editfaq":
        setSelectedIndex(7);
        break;
      case "/users":
        setSelectedIndex(8);
        break;
      case "/edituser":
        setSelectedIndex(8);
        break;
      case "/profile":
        setSelectedIndex(9);
        break;
      case "/factsheet":
        setSelectedIndex(10);
        break;
      case "/addproductlist":
        setSelectedIndex(3);
        break;
      case "/newProduct":
        setSelectedIndex(3);
        break;
      case "/editnewproductlist":
        setSelectedIndex(3);
        break;
      case "/addreview":
        setSelectedIndex(4);
        break;
      case "/addclientlist":
        setSelectedIndex(5);
        break;
      case "/editclient":
        setSelectedIndex(5);
        break;
      case "/addcomplaint":
        setSelectedIndex(6);
        break;
      case "/addfaq":
        setSelectedIndex(7);
        break;
      case '/support':
        setSelectedIndex(17);
        break;
      case '/addsupport':
        setSelectedIndex(17);
        break;
      case "/adduser":
        setSelectedIndex(8);
        break;
      case "/addprofile":
        setSelectedIndex(9);
        break;
      case "/editprofile":
        setSelectedIndex(9);
        break;
      case "/coupon":
        setSelectedIndex(11);
        break;
      case "/addCoupon":
        setSelectedIndex(11);
        break;
      case "/editCoupon":
        setSelectedIndex(11);
        break;
      case "/complaintTable":
        setSelectedIndex(12);
        break;
      case "/addcomplaintRow":
        setSelectedIndex(12);
        break;
      case "/editComplaintRow":
        setSelectedIndex(12);
        break;
      case "/addAnnualComplaintRow":
        setSelectedIndex(13);
        break;
      case "/AnnualComplaintRow":
        setSelectedIndex(13);
        break;
      case "/editAnnualComplaintRow":
        setSelectedIndex(13);
        break;
      case "/ClientComplaintRow":
        setSelectedIndex(14);
        break;
      case "/addClientComplaintRow":
        setSelectedIndex(14);
        break;
      case "/editClientComplaintRow":
        setSelectedIndex(14);
        break;
      case "/suggestions":
        setSelectedIndex(15);
        break;
      case "/sendnotifications":
        setSelectedIndex(16);
        break;
      case "/appMarquee":
        setSelectedIndex(18);
        break;
      case "/addMarquee":
        setSelectedIndex(18);
        break;

      default:
        setSelectedIndex(0); // No match, set index to -1
    }
  }, [location]);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <div>
      {/* <!--  Body Wrapper --> */}
      <div className="homelayout-wrapper">
        {/* <!-- Sidebar Start --> */}
        <div className="left-sidebar">
          {/* <!-- Sidebar scroll--> */}
          <div>
            <div className="brand-logo d-flex align-items-center justify-content-between">
              <a href="./" className="text-nowrap logo-img">
                <img src="/dark_logo NV.svg" width="180" alt="" />
              </a>
            </div>
            {/*  <!-- Sidebar navigation--> */}
            <nav
              className="sidebar-nav scroll-sidebar"
              Style={{ letterSpacing: "1px" }}
              data-simplebar=""
            >
              <ul id="sidebarnav">
                {/* ____________________________________________________________________Dashboard menu Commented_______________________________________________ */}
                {/* <li className="nav-small-cap">
                  <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                  <span className="hide-menu">Home</span>
                </li>
                <li className="sidebar-item">
                  <Link
                    selected={selectedIndex === 0}
                    style={{
                      background: selectedIndex === 0 ? "#259D90" : "",
                      color: selectedIndex === 0 ? "#FFF" : "",
                    }}
                    onClick={(event) => handleListItemClick(event, 0)}
                    className="sidebar-link"
                    to="/dashboard"
                    aria-expanded="false"
                  >
                    <span>
                      <i className="ti ti-layout-dashboard"></i>
                    </span>
                    <span className="hide-menu">Dashboard</span>
                  </Link>
                </li> */}
                <li className="nav-small-cap">
                  <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                  <span className="hide-menu">Menu</span>
                </li>
                <li className="sidebar-item">
                  <Link
                    selected={selectedIndex === 5}
                    style={{
                      background: selectedIndex === 5 ? "#259D90" : "",
                      color: selectedIndex === 5 ? "#FFF" : "",
                    }}
                    onClick={(event) => handleListItemClick(event, 5)}
                    className="sidebar-link"
                    to="/clientlist"
                    aria-expanded="false"
                  >
                    <span>
                      <i className="ti ti-typography"></i>
                    </span>
                    <span className="hide-menu">Client List</span>
                  </Link>
                </li>
                <li className="sidebar-item">
                  <Link
                    selected={selectedIndex === 3}
                    style={{
                      background: selectedIndex === 3 ? "#259D90" : "",
                      color: selectedIndex === 3 ? "#FFF" : "",
                    }}
                    onClick={(event) => handleListItemClick(event, 3)}
                    className="sidebar-link"
                    to="/productlist"
                    aria-expanded="false"
                  >
                    <span>
                      <i className="ti ti-aperture"></i>
                    </span>
                    <span className="hide-menu">Product List</span>
                  </Link>
                </li>
                <hr></hr>
                <li className="sidebar-item">
                  <Link
                    selected={selectedIndex === 1}
                    style={{
                      background: selectedIndex === 1 ? "#259D90" : "",
                      color: selectedIndex === 1 ? "#FFF" : "",
                    }}
                    onClick={(event) => handleListItemClick(event, 1)}
                    className="sidebar-link"
                    to="/sendcall"
                    aria-expanded="false"
                  >
                    <span>
                      <i className="ti ti-article"></i>
                    </span>
                    <span className="hide-menu">Send Calls</span>
                  </Link>
                </li>
                <li className="sidebar-item">
                  <Link
                    selected={selectedIndex === 2}
                    style={{
                      background: selectedIndex === 2 ? "#259D90" : "",
                      color: selectedIndex === 2 ? "#FFF" : "",
                    }}
                    onClick={(event) => handleListItemClick(event, 2)}
                    className="sidebar-link"
                    to="/livecall"
                    aria-expanded="false"
                  >
                    <span>
                      <i className="ti ti-alert-circle"></i>
                    </span>
                    <span className="hide-menu">Live calls</span>
                  </Link>
                </li>
                <hr></hr>
                <li className="sidebar-item">
                  <Link
                    selected={selectedIndex === 8}
                    style={{
                      background: selectedIndex === 8 ? "#259D90" : "",
                      color: selectedIndex === 8 ? "#FFF" : "",
                    }}
                    onClick={(event) => handleListItemClick(event, 8)}
                    className="sidebar-link"
                    to="/users"
                    aria-expanded="false"
                  >
                    <span>
                      <i className="ti ti-users"></i>
                    </span>
                    <span className="hide-menu"> Users</span>
                  </Link>
                </li>
                <li className="sidebar-item">
                  <Link
                    selected={selectedIndex === 9}
                    style={{
                      background: selectedIndex === 9 ? "#259D90" : "",
                      color: selectedIndex === 9 ? "#FFF" : "",
                    }}
                    onClick={(event) => handleListItemClick(event, 9)}
                    className="sidebar-link"
                    to="/profile"
                    aria-expanded="false"
                  >
                    <span>
                      <i className="ti ti-user-circle"></i>
                    </span>
                    <span className="hide-menu"> Profile</span>
                  </Link>
                </li>
                {/* <li className="sidebar-item">
              <Link className="sidebar-link" to="/productlist" aria-expanded="false">
                <span>
                  <i className="ti ti-cards"></i>
                </span>
                <span className="hide-menu">Product List</span>
              </Link>
            </li> */}
                <li className="sidebar-item">
                  <Link
                    selected={selectedIndex === 4}
                    style={{
                      background: selectedIndex === 4 ? "#259D90" : "",
                      color: selectedIndex === 4 ? "#FFF" : "",
                    }}
                    onClick={(event) => handleListItemClick(event, 4)}
                    className="sidebar-link"
                    to="/reviews"
                    aria-expanded="false"
                  >
                    <span>
                      <i className="ti ti-file-description"></i>
                    </span>
                    <span className="hide-menu">Reviews</span>
                  </Link>
                </li>
                <li className="sidebar-item">
                  <Link
                    selected={selectedIndex === 7}
                    style={{
                      background: selectedIndex === 7 ? "#259D90" : "",
                      color: selectedIndex === 7 ? "#FFF" : "",
                    }}
                    onClick={(event) => handleListItemClick(event, 7)}
                    className="sidebar-link"
                    to="/faq"
                    aria-expanded="false"
                  >
                    <span>
                      <i className="ti ti-zoom-question"></i>
                    </span>
                    <span className="hide-menu">FAQ</span>
                  </Link>
                </li>
                <hr></hr>
                <li className="sidebar-item">
                  <Link
                    selected={selectedIndex === 6}
                    style={{
                      background: selectedIndex === 6 ? "#259D90" : "",
                      color: selectedIndex === 6 ? "#FFF" : "",
                    }}
                    onClick={(event) => handleListItemClick(event, 6)}
                    className="sidebar-link"
                    to="/complaint"
                    aria-expanded="false"
                  >
                    <span>
                      <i className="ti ti-mood-angry"></i>
                    </span>
                    <span className="hide-menu">Complaint</span>
                  </Link>
                </li>

                {/* <li className="sidebar-item">
                  <Link
                    selected={selectedIndex === 17}
                    style={{
                      background: selectedIndex === 17 ? "#259D90" : "",
                      color: selectedIndex === 17 ? "#FFF" : "",
                    }}
                    onClick={(event) => handleListItemClick(event, 17)}
                    className="sidebar-link" to="/support" aria-expanded="false">
                    <span>
                      <i className="ti ti-aperture"></i>
                    </span>
                    <span className="hide-menu">Support</span>
                  </Link>
                </li> */}
                <li className="sidebar-item">
                  <Link
                    selected={selectedIndex === 15}
                    style={{
                      background: selectedIndex === 15 ? "#259D90" : "",
                      color: selectedIndex === 15 ? "#FFF" : "",
                    }}
                    onClick={(event) => handleListItemClick(event, 15)}
                    className="sidebar-link"
                    to="/suggestions"
                    aria-expanded="false"
                  >
                    <span>
                      <i className="ti ti-cloud"></i>
                    </span>
                    <span className="hide-menu"> Suggestions </span>
                  </Link>
                </li>
                {/* <li className="sidebar-item">
                  <Link
                    selected={selectedIndex === 11}
                    style={{
                      background: selectedIndex === 11 ? "#259D90" : "",
                      color: selectedIndex === 11 ? "#FFF" : "",
                    }}
                    onClick={(event) => handleListItemClick(event, 11)}
                    className="sidebar-link"
                    to="/coupon"
                    aria-expanded="false"
                  >
                    <span>
                      <i className="ti ti-tag"></i>
                    </span>
                    <span className="hide-menu"> Coupons </span>
                  </Link>
                </li> */}
                <li className="sidebar-item">
                  <Link
                    selected={selectedIndex === 12}
                    style={{
                      background: selectedIndex === 12 ? "#259D90" : "",
                      color: selectedIndex === 12 ? "#FFF" : "",
                    }}
                    onClick={(event) => handleListItemClick(event, 12)}
                    className="sidebar-link"
                    to="/complaintTable"
                    aria-expanded="false"
                  >
                    <span>
                      <i className="ti ti-table"></i>
                    </span>
                    <span className="hide-menu"> Complaint Table </span>
                  </Link>
                </li>
                <li className="sidebar-item">
                  <Link
                    selected={selectedIndex === 13}
                    style={{
                      background: selectedIndex === 13 ? "#259D90" : "",
                      color: selectedIndex === 13 ? "#FFF" : "",
                    }}
                    onClick={(event) => handleListItemClick(event, 13)}
                    className="sidebar-link"
                    to="/AnnualComplaintRow"
                    aria-expanded="false"
                  >
                    <span>
                      <i className="ti ti-table"></i>
                    </span>
                    <span className="hide-menu"> Annual Complaint Table </span>
                  </Link>
                </li>
                <li className="sidebar-item">
                  <Link
                    selected={selectedIndex === 14}
                    style={{
                      background: selectedIndex === 14 ? "#259D90" : "",
                      color: selectedIndex === 14 ? "#FFF" : "",
                    }}
                    onClick={(event) => handleListItemClick(event, 14)}
                    className="sidebar-link"
                    to="/ClientComplaintRow"
                    aria-expanded="false"
                  >
                    <span>
                      <i className="ti ti-table"></i>
                    </span>
                    <span className="hide-menu"> Dashboard Complaint Table </span>
                  </Link>
                </li>
                <hr></hr>
                <li className="sidebar-item">
                  <Link
                    selected={selectedIndex === 10}
                    style={{
                      background: selectedIndex === 10 ? "#259D90" : "",
                      color: selectedIndex === 10 ? "#FFF" : "",
                    }}
                    onClick={(event) => handleListItemClick(event, 10)}
                    className="sidebar-link"
                    to="/factsheet"
                    aria-expanded="false"
                  >
                    <span>
                      <i className="ti ti-file-spreadsheet"></i>
                    </span>
                    <span className="hide-menu"> Fact Sheet</span>
                  </Link>
                </li>
                <li className="sidebar-item">
                  <Link
                    selected={selectedIndex === 16}
                    style={{
                      background: selectedIndex === 16 ? "#259D90" : "",
                      color: selectedIndex === 16 ? "#FFF" : "",
                    }}
                    onClick={(event) => handleListItemClick(event, 16)}
                    className="sidebar-link"
                    to="/sendnotifications"
                    aria-expanded="false"
                  >
                    <span>
                      <i className="ti ti-bell"></i>
                    </span>
                    <span className="hide-menu">Notifications</span>
                  </Link>
                </li>
                <li className="sidebar-item">
                  <Link
                    selected={selectedIndex === 18}
                    style={{
                      background: selectedIndex === 18 ? "#259D90" : "",
                      color: selectedIndex === 18 ? "#FFF" : "",
                    }}
                    onClick={(event) => handleListItemClick(event, 18)}
                    className="sidebar-link"
                    to="/appMarquee"
                    aria-expanded="false"
                  >
                    <span>
                      <i className="ti ti-bell"></i>
                    </span>
                    <span className="hide-menu">App Marquee</span>
                  </Link>
                </li>
                {/* <li className="sidebar-item">
              <Link className="sidebar-link" to="/services" aria-expanded="false">
                <span>
                  <i className="ti ti-aperture"></i>
                </span>
                <span className="hide-menu">Services</span>
              </Link></li> */}
              </ul>
            </nav>
            {/*  <!-- End Sidebar navigation --> */}
          </div>
          {/*    <!-- End Sidebar scroll--> */}
        </div>
        {/*   <!--  Sidebar End --> */}
        {/*  <!--  Main wrapper --> */}

        {/* <!--  Header Start -->  */}
        <div className="header-container">
          <div className="header-notifications">
            {/* <div>
              <i className="ti ti-bell-ringing"></i>
            </div> */}
          </div>
          <div className="header-avatar">
            <div className="userProfile">
              <div className="avatar-align">
                <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                  <DropdownToggle tag={"div"}>
                    <img
                      src="../assets/images/profile/user-1.jpg"
                      alt=""
                      width="35"
                      height="35"
                      className="rounded-circle"
                    />
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem header>My Profile</DropdownItem>
                    <DropdownItem style={{ color: "#259D90" }}>
                      Username: {displayUserName}
                    </DropdownItem>
                    <DropdownItem
                      style={{ color: "red" }}
                      onClick={handleLogout}
                    >
                      Logout
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
              <div className="userProfileBaseName">{displayUserName}</div>
            </div>
          </div>
        </div>

        {/* <div className="body-wrapper">
          {/*   <!--  Header Start --> 
          <header className="app-header">
            <nav className="navbar navbar-expand-lg ">
              <div
                className="navbar-collapse justify-content-end px-0"
                id="navbarNav"
              >
                <div>
                  {" "}
                  <div className="navbar-nav">
                    <div className="nav-item">
                      <a
                        className="nav-link nav-icon-hover"
                        href="javascript:void(0)"
                      >
                        <i className="ti ti-bell-ringing"></i>
                        <div
                          className="notification  rounded-circle"
                          style={{ backgroundColor: "#259D90" }}
                        ></div>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="userProfile">
                  <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle tag={"div"}>
                      <img
                        src="../assets/images/profile/user-1.jpg"
                        alt=""
                        width="35"
                        height="35"
                        className="rounded-circle"
                      />
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem header>My Profile</DropdownItem>
                      <DropdownItem style={{ color: "#259D90" }}>
                        Username: {displayUserName}
                      </DropdownItem>
                      <DropdownItem
                        style={{ color: "red" }}
                        onClick={handleLogout}
                      >
                        Logout
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>

                  <span className="userProfileBaseName">{displayUserName}</span>
                </div>
              </div>
            </nav>
          </header>
           <!--  Header End --> 
          <div className="container-fluid"></div>
        </div> */}
      </div>
      <script src="../assets/libs/jquery/dist/jquery.min.js"></script>
      <script src="../assets/libs/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
      <script src="../assets/js/sidebarmenu.js"></script>
      <script src="../assets/js/app.min.js"></script>
      <script src="../assets/libs/apexcharts/dist/apexcharts.min.js"></script>
      <script src="../assets/libs/simplebar/dist/simplebar.js"></script>
      <script src="../assets/js/dashboard.js"></script>
    </div>
  );
};

export default Home;
