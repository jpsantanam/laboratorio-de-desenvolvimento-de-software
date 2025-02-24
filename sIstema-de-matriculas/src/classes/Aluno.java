import java.util.ArrayList;

public class Aluno extends Usuario {
    private final int MAX_DISCIPlINAS_OBRIGATORIAS = 4;
    private final int MAX_DISCIPlINAS_OPTATIVAS = 2;
    private ArrayList<Disciplina> disciplinasMatriculadas;

    public Aluno(String nome, String senha, String id) {
        super(nome, senha, id);
        this.disciplinasMatriculadas = new ArrayList<Disciplina>();
    }

    public void criarMatricula() {
        //TODO
    }

    public void cancelarMatricula(Matricula matricula) {
        //TODO
    }
}
