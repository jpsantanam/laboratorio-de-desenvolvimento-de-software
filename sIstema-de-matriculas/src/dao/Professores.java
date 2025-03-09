package dao;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import model.Professor;

public class Professores extends AbstractDao implements Serializable {

    private List<Professor> professores;
    private static Professores instance;

    private final String localArquivo = "sistema-de-matriculas/src/data/Professores.dat";

    private Professores() {
        this.professores = new ArrayList<>();
        carregaProfessores();
    }

    public static Professores getInstance() {
        if (instance == null) {
            instance = new Professores();
        }
        return instance;
    }

    public void addProfessor(Professor professor) {
        this.professores.add(professor);
        grava();
    }

    private void carregaProfessores() {
        this.professores = super.leitura(localArquivo);
    }

    private void grava() {
        super.grava(localArquivo, professores);
    }

    public List<Professor> getProfessores() {
        return professores;
    }

    public void excluirProfessor(Professor professor) {
        professores.remove(professor);
        grava();
    }

    public Professor buscarProfessorPorNome(String nome) {
        return professores.stream()
                .filter(professor -> professor.getNome().equals(nome))
                .findFirst()
                .orElse(null);
    }
}