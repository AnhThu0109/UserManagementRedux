import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Dropdown, Button, Space, Modal, Image, Menu, message, Popconfirm, Table, Input, Spin, Badge } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from 'react-highlight-words';
import { getAllUser, getUserById } from '../../utils/getUser';
import { changeFormatDate } from '../../utils/formatDate';
import deleteUser from '../../utils/deleteUser';
import { logOut } from '../../utils/logout';
import registerUser from '../../utils/registerUser';
import "./style.css";
import "./../style.css"

function Users() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const isAdmin = localStorage.getItem("isAdmin");
    const [users, setUsers] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [collapsedContent, setCollapsedContent] = useState(false);
    const [userId, setUserId] = useState();
    const [chosenUser, setChosenUser] = useState();
    const [isDeleted, setIsDeleted] = useState(false);
    const id = localStorage.getItem("userChosenId");
    const loginUserId = localStorage.getItem("id");

    //Set time for loading page
    const setLoading = () => {
        setTimeout(() => {
            setIsLoad(true);
        }, 700);
    };

    //Get id of chosen user for showing modal see detail
    const userChosen = (id) => {
        localStorage.setItem("userChosenId", id);
        setUserId(id);
    }

    //Show modal to see user info
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModalSeeInfo = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    //Confirm delete and show message when cancel delete or delete successful
    const confirm = (e) => {
        console.log(e);
        deleteUserById(id, token);
        message.success(`User ${chosenUser?.username} is deleted successfully !!!`);
    };
    const cancel = (e) => {
        console.log(e);
        message.error('Delete request is canceled !!!');
    };

    //Delete user
    async function deleteUserById(index, tokenUser) {
        const response = await deleteUser(index, tokenUser)
        if (response.ok) {
            if (loginUserId == index) {
                await Promise.all([logOut(token), window.location.replace("/login")]);
            }
            setIsDeleted(true);
            setUserId("");
        } else {
            console.log("error delete");
        }
    }

    //Show modal to add new user
    const [isModalNewOpen, setIsModalNewOpen] = useState(false);
    const showModalNew = () => {
        setIsModalNewOpen(true);
    };
    const handleOkNew = () => {
        setIsModalNewOpen(false);
    };
    const handleCancelNew = () => {
        setIsModalNewOpen(false);
        //Reset state of add new user
        resetAddNew();
        message.error('New user request is canceled !!!');
    };

    //State for add new user
    const [username, setUsername] = useState();
    const [firstname, setFirstname] = useState();
    const [lastname, setLastname] = useState();
    const [password, setPassword] = useState();
    const [phone, setPhone] = useState();
    const [location, setLocation] = useState();
    const [email, setEmail] = useState();
    const [gender, setGender] = useState("Male");
    const [isAddNew, setIsAddNew] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [isLoad, setIsLoad] = useState(false);

    //Handle change of check box "is admin?"
    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
        console.log(event.target.checked);
    };

    //Handle add new user
    const handleAddNew = async e => {
        e.preventDefault();
        try {
            let user = {
                "firstname": firstname,
                "lastname": lastname,
                "username": username,
                "email": email,
                "password": password,
                "gender": gender,
                "phone": phone,
                "location": location,
                "isAdmin": isChecked
            }
            console.log(user);
            const response = await registerUser(user);
            if (response.ok) {
                setIsAddNew(true);
                message.success(`New user is added successfully !!!`);
                handleOkNew();
            } else {
                const data = await response.json();
                if (data.keyValue.username) {
                    message.error(`Username ${data.keyValue.username} is already taken. Please try another.`, [5]); //set message shown in 5s
                }
                if (data.keyValue.email) {
                    message.error(`Email ${data.keyValue.email} is already taken. Please try another.`, [5]);
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    //Reset state of add new user
    const resetAddNew = () => {
        setUsername("");
        setFirstname("");
        setLastname("");
        setPassword("");
        setPhone("");
        setLocation("");
        setEmail("");
        setGender("Male");
        setIsChecked(false);
        setIsAddNew(false);
    }

    //Items in dropdown button of each user row
    //For admin
    const items = [
        {
            key: '1',
            label: (
                <Link rel="noopener noreferrer" className='nav-link' onClick={showModalSeeInfo}>
                    See Detail
                </Link>
            ),
        },
        {
            key: '2',
            label: (
                <Popconfirm
                    placement=""
                    title="Delete user"
                    description="Are you sure to delete this user?"
                    onConfirm={confirm}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                >
                    <Link rel="noopener noreferrer" className='nav-link'>

                        Delete
                    </Link>
                </Popconfirm>
            ),
        },
    ];
    //For normal user
    const itemNormalUser = (
        <Menu>
            <Menu.Item key="1">
                <Link rel="noopener noreferrer" className='nav-link' onClick={showModalSeeInfo}>
                    See Detail
                </Link>
            </Menu.Item>
        </Menu>
    );

    //For table using ant design
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    //Search user using ant design 
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1890ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    //Header for table (normal user)
    const columns = [
        {
            title: 'No.',
            dataIndex: 'key',
        },
        {
            title: 'USERNAME',
            dataIndex: 'username',
            sorter: (a, b) => a.username.localeCompare(b.username),
            sortDirections: ['ascend', 'descend'],
            ...getColumnSearchProps('username'),
        },
        {
            title: 'GENDER',
            dataIndex: 'gender',
            defaultSortOrder: 'descend',
            filters: [
                {
                    text: 'Male',
                    value: 'Male',
                },
                {
                    text: 'Female',
                    value: 'Female',
                },
            ],
            onFilter: (value, record) => record.gender.indexOf(value) === 0,
        },
        {
            title: 'EMAIL',
            dataIndex: 'email',
            sorter: (a, b) => a.username.localeCompare(b.username),
            sortDirections: ['ascend', 'descend'],
            ...getColumnSearchProps('email'),
        },
        {
            title: 'CREATED AT',
            dataIndex: 'created',
        },
    ];

    //Header for table (admin)
    const columnsAdmin = [
        {
            title: 'No.',
            dataIndex: 'key',
        },
        {
            title: 'USERNAME',
            dataIndex: 'username',
            sorter: (a, b) => a.username.localeCompare(b.username),
            sortDirections: ['ascend', 'descend'],
            ...getColumnSearchProps('username'),
        },
        {
            title: 'ROLE',
            dataIndex: 'role',
            defaultSortOrder: 'descend',
            filters: [
                {
                    text: 'Admin',
                    value: 'Admin',
                },
                {
                    text: 'Normal',
                    value: 'Normal User',
                },
            ],
            onFilter: (value, record) => record.role.indexOf(value) === 0,
        },
        {
            title: 'GENDER',
            dataIndex: 'gender',
            defaultSortOrder: 'descend',
            filters: [
                {
                    text: 'Male',
                    value: 'Male',
                },
                {
                    text: 'Female',
                    value: 'Female',
                },
            ],
            onFilter: (value, record) => record.gender.indexOf(value) === 0,
        },
        {
            title: 'EMAIL',
            dataIndex: 'email',
            sorter: (a, b) => a.username.localeCompare(b.username),
            sortDirections: ['ascend', 'descend'],
            ...getColumnSearchProps('email'),
        },
        {
            title: 'CREATED AT',
            dataIndex: 'created',
        },
    ];

    //Data for table
    const data = [];
    users?.map((item, index) => {
        let userData = {
            key: `${index + 1}`,
            username: item.username,
            role: item.isAdmin == true? ("Admin") : ("Normal User"),
            gender: item.gender,
            email: item.email,
            created: isAdmin == "false" ? (
                <>
                    {changeFormatDate(item.createdAt)} &nbsp;&nbsp;
                    <Dropdown overlay={itemNormalUser} trigger={['click']}>
                        <Button onClick={() => userChosen(item._id)}>
                            <Space>
                                <FontAwesomeIcon icon={faEllipsisVertical} className="text-black" />
                            </Space>
                        </Button>
                    </Dropdown>
                </>

            ) : (
                <>
                    {changeFormatDate(item.createdAt)} &nbsp;&nbsp;
                    <Dropdown menu={{ items }} trigger={['click']}>
                        <Button onClick={() => { userChosen(item._id); }}>
                            <Space>
                                <FontAwesomeIcon icon={faEllipsisVertical} className="text-black" />
                            </Space>
                        </Button>
                    </Dropdown>
                </>

            )
        }
        data.push(userData);
    })

    //Function onChange for table
    const onChangeTable = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    useEffect(() => {
        //Get all users
        async function getData() {
            await getAllUser(token)
                .then(data => {
                    console.log(data);
                    setUsers(data);
                })
        }

        //Get user chosen
        async function getUserChosen() {
            await getUserById(userId, token)
                .then(data => {
                    setChosenUser(data);
                    localStorage.setItem("chosenUsername", data.username); //
                    console.log("chosen user", data);
                })
        }

        getData();

        //If choose user by clicking button ==> call getUserChosen to get chosen user data 
        if (userId && userId != "") {
            getUserChosen();
        }
        setIsDeleted(false);
        setIsAddNew(false);

        //Reset state of add new user
        resetAddNew();

        //Loading before render
        setLoading();
        clearTimeout(setLoading);
    }, [currentPage, collapsedContent, userId, isDeleted, isAddNew])

    return (
        <>
            {
                isLoad == true ? (
                    <div className='allAcountContent'>
                        <div className='d-flex justify-content-between'>
                            <h3 className='px-3 pt-3 mb-0 fw-lighter text-black-50'>Total {users?.length} users.</h3>

                            {/* Show add new user icon if isAdmin */}
                            {
                                isAdmin == "false" ? (
                                    <></>
                                ) : (
                                    <Link onClick={showModalNew}>
                                        <FontAwesomeIcon icon={faUserPlus} className='addUser'></FontAwesomeIcon>
                                    </Link>
                                )
                            }
                        </div>

                        {/* Table all users */}
                        <div className='accountTable'>
                            <Table columns={isAdmin == "false"? columns: columnsAdmin} dataSource={data} onChange={onChangeTable} pagination={{ pageSize: 7 }} scroll={{
                                x: 'calc(700px + 50%)',
                            }} className='p-3' />
                        </div>

                        {/* Modal user information */}
                        <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={[
                            <Button key="close" onClick={handleOk} className="okBtnModal fw-bolder">
                                OK
                            </Button>,
                        ]} className='modalSeeInfo'>
                            <div>
                                <Image src={chosenUser?.avatar} className='avatarUserChosen rounded-circle border border-2'></Image>
                                <h4>{chosenUser?.firstname != "" ? (
                                    <>{chosenUser?.firstname} {chosenUser?.lastname}</>
                                ) : (<>Unknown</>)}</h4>
                                <div className='row mt-3'>
                                    <div className="col-lg-6 col-sm-12 mb-1">
                                        <img src="https://cdn-icons-png.flaticon.com/128/9533/9533813.png" className="modalIcon"></img>
                                        <span className=''></span>
                                        <input className='form-control border border-2 rounded-3 px-4 py-1 ms-3' value={chosenUser?.username} readOnly></input>
                                    </div>
                                    <div className="col-lg-6 col-sm-12">
                                        <img src="https://i.ibb.co/4MSQKGX/Capture-removebg-preview.png" className="modalIcon"></img>
                                        <span className=''></span>
                                        <input className='form-control border border-2 rounded-3 px-4 py-1 ms-3' value={chosenUser?.gender == null ? ("Unkown") : (chosenUser?.gender)} readOnly></input>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className="col-lg-6 col-sm-12 mb-1">
                                        <img src="https://cdn-icons-png.flaticon.com/128/9533/9533772.png" className="modalIcon"></img>
                                        <span className=''></span>
                                        <input className='form-control border border-2 rounded-3 px-4 py-1 ms-3' value={chosenUser?.email} readOnly></input>
                                    </div>
                                    <div className="col-lg-6 col-sm-12">
                                        <img src="https://cdn-icons-png.flaticon.com/128/9533/9533758.png" className="modalIcon"></img>
                                        <span className=''></span>
                                        <input className='form-control border border-2 rounded-3 px-4 py-1 ms-3' value={chosenUser?.phone == "" || chosenUser?.phone == undefined ? ("Unkown") : (chosenUser?.phone)} readOnly></input>
                                    </div>
                                </div>
                                <div className="col mb-3">
                                    <img src="https://cdn-icons-png.flaticon.com/128/9533/9533739.png" className="modalIcon"></img>
                                    <span className=''></span>
                                    <input className='form-control border border-2 rounded-3 px-4 py-1 ms-3' value={chosenUser?.location == "" ? ("Unkown") : (chosenUser?.location)} readOnly></input>
                                </div>
                                <p><b>Created at:</b> {changeFormatDate(chosenUser?.createdAt)}</p>
                                <p><b>Last updated at:</b> {changeFormatDate(chosenUser?.updatedAt)}</p>
                            </div>
                        </Modal>

                        {/* Modal add new user */}
                        <Modal open={isModalNewOpen} onOk={handleOkNew} onCancel={handleCancelNew} footer={[]}>
                            <div>
                                <h4 className='text-center fw-bolder titleEdit'>Add New User</h4>

                                <input className="form-check-input me-2" type="checkbox" name="isAdmin" id="isAdmin" checked={isChecked}
                                    onChange={handleCheckboxChange} />
                                <label className="form-check-label" for="isAdmin">
                                    Is Admin?
                                </label>

                                <div className='row pt-3'>
                                    <form className="mb-2" onSubmit={handleAddNew}>
                                        <div className="row">
                                            <div className="col-sm-12 col-lg-6 mb-2">
                                                <label for="" className="form-label text-secondary">First name</label>
                                                <input type="text" className="form-control border border-2" name="" id="firstname" value={firstname} placeholder="First name" onChange={(e) => setFirstname(e.target.value)}></input>
                                            </div>                   <div className="col-sm-12 col-lg-6 mb-2">
                                                <label for="" className="form-label text-secondary">Last name</label>
                                                <input type="text" className="border border-2 form-control" name="" id="lastname" value={lastname} placeholder="Last name" onChange={(e) => setLastname(e.target.value)}></input>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className="col-sm-12 col-lg-6 mb-2">
                                                <label for="" className="form-label text-secondary">Username</label>
                                                <input type="text" className="border border-2 form-control" name="" id="username" value={username} placeholder="Username" required onChange={(e) => setUsername(e.target.value)}></input>
                                            </div>
                                            <div className="col-sm-12 col-lg-6 mb-2">
                                                <label for="" className="form-label text-secondary">Email</label>
                                                <input type="email" className="border border-2 form-control" name="" id="email" value={email} placeholder="abc@gmail.com" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required onChange={(e) => setEmail(e.target.value)}></input>
                                            </div>

                                        </div>

                                        <div className="row">
                                            <div className="col-sm-12 col-lg-6 mb-2">
                                                <label for="" className="form-label text-secondary">Password</label>
                                                <input type="password" className="border border-2 form-control" name="" id="password" value={password} placeholder="Password" required onChange={(e) => setPassword(e.target.value)} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 4 or more characters"></input>
                                            </div>
                                            <div className="col-sm-12 col-lg-6 mb-2">
                                                <label for="" className="form-label text-secondary">Gender</label>
                                                <select className="border border-2 form-select" value={gender} onChange={(e) => setGender(e.target.value)}>
                                                    <option value="Male" readOnly>Male</option>
                                                    <option value="Female" readOnly>Female</option>
                                                </select>
                                            </div>

                                        </div>

                                        <div className='row'>
                                            <div className="col-sm-12 col-lg-6 mb-2">
                                                <label for="" className="form-label text-secondary">Phone (Optional)</label>
                                                <input type="tel" className="border border-2 form-control" name="" id="phone" value={phone} placeholder="0123456789" onChange={(e) => setPhone(e.target.value)} pattern="[0-9]{10}"></input>
                                            </div>
                                            <div className="col-sm-12 col-lg-6 mb-2">
                                                <label for="" className="form-label text-secondary">Address (Optional)</label>
                                                <input type="text" className="border border-2 form-control" name="" id="address" value={location} placeholder="Home Address" onChange={(e) => setLocation(e.target.value)}></input>
                                            </div>
                                        </div>

                                        <button type="submit" className="okBtnModal py-2 px-3 mt-3 fw-bolder text-white rounded-3 float-end">ADD</button>
                                    </form>
                                </div>
                            </div>
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

    )
}
export default Users;