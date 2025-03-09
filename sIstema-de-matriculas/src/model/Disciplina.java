package model;

import java.io.Serializable;

public class Disciplina implements Serializable {
    private String nome;
    private String id;
    private String professor;
    private final int MAX_ALUNOS = 60;
    private final int MIN_ALUNOS = 3;

    public Disciplina() {
    }

    public Disciplina(String nome, String id, String professor) {
        this.nome = nome;
        this.id = id;
        this.professor = professor;
    }

    public String getNome() {
        return nome;
    }

    public String getId() {
        return id;
    }

    public String toString() {
        return "Nome: " + nome + "\nCódigo: " + id + "\nProfessor: " + professor;
    }
}
