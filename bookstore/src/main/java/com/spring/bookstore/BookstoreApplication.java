package com.spring.bookstore;

import com.spring.bookstore.repository.Deneme;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.spring")
public class BookstoreApplication implements CommandLineRunner{

	public static void main(String[] args) {
		SpringApplication.run(BookstoreApplication.class, args);
	}
        @Autowired
    private Deneme deneme;
        @Override
    public void run(String... args) throws Exception {
        deneme.saveUserWithAddress();
    }

}
