package model;

import java.io.Serializable;

public class UsuarioSecretaria implements Serializable {
    private String nome;
    private String id;
    private String senha;
    private String email;

    public UsuarioSecretaria() {
    }

    public UsuarioSecretaria(String nome, String id, String senha, String email) {
        this.nome = nome;
        this.id = id;
        this.senha = senha;
        this.email = email;
    }

    public String getNome() {
        return nome;
    }

    public String getEmail() {
        return email;
    }

    public String getSenha() {
        return senha;
    }
}
