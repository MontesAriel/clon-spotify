
import { useState } from "react";
import { FaExternalLinkAlt  } from "react-icons/fa";
import { selectUser } from "../../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { SET_TOKEN } from "../../features/tokenSlice";

const NavbarUser = () => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const [ openMenu, setOpenMenu ] = useState(false);

    const handleClick = () => {
        setOpenMenu(!openMenu);
    }

    const handleClickLogOut = () => {
        dispatch(SET_TOKEN(null))
    }
    
    return(
      <div className="flex flex-col	items-end mb-2">
        <div className="relative">
            {!user?.images?.[0] ?
                    <div  onClick={handleClick} className="button-user cursor-pointer w-7 h-7 text-sm bg-green-400 text-black font-semibold" type="button">
                        <span>A</span>
                    </div>
                : 
                <div className="cursor-pointer hover:backdrop-brightness-200 rounded-full p-1">
                    <img src={user?.images?.[0].url} onClick={handleClick} className="w-7 h-7  rounded-full" />
                </div>
            }
        </div>


        {openMenu &&
            <div id="dropdownAvatar" className="z-10 absolute top-20 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-neutral-700 dark:divide-gray-600">
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUserAvatarButton">
                <li className="flex items-center justify-between dark:hover:bg-neutral-600">
                    <a href="#" className=" px-4 py-2 hover:bg-gray-100 dark:hover:bg-neutral-600 dark:hover:text-white">Account</a>
                    <FaExternalLinkAlt className="mr-4"/>
                </li>
                <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-neutral-600 dark:hover:text-white">Profile</a>
                </li>
                <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-neutral-600 dark:hover:text-white">Settings</a>
                </li>
                </ul>
                <div className="py-2">
                <button onClick={handleClickLogOut} className="text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-neutral-600 dark:text-gray-200 dark:hover:text-white w-full">Log out</button>
                </div>
            </div>
        }
      </div>
    )
}

export default NavbarUser;