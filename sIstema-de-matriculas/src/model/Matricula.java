package model;

import java.io.Serializable;

public class Matricula implements Serializable {
    private Aluno aluno;
    private Disciplina disciplina;

    public Matricula() {
    }

    public Matricula(Aluno aluno, Disciplina disciplina) {
        this.aluno = aluno;
        this.disciplina = disciplina;
    }

    public Aluno getAluno() {
        return aluno;
    }
}
