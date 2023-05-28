package com.example.spotifyServer.controllers;

import com.example.spotifyServer.entity.Musics;
import com.example.spotifyServer.repositories.MusicReposirory;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Controller
@RestController
@RequestMapping("/api")
public class MainController {

    @Autowired
    MusicReposirory musicRepository;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/addMusic")
    public ResponseEntity<String> addMusic(@RequestBody Musics musicRequest) {
        try {
            String title = musicRequest.getTitle();
            String releaseDate = musicRequest.getRelease_date();
            String imageUrl = musicRequest.getImage_url();
            String previewUrl = musicRequest.getPreview_url();
            String album = musicRequest.getAlbum();
            long duration = musicRequest.getDuration();
            String spotifyId = musicRequest.getSpotify_id();
            String artist = musicRequest.getArtist();
            musicRepository.delete(musicRequest);
            musicRepository.save(musicRequest);
            return ResponseEntity.status(HttpStatus.CREATED).body("Music added successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to add music");
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/getliked")
    public ResponseEntity<List<Musics>> getLiked(){
        List<Musics> musicList = new ArrayList<>();
        // Здесь добавьте логику для получения и формирования списка музыки
        musicList = musicRepository.findAll();

        List<Musics> musiccList = new ArrayList<>();
        for (int i = 0; i < musicList.size(); i++){
            if(musicList.get(i).isLike()) musiccList.add(musicList.get(i));
        }
        return ResponseEntity.ok().body(musiccList);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/getAll")
    public ResponseEntity<List<Musics>> getAll(){
        List<Musics> musicList = new ArrayList<>();
        // Здесь добавьте логику для получения и формирования списка музыки
        musicList = musicRepository.findAll();

        return ResponseEntity.ok().body(musicList);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/getMusic")
    public ResponseEntity<List<Musics>> getMusic(@RequestParam String spotifyId) {
        List<Musics> musicList = new ArrayList<>();


        try {
            Musics music = musicRepository.findBySpotifyId(spotifyId);
            System.out.println(music.isLike());
            if (music != null) {
                musicRepository.delete(music);
                music.setId(null);
                musicRepository.save(music);
                musicList.add(music);
                return ResponseEntity.ok().body(musicList);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/like")
    public ResponseEntity<String> like(@RequestBody Long musicId) {
        System.out.println(musicId);
        Optional<Musics> optionalMusic = musicRepository.findById(musicId);
        if (optionalMusic.isPresent()) {
            Musics music = optionalMusic.get();

            // Измените значение поля isLike в зависимости от текущего значения
            music.setLike(!music.isLike());

            // Сохраните изменения в базе данных
            musicRepository.save(music);

            return ResponseEntity.ok("Success");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/updateLikeStatus")
    public ResponseEntity<String> updateLikeStatus(@RequestParam("spotify_id") String spotifyId) {
        Musics music = musicRepository.findBySpotifyId(spotifyId);
        System.out.println(spotifyId);
        if (music != null) {
            music.setLike(!music.isLike());
            musicRepository.save(music);
            return ResponseEntity.ok("Like status updated successfully.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }


}
