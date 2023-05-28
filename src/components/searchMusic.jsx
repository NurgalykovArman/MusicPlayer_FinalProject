import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchStyle from '../styles/searchMusic.module.css';
import PopularList from './popularList';
import SearchedList from './searchedList';

function SearchMusic() {
    const [tracks, setTracks] = useState([]);
    const [album, setAlbum] = useState(null);
    const [albumName, setAlbumName] = useState(localStorage.getItem('albumName') || '');
    const [isEmptyInput, setIsEmptyInput] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const clientId = '08b4373dd22344cf9f95e0b50485fce1';
            const clientSecret = 'abcb62df980d474fb92de99abf3ea540';
            const authEndpoint = 'https://accounts.spotify.com/api/token';
            const searchEndpoint = 'https://api.spotify.com/v1/search'; // Endpoint for searching albums
            const tracksEndpoint = 'https://api.spotify.com/v1/albums/{album_id}/tracks'; // Endpoint for fetching tracks

            // Obtaining the authorization token
            const authOptions = {
                url: authEndpoint,
                method: 'POST',
                headers: {
                    'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret),
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: 'grant_type=client_credentials'
            };

            try {
                const authResponse = await axios(authOptions);
                const accessToken = authResponse.data.access_token;

                // Searching for albums with the given name
                const searchOptions = {
                    url: searchEndpoint,
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + accessToken
                    },
                    params: {
                        q: `album:${albumName}`, // Используем значение albumName
                        type: 'album',
                        limit: 1
                    }
                };

                const searchResponse = await axios(searchOptions);
                const album = searchResponse.data.albums.items[0];

                if (!album) {
                    console.error('Album not found.');
                    return;
                }

                // Fetching tracks from the found album
                const tracksOptions = {
                    url: tracksEndpoint.replace('{album_id}', album.id),
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + accessToken
                    }
                };

                const tracksResponse = await axios(tracksOptions);
                const tracks = tracksResponse.data.items;

                console.log('Album:', album);
                console.log('Tracks:', tracks);

                // Set the tracks state with the fetched tracks
                setTracks(tracks);
                setAlbum(album);

                localStorage.setItem('albumName', albumName);
            } catch (error) {
                console.error('Error fetching album tracks:', error);
            }
        };

        fetchData();
    }, [albumName]);

    useEffect(() => {
        if (albumName === '') {
            setIsEmptyInput(true); // Set isEmptyInput to true when the input is empty
        } else {
            setIsEmptyInput(false); // Set isEmptyInput to false when the input is not empty
        }
        if (albumName === '') {
            // Handle the case when the input is empty
            console.log('Input is empty');
            // Perform the desired action or fetch data for the empty input case
            const fetchData = async () => {
                const clientId = '08b4373dd22344cf9f95e0b50485fce1';
                const clientSecret = 'abcb62df980d474fb92de99abf3ea540';
                const authEndpoint = 'https://accounts.spotify.com/api/token';
                const playlistsEndpoint = 'https://api.spotify.com/v1/browse/categories/{category_id}/playlists';
                const categoryId = 'toplists'; // Здесь можно указать нужную вам категорию

                // Получение токена авторизации
                const authOptions = {
                    url: authEndpoint,
                    method: 'POST',
                    headers: {
                        'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret),
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: 'grant_type=client_credentials'
                };

                try {
                    const response = await axios(authOptions);
                    const accessToken = response.data.access_token;

                    // Получение плейлистов по категории
                    const playlistsOptions = {
                        url: playlistsEndpoint.replace('{category_id}', categoryId),
                        method: 'GET',
                        headers: {
                            'Authorization': 'Bearer ' + accessToken
                        }
                    };
                    console.log(accessToken)

                    const playlistsResponse = await axios(playlistsOptions);
                    const playlistId = playlistsResponse.data.playlists.items[0].id;

                    // Получение треков из плейлиста
                    const playlistTracksOptions = {
                        url: `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
                        method: 'GET',
                        headers: {
                            'Authorization': 'Bearer ' + accessToken
                        }
                    };

                    const playlistTracksResponse = await axios(playlistTracksOptions);
                    setTracks(playlistTracksResponse.data.items);
                    console.log(playlistTracksResponse.data.items[0].track.album.images[0].url)
                } catch (error) {
                    console.error('Ошибка при получении популярных треков:', error);
                }
            };

            fetchData();
        }
    }, [albumName]);



    return (
        <div className={SearchStyle.searchContainer}>
            <div className={SearchStyle.headerContainer}>
                <input className={SearchStyle.inputStyle}
                    type='text'
                    value={albumName} // Привязываем значение albumName к значению ввода
                    onChange={(e) => setAlbumName(e.target.value)} />
            </div>
            
            {isEmptyInput ? (
                <div>
                    {/* Content for empty input case */}
                    <PopularList tracks={tracks}/>
                </div>
            ) : (
                <>
                <SearchedList tracks={tracks} album={album}/>
                 </>)}
        </div>
    );
};

export default SearchMusic;