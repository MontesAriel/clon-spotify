import PropTypes from 'prop-types';
import { selectIsPlaylistArray, selectIsPlaylistSelected } from '../../features/getTraksPlaylist';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';


const Album = ({ topArtistProps }) => {
    const isPlaylistSelected = useSelector(selectIsPlaylistSelected);
    const playlist = useSelector(selectIsPlaylistArray);
    const [ homeState, setHomeState ] = useState(false);
    useEffect(() => {
        if (isPlaylistSelected) {
            setHomeState(true);
        }
    }, [isPlaylistSelected]);

    return(
        <>
        {homeState && isPlaylistSelected ?
            <header>
                {playlist && playlist.items && (
                    playlist.items.map((item) => (
                        <div key={item.id} className='flex items-center mb-8'>
                            <div>
                                <img src={item.images[1].url} alt="image playlist" className='w-60'/>
                            </div>
                            <div className='ml-3'>
                                <span className='text-xs'>{item.type}</span>
                                <h2 className='lg:text-7xl sm:text-4xl my-5 font-bold text-celular-title'>{item.name}</h2>
                                <div className='flex items-center'>
                                    <h3 className='text-xs font-semibold'>{item.owner.display_name} </h3>
                                    <p className='text-xs ml-1'>• {item.tracks.total} songs</p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </header>
           
            : 
            <header className=" grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 grid-album">
                {topArtistProps && topArtistProps.items && topArtistProps.items.map((playlist) => 
                    <div className=" rounded h-14 flex items-center  hover:backdrop-brightness-200 cursor-pointer" style={{background: "#33333363"}} key={playlist.id}>
                        <div>
                            <img src={playlist.images[2].url} alt='imagen playlist' className='h-14 rounded'/>
                        </div>
                        <div>
                        <h5 className='ml-2 text-white title-album'>{playlist.name}</h5> 
                        </div>
                    </div>
                )}         
            </header>      
        }
        </>
    )
}

Album.propTypes = {
    topArtistProps: PropTypes.shape({
        items: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
                name: PropTypes.string.isRequired,
                images: PropTypes.arrayOf(
                    PropTypes.shape({
                        url: PropTypes.string.isRequired,
                    })
                ).isRequired,
            })
        ),
    })
};


export default Album;