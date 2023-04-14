import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userData } from '../../redux/userSlide';
import { Outlet, Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePollVertical, faUserGroup, faUser, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { Button, Avatar } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined } from "@ant-design/icons";
import { logOut } from '../../utils/logout';
import { getUserById } from '../../utils/getUser';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import "./style.css";
import "../../index.css";

const Layout = () => {
  const [active, setActive] = useState({
    activeDashboard: false,
    activeUsers: false,
    activeAccount: false,
  });
  const navigate = useNavigate();
  const [token, setToken] = useState();
  const t = localStorage.getItem("token");
  const id = localStorage.getItem("id");
  const activeItem = localStorage.getItem("active");
  const [collapsed, setCollapsed] = useState(false);
  const [title, setTitle] = useState("Dashboard");

  const currentUserData = useSelector(state => state.user.data);
    const dispatch = useDispatch();
    const getUserData = async() => {
        const dataUser = await getUserById(id, t);
        dispatch(userData(dataUser));
      };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  //Save active item of side nav 
  const saveActiveItem = (item) => {
    localStorage.setItem("active", item);
  }

  //Logout func ==> when click login, page redirect to "/login"
  const logoutFunc = async () => {
    await logOut(t);
    setToken("");
    setTitle("Dashboard");
    navigate("/login");
  }

  //Function setting title of Nav bar
  const titleSetting = () => {
    if (activeItem == 1) {
      setTitle("Dashboard");
    }
    if (activeItem == 2) {
      setTitle("Users List");
    }
    if (activeItem == 3) {
      setTitle("My Account");
    }
  }

  //Function setting active menu item when handle click
  const handleMenuItemClick = (item) => {
    setActive({
        activeDashboard: item === 1,
        activeUsers: item === 2,
        activeAccount: item === 3,
    });
    saveActiveItem(item);
  };

  // Set the title and active menu item based on the current URL when the user clicks the browser's back or forward button
  const setTitleCurrentURL = () => {
    const currentPath = window.location.pathname;
    if(currentPath == "/"){
      handleMenuItemClick(1);
      setTitle("Dashboard");
    }
    else if(currentPath == "/users"){
      handleMenuItemClick(2);
      setTitle("Users List");
    }
    else if(currentPath == `/users/${id}`){
      handleMenuItemClick(3);
      setTitle("My Account");
    } 
  } 

  useEffect(() => {
    // Set the initial title and active menu item based on the current URL
    setTitleCurrentURL();
    // Add an event listener to update the title and active menu item when the user clicks the browser's back or forward button
    window.addEventListener('popstate', setTitleCurrentURL);

    setActive({
      activeDashboard: false,
      activeUsers: false,
      activeAccount: false,
    });
    setToken(t);
    titleSetting();

    getUserData();

    return () => {
      // Remove the event listener when the component unmounts
      window.removeEventListener('popstate', setTitleCurrentURL);
    };
  }, [token, currentUserData])

  return (
    <div className={collapsed == true ? "sb-nav-fixed" : "sb-nav-fixed sb-sidenav-toggled"}>
      <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark d-flex justify-content-between">
        <div className="d-flex align-items-center">
          {/* Show title of corresponding chosen side nav item */}
          {
            (t == null || token == "") ? (
              <></>
            ) : (
              <p className="ps-3 titleActive fw-bolder mt-2" href="#">{title}</p>
            )
          }

          {/* Button collapsed menu */}
          <Button
            onClick={toggleCollapsed}
            className="border-0 btnCollapse d-flex align-items-center" id="sidebarToggle"
          >
            {collapsed == true ? <MenuUnfoldOutlined /> : (
              <MenuFoldOutlined />
            )}
          </Button>
        </div>

        {/* Show login before giving credential and show icon with logout button after login successful */}
        {
          (t == null || token == "") ? (
            <div className="float-end p-3">
              <Link to="/login" className='nav-link fw-lighter logInTitle'>
                <FontAwesomeIcon icon={faRightToBracket} className='me-2' />Login
              </Link>
            </div>

          ) : (
            <div className="d-flex justify-content-between p-2 align-items-center">
              <div className="d-flex">
                <div className="logOutTitle">
                  Hello,&nbsp;
                  {currentUserData.firstname != "" ? (currentUserData.firstname) : ("User")}&nbsp;
                </div>
                <div className="dropdown">
                  <button className="border-0 bg-dark dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" style={{color: "rgba(255, 255, 255, 0.5)"}}> 
                  <Avatar className="avatarNavBar"
                      style={{
                        backgroundColor: '#51cbce',
                        marginTop: -5,
                      }}
                      icon={<UserOutlined />}
                    />
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li><Link className="dropdown-item" onClick={logoutFunc}>Logout</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          )
        }
      </nav>

      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <nav className="sb-sidenav accordion sb-sidenav-dark">
            <div className="sb-sidenav-menu">
              <div className="nav">
                <li className={active.activeDashboard == true || activeItem == 1 ? "active" : ""}>
                  <div className="menuList">
                    <Link className="nav-link pe-2" to="/" onClick={t != null && (() => { handleMenuItemClick(1); setTitle("Dashboard"); })}>
                      <FontAwesomeIcon icon={faSquarePollVertical} className='me-2' />
                      Dashboard
                    </Link>
                  </div>
                </li>

                <li className={active.activeUsers == true || activeItem == 2 ? "active" : ""}>
                  <div className="menuList">
                    <Link className="nav-link pe-2" to="/users" onClick={t != null && (() => { handleMenuItemClick(2); setTitle("Users List"); })}>
                      <FontAwesomeIcon icon={faUserGroup} className='me-2' />
                      Total Users
                    </Link>
                  </div>
                </li>

                {
                  t != null &&
                  <li className={active.activeAccount == true || activeItem == 3 ? "active" : ""}>
                    <div className="menuList">
                      <Link className="nav-link pe-2" to={`/users/${id}`} onClick={t != null && (() => { handleMenuItemClick(3); setTitle("My Account"); })}><FontAwesomeIcon icon={faUser} className='me-2' />My Account</Link>
                    </div>
                  </li>
                }
              </div>
            </div>
          </nav>
        </div>

        <div id="layoutSidenav_content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;