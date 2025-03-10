package controller;

import java.util.List;
import java.util.UUID;

import dao.DisciplinasDao;
import model.Disciplina;
import model.Matricula;

public class DisciplinaController {
    private DisciplinasDao disciplinasDao;
    private MatriculaController matriculaController;

    public DisciplinaController(DisciplinasDao disciplinasDao) {
        this.disciplinasDao = disciplinasDao;
    }

    public void addDisciplina(String nome, String professor) {
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
}
