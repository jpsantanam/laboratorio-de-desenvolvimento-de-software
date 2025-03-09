import controller.AlunoController;
import controller.CursoController;
import dao.AlunosDao;
import dao.CursosDao;
import view.AlunoView;
import view.CursoView;

public class Main {
    public static void main(String[] args) {
        AlunosDao alunosDao = AlunosDao.getInstance();
        AlunoController alunoController = new AlunoController(alunosDao);
        AlunoView alunoView = new AlunoView(alunoController);

        CursosDao cursosDao = CursosDao.getInstance();
        CursoController cursoController = new CursoController(cursosDao);
        CursoView cursoView = new CursoView(cursoController);

        alunoView.addAluno();
        alunoView.listarAlunos();

        cursoView.addCurso();
        cursoView.listarCursos();
    }
}
