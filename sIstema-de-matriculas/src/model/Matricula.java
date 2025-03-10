package model;

import java.io.Serializable;

public class Matricula implements Serializable {
    private Aluno aluno;
    private Disciplina disciplina;
    private String id;
    private TipoMatricula tipo;

    public Matricula() {
    }

    public Matricula(Aluno aluno, Disciplina disciplina, String id, TipoMatricula tipo) {
        this.aluno = aluno;
        this.disciplina = disciplina;
        this.id = id;
        this.tipo = tipo;
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

    public TipoMatricula getTipo() {
        return tipo;
    }

    public String toString() {
        return "Aluno: " + aluno.getNome() + "\nDisciplina: " + disciplina.getNome() + "\nTipo: " + tipo;
    }
}
