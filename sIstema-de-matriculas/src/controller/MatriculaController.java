package controller;

import java.util.List;
import java.util.UUID;

import dao.MatriculasDao;
import model.Aluno;
import model.Disciplina;
import model.Matricula;
import model.TipoMatricula;

public class MatriculaController {
    private MatriculasDao matriculasDao;

    public MatriculaController(MatriculasDao matriculasDao) {
        this.matriculasDao = matriculasDao;
    }

    public void addMatricula(Aluno aluno, Disciplina disciplina, TipoMatricula tipo) {
        if (hasMatricula(aluno, disciplina)) {
            throw new IllegalArgumentException("Aluno já matriculado na disciplina");
        }
        String id = UUID.randomUUID().toString();
        matriculasDao.addMatricula(new Matricula(aluno, disciplina, id, tipo));
    }

    public boolean hasMatricula(Aluno aluno, Disciplina disciplina) {
        return matriculasDao.hasMatricula(aluno, disciplina);
    }

    public List<Matricula> getMatriculaByAluno(Aluno aluno) {
        return matriculasDao.getMatriculaByAluno(aluno);
    }

    public List<Matricula> getMatriculaByAlunoAndTipo(Aluno aluno, TipoMatricula tipo) {
        return getMatriculaByAluno(aluno).stream()
                .filter(matricula -> matricula.getTipo().equals(tipo))
                .toList();
    }

    public List<Matricula> getMatriculasByDisciplina(Disciplina disciplina) {
        return matriculasDao.getMatriculasByDisciplina(disciplina);
    }

    public void excluirMatricula(Matricula matricula) {
        matriculasDao.excluirMatricula(matricula);
    }
}
