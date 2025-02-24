import java.util.ArrayList;

public class Aluno extends Usuario {
    private final int MAX_DISCIPlINAS_OBRIGATORIAS = 4;
    private final int MAX_DISCIPlINAS_OPTATIVAS = 2;
    private ArrayList<MatriculaCurso> cursos;
    private ArrayList<MatriculaDisciplina> disciplinas;

    public Aluno(String nome, String senha, String id) {
        super(nome, senha, id);
        this.cursos = new ArrayList<MatriculaCurso>();
        this.disciplinas = new ArrayList<MatriculaDisciplina>();
    }

    public ArrayList<MatriculaCurso> getCursos() {
        return cursos;
    }

    public ArrayList<MatriculaDisciplina> getDisciplinas() {
        return disciplinas;
    }

    public void setCursos(ArrayList<MatriculaCurso> cursos) {
        this.cursos = cursos;
    }

    public void setDisciplinas(ArrayList<MatriculaDisciplina> disciplinas) {
        this.disciplinas = disciplinas;
    }

    public void matricularCurso() {
        //TODO
    }

    public void matricularDisciplina() {
        //TODO
    }

    public void cancelarMatricula() {
        //TODO
    }
}
