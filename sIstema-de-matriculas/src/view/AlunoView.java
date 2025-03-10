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
import model.TipoMatricula;

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
        System.out.println("\nDigite o nome do aluno: ");
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

    public void escolherDisciplina(Aluno aluno, TipoMatricula tipo) {
        if (matriculaController.getMatriculaByAlunoAndTipo(aluno, tipo).size() >= tipo.getMaxMatriculas()) {
            System.out.println("\nAluno já matriculado no máximo de disciplinas do tipo " + tipo);
            return;
        }

        System.out.println("\nEscolha a disciplina: ");

        List<Disciplina> disciplinas = disciplinaController.getDisciplinas().stream()
                .filter(disciplina -> !disciplinaController.isFull(disciplina)).toList();
        disciplinas.forEach(disciplina -> System.out.println(disciplinas.indexOf(disciplina) + 1 + " - " + disciplina));

        int id = scanner.nextInt();
        Disciplina disciplina = disciplinas.get(id - 1);

        try {
            matriculaController.addMatricula(aluno, disciplina, tipo);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    public Aluno login() {
        System.out.println("\nDigite o email do aluno: ");
        String email = scanner.nextLine();
        System.out.println("Digite a senha do aluno: ");
        String senha = scanner.nextLine();
        Aluno aluno = alunoController.login(email, senha);
        if (aluno != null) {
            return aluno;
        } else {
            System.out.println("\nEmail ou senha inválidos");
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
        System.out.println("\nMatrículas do aluno: ");
        List<Matricula> matriculas = matriculaController.getMatriculaByAluno(aluno);
        matriculas.forEach(matricula -> System.out.println(matriculas.indexOf(matricula) + 1 + " - " + matricula));
        return matriculas;
    }

    public void menu(Aluno aluno) {
        String opcao = "0";
        while (opcao != "5") {
            System.out.println("\nMenu do aluno\n");
            System.out.println("1 - Escolher disciplina obrigatória");
            System.out.println("2 - Escolher disciplina optativa");
            System.out.println("3 - Cancelar matrícula");
            System.out.println("4 - Visualizar matrículas");
            System.out.println("5 - Sair\n");
            System.out.print("Digite a opção desejada: ");

            opcao = scanner.nextLine();

            switch (opcao) {
                case "1":
                    escolherDisciplina(aluno, TipoMatricula.OBRIGATORIA);
                    break;
                case "2":
                    escolherDisciplina(aluno, TipoMatricula.OPTATIVA);
                    break;
                case "3":
                    cancelarMatricula(aluno);
                    break;
                case "4":
                    visualizarMatriculas(aluno);
                    break;
                case "5":
                    System.out.println("\nSistema encerrado");
                    break;
                default:
                    System.out.println("Opção inválida");
            }
        }
    }

    public void menu() {
        System.out.println("\nMenu do aluno\n");
        System.out.println("1 - Adicionar aluno");
        System.out.println("2 - Listar alunos");
        System.out.println("3 - Sair\n");
        System.out.print("Digite a opção desejada: ");

        String opcao = scanner.nextLine();

        switch (opcao) {
            case "1":
                addAluno();
                break;
            case "2":
                listarAlunos();
                break;
            case "3":
                System.out.println("\nSistema encerrado");
                break;
            default:
                System.out.println("Opção inválida");
        }
    }
}