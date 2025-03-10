package controller;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import dao.DisciplinasDao;
import model.Disciplina;
import model.Matricula;
import model.Professor;

public class DisciplinaController {
    private DisciplinasDao disciplinasDao;
    private MatriculaController matriculaController;

    public DisciplinaController(DisciplinasDao disciplinasDao, MatriculaController matriculaController) {
        this.disciplinasDao = disciplinasDao;
        this.matriculaController = matriculaController;
    }

    public void addDisciplina(String nome, Professor professor) {
        String id = UUID.randomUUID().toString();
        disciplinasDao.addDisciplina(new Disciplina(nome, id, professor));
    }

    public Disciplina getDisciplinaById(String id) {
        return disciplinasDao.getDisciplinaById(id);
    }

    public boolean isFull(Disciplina disciplina) {
        List<Matricula> matricula = matriculaController.getMatriculasByDisciplina(disciplina);
        return matricula.size() >= Disciplina.MAX_ALUNOS;
    }

    public List<Disciplina> getDisciplinas() {
        return disciplinasDao.getDisciplinas();
    }

    public List<Matricula> cancelarDisciplinas() {
        List<Disciplina> disciplinas = getDisciplinas();
        List<Matricula> matriculasCanceladas = new ArrayList<>();
        for (Disciplina disciplina : disciplinas) {
            List<Matricula> matriculas = matriculaController.getMatriculasByDisciplina(disciplina);
            if (matriculas.size() < Disciplina.MIN_ALUNOS) {
                for (Matricula matricula : matriculas) {
                    matriculasCanceladas.add(matricula);
                    matriculaController.excluirMatricula(matricula);
                }
            }
        }
        return matriculasCanceladas;
    }
}
