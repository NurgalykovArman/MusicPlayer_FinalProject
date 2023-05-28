package com.example.spotifyServer.repositories;

import com.example.spotifyServer.entity.Musics;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
@Transactional
public interface MusicReposirory extends JpaRepository<Musics, Long> {
    @Query("SELECT m FROM Musics m WHERE m.spotify_id = :spotifyId")
    Musics findBySpotifyId(@Param("spotifyId") String spotifyId);
}
