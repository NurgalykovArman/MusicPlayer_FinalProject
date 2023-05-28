import React, { Component } from 'react';
import ListStyle from '../styles/listMusic.module.css';
import LikedSongs from '../images/likedSongs.png';


class HeaderComponent extends Component {
  componentDidMount() {
    // Выполняем запрос к серверу и получаем данные
    console.log("классовый компонент")
  }

  render() {
    // Отображаем полученные данные
    return (
        <div className={ListStyle.headerContainer}>
        <img src={LikedSongs} alt="LikedSongs" />
        <div className={ListStyle.textContainer}>
            <h5>Playlist</h5>
            <h1>Liked Songs</h1>
        </div>
    </div>
    );
  }
}

export default HeaderComponent;