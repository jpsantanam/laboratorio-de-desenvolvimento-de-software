import controller.AlunoController;
import controller.CursoController;
import controller.DisciplinaController;
import controller.MatriculaController;
import controller.ProfessorController;
import controller.UsuarioSecretariaController;
import dao.AlunosDao;
import dao.CursosDao;
import dao.DisciplinasDao;
import dao.MatriculasDao;
import dao.ProfessoresDao;
import dao.UsuariosSecretariaDao;
import view.AlunoView;
import view.CursoView;
import view.DisciplinaView;
import view.ProfessorView;
import view.SistemaView;
import view.UsuarioSecretariaView;

public class Main {
    public static void main(String[] args) {
        MatriculasDao matriculasDao = MatriculasDao.getInstance();
        MatriculaController matriculaController = new MatriculaController(matriculasDao);

        ProfessoresDao professoresDao = ProfessoresDao.getInstance();
        ProfessorController professorController = new ProfessorController(professoresDao);
        ProfessorView professorView = new ProfessorView(professorController);

        DisciplinasDao disciplinaDao = DisciplinasDao.getInstance();
        DisciplinaController disciplinaController = new DisciplinaController(disciplinaDao, matriculaController);
        DisciplinaView disciplinaView = new DisciplinaView(disciplinaController, professorView);

        CursosDao cursosDao = CursosDao.getInstance();
        CursoController cursoController = new CursoController(cursosDao);
        CursoView cursoView = new CursoView(cursoController, disciplinaView);

        AlunosDao alunosDao = AlunosDao.getInstance();
        AlunoController alunoController = new AlunoController(alunosDao);
        AlunoView alunoView = new AlunoView(alunoController, cursoView, disciplinaController, matriculaController);

        UsuariosSecretariaDao usuariosSecretariaDao = UsuariosSecretariaDao.getInstance();
        UsuarioSecretariaController usuarioSecretariaController = new UsuarioSecretariaController(
                usuariosSecretariaDao);
        UsuarioSecretariaView usuarioSecretariaView = new UsuarioSecretariaView(usuarioSecretariaController, alunoView,
                professorView, disciplinaView, cursoView);

        SistemaView sistemaView = new SistemaView(alunoView, professorView, usuarioSecretariaView);

        usuarioSecretariaView.addDefaultUser();

        while (true) {
            sistemaView.menu();
        }
    }
}
