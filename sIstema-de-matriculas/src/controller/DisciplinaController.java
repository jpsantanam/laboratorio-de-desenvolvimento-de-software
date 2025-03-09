package controller;

import java.util.List;
import java.util.UUID;

import dao.DisciplinasDao;
import model.Disciplina;

public class DisciplinaController {
    private DisciplinasDao disciplinasDao;

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

    public List<Disciplina> getDisciplinas() {
        return disciplinasDao.getDisciplinas();
    }
}
