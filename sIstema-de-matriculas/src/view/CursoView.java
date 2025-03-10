package view;

import java.util.List;
import java.util.Scanner;

import controller.CursoController;
import model.Curso;
import model.Disciplina;

public class CursoView {
    private Scanner scanner = new Scanner(System.in);
    private CursoController cursoController;
    private DisciplinaView disciplinaView;

    public CursoView(CursoController cursoController, DisciplinaView disciplinaView) {
        this.cursoController = cursoController;
        this.disciplinaView = disciplinaView;
    }

    public void addCurso() {
        System.out.println("\nDigite o nome do curso: ");
        String nome = scanner.nextLine();
        System.out.println("Digite o número de créditos do curso: ");
        int creditos = scanner.nextInt();
        cursoController.addCurso(nome, creditos);
    }

    public List<Curso> listarCursos() {
        System.out.println("\nCursos: ");
        List<Curso> cursos = cursoController.getCursos();
        cursos.forEach(curso -> System.out.println(cursos.indexOf(curso) + 1 + " - " + curso));
        return cursos;
    }

    public Curso selecionarCurso() {
        List<Curso> curso = listarCursos();
        System.out.print("\nEscolha o curso: ");
        int id = scanner.nextInt();
        return curso.get(id - 1);
    }

    public void addDisciplina() {
        Curso curso = selecionarCurso();
        Disciplina disciplina = disciplinaView.selecionarDisciplina();
        cursoController.addDisciplina(curso, disciplina);
    }

    public void menu() {
        int opcao = 0;
        while (opcao != 4) {
            System.out.println("\nMenu de cursos\n");
            System.out.println("1 - Adicionar curso");
            System.out.println("2 - Listar cursos");
            System.out.println("3 - Adicionar disciplina a um curso");
            System.out.println("4 - Sair\n");
            System.out.print("Digite a opção desejada: ");
            opcao = scanner.nextInt();
            scanner.nextLine();
            switch (opcao) {
                case 1:
                    addCurso();
                    break;
                case 2:
                    listarCursos();
                    break;
                case 3:
                    addDisciplina();
                    break;
                case 4:
                    System.out.println("Sistema encerrado");
                    break;
                default:
                    System.out.println("Opção inválida");
                    break;
            }
        }
    }

}
