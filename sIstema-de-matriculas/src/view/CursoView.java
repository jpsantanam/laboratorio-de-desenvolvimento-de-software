package view;

import java.util.ArrayList;
import java.util.Scanner;

import controller.CursoController;
import model.Aluno;
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
        System.out.println("Digite o nome do curso: ");
        String nome = scanner.nextLine();
        System.out.println("Digite o número de créditos do curso: ");
        int creditos = scanner.nextInt();
        cursoController.addCurso(nome, creditos);
    }

    public void listarCursos() {
        System.out.println("Cursos: ");
        cursoController.getCursos().forEach(curso -> System.out.println(curso));
    }

    public Curso selecionarCurso() {
        System.out.println("Escolha o curso: ");
        listarCursos();
        String id = scanner.nextLine();
        return cursoController.selecionarCurso(id);
    }

    public void addDisciplina() {
        Curso curso = selecionarCurso();
        Disciplina disciplina = disciplinaView.selecionarDisciplina();
        cursoController.addDisciplina(curso, disciplina);
    }

    public void menu() {
        int opcao = 0;
        while (opcao != 4) {
            System.out.println("1 - Adicionar curso");
            System.out.println("2 - Listar cursos");
            System.out.println("3 - Adicionar disciplina a um curso");
            System.out.println("4 - Sair");
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
                default:
                    System.out.println("Opção inválida");
                    break;
            }
        }
    }

}
