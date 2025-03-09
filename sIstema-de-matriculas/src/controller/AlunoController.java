package controller;

import java.time.LocalDate;

import dao.AlunosDao;
import model.Aluno;

public class AlunoController {
    private AlunosDao alunos;
    
    public AlunoController(AlunosDao alunos) {
        this.alunos = alunos;
    }

    public void addAluno(String nome, String email, String senha, String curso) {
        String matricula = LocalDate.now().getYear() + String.valueOf(alunos.getAlunos().size() + 1);
        alunos.addAluno(new Aluno(nome, matricula, email, senha, curso));
    }

    public void listarAlunos() {
        alunos.getAlunos().forEach(aluno -> System.out.println(aluno));
    }
}