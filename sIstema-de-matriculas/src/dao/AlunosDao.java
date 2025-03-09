package dao;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import model.Aluno;

public class AlunosDao extends AbstractDao implements Serializable {

    private List<Aluno> alunos;
    private static AlunosDao instance;

    private final String localArquivo = "sistema-de-matriculas/src/data/Alunos.dat";

    private AlunosDao() {
        this.alunos = new ArrayList<>();
        carregaAlunos();
    }

    public static AlunosDao getInstance() {
        if (instance == null) {
            instance = new AlunosDao();
        }
        return instance;
    }

    public void addAluno(Aluno aluno) {
        this.alunos.add(aluno);
        grava();
    }

    private void carregaAlunos() {
        this.alunos = super.leitura(localArquivo);
    }

    private void grava() {
        super.grava(localArquivo, alunos);
    }

    public List<Aluno> getAlunos() {
        return alunos;
    }

    public void excluirAluno(Aluno aluno) {
        alunos.remove(aluno);
        grava();
    }

    public Aluno buscarAlunoPorNome(String nome) {
        return alunos.stream()
                .filter(aluno -> aluno.getNome().equals(nome))
                .findFirst()
                .orElse(null);
    }
}