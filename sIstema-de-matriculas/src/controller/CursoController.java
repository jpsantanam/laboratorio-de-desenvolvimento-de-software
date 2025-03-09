package controller;

import java.util.List;
import java.util.UUID;

import dao.CursosDao;
import model.Curso;
import model.Disciplina;

public class CursoController {
    private CursosDao cursosDao;

    public CursoController(CursosDao cursosDao) {
        this.cursosDao = cursosDao;
    }

    public void addCurso(String nome, int creditos) {
        String id = UUID.randomUUID().toString();
        cursosDao.addCurso(new Curso(nome, id, creditos));
    }

    public List<Curso> getCursos() {
        return cursosDao.getCursos();
    }

    public Curso selecionarCurso(String id) {
        return cursosDao.getCursos().stream().filter(curso -> curso.getId().equals(id)).findFirst().get();
    }

    public void addDisciplina(Curso curso, Disciplina disciplina) {
        cursosDao.addDisciplina(curso, disciplina);
    }
}
