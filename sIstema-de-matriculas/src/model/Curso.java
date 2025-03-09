package model;

import java.io.Serializable;
import java.util.ArrayList;

public class Curso implements Serializable {
    private String nome;
    private String id;
    private int creditos;
    private ArrayList<Disciplina> disciplinas;
    private ArrayList<Aluno> alunos;

    public Curso() {
    }

    public Curso(String nome, String id, int creditos) {
        this.nome = nome;
        this.id = id;
        this.creditos = creditos;
        this.disciplinas = new ArrayList<Disciplina>();
    }

    public String getNome() {
        return nome;
    }

    public String toString() {
        return "Curso: " + nome + " | Créditos: " + creditos;
    }
}
