package dao;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import model.Disciplina;

public class Disciplinas extends AbstractDao implements Serializable {

    private List<Disciplina> disciplinas;
    private static Disciplinas instance;

    private final String localArquivo = "sistema-de-matriculas/src/data/Disciplinas.dat";

    private Disciplinas() {
        this.disciplinas = new ArrayList<>();
        carregaDisciplinas();
    }

    public static Disciplinas getInstance() {
        if (instance == null) {
            instance = new Disciplinas();
        }
        return instance;
    }

    public void addDisciplina(Disciplina disciplina) {
        this.disciplinas.add(disciplina);
        grava();
    }

    private void carregaDisciplinas() {
        this.disciplinas = super.leitura(localArquivo);
    }

    private void grava() {
        super.grava(localArquivo, disciplinas);
    }

    public List<Disciplina> getDisciplinas() {
        return disciplinas;
    }

    public void excluirDisciplina(Disciplina disciplina) {
        disciplinas.remove(disciplina);
        grava();
    }

    public Disciplina buscarDisciplinaPorNome(String nome) {
        return disciplinas.stream()
                .filter(disciplina -> disciplina.getNome().equals(nome))
                .findFirst()
                .orElse(null);
    }
}