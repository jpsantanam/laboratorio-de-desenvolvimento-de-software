package controller;

import java.time.LocalDate;
import java.util.List;

import dao.AlunosDao;
import model.Aluno;
import model.Curso;

public class AlunoController {
    private AlunosDao alunos;

    public AlunoController(AlunosDao alunos) {
        this.alunos = alunos;
    }

    public void addAluno(String nome, String email, String senha, Curso curso) {
        String matricula = LocalDate.now().getYear() + String.valueOf(alunos.getAlunos().size() + 1);
        alunos.addAluno(new Aluno(nome, matricula, email, senha, curso));
    }

    public List<Aluno> listarAlunos() {
        return alunos.getAlunos();
    }

    public Aluno login(String email, String senha) {
        return alunos.getAlunos().stream()
                .filter(aluno -> aluno.getEmail().equals(email) && aluno.getSenha().equals(senha))
                .findFirst()
                .orElse(null);
    }
}