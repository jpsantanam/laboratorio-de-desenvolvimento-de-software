package model;

import java.io.Serializable;

public class Matricula implements Serializable {
    private Aluno aluno;
    private Disciplina disciplina;
    private String id;

    public Matricula() {
    }

    public Matricula(Aluno aluno, Disciplina disciplina, String id) {
        this.aluno = aluno;
        this.disciplina = disciplina;
        this.id = id;
    }

    public Aluno getAluno() {
        return aluno;
    }

    public Disciplina getDisciplina() {
        return disciplina;
    }

    public String getId() {
        return id;
    }

    public String toString() {
        return "Aluno: " + aluno.getNome() + " | Disciplina: " + disciplina.getNome() + " | ID: " + id;
    }
}
