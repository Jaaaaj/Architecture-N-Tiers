package fr.telecom.snapchien.Models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.stereotype.Component;

@Entity
@Table(name = "photos")
public class Photo {
	@Id
	@GeneratedValue
	private Long id;
	private String name;
	private String url;
	private String comment;

	public Photo() {

	}

	public Photo(String name, String comment) {
		this.name = name;
		this.url = "http://localhost:8080/photos/" + name;
		this.comment = comment;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

}
