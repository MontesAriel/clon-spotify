import { FaArrowRight, FaPlus, FaSearch, FaListUl  } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { selectPlaylist } from "../../features/playlistSlice";
import SpotifyWebApi from "spotify-web-api-js";
import { SET_PLAYLIST_ARRAY, SET_PLAYLIST_SELECTED, SET_TRAKS_PLAYLIST } from "../../features/getTraksPlaylist";

const spotify = new SpotifyWebApi();

const Library = () => {
    const dispatch = useDispatch();
    const playlist = useSelector(selectPlaylist);
    const handlePlaylistClick = async (playlistTraks) => {
        try {
            const response = await spotify.getPlaylistTracks(playlistTraks);
            dispatch(SET_TRAKS_PLAYLIST(response.items));
            dispatch(SET_PLAYLIST_SELECTED(true));

            const playlistSelected = playlist.items.find((playlist) => playlist.id === playlistTraks)
            console.log({playlistSelected})
            if(playlistSelected) {
                dispatch(SET_PLAYLIST_ARRAY(playlist));
            }

        } catch (error) {
            console.error('Error fetching playlist tracks:', error);
        }
    };

    return(
        <div className="rounded bg-neutral-900 p-5 h-full sm:w-48 md:w-62 lg:w-96">
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <svg className="w-5 mr-2" style={{filter: "contrast(0.2)"}} data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 24 24">
                        <path d="M14.5 2.134a1 1 0 0 1 1 0l6 3.464a1 1 0 0 1 .5.866V21a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1V3a1 1 0 0 1 .5-.866zM16 4.732V20h4V7.041l-4-2.309zM3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zm6 0a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1z"></path>
                    </svg>
                    <button className="text-neutral-500 lg:text-base sm:text-xs md:text-xs bg-inherit font-semibold p-0">Your Library</button>
                </div>
                <div className="flex">
                   <FaPlus className="mr-4"/>
                   <FaArrowRight />
                </div>
            </div>

            <div className="flex justify-between items-center mt-10">
                <FaSearch />
                <div className="flex items-center">
                    <span className="text-neutral-400 mr-2 text-xs">Recents</span>
                    <FaListUl /> 
                </div>
            </div>

            <div>
                {playlist?.items ?
                    playlist.items.map((list) =>
                        <div key={list.id} className="flex mt-8 cursor-pointer hover:backdrop-brightness-200 rounded p-2" onClick={() => handlePlaylistClick(list.id)}>
                            <img src={list.images[2]?.url || list.images[0].url} alt="imagen playlist" className="rounded w-12"/>
                            <div className="ml-2">
                                <h4 className="lg:text-lg sm:text-md">{list.name}</h4>
                                <div className="lg:flex">
                                    <span className="text-xs text-neutral-400">{list.type} - </span>
                                    <p className="text-xs text-neutral-400">{list.owner.display_name}</p>
                                </div>
                            </div>
                        </div>
                    )
                : null}
            </div>
        </div>
    );
};

export default Library;
