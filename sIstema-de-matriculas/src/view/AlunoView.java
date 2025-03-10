package view;

import java.util.List;
import java.util.Scanner;

import controller.AlunoController;
import controller.DisciplinaController;
import controller.MatriculaController;
import model.Aluno;
import model.Curso;
import model.Disciplina;
import model.Matricula;

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

    public List<Aluno> listarAlunos() {
        List<Aluno> alunos = alunoController.listarAlunos();
        alunos.forEach(aluno -> System.out.println(alunos.indexOf(aluno) + 1 + " - " + aluno));
        return alunos;
    }

    public void escolherDisciplina(Aluno aluno) {
        System.out.println("Escolha a disciplina: ");
        List<Disciplina> disciplinas = disciplinaController.getDisciplinas().stream()
                .filter(disciplina -> !disciplinaController.isFull(disciplina)).toList();
        disciplinas.forEach(disciplina -> System.out.println(disciplinas.indexOf(disciplina) + 1 + " - " + disciplina));
        int id = scanner.nextInt();
        Disciplina disciplina = disciplinas.get(id - 1);
        try {
            matriculaController.addMatricula(aluno, disciplina);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
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

    public void cancelarMatricula(Aluno aluno) {
        List<Matricula> matriculas = visualizarMatriculas(aluno);
        int id = scanner.nextInt();
        Matricula matricula = matriculas.get(id - 1);
        matriculaController.excluirMatricula(matricula);
    }

    public List<Matricula> visualizarMatriculas(Aluno aluno) {
        System.out.println("Matrículas do aluno: ");
        List<Matricula> matriculas = matriculaController.getMatriculaByAluno(aluno);
        matriculas.forEach(matricula -> System.out.println(matriculas.indexOf(matricula) + 1 + " - " + matricula));
        return matriculas;
    }

    public void menu(Aluno aluno) {
        int opcao = 0;
        while (opcao != 4) {
            System.out.println("Menu do aluno");
            System.out.println("1 - Escolher disciplina");
            System.out.println("2 - Cancelar matrícula");
            System.out.println("3 - Visualizar matrículas");
            System.out.println("4 - Sair\n");
            opcao = scanner.nextInt();
            scanner.nextLine();
            switch (opcao) {
                case 1:
                    escolherDisciplina(aluno);
                    break;
                case 2:
                    cancelarMatricula(aluno);
                    break;
                case 3:
                    visualizarMatriculas(aluno);
                    break;
                case 4:
                    System.out.println("Saindo...");
                    break;
                default:
                    System.out.println("Opção inválida");
            }
        }
    }

    public void menu() {
        System.out.println("Menu do aluno");
        System.out.println("1 - Adicionar aluno");
        System.out.println("2 - Listar alunos");
        System.out.println("3 - Sair\n");
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