package view;

import java.util.Scanner;

import controller.UsuarioSecretariaController;
import model.UsuarioSecretaria;

public class UsuarioSecretariaView {
    private Scanner scanner = new Scanner(System.in);
    private UsuarioSecretariaController usuarioSecretariaController;
    private AlunoView alunoView;
    private ProfessorView professorView;
    private DisciplinaView disciplinaView;
    private CursoView cursoView;

    public UsuarioSecretariaView(UsuarioSecretariaController usuarioSecretariaController, AlunoView alunoView,
            ProfessorView professorView, DisciplinaView disciplinaView, CursoView cursoView) {
        this.usuarioSecretariaController = usuarioSecretariaController;
        this.alunoView = alunoView;
        this.professorView = professorView;
        this.disciplinaView = disciplinaView;
        this.cursoView = cursoView;
    }

    public void addUsuarioSecretaria() {
        System.out.println("Digite o nome do usuário: ");
        String nome = scanner.nextLine();
        System.out.println("Digite o email do usuário: ");
        String email = scanner.nextLine();
        System.out.println("Digite a senha do usuário: ");
        String senha = scanner.nextLine();
        usuarioSecretariaController.addUsuarioSecretaria(nome, email, senha);
    }

    public void addDefaultUser() {
        usuarioSecretariaController.addUsuarioSecretaria("admin", "admin", "admin");
        System.out.println("\nUsuário padrão adicionado com sucesso!");
        System.out.println("Email: admin");
        System.out.println("Senha: admin");
    }

    public UsuarioSecretaria login() {
        System.out.print("Digite o email do usuário: ");
        String email = scanner.nextLine();
        System.out.print("Digite a senha do usuário: ");
        String senha = scanner.nextLine();
        UsuarioSecretaria usuario = usuarioSecretariaController.login(email, senha);
        if (usuario != null) {
            return usuario;
        } else {
            System.out.println("Usuário ou senha inválidos!");
            return null;
        }
    }

    public void encerrarMatriculas() {
        disciplinaView.encerrarMatriculas();
    }

    public void menu() {
        System.out.println("\nMenu do usuário da secretaria");
        System.out.println("1 - Aluno");
        System.out.println("2 - Professor");
        System.out.println("3 - Disciplina");
        System.out.println("4 - Curso");
        System.out.println("5 - Encerrar período de matrículas");
        System.out.println("6 - Sair");
        System.out.print("Digite a opção desejada: ");

        int opcao = scanner.nextInt();

        switch (opcao) {
            case 1:
                alunoView.menu();
                break;
            case 2:
                professorView.menu();
                break;
            case 3:
                disciplinaView.menu();
                break;
            case 4:
                cursoView.menu();
                break;
            case 5:
                encerrarMatriculas();
                break;
            case 6:
                System.out.println("Saindo...");
                break;
            default:
                System.out.println("Opção inválida");
                break;
        }
    }
}
