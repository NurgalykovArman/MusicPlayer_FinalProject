package com.example.spotifyServer.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="music")
public class Musics {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(nullable=false, unique=true, name = "spotify_id")
    private String spotify_id;

    @Column(nullable=false, unique=false, name = "title")
    private String title;

    @Column(nullable=false, unique=false, name = "album")
    private String album;

    @Column(nullable=true, unique=false, name = "artist")
    private String artist;

    @Column(nullable=false, unique=false, name = "release_date")
    private String release_date;

    @Column(nullable=false, unique=false, name = "duration")
    private long duration;

    @Column(nullable=false, unique=true, name = "preview_url")
    private String preview_url;

    @Column(nullable=false, unique=false, name = "image_url")
    private String image_url;

    @Column(nullable=false, unique=false, name = "isLike")
    private boolean isLike;




}
