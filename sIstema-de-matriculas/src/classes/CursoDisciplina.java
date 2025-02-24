import java.util.ArrayList;

public class CursoDisciplina {
    private ArrayList<Disciplina> disciplinas;
    private ArrayList<Curso> cursos;

    public CursoDisciplina(ArrayList<Disciplina> disciplinas, ArrayList<Curso> cursos) {
        this.disciplinas = disciplinas;
        this.cursos = cursos;
    }

    public ArrayList<Disciplina> getDisciplinas() {
        return disciplinas;
    }

    public ArrayList<Curso> getCursos() {
        return cursos;
    }

    public void setDisciplinas(ArrayList<Disciplina> disciplinas) {
        this.disciplinas = disciplinas;
    }

    public void setCursos(ArrayList<Curso> cursos) {
        this.cursos = cursos;
    }
}
