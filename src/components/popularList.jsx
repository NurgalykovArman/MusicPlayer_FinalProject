import React, { /*useState, useEffect*/ } from 'react';
import SearchStyle from '../styles/searchMusic.module.css';
import TimeImg from '../images/time.png';

function PopularList({ tracks }){
    return (
        <div>
            <div className={SearchStyle.emptyContainer}>
                    {/* Content for empty input case */}
                    
                    <div className={SearchStyle.itemsContainer}>

                        <table className={SearchStyle.tableContainer}>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Title</th>
                                    <th>Album</th>
                                    <th>Release Date</th>
                                    <th>
                                        <img src={TimeImg} alt="time" />
                                    </th>
                                </tr>
                            </thead>
                            <tbody className={SearchStyle.listRows}>
                                {tracks.map((track, index) => (
                                    <tr
                                        className={SearchStyle.rows}
                                        key={track?.track?.id}
                                    >
                                        <td className={SearchStyle.cel1}>
                                            {index + 1}
                                        </td>
                                        <td
                                            className={SearchStyle.cel}
                                            onClick={() => {
                                                window.location.href = `/music/${track.track.id}`;
                                            }}
                                        >
                                            <div className={SearchStyle.style1}>
                                                <img src={track?.track?.album?.images[0]?.url} alt="image_url" />
                                                <div className={SearchStyle.style2}>
                                                    <h3>{track?.track?.name}</h3>
                                                    <h5>{track?.track?.album?.artists[0]?.name}</h5>
                                                </div>
                                            </div>
                                        </td>
                                        <td className={SearchStyle.cell1}>{track?.track?.album?.name}</td>
                                        <td className={SearchStyle.cell2}>{track?.track?.album?.release_date}</td>
                                        <td className={SearchStyle.cell3}>
                                            {Math.floor(track?.track?.duration_ms / 1000 / 60)}:
                                            {String(Math.floor((track?.track?.duration_ms / 1000) % 60)).padStart(2, '0')}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
        </div>
    );

}

export default  PopularList;