package controller;

import dao.MatriculasDao;
import model.Aluno;
import model.Disciplina;
import model.Matricula;

public class MatriculaController {
    private MatriculasDao matriculasDao;

    public MatriculaController(MatriculasDao matriculasDao) {
        this.matriculasDao = matriculasDao;
    }

    public void addMatricula(Aluno aluno, Disciplina disciplina) {
        matriculasDao.addMatricula(new Matricula(aluno, disciplina));
    }
}
