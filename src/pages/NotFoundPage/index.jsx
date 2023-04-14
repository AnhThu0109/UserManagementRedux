import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import "./style.css";
import "./../style.css"

function NotFound(){
    const navigate = useNavigate();
    const handleReturn = () => {
        navigate(-1);
    }
    return (
        <div className="px-2 d-flex justify-content-center align-items-center notFound content">
            <img src='https://www.pngitem.com/pimgs/m/51-511432_sadness-crying-sadness-inside-out-characters-hd-png.png'></img>
            <div className="text-center">
                <p>Awww...Don't Cry</p>
                <p className="border border-3 border-warning p-2">It's just a 404 Error!</p>
                <p>The requested URL was not found on this server.</p>
                <button className="btn btn-primary fw-bolder" onClick={handleReturn}>
                    <FontAwesomeIcon icon={faHouse}/> Return
                </button>
            </div>     
        </div>
    )
}

export default NotFound;