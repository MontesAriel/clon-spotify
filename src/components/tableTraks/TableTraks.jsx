import { FaRegClock } from "react-icons/fa";
import PropTypes from 'prop-types';


const TableTraks = ({traksPlaylist}) => {

    const formatTime = (milliseconds) => {
        const seconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };
    
    return(
        <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase  border-b  dark:border-gray-700  dark:text-gray-400">
                            <tr>
                                <th scope="col" className="lg:px-6 sm:px-4 py-3">
                                    #
                                </th>
                                <th scope="col" className="lg:px-6 sm:px-4 py-3">
                                Title
                                </th>
                                <th scope="col" className="px-6 py-3 album-table-visible">
                                    Album
                                </th>
                                <th scope="col" className="px-6 py-3 date-table-visible">
                                    Date added 
                                </th>
                                <th scope="col" className="lg:px-6 sm:px-4 py-3">
                                    <FaRegClock />
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                        {traksPlaylist.map((traks, index) =>
                            <tr key={traks.track.id} >
                                <th scope="row" className="lg:px-6 sm:px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {index + 1}
                                </th>
                                <td className="lg:px-6 sm:px-4 py-4">
                                    {traks.track.name}
                                </td>
                                <td className="px-6 py-4 album-table-visible">
                                    {traks.track.album.name}
                                </td>
                                <td className="px-6 py-4 date-table-visible">
                                    {traks.track.album.release_date}
                                </td>
                                <td className="lg:px-6 sm:px-4 py-4">
                                    {formatTime(traks.track.duration_ms)}
                                </td>
                            </tr>   
                                
                        )}
                        </tbody>
                    </table>
                </div>   
    )
}

TableTraks.propTypes = {
    traksPlaylist: PropTypes.arrayOf(
        PropTypes.shape({
            track: PropTypes.shape({
                id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
                name: PropTypes.string.isRequired,
                album: PropTypes.shape({
                    name: PropTypes.string.isRequired,
                    release_date: PropTypes.string.isRequired,
                }).isRequired,
                duration_ms: PropTypes.number.isRequired,
            }).isRequired,
        }).isRequired
    ).isRequired,
};

export default TableTraks;