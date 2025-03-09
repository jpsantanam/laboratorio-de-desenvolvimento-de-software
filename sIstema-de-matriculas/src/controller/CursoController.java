package controller;

import java.util.UUID;

import dao.CursosDao;
import model.Curso;

public class CursoController {
    private CursosDao cursosDao;

    public CursoController(CursosDao cursosDao) {
        this.cursosDao = cursosDao;
    }

    public void addCurso(String nome, int creditos) {
        String id = UUID.randomUUID().toString();
        cursosDao.addCurso(new Curso(nome, id, creditos));
    }

    public void listarCursos() {
        cursosDao.getCursos().forEach(curso -> System.out.println(curso));
    }
}
