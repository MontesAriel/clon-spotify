
import { FaHome, FaSearch  } from "react-icons/fa";
import { SET_PLAYLIST_SELECTED } from "../../features/getTraksPlaylist";
import { useDispatch } from "react-redux";

const Navbar = () => {
    const dispatch = useDispatch();

    const handleClickHome = () => {
        dispatch(SET_PLAYLIST_SELECTED(false));
    }

    return(
        <div className="rounded	bg-neutral-900 p-5 mb-2">
            <div className="flex items-center mb-5">
                <FaHome className="mr-2 text-white"/>
                <button onClick={handleClickHome} className="text-white">Home</button>
            </div>
            <div className="flex items-center">
                <FaSearch className="mr-2"/>
                <h5>Search</h5>
            </div>
        </div>
    )
}

export default Navbar;