import React, { Component } from 'react';
import ListanedStyle from '../styles/listened.module.css';
import LibraryImg from '../images/library.png';

class Listened extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      musics: []
    };
  }

  
  componentDidMount() {
    this.fetchAllMusics();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.musics !== this.state.musics) {
      this.fetchAllMusics();
    }
  }

  fetchAllMusics = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/getAll');
      const data = await response.json();
      this.setState({ musics: data.reverse() });
    } catch (error) {
      console.error('Failed to fetch music', error);
    }
  };

  componentDidCatch(error, errorInfo) {
    this.setState({
      hasError: true,
      error: error,
      errorInfo: errorInfo
    });

    // Можно отправить ошибку на сервер для логирования или анализа
    // logErrorToServer(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Можно отрендерить запасной UI для отображения ошибки
      return (
        <div>
          <h1>Что-то пошло не так.</h1>
          <p>Ошибка: {this.state.error.toString()}</p>
          <div>Дополнительная информация: {this.state.errorInfo.componentStack}</div>
        </div>
      );
    }
    const { musics } = this.state;

    return (
        <div className={ListanedStyle.Container}>
            <div className={ListanedStyle.libIcon} >
                <img className={ListanedStyle.mainImg} src={LibraryImg} alt='main' />
                <span className={ListanedStyle.text}>Your Library</span>
                <span className={ListanedStyle.mintext}>listened</span>
            </div>

            <div className={ListanedStyle.list}>
            <tbody className={ListanedStyle.listRows}>
                        {musics.map((music, index) => (
                            <tr
                                className={ListanedStyle.rows}
                                key={music.id}
                            >
                                <td
                                    className={ListanedStyle.cel}
                                    onClick={() => {
                                        window.location.href = `/music/${music.spotify_id}`;
                                    }}
                                >
                                    <div className={ListanedStyle.style1}>
                                        <img src={music.image_url} alt="image_url" />
                                        <div className={ListanedStyle.style2}>
                                            <h3>{music.title}</h3>
                                            <h5>{music.artist}</h5>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
            </div>
        </div>
    );
  }
}



export default Listened;