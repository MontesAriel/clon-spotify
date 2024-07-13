import { FaPlayCircle, FaPauseCircle, FaRandom, FaUndo } from "react-icons/fa";
import { FaBackwardStep, FaForwardStep, FaVolumeHigh, FaVolumeXmark  } from "react-icons/fa6";
import PropTypes from 'prop-types';
import { useRef, useState, useEffect } from 'react';

const PlayMusic = ({ track }) => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(1);  
    console.log({volume})
    const handlePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleSeek = (event) => {
        const seekTime = (audioRef.current.duration / 100) * event.target.value;
        audioRef.current.currentTime = seekTime;
    };

    const handleVolumeChange = (event) => {
        const newVolume = event.target.value / 100;
        setVolume(newVolume);
        audioRef.current.volume = newVolume;
    };

    const maxValue = track.duration_ms / 1000;

    useEffect(() => {
        if (!audioRef.current) return;
        
        const updateTime = () => {
            setCurrentTime(audioRef.current.currentTime);
        };
        
        const audio = audioRef.current;
        audio.addEventListener('timeupdate', updateTime);
        
        return () => {
            audio.removeEventListener('timeupdate', updateTime);
        };
    }, [audioRef.current]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    useEffect(() => {
        const range = document.querySelector('.custom-range');
        if (range) {
            range.style.setProperty('--value', (currentTime / maxValue) * 100);
        }
    }, [currentTime]);

    return (
        <div className="w-full flex justify-between mt-8">
            {track && track.album && track.album.images && track.album.images.length > 0 && (
                <>
                    <div className="flex items-center">
                        <img src={track.album.images[0].url} alt={track.album.name} className="md:w-20 sm:w-16 h-20 md:mr-4 sm:mr-2 " />
                        <div>
                            <h2 className="text-md">{track.name}</h2>
                            <p className="text-xs">{track.artists.map(artist => artist.name).join(', ')}</p>
                            <p className="text-xs">{track.album.name}</p>
                        </div>
                    </div>
                    <div>
                        {track.preview_url ? (
                            <div>
                                <audio ref={audioRef} src={track.preview_url} />
                                <div className="controls flex flex-col items-center">
                                    <div className="flex items-center mb-2">
                                        <FaRandom className="mr-4 icon-random" />
                                        <div className="flex items-center">
                                            <FaBackwardStep className="icon-step" />
                                            <button onClick={handlePlayPause}>
                                                {isPlaying ? <FaPauseCircle className="icon-play mx-4" /> : <FaPlayCircle className="icon-play mx-4" />}
                                            </button>
                                            <FaForwardStep className="icon-step " />
                                        </div>
                                        <FaUndo className="icon-random ml-4" />
                                    </div>
                                    <div className="flex items-center">
                                        <span className="text-xs">{formatTime(currentTime)}</span>
                                        <input
                                            type="range"
                                            value={(currentTime / maxValue) * 100}
                                            min="0"
                                            max="100"
                                            onChange={handleSeek}
                                            className="custom-range"
                                        />
                                        <span className="text-xs">{formatTime(maxValue)}</span>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p>Vista previa no disponible</p>
                        )}
                    </div>
                    <div className="flex items-center mr-2">
                        {volume == 0 ? <FaVolumeXmark /> : <FaVolumeHigh />}
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={volume * 100}
                            onChange={handleVolumeChange}
                            className="custom-range" style={{width:"100px"}}
                        />
                    </div>
                </>
            )}
        </div>
    );
};

PlayMusic.propTypes = {
    track: PropTypes.shape({
        album: PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
            images: PropTypes.arrayOf(
                PropTypes.shape({
                    url: PropTypes.string,
                    width: PropTypes.number,
                    height: PropTypes.number,
                })
            )
        }),
        artists: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string,
                name: PropTypes.string,
                external_urls: PropTypes.shape({
                    spotify: PropTypes.string,
                }),
            })
        ),
        duration_ms: PropTypes.number,
        explicit: PropTypes.bool,
        external_ids: PropTypes.shape({
            isrc: PropTypes.string,
        }),
        external_urls: PropTypes.shape({
            spotify: PropTypes.string,
        }),
        id: PropTypes.string,
        is_local: PropTypes.bool,
        name: PropTypes.string,
        popularity: PropTypes.number,
        preview_url: PropTypes.string,
        track_number: PropTypes.number,
        type: PropTypes.string,
        uri: PropTypes.string,
    }).isRequired,
};

export default PlayMusic;
