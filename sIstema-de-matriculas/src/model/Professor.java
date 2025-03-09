package model;

import java.io.Serializable;
import java.util.ArrayList;

public class Professor implements Serializable {
    private String nome;
    private String id;
    private String senha;
    private String email;
    private Curso curso;
    private ArrayList<Matricula> matriculas;

    public Professor() {
    }

    public Professor(String nome, String id, String senha, String email, Curso curso) {
        this.nome = nome;
        this.id = id;
        this.senha = senha;
        this.email = email;
        this.curso = curso;
        this.matriculas = new ArrayList<Matricula>();
    }

    public String getNome() {
        return nome;
    }
}
