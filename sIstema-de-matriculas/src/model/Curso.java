package model;

import java.io.Serializable;
import java.util.ArrayList;

public class Curso implements Serializable {
    private String nome;
    private String id;
    private int creditos;
    private ArrayList<Disciplina> disciplinas;

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

    public String getId() {
        return id;
    }

    public ArrayList<Disciplina> getDisciplinas() {
        return disciplinas;
    }

    public void addDisciplina(Disciplina disciplina) {
        System.out.println(disciplina);
        disciplinas.add(disciplina);
    }

    public String getDisciplinasString() {
        String disciplinasString = "";
        for (Disciplina disciplina : disciplinas) {
            disciplinasString += disciplina.toString() + "\n";
        }
        return disciplinasString;
    }

    public String toString() {
        return "Curso: " + nome + " | Créditos: " + creditos + " | ID: " + id;
    }
}
