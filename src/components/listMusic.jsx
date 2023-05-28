import React, { useEffect, useState } from "react";
import ListStyle from '../styles/listMusic.module.css';
//import LikedSongs from '../images/likedSongs.png';
import TimeImg from '../images/time.png';
import LikeImg from '../images/like.png';
import HeaderComponent from "./header";

function ListMusic() {

    const [musics, setMusics] = useState([]);

    useEffect(() => {
        const fetchAllMusics = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/getliked');
                const data = await response.json();
                setMusics(data);
            } catch (error) {
                console.error('Failed to fetch music', error);
            }
        };

        fetchAllMusics();
    }, []);

    const [isHovered, setIsHovered] = useState([]);

    const handleMouseEnter = (index) => {
        setIsHovered((prevState) => {
            const updatedState = [...prevState];
            updatedState[index] = true;
            return updatedState;
        });
    };

    const handleMouseLeave = (index) => {
        setIsHovered((prevState) => {
            const updatedState = [...prevState];
            updatedState[index] = false;
            return updatedState;
        });
    };

    const handleLikeClick = async (musicId) => {
        try {
            const response = await fetch('http://localhost:8000/api/like', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(musicId),
            });

            if (response.ok) {
                setMusics((prevMusics) =>
                    prevMusics.map((music) =>
                        music.id === musicId ? { ...music, like: !music.like } : music
                    )
                );
            } else {
                console.error('Не удалось выполнить запрос');
            }
        } catch (error) {
            console.error('Произошла ошибка', error);
        }
    };

    //console.log(musics[0])

    return (
        <div className={ListStyle.listContainer}>
            <HeaderComponent />

            <div className={ListStyle.itemsContainer}>
                <table className={ListStyle.tableContainer}>
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
                    <tbody className={ListStyle.listRows}>
                        {musics.map((music, index) => (
                            <tr
                                className={ListStyle.rows}
                                key={music.id}
                                onMouseEnter={() => handleMouseEnter(index)}
                                onMouseLeave={() => handleMouseLeave(index)}
                            >
                                <td className={ListStyle.cel1}>
                                    {isHovered[index] ? (
                                        music.like ? (
                                            <img
                                                onClick={() => handleLikeClick(music.id)}
                                                className={ListStyle.like}
                                                src={LikeImg}
                                                alt="like"
                                            />
                                        ) : (
                                            <img
                                                onClick={() => handleLikeClick(music.id)}
                                                src={LikeImg}
                                                alt="dislike"
                                            />
                                        )
                                    ) : (
                                        index + 1
                                    )}
                                </td>
                                <td
                                    className={ListStyle.cel}
                                    onClick={() => {
                                        window.location.href = `/music/${music.spotify_id}`;
                                    }}
                                >
                                    <div className={ListStyle.style1}>
                                        <img src={music.image_url} alt="image_url" />
                                        <div className={ListStyle.style2}>
                                            <h3>{music.title}</h3>
                                            <h5>{music.artist}</h5>
                                        </div>
                                    </div>
                                </td>
                                <td className={ListStyle.cell1}>{music.album}</td>
                                <td className={ListStyle.cell2}>{music.release_date}</td>
                                <td className={ListStyle.cell3}>
                                    {Math.floor(music.duration / 1000 / 60)}:
                                    {String(Math.floor((music.duration / 1000) % 60)).padStart(2, '0')}
                                    
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ListMusic;