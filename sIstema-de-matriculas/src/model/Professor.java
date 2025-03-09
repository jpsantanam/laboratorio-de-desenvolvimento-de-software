package model;

import java.io.Serializable;
import java.util.ArrayList;

public class Professor implements Serializable {
    private String nome;
    private String id;
    private String senha;
    private String email;

    public Professor() {
    }

    public Professor(String nome, String id, String senha, String email) {
        this.nome = nome;
        this.id = id;
        this.senha = senha;
        this.email = email;
    }

    public String getNome() {
        return nome;
    }

    public String toString() {
        return "Nome: " + nome + "\nID: " + id + "\nE-mail: " + email;
    }
}
