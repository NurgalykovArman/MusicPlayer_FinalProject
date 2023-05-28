import React, { Component } from 'react';
import prevImg from '../images/prev.png';
import RightMusicPlayerStyle from '../styles/rightMusicPlaayer.module.css';
import axios from 'axios';

class PrevButton extends Component {
  componentDidMount() {
    this.fetchAllMusics();
  }

  fetchAllMusics = async () => {
    const { music, artistInfo } = this.props;

    try {
      const response = await axios.post('http://localhost:8000/api/addMusic', {
        title: music.name,
        release_date: music.album.release_date,
        image_url: music.album?.images[0]?.url,
        preview_url: music?.preview_url,
        album: music.album.name,
        duration: music.duration_ms,
        spotify_id: music.id,
        artist: artistInfo?.name,
      });

      // Обработка успешного ответа
      console.log(response.data);
    } catch (error) {
      // Обработка ошибки
      console.error(error);
    }
  };

  handleGoBack = () => {
    window.location.href = '/';
  };

  render() {
    const { music, artistInfo } = this.props;
    console.log('music:', music);
    console.log('artistInfo:', artistInfo);

    return (
      <div className={RightMusicPlayerStyle.prevContainer}>
        <img onClick={this.handleGoBack} src={prevImg} alt="prev" />
      </div>
    );
  }
}

export default PrevButton;