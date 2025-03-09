package model;

import java.io.Serializable;
import java.util.ArrayList;

public class Aluno implements Serializable {
    private String nome;
    private String numeroMatricula;
    private String senha;
    private String email;
    private Curso curso;
    private ArrayList<Matricula> matriculas;

    public Aluno() {
    }

    public Aluno(String nome, String numeroMatricula, String email, String senha, Curso curso) {
        this.nome = nome;
        this.numeroMatricula = numeroMatricula;
        this.senha = senha;
        this.email = email;
        this.curso = curso;
        this.matriculas = new ArrayList<Matricula>();
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

    public Curso getCurso() {
        return curso;
    }

    public String toString() {
        return "Nome: " + nome + "\nNúmero de Matrícula: " + numeroMatricula + "\nE-mail: " + email + "\nCurso: "
                + curso;
    }
}
