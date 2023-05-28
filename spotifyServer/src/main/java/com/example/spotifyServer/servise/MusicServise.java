package com.example.spotifyServer.servise;

import com.example.spotifyServer.entity.Musics;

import java.util.List;

public interface MusicServise {

    Musics addMusic (Musics musics);
    List<Musics> getAllMusic ();
    Musics getMusic(Long id);
    void toggleIsLikeBySpotifyId(String spotifyId);
}
