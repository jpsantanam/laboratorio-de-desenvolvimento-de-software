import java.util.ArrayList;

public class MatriculaCurso {
    private int creditosCursados;
    private ArrayList<Disciplina> disciplinasCursadas;
    private ArrayList<Disciplina> disciplinasMatriculadas;

    public MatriculaCurso(int creditosCursados, ArrayList<Disciplina> disciplinasCursadas,
            ArrayList<Disciplina> disciplinasMatriculadas) {
        this.creditosCursados = creditosCursados;
        this.disciplinasCursadas = disciplinasCursadas;
        this.disciplinasMatriculadas = disciplinasMatriculadas;
    }

    public int getCreditosCursados() {
        return creditosCursados;
    }

    public ArrayList<Disciplina> getDisciplinasCursadas() {
        return disciplinasCursadas;
    }

    public ArrayList<Disciplina> getDisciplinasMatriculadas() {
        return disciplinasMatriculadas;
    }

    public void setCreditosCursados(int creditosCursados) {
        this.creditosCursados = creditosCursados;
    }

    public void setDisciplinasCursadas(ArrayList<Disciplina> disciplinasCursadas) {
        this.disciplinasCursadas = disciplinasCursadas;
    }

    public void setDisciplinasMatriculadas(ArrayList<Disciplina> disciplinasMatriculadas) {
        this.disciplinasMatriculadas = disciplinasMatriculadas;
    }

    public void gerarCobranca() {
        // TODO
    }
}
