import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Album from "../album/Album";
import Library from "../library/Library";
import NavbarSearch from "../navbarSearch/NavBarSearch";
import NavbarUser from "../navbarUser/NavbarUser";
import { selectTopArtist } from "../../features/topArtistSlice";
import Content from "../content/Content";
import { selectRecentlyPlayed } from "../../features/recentlyPlayedSlice";
import { selectTopTracks } from "../../features/topTracksSlice";
import PlayMusic from "../playMusic/PlayMusic";
import { selectTrack } from "../../features/getTrackSlice";
import { selectIsPlaylistSelected } from "../../features/getTraksPlaylist";

const Home = () => {
    const topArtist = useSelector(selectTopArtist);
    const recentlyPlayed = useSelector(selectRecentlyPlayed);
    const topTracks = useSelector(selectTopTracks);
    const track = useSelector(selectTrack);
    const isPlaylistSelected = useSelector(selectIsPlaylistSelected);
    const [isLoading, setIsLoading] = useState(true);
    const [ homeState, setHomeState ] = useState(false);

    useEffect(() => {
        if (isPlaylistSelected) {
            setHomeState(true);
        }
    }, [isPlaylistSelected]);


    useEffect(() => {
        const isDataLoaded = () => {
            return (
                recentlyPlayed && recentlyPlayed.items && recentlyPlayed.items.length > 0 &&
                topTracks && topTracks.items && topTracks.items.length > 0 &&
                topArtist && topArtist.items && topArtist.items.length > 0 &&
                track && track.album && track.album.images && track.album.images.length > 0
            );
        };

        if (isDataLoaded()) {
            setIsLoading(false);
        } else {
            setIsLoading(true);
        }
    }, [recentlyPlayed, topTracks, track, topArtist]);

    return (
        <>
            {isLoading ? (
                <div className="flex justify-center items-center" style={{ height: "100vh" }}>
                    <div className="remix" role="img" aria-label="Spinning CD made with CSS"></div>
                    <svg width="0" height="0">
                        <defs>
                            <clipPath id="cd-clip-path" clipPathUnits="objectBoundingBox">
                                <path d="M0.5 1C0.776154 1 1 0.776146 1 0.5C1 0.223854 0.776154 0 0.5 0C0.223846 0 0 0.223854 0 0.5C0 0.776146 0.223846 1 0.5 1ZM0.5 0.589996C0.549713 0.589996 0.589996 0.549706 0.589996 0.5C0.589996 0.450294 0.549713 0.410004 0.5 0.410004C0.450287 0.410004 0.410004 0.450294 0.410004 0.5C0.410004 0.549706 0.450287 0.589996 0.5 0.589996Z" />
                            </clipPath>
                        </defs>
                    </svg>
                </div>
            ) : (
                <div >
                    <div className="flex mt-2">
                        <div className="max-w-96 container-library" >
                            <NavbarSearch />
                            <Library />
                        </div>
                        <div className={homeState && isPlaylistSelected ? "background-playlist ml-2 rounded bg-neutral-900 p-5 content-menu md:scroll-auto" : "ml-2 rounded bg-neutral-900 p-5 content-menu md:scroll-auto"}>
                            <NavbarUser />
                            <Album topArtistProps={topArtist} />
                            <Content recentlyPlayed={recentlyPlayed} topTracks={topTracks} />
                        </div>
                    </div>
                    <footer className="w-full flex flex-col items-center justify-center h-24">
                        <PlayMusic track={track} />
                    </footer>
                </div>
            )}
        </>
    );
}

export default Home;
