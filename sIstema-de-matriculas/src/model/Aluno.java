package model;

import java.io.Serializable;

public class Aluno implements Serializable {
    private String nome;
    private String numeroMatricula;
    private String senha;
    private String email;
    private Curso curso;

    public Aluno() {
    }

    public Aluno(String nome, String numeroMatricula, String email, String senha, Curso curso) {
        this.nome = nome;
        this.numeroMatricula = numeroMatricula;
        this.senha = senha;
        this.email = email;
        this.curso = curso;
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

    public String getId() {
        return numeroMatricula;
    }

    public boolean equals(Object obj) {
        if (obj instanceof Aluno) {
            Aluno aluno = (Aluno) obj;
            return aluno.getId().equals(this.getId());
        }
        return false;
    }

    public String toString() {
        return "Nome: " + nome + "\nNúmero de Matrícula: " + numeroMatricula + "\nE-mail: " + email + "\nCurso: "
                + curso;
    }
}
