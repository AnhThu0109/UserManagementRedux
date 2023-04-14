import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../../redux/userSlide";
import { Image, message, Button, Modal, Spin, Space, Segmented, Popconfirm } from "antd";
import { UploadOutlined } from "@ant-design/icons";
// Installed by "react-uploader" for upload avatar from computer
import { Uploader } from "uploader";
import { UploadButton } from "react-uploader";
import { getUserById } from "../../utils/getUser";
import updateUser from "../../utils/updateUser";
import { changeFormatDate } from "../../utils/formatDate";
import deleteUser from '../../utils/deleteUser';
import { logOut } from '../../utils/logout';
import Avatar from "../../utils/avatar";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import "./../style.css";
import "./style.css";

function MyAccount() {
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");
  const [input, setInput] = useState({});
  const [isUpdated, setIsUpdated] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const userCurrentData = useSelector(state => state.user.data);
  const dispatch = useDispatch()

  const getUserData = async() => {
    const dataUser = await getUserById(id, token);
    setInput(dataUser);
    dispatch(userData(dataUser));
  };

  //Set time for loading page
  const setLoading = () => {
    setTimeout(() => {
      setIsLoad(true);
    }, 700);
  };

  //Handle change input
  const handleChangeInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInput(values => ({...values, [name]: value}))
  }

  //Update function
  const handleUpdate = async (event) => {
    event.preventDefault();
    let user = {
      "firstname": input.firstname,
      "lastname": input.lastname,
      "username": input.username,
      "email": input.email,
      "phone": input.phone,
      "location": input.location,
      "gender": input.gender,
    }
    try {
      const response = await updateUser(id, token, user);
      if (response.ok) {
        setIsUpdated(true);
        const data = await response.json();
        dispatch(userData(data));
        message.success(`User ${user?.username} is updated successfully !!!`); //Show successful message after updating
      }
      //Handle error 500
      else if (response.status === 500){
        const data = await response.json();
        if(data?.keyPattern?.username){
          setIsUpdated(true);
          message.error(`Username ${data.keyValue.username} is already taken. Please try another !!!`);
        }
        if(data?.keyPattern?.email){
          setIsUpdated(true);
          message.error(`Email ${data.keyValue.email} is already taken. Please try another !!!`);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  //Show modal to update avatar
  const [activeOption, setActiveOption] = useState("Illustrate Images");
  const [avatarSrc, setAvatarSrc] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);

  const uploader = Uploader({ apiKey: "public_kW15bBX9oNC7bM5zxUA86tRCTNPF" }); //Real API key of https://upload.io

  //Function get active option of segmented
  const handleOptionChange = (value) => {
    setActiveOption(value);
    console.log(value);
  };

  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const showModalUpdate = () => {
    setIsModalUpdateOpen(true);
  };

  const handleOkUpdate = () => {
    setActiveIndex(-1); //reset active avatar chosen
    setIsModalUpdateOpen(false);
  };

  const handleCancelUpdate = () => {
    setActiveIndex(-1);
    setIsModalUpdateOpen(false);
    message.error('Upload avatar is canceled !!!');
  };

  //Update avatar function
  const handleUpdateAvatar = async (file) => {
    let user;

    //If user choose update avatar from computer ==> file source != ""
    if (file != "") {
      user = {
        "avatar": file,
      }
    } else {
      user = {
        "avatar": avatarSrc,
      }
    }

    try {
      const data = await updateUser(id, token, user);
      console.log(data);
      if (data) {
        setIsUpdated(true);
        handleOkUpdate(); //To close pop-up
        message.success(`Avatar is updated successfully !!!`); //Show successful message after changing avatar
      }
    } catch (error) {
      console.error(error);
    }
  }

  //Function Upload Avatar from computer
  const completeUploadAvatar = (file) => {
    console.log(file);
    handleUpdateAvatar(file);
  }

  //Confirm delete and show message when cancel delete or delete successful
  const confirm = (e) => {
    console.log(e);
    deleteUserById(id, token);
    message.success(`Your account is deleted successfully !!!`);
  };
  const cancel = (e) => {
    console.log(e);
    message.error('Delete request is canceled !!!');
  };

  //Delete user
  async function deleteUserById(index, tokenUser) {
    const response = await deleteUser(index, tokenUser)
    if (response.ok) {
      await Promise.all([logOut(token), window.location.replace("/login")]);
    } else {
      console.log("error delete");
    }
  }

  useEffect(() => {
    getUserData();
    setIsUpdated(false);
    setLoading();
    clearTimeout(setLoading);
  }, [isUpdated]);

  return (
    <>
      {
        isLoad == true ? (
          <div className="row userInfo py-lg-2 d-flex justify-content-center">
            <div className="col-lg-4 col-sm-11 border-0 bg-white mt-lg-4 mt-sm-3 me-lg-4 rounded-4 p-0">
              <div className="firstCol text-center">
                <Image src="https://demos.creative-tim.com/paper-dashboard/assets/img/damir-bosnjak.jpg" alt="" className="w-100 bgInfoImg"></Image>

                <Image src={userCurrentData?.avatar} alt="Uploaded Image" className="avatar rounded-circle border border-2" />
              </div>

              <div className="firstColInfo text-center pt-2">
                <Button icon={<UploadOutlined />} onClick={showModalUpdate}>Change Avatar</Button>
                <h3 className="pt-3 pb-2">{userCurrentData?.firstname != "" && userCurrentData?.lastname != "" ? (<>{userCurrentData?.firstname} {userCurrentData?.lastname}</>) : ("Unknown")}</h3>
                <p>{userCurrentData?.email}</p>
              </div>

              <div className="ps-3 pb-3">
                <img src="https://cdn-icons-png.flaticon.com/128/4112/4112187.png" className="inconInfo"></img> <b>Created: </b>
                {changeFormatDate(userCurrentData?.createdAt)}
              </div>
              <div className="ps-3 pb-3">
                <img src="https://cdn-icons-png.flaticon.com/128/4112/4112347.png" className="inconInfo"></img> <b>Last updated: </b>
                {changeFormatDate(userCurrentData?.updatedAt)}
              </div>
            </div>
            <div className="col-lg-7 col-sm-11 border-0 bg-white mt-lg-4 mt-sm-3 rounded-4 p-3 mb-sm-3 mb-lg-0">
              <h3 className="fw-lighter">Edit Profile</h3>
              <form className="mb-3" onSubmit={handleUpdate}>
                <div className="row mb-2">
                  <div className="col-lg-6 col-sm-12 mb-3">
                    <label for="" className="form-label text-secondary">First name</label>
                    <input type="text" className="form-control" name="firstname" id="" value={input.firstname || ""} placeholder="First name" onChange={handleChangeInput}></input>
                  </div>
                  <div className="col">
                    <label for="" className="form-label text-secondary">Last name</label>
                    <input type="text" className="form-control" name="lastname" id="" value={input.lastname} placeholder="Last name" onChange={handleChangeInput}></input>
                  </div>
                </div>

                <div className="row mb-2">
                  <div className="col-lg-6 col-sm-12 mb-3">
                    <label for="" className="form-label text-secondary">Username</label>
                    <input type="text" className="form-control" name="username" id="" value={input.username} placeholder="Username" required onChange={handleChangeInput}></input>
                  </div>
                  <div className="col-lg-6 col-sm-12">
                    <label for="" className="form-label text-secondary">Gender</label>
                    <select className="form-select" name="gender" value={input.gender} onChange={handleChangeInput}>
                      <option value="Male" readOnly>Male</option>
                      <option value="Female" readOnly>Female</option>
                    </select>
                  </div>
                </div>

                <div className="row mb-2">
                  <div className="col-lg-6 col-sm-12 mb-3">
                    <label for="" className="form-label text-secondary">Email</label>
                    <input type="email" className="form-control" name="email" id="" value={input.email} placeholder="Email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required onChange={handleChangeInput}></input>
                  </div>
                  <div className="col-lg-6 col-sm-12">
                    <label for="" className="form-label text-secondary">Phone</label>
                    <input type="tel" className="form-control" name="phone" id="" value={input.phone} placeholder="Ex: 0123456789" onChange={handleChangeInput} pattern="[0-9]{10}"></input>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <label for="" className="form-label text-secondary">Address</label>
                    <input type="text" className="form-control" name="location" id="" value={input.location} placeholder="Home Address" onChange={handleChangeInput}></input>
                  </div>
                </div>
                <div className="float-end">
                  {/* Pop-up confirm before delete account */}
                  <Popconfirm
                    placement=""
                    title="Delete user"
                    description="Are you sure to delete your account?"
                    onConfirm={confirm}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Link className="border-0 rounded-pill py-2 px-4 mt-3 fw-bolder text-white text-decoration-none bg-danger deleteBtnAccount me-2">
                      DELETE
                    </Link>
                  </Popconfirm>

                  <button type="submit" className="border-0 rounded-pill py-2 px-4 mt-3 fw-bolder text-white savechangeBtn">UPDATE PROFILE</button>
                </div>
              </form>
            </div>

            {/* Modal of update avatar */}
            <Modal open={isModalUpdateOpen} onOk={handleOkUpdate} onCancel={handleCancelUpdate} footer={[
              <Button key="close" className="okBtnModal fw-bolder" onClick={() => handleUpdateAvatar("")}>
                SAVE
              </Button>,
            ]}>

              <Segmented
                options={['Illustrate Images', 'Upload']}
                // selectedIndex={activeOption}
                onChange={handleOptionChange}>
              </Segmented><br></br>

              {
                activeOption === "Illustrate Images" ? (
                  // Show images when active option is "Illustrate Images" 
                  <div className="row mt-3">
                    {
                      Avatar.map((item, index) => (
                        <div key={index} className="col-3 px-1 pb-2">
                          <img src={item} className={index === activeIndex ? "activeImg rounded-2 w-100" : "rounded-2 w-100"} onClick={() => { setAvatarSrc(item); setActiveIndex(index); }}></img>
                        </div>
                      ))
                    }
                  </div>
                ) : (
                  // Show upload button when active option is "Upload" 
                  <UploadButton uploader={uploader}
                    options={{ multi: false }}
                    onComplete={files => files.map(x => completeUploadAvatar(x.fileUrl))}>
                    {({ onClick }) =>
                      <button onClick={onClick} className="mt-3 btn btn-secondary">
                        Upload your image here...
                      </button>
                    }
                  </UploadButton>
                )
              }
            </Modal>
          </div>
        ) : (
          <Space
            direction="vertical"
            style={{
              width: "100%",
            }}
            className="text-center p-5"
          >
            <Space className="pt-5">
              <Spin tip="Loading" size="large">
                <div className="content" />
              </Spin>
            </Space>
          </Space>
        )
      }
    </>
  );
}

export default MyAccount;
