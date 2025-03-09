package dao;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import model.Curso;
import model.Disciplina;

public class CursosDao extends AbstractDao implements Serializable {

    private List<Curso> cursos;
    private static CursosDao instance;

    private final String localArquivo = "sistema-de-matriculas/src/data/Cursos.dat";

    private CursosDao() {
        this.cursos = new ArrayList<>();
        carregaCursos();
    }

    public static CursosDao getInstance() {
        if (instance == null) {
            instance = new CursosDao();
        }
        return instance;
    }

    public void addCurso(Curso curso) {
        this.cursos.add(curso);
        grava();
    }

    private void carregaCursos() {
        this.cursos = super.leitura(localArquivo);
    }

    private void grava() {
        super.grava(localArquivo, cursos);
    }

    public List<Curso> getCursos() {
        return cursos;
    }

    public void excluirCurso(Curso curso) {
        cursos.remove(curso);
        grava();
    }

    public Curso buscarCursoPorNome(String nome) {
        return cursos.stream()
                .filter(curso -> curso.getNome().equals(nome))
                .findFirst()
                .orElse(null);
    }

    public void addDisciplina(Curso curso, Disciplina disciplina) {
        cursos.get(cursos.indexOf(curso)).addDisciplina(disciplina);
        grava();
    }
}