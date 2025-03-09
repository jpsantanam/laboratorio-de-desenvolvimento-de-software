package view;

import java.util.Scanner;

import controller.AlunoController;
import controller.DisciplinaController;
import controller.MatriculaController;
import model.Aluno;
import model.Curso;
import model.Disciplina;

public class AlunoView {
    private AlunoController alunoController;
    private DisciplinaController disciplinaController;
    private CursoView cursoView;
    private MatriculaController matriculaController;

    public AlunoView(AlunoController alunoController, CursoView cursoView, DisciplinaController disciplinaController,
            MatriculaController matriculaController) {
        this.disciplinaController = disciplinaController;
        this.alunoController = alunoController;
        this.cursoView = cursoView;
        this.matriculaController = matriculaController;
    }

    private Scanner scanner = new Scanner(System.in);

    public void addAluno() {
        System.out.println("Digite o nome do aluno: ");
        String nome = scanner.nextLine();
        System.out.println("Digite o email do aluno: ");
        String email = scanner.nextLine();
        System.out.println("Digite a senha do aluno: ");
        String senha = scanner.nextLine();
        Curso curso = cursoView.selecionarCurso();
        alunoController.addAluno(nome, email, senha, curso);
    }

    public void listarAlunos() {
        alunoController.listarAlunos();
    }

    public void escolherDisciplina(Aluno aluno) {
        System.out.println("Escolha a disciplina: ");
        aluno.getCurso().getDisciplinas().forEach(disciplina -> System.out.println(disciplina));
        scanner.nextLine();
        String id = scanner.nextLine();
        Disciplina disciplina = disciplinaController.getDisciplinaById(id);
        matriculaController.addMatricula(aluno, disciplina);
    }

    public Aluno login() {
        System.out.println("Digite o email do aluno: ");
        String email = scanner.nextLine();
        System.out.println("Digite a senha do aluno: ");
        String senha = scanner.nextLine();
        Aluno aluno = alunoController.login(email, senha);
        if (aluno != null) {
            return aluno;
        } else {
            System.out.println("Email ou senha inválidos");
            return null;
        }
    }

    public void menu(Aluno aluno) {
        int opcao = 0;
        while (opcao != 3) {
            System.out.println("1 - Escolher disciplina");
            System.out.println("2 - Cancelar matrícula");
            System.out.println("3 - Sair");
            opcao = scanner.nextInt();
            scanner.nextLine();
            switch (opcao) {
                case 1:
                    escolherDisciplina(aluno);
                    break;
                case 2:
                    listarAlunos();
                    break;
                case 3:
                    System.out.println("Saindo...");
                    break;
                default:
                    System.out.println("Opção inválida");
            }
        }
    }

    public void menu(){
        System.out.println("1 - Adicionar aluno");
        System.out.println("2 - Listar alunos");
        System.out.println("3 - Excluir aluno");
        System.out.println("4 - Sair");
        int opcao = scanner.nextInt();
        scanner.nextLine();
        switch (opcao) {
            case 1:
                addAluno();
                break;
            case 2:
                listarAlunos();
                break;
            case 3:
                System.out.println("Saindo...");
                break;
            default:
                System.out.println("Opção inválida");
        }
    }
}