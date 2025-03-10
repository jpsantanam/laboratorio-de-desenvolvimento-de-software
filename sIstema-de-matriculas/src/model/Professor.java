package model;

import java.io.Serializable;

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

    public String getId() {
        return id;
    }

    public String getSenha() {
        return senha;
    }

    public String getEmail() {
        return email;
    }

    public String toString() {
        return "Nome: " + nome + "\nE-mail: " + email;
    }
}
