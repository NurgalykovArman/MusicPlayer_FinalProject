import React, { useEffect, useState } from "react";
import { /*useDispatch,*/ useSelector } from 'react-redux';
import RightMusicPlayerStyle from '../styles/rightMusicPlaayer.module.css';
import { useParams } from "react-router-dom";
import LikeImg from '../images/like.png'
import DisLikeImg from '../images/dislike.png'
import PrevButton from "./prev";

function RightMusicPlayer() {
  const [music, setMusic] = useState(null);
  const [artistInfo, setArtistInfo] = useState(null);
  const [showContent, setShowContent] = useState(false);
  //const [musicc, setMusicc] = useState(false);
  //const dispatch = useDispatch()
  const accessToken = useSelector(state => state.tokenReducer.token)
  //const accessToken = dispatch(tokenAction());

  const value = useSelector(state => state.rightSideReducer.value)
  console.log(value)
  const { musicId } = useParams();

  useEffect(() => {
    const fetchTrackInfo = async () => {


      try {
        const response = await fetch(`https://api.spotify.com/v1/tracks/${musicId}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        console.log(accessToken)
        const data = await response.json();
        setMusic(data);

        const artistResponse = await fetch(`https://api.spotify.com/v1/artists/${data?.artists[0]?.id}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });

        const artistData = await artistResponse.json();
        setArtistInfo(artistData);

        setShowContent(true);
      } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
      }
    };

    fetchTrackInfo();
  }, [musicId, accessToken]);

  const [isLiked, setIsLiked] = useState(false);

  const handleLikeButtonClick = (id) => {
    console.log(id);
    fetch(`http://localhost:8000/api/updateLikeStatus?spotify_id=${id}`)
      .then(response => {
        if (response.ok) {
          console.log('Запрос успешно выполнен');
          setIsLiked(!isLiked); // Обновляем состояние isLiked
        } else {
          console.error('Ошибка выполнения запроса');
        }
      })
      .catch(error => {
        console.error('Ошибка при выполнении запроса:', error);
      });
  };




  useEffect(() => {
    const fetchMusic = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/getMusic?spotifyId=${musicId}`);
        const data = await response.json();
        
        setIsLiked(data?.[0]?.like || false);
        console.log(1)
      } catch (error) {
        console.error("Ошибка при выполнении запроса:", error);
      }
    };

    fetchMusic();
  }, [musicId]);

  return (
    <div className={RightMusicPlayerStyle.musicContainer}>
      {showContent && (
        <>
          
          {music && artistInfo && <PrevButton music={music} artistInfo={artistInfo}/> }
          <div className={RightMusicPlayerStyle.headerContainer}>
            <img src={music.album?.images[0]?.url} alt='LikedSongs' />
            <div className={RightMusicPlayerStyle.textContainer}>
              <h5>Song</h5>
              <h1>{music.name}</h1>
            </div>
            <div className={RightMusicPlayerStyle.likeContainer}>


              {isLiked ? (
                <img
                  onClick={() => handleLikeButtonClick(music?.id)}
                  className={RightMusicPlayerStyle.like}
                  src={LikeImg}
                  alt="like"
                />
              ) : (
                <img
                  onClick={() => handleLikeButtonClick(music?.id)}
                  src={DisLikeImg}
                  alt="dislike"
                />
              )}
            </div>
          </div>
          <div className={RightMusicPlayerStyle.artistContainer}>
            <img src={artistInfo?.images[0]?.url} alt="artist" />
            <div className={RightMusicPlayerStyle.artistTextContainer}>
              <h5>{music.album.release_date.toString().slice(0, 4)} • {Math.floor(music.duration_ms / 1000 / 60)}:
              {String(Math.floor((music.duration_ms / 1000) % 60)).padStart(2, '0')}</h5>
              <h1>{artistInfo?.name}</h1>
            </div>
          </div>
          <div className={RightMusicPlayerStyle.player}>
            <audio controls loop autoPlay>
              <source src={music?.preview_url} type="audio/mpeg" />
              Ваш браузер не поддерживает проигрывание аудио.
            </audio>
          </div>
        </>
      )}
    </div>
  );
}

export default RightMusicPlayer;