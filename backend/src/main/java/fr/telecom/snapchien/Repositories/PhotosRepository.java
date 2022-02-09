package fr.telecom.snapchien.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import fr.telecom.snapchien.Models.Photo;

@Repository
public interface PhotosRepository extends JpaRepository<Photo, Long> {
	public Photo findByComment(String comment);
}
