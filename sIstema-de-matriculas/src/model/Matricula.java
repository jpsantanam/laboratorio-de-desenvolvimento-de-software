package model;

public class Matricula {
    private Aluno aluno;
    private Disciplina disciplina;
    private Double valor;

    public Matricula() {
    }

    public Matricula(Aluno aluno, Disciplina disciplina, Double valor) {
        this.aluno = aluno;
        this.disciplina = disciplina;
        this.valor = valor;
    }

    public Aluno getAluno() {
        return aluno;
    }
}
