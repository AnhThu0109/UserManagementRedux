import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { Spin, Space, Tooltip } from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartColumn, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { getAllUser } from "../../utils/getUser";
import { changeFormatDate, changeFormatDate1 } from "../../utils/formatDate";
import { getAllLoginTimes } from "../../utils/loginTimes";
import { fetchDataWeather, showIcon } from "../../utils/weather";
import showBrief from "../../utils/showBrief";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./style.css";

function DashBoard() {
    const userToken = localStorage.getItem("token");
    const [users, setUsers] = useState();
    const [dataTopActiveChart, setDataTopActiveChart] = useState();
    const [recentAddedUser, setRecentAddedUser] = useState();
    const [recentUpdatedUser, setRecentUpdatedUser] = useState();
    const [isLoad, setIsLoad] = useState(false);

    //Set time for loading page
    const setLoading = () => {
        setTimeout(() => {
            setIsLoad(true);
        }, 1000);
    };

    //Function to get recently user added/updated 
    //PropertyFilter will be "createdAt"/ "updatedAt"
    const getRecentlyUser = (propertyFilter, users, todayTime) => {
        let arr = users.filter(person => {
            const time = new Date(person[propertyFilter]);

            //Get users added/updated today
            return time.getDate() === todayTime.getDate() && time.getMonth() === todayTime.getMonth() && time.getFullYear() === todayTime.getFullYear();
        });
        //Sort property desc
        arr = arr.sort((a, b) => { return new Date(b[propertyFilter]) - new Date(a[propertyFilter]) });

        //Take 3 top users
        const newArr = [];
        for (let i = 0; i < 3; i++) {
            newArr.push(arr[i]);
        }
        return newArr;
    }

    //Function to get username of top active users | arr is top ten user arr
    const getUsername = async (arr) => {
        const data = await getAllUser(userToken);
        const username = [];
        arr.map((item) => {
            data.map(user => {
                if (item.userId == user._id) {
                    username.push(user.username);
                }
            })
        })
        return username;
    }

    //Fetching weather in 3 days
    const [weather, setWeather] = useState();
    const [currentIcon, setCurrentIcon] = useState();
    const [displayIcon, setDisplayIcon] = useState([]);
    const [keyWord, setKeyWord] = useState("");
    const [isError, setIsError] = useState(false);
    const [errorMess, setErrorMess] = useState("");
    const [fTemp, setFTemp] = useState(false);

    //Fetch data weather
    const fetchWeather = async (location) => {
        //If not search keyword yet ==> show weather of user's current location || show weather of seaching location
        if (!location) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords; //latitude-longitude: units represent the coordinates at geographic coordinate system (vĩ độ-kinh độ)
                    fetchDataWeather(`${latitude},${longitude}`)
                        .then((json) => {
                            console.log("weather data", json);
                            setWeather(json);
                            setCurrentIcon(showIcon(json.current.condition.text));
                            let newArr = [];
                            //Take condition text of days
                            json.forecast.forecastday.map((item) => {
                                let source = showIcon(item.day.condition.text);
                                newArr.push(source);
                            });
                            setDisplayIcon(newArr);
                        })
                        .catch((error) => {
                            setIsError(true);
                            setErrorMess("Sorry. Your location is not found.");
                        });
                }
            );
        } else {
            fetchDataWeather(location)
                .then((json) => {
                    setWeather(json);
                    setCurrentIcon(showIcon(json.current.condition.text));
                    let newArr = [];
                    json.forecast.forecastday.map((item) => {
                        let source = showIcon(item.day.condition.text);
                        newArr.push(source);
                    });
                    setDisplayIcon(newArr);
                })
                .catch((error) => {
                    setIsError(true);
                    setErrorMess("Location is not found. Please type again!!!");
                });
        }
    };

    //Handle submit for form of searching location
    const handleSubmit = (e) => {
        e.preventDefault();
        if (keyWord.trim() !== "") {
            fetchWeather(keyWord);
        }
    };

    useEffect(() => {
        //Get all users ==> total users in system & top 3 added/updated
        async function getData() {
            await getAllUser(userToken)
                .then(data => {
                    setUsers(data);
                    const today = new Date();

                    //Take 3 recently added users (who was added today)
                    let recentAddedArr = getRecentlyUser("createdAt", data, today);
                    //Just take defined user
                    let addedArr = recentAddedArr.filter(user => user !== undefined);
                    setRecentAddedUser(addedArr);

                    //Take 3 recently updated users (who was updated today)
                    let recentUpdatedArr = getRecentlyUser("updatedAt", data, today);
                    //Just take defined user
                    let updatedArr = recentUpdatedArr.filter(user => user !== undefined);
                    setRecentUpdatedUser(updatedArr);
                })
        }

        //Get all login times of top 10 users for map data
        async function getAllLoginTimesOfUsers() {
            await getAllLoginTimes()
                .then(async data => {
                    //Chart data
                    //Sort data based on logintime desc
                    const arr = [];

                    data.sort((a, b) => b.logintime - a.logintime);

                    //Take 10 top activity users
                    for (let i = 0; i < 10; i++) {
                        arr.push(data[i]);
                    }

                    //labels for chart by username
                    const username = await getUsername(arr);

                    let dataLoginTime = [];
                    //Take labels as username and data as logintimes for chart
                    arr.map((item) => {
                        dataLoginTime.push(item.logintime);
                    })

                    let dataChart = {
                        labels: username,
                        datasets: [
                            {
                                label: "Number of logins",
                                backgroundColor: "rgb(81, 203, 206)",
                                borderColor: "rgb(255, 99, 132)",
                                data: dataLoginTime,
                            },
                        ],
                    };

                    setDataTopActiveChart(dataChart);
                })
        }
        getData();
        getAllLoginTimesOfUsers();

        //On first render, weather forecast will show current location of user
        if (keyWord.trim() == "") {
            fetchWeather();
        }

        setIsError(false)
        setLoading();
        clearTimeout(setLoading);
    }, [keyWord])

    return (
        <>
            {
                isLoad == true ? (
                    <div className="px-3 pt-3">
                        <div className="row">
                            {/* Show card of total number users */}
                            <div className="col-lg-4 col-sm-12 mb-3">
                                <div className="bg-white border-0 rounded-3 card-item p-3">
                                    <p className="d-flex justify-content-between align-items-center fw-bolder text-black-50">Total Number of Users
                                        <img src='https://cdn-icons-png.flaticon.com/512/10156/10156019.png' className="dashboardIcon"></img>
                                    </p>
                                    <hr></hr>
                                    <div>{users?.length} users</div>
                                </div>
                            </div>

                            {/* Show card of recently added users */}
                            <div className="col-lg-4 col-sm-12 mb-3">
                                <div className="bg-white border-0 rounded-3 card-item p-3">
                                    <p className="d-flex justify-content-between align-items-center fw-bolder text-black-50">Recently Added Users
                                        <img src='https://cdn-icons-png.flaticon.com/512/4951/4951228.png' className="dashboardIcon"></img>
                                    </p>
                                    <hr></hr>

                                    {/* Display 3 user recently created today */}
                                    <div>
                                        {
                                            recentAddedUser && recentAddedUser?.length != 0 ? (
                                                recentAddedUser?.map((item, index) => (
                                                    <div key={index} className='d-flex justify-content-between'>
                                                        <div>
                                                            {item?.firstname}&nbsp;
                                                            {item?.lastname}
                                                        </div>
                                                        <div>
                                                            {
                                                                changeFormatDate(item?.createdAt)
                                                            }
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <>There is no user added today.</>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>

                            {/* Show card of recently updated users */}
                            <div className="col-lg-4 col-sm-12 mb-3">
                                <div className="bg-white border-0 rounded-3 card-item p-3">
                                    <p className="d-flex justify-content-between align-items-center fw-bolder text-black-50">Recently Updated Users
                                        <img src='https://cdn-icons-png.flaticon.com/512/5511/5511397.png' className="dashboardIcon"></img>
                                    </p>
                                    <hr></hr>

                                    {/* Display 3 user recently updated today */}
                                    <div>
                                        {
                                            recentUpdatedUser && recentUpdatedUser?.length != 0 ? (
                                                recentUpdatedUser?.map((item, index) => (
                                                    <div key={index} className='d-flex justify-content-between'>
                                                        <div>
                                                            {item?.firstname}&nbsp;
                                                            {item?.lastname}
                                                        </div>
                                                        <div>
                                                            {
                                                                changeFormatDate(item?.updatedAt)
                                                            }
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <>There is no user updated their infomation today.</>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Chart of top ten active users */}
                        <div className="row">
                            <div className="barChart col-sm-12 col-lg-7">
                                <div className="col-xl-6 chartContent">
                                    <div className="card chartBody">
                                        <div className="card-header fw-bolder">
                                            <FontAwesomeIcon icon={faChartColumn} className='me-2'></FontAwesomeIcon>
                                            Top Ten Active Users
                                        </div>
                                        <div style={{ height: "88%" }}>
                                            {
                                                dataTopActiveChart &&
                                                <Bar data={dataTopActiveChart} />
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12 col-lg-5 mb-2">
                                <div className="weatherForcast bg-white rounded-3 p-3">
                                    <form className="searchFormLocation ms-2 mb-1" onSubmit={handleSubmit}>
                                        <input className="border-0 fw-bolder text-black-50" type="text" name="keyword" id="keyword" value={keyWord} onChange={(e) => setKeyWord(e.target.value)} style={{ width: "80%" }} placeholder="Search location..." />
                                        <button type="submit" className="border-0 bg-white"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                                    </form>

                                    {
                                        isError == true || weather?.error ? (
                                            <p className="text-danger">{errorMess}</p>
                                        ) : (
                                            <>
                                                <p className="text-center fw-bolder locationWeather">{weather?.location?.name} - {weather?.location?.country}</p>
                                                < div className="row mx-2 text-white weatherItems">
                                                    <Tooltip title={weather?.current?.condition?.text}>
                                                        <div className="col text-center pt-2 rounded-4 weatherItem2 me-2 mb-2">
                                                            <p className="fw-bolder">{changeFormatDate1(weather?.forecast?.forecastday[0]?.date)}</p>
                                                            <img src={currentIcon} className="weatherIcon"></img>
                                                            <p className="temperature">
                                                                {
                                                                    fTemp == false ? (weather?.current?.temp_c) : (weather?.current?.temp_f)
                                                                }
                                                                <sup>o</sup>
                                                                <button className="rounded-circle border-0 ms-1 fw-bolder" onClick={() => setFTemp(!fTemp)}>
                                                                    {
                                                                        fTemp == false ? (<>C</>) : (<>F</>)
                                                                    }
                                                                </button>
                                                            </p>
                                                            <small className="textCondition">
                                                                {showBrief(weather?.current?.condition?.text, 20)}
                                                            </small>
                                                        </div>
                                                    </Tooltip>
                                                    <Tooltip title={weather?.forecast?.forecastday[1]?.day?.condition?.text}>
                                                        <div className="col text-center pt-2 rounded-4 weatherItem me-2">
                                                            <p className="fw-bolder">{changeFormatDate1(weather?.forecast?.forecastday[1]?.date)}</p>
                                                            <img src={displayIcon && displayIcon[1]} className="weatherIcon"></img>
                                                            <p className="temperature">
                                                                {
                                                                    fTemp == false ? (weather?.forecast?.forecastday[1]?.day?.avgtemp_c) : (weather?.forecast?.forecastday[1]?.day?.avgtemp_f)
                                                                }
                                                                <sup>o</sup>
                                                                <button className="rounded-circle border-0 ms-1 fw-bolder" onClick={() => setFTemp(!fTemp)}>
                                                                    {
                                                                        fTemp == false ? (<>C</>) : (<>F</>)
                                                                    }
                                                                </button>
                                                            </p>
                                                            <small className="textCondition">
                                                                {showBrief(weather?.forecast?.forecastday[1]?.day?.condition?.text, 20)}
                                                            </small>
                                                        </div>
                                                    </Tooltip>
                                                    <Tooltip title={weather?.forecast?.forecastday[2]?.day?.condition?.text}>
                                                        <div className="col text-center pt-2 rounded-4 weatherItem">
                                                            <p className="fw-bolder">{changeFormatDate1(weather?.forecast?.forecastday[2]?.date)}</p>
                                                            <img src={displayIcon && displayIcon[2]} className="weatherIcon"></img>
                                                            <p className="temperature">
                                                                {
                                                                    fTemp == false ? (weather?.forecast?.forecastday[2]?.day?.avgtemp_c) : (weather?.forecast?.forecastday[2]?.day?.avgtemp_f)
                                                                }
                                                                <sup>o</sup>
                                                                <button className="rounded-circle border-0 ms-1 fw-bolder" onClick={() => setFTemp(!fTemp)}>
                                                                    {
                                                                        fTemp == false ? (<>C</>) : (<>F</>)
                                                                    }
                                                                </button>
                                                            </p>
                                                            <small className="textCondition">
                                                                {showBrief(weather?.forecast?.forecastday[2]?.day?.condition?.text, 20)}
                                                            </small>
                                                        </div>
                                                    </Tooltip>
                                                </div>
                                            </>

                                        )
                                    }

                                </div>
                            </div>
                        </div>

                    </div >
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
export default DashBoard;