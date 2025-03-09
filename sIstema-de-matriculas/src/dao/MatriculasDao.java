package dao;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import model.Matricula;

public class MatriculasDao extends AbstractDao implements Serializable {

    private List<Matricula> matriculas;
    private static MatriculasDao instance;

    private final String localArquivo = "sistema-de-matriculas/src/data/Matriculas.dat";

    private MatriculasDao() {
        this.matriculas = new ArrayList<>();
        carregaMatriculas();
    }

    public static MatriculasDao getInstance() {
        if (instance == null) {
            instance = new MatriculasDao();
        }
        return instance;
    }

    public void addMatricula(Matricula matricula) {
        this.matriculas.add(matricula);
        grava();
    }

    private void carregaMatriculas() {
        this.matriculas = super.leitura(localArquivo);
    }

    private void grava() {
        super.grava(localArquivo, matriculas);
    }

    public List<Matricula> getMatriculas() {
        return matriculas;
    }

    public void excluirMatricula(Matricula matricula) {
        matriculas.remove(matricula);
        grava();
    }

    // public Matricula buscarMatriculaPorNome(String nome) {
    //     return matriculas.stream()
    //             .filter(matricula -> matricula.getNome().equals(nome))
    //             .findFirst()
    //             .orElse(null);
    // }
}