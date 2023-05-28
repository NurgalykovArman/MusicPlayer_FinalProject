package com.example.spotifyServer.servise.impl;

import com.example.spotifyServer.entity.Musics;
import com.example.spotifyServer.repositories.MusicReposirory;
import com.example.spotifyServer.servise.MusicServise;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MusicServiceImpl implements MusicServise {

    private final MusicReposirory musicReposirory;

    @Autowired
    public MusicServiceImpl(MusicReposirory musicReposirory) {
        this.musicReposirory = musicReposirory;
    }

    @Override
    public Musics addMusic(Musics musics) {
        return musicReposirory.save(musics);
    }

    @Override
    public List<Musics> getAllMusic() {
        return musicReposirory.findAll();
    }

    @Override
    public Musics getMusic(Long id) {
        return musicReposirory.getOne(id);
    }

    @Override
    public void toggleIsLikeBySpotifyId(String spotifyId) {
        Musics music = musicReposirory.findBySpotifyId(spotifyId);
        if (music != null) {
            music.setLike(!music.isLike());
            musicReposirory.save(music);
        }
    }
}
