package model;

import java.io.Serializable;
import java.util.ArrayList;

public class Disciplina implements Serializable {
    private String nome;
    private String codigo;
    private Professor professor;
    private ArrayList<Aluno> alunos;
    private final int MAX_ALUNOS = 60;
    private final int MIN_ALUNOS = 3;

    public Disciplina() {
    }

    public Disciplina(String nome, String codigo, Professor professor) {
        this.nome = nome;
        this.codigo = codigo;
        this.professor = professor;
        this.alunos = new ArrayList<Aluno>();
    }

    public String getNome() {
        return nome;
    }
}
