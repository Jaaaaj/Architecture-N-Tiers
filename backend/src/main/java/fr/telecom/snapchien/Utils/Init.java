package fr.telecom.snapchien.Utils;

import java.io.File;

import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class Init implements CommandLineRunner {

	@Override
	public void run(String... args) throws Exception {
		// On supprime le contenu du dossier photo puisqu'on reset la bdd a chaque fois
		FileUtils.cleanDirectory(new File("./photos"));
		System.out.println("Initialisation terminee");
	}

}
