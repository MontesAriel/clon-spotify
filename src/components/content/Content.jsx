import PropTypes from 'prop-types';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { selectIsPlaylistSelected, selectTraksPlaylist } from '../../features/getTraksPlaylist';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import TableTraks from '../tableTraks/TableTraks';

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 5,
    },
    desktop: {
        breakpoint: { max: 3000, min: 1524 },
        items: 5,
    },
    desktopDos: {
        breakpoint: { max: 1524, min: 1424 },
        items: 4,
    },
    tablet: {
        breakpoint: { max: 1424, min: 1264 },
        items: 3,
    },
    mobile: {
        breakpoint: { max: 1264, min: 450 },
        items: 2,
    },
    mobileDos: {
        breakpoint: { max: 480, min: 0 },
        items: 1,
    },
};

const Content = ({ recentlyPlayed, topTracks }) => {

    const isPlaylistSelected = useSelector(selectIsPlaylistSelected);
    const traksPlaylist = useSelector(selectTraksPlaylist);
    const [ homeState, setHomeState ] = useState(false);

    useEffect(() => {
        if (isPlaylistSelected) {
            setHomeState(true);
        }
    }, [isPlaylistSelected]);

    
    return (
        <main>
            {homeState && isPlaylistSelected ?
            <TableTraks traksPlaylist={traksPlaylist}/>   
                
            
            :   
            <>
            <div className='mt-10'>
                <h2 className='text-white font-semibold text-xl'>Canciones más reproducidas</h2>
                <Carousel responsive={responsive} className='mt-5'>
                    {topTracks?.items?.map((track) =>
                        track.album && track.album.images && track.album.images.length > 1 && (
                            <div key={track.id} className='hover:backdrop-brightness-200 rounded p-2 cursor-pointer'>
                                <div>
                                    <img src={track.album.images[1].url} alt="imagen album" className='max-w-60 rounded img-carousel' />
                                </div>
                                <div className='mt-1'>
                                    <h4 className='text-white'>{track.album.name}</h4>
                                    <div className='flex text-xs'>
                                        {track.album.artists.map((artist) =>
                                            <h3 key={artist.id} className='mr-1'>{artist.name}</h3>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )
                    )}
                </Carousel>
            </div>

            <div className='mt-10'>
                <h2 className='text-white font-semibold text-xl'>Reproducciones recientes</h2>
                <Carousel responsive={responsive} className='mt-5'>
                    {recentlyPlayed?.items?.map((item) =>
                        item.track && item.track.album && item.track.album.images && item.track.album.images.length > 1 && (
                            <div key={item.track.id} className='hover:backdrop-brightness-200 rounded p-2 cursor-pointer'>
                                <div>
                                    <img src={item.track.album.images[1].url} alt="imagen album" className='max-w-60 rounded img-carousel' />
                                </div>
                                <div className='mt-1'>
                                    <h4 className='text-white'>{item.track.album.name}</h4>
                                    <div className='flex text-xs'>
                                        {item.track.album.artists.map((artist) =>
                                            <h3 key={artist.id} className='mr-1'>{artist.name}</h3>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )
                    )}
                </Carousel>
            </div>
            </>
            }

        </main>
    );
};
Content.propTypes = {
    recentlyPlayed: PropTypes.shape({
        items: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
                name: PropTypes.string.isRequired, 
            })
        )
    })
};

Content.propTypes = {
    topTracks: PropTypes.shape({
        items: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
                name: PropTypes.string.isRequired,
            })
        )
    })
};





export default Content;