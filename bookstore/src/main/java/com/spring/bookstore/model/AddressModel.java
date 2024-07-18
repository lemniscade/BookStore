/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.spring.bookstore.model;

import jakarta.persistence.*;
/**
 *
 * @author User
 */
@Entity
@Table(name = "Address")
public class AddressModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private int id;

    @Column(name = "Address")
    private String address;

    @ManyToOne
    @JoinColumn(name = "users_id")
    private UserModel user;

    public AddressModel() {
    }

    public AddressModel(String address, UserModel user) {
        this.address = address;
        this.user = user;
    }

    // Getter ve Setter metodları
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public UserModel getUser() {
        return user;
    }

    public void setUser(UserModel user) {
        this.user = user;
    }
}
