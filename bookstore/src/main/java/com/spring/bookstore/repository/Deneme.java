/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.spring.bookstore.repository;

import com.spring.bookstore.model.AddressModel;
import com.spring.bookstore.model.UserModel;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.Date;
/**
 *
 * @author User
 */
@Service
public class Deneme {

    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public void saveUserWithAddress() {
        // Tarih oluşturuluyor
        Date date = new Date(120, 0, 13);  // 2020-01-13 olarak düzeltildi
        AddressModel address = new AddressModel("Guitar", null);
        AddressModel address2 = new AddressModel("Saz", null);
        UserModel user = new UserModel("Username", "Password", "Email", "Name", "Surname", "PhoneNumber", "City", "Country", date, date, "Role");

        user.getAddresses().add(address);
        user.getAddresses().add(address2);
        address.setUser(user);
        address2.setUser(user);

        entityManager.persist(user);
    }
}