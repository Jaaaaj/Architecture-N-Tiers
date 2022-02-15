package fr.telecom.snapchien.Controllers;

import java.io.IOException;
import java.net.MalformedURLException;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import fr.telecom.snapchien.Models.Photo;
import fr.telecom.snapchien.Repositories.PhotosRepository;

@Controller
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping(path = "/photos")
public class  PhotosController {

	@Autowired
	private PhotosRepository photosRepo;

	@PostMapping("/upload")
	public ResponseEntity<?> uploadImage(@RequestParam("file") MultipartFile file,
			@RequestParam("comment") String comment) {
		try {
			String[] name = file.getOriginalFilename().split("\\.");
			String filename = name[0] + "-" + ZonedDateTime.now().toInstant().toEpochMilli() + "." + name[1];
			Files.copy(file.getInputStream(), Paths.get("photos").resolve(filename));
			this.photosRepo.save(new Photo(filename, comment));

			return ResponseEntity.ok("Image saved !");
		} catch (IOException e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().body("Error while saving your image.");
		}
	}

	@GetMapping
	public ResponseEntity<List<Photo>> getAllPhotos() {
		List<Photo> allPhotos = this.photosRepo.findAll();

		return ResponseEntity.ok().body(allPhotos);
	}

	@GetMapping("/{filename}")
	public ResponseEntity<Resource> getOnePhoto(@PathVariable String filename) {
		try {
			Path file = Paths.get("photos").resolve(filename);
			Resource resource = new UrlResource(file.toUri());
			if (resource.exists() || resource.isReadable()) {
				return ResponseEntity.ok()
						.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"")
						.body(resource);
			} else {
				throw new RuntimeException("Could not read the file!");
			}
		} catch (MalformedURLException e) {
			throw new RuntimeException("Error: " + e.getMessage());
		}
	}

	@GetMapping("/comments/{comment}")
	public ResponseEntity<Photo> findPhotoByComment(@PathVariable String comment) {
		Photo requestedPhoto = this.photosRepo.findByComment(comment);

		return ResponseEntity.ok(requestedPhoto);
	}

	@PatchMapping("/{id}")
	public ResponseEntity<Photo> changeComment(@PathVariable Long id, @RequestParam("comment") String comment) {
		Optional<Photo> p = this.photosRepo.findById(id);

		if (p.isPresent()) {
			Photo photo = p.get();
			photo.setComment(comment);
			this.photosRepo.save(photo);
			return ResponseEntity.ok(photo);
		} else {
			System.out.println("Error: no image with the id " + id);
			return ResponseEntity.badRequest().body(null);
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> deletePhoto(@PathVariable Long id) {
		Optional<Photo> p = this.photosRepo.findById(id);

		if (p.isPresent()) {
			try {
				Files.delete(Paths.get("./photos/" + p.get().getName()));
				this.photosRepo.delete(p.get());
				return ResponseEntity.ok("Photo supprimée !");
			} catch (IOException e) {
				e.printStackTrace();
				return ResponseEntity.badRequest().body("Error while deleting the image on the disk");
			}

		} else {
			return ResponseEntity.badRequest().body("Error: No image with the id " + id);
		}
	}
}
