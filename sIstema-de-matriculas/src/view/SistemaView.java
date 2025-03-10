package view;

import java.util.Scanner;

import model.Aluno;
import model.Professor;
import model.UsuarioSecretaria;

public class SistemaView {
    private Scanner scanner = new Scanner(System.in);

    private AlunoView alunoView;
    private ProfessorView professorView;
    private UsuarioSecretariaView usuarioSecretariaView;

    public SistemaView(AlunoView alunoView, ProfessorView professorView, UsuarioSecretariaView usuarioSecretariaView) {
        this.alunoView = alunoView;
        this.professorView = professorView;
        this.usuarioSecretariaView = usuarioSecretariaView;
    }

    public void menu() {
        System.out.println("\nBem-vindo ao sistema de matrículas\n");
        System.out.println("1 - Usuário da secretaria");
        System.out.println("2 - Aluno");
        System.out.println("3 - Professor");
        System.out.println("4 - Sair\n");
        System.out.print("Digite o tipo de usuário: ");

        String tipoUsuario = scanner.nextLine();

        switch (tipoUsuario) {
            case "1":
                UsuarioSecretaria usuarioSecretaria = usuarioSecretariaView.login();
                if (usuarioSecretaria != null) {
                    usuarioSecretariaView.menu();
                }
                break;
            case "2":
                Professor professor = professorView.login();
                if (professor != null) {
                    // professorView.menu(professor);
                }
                break;
            case "3":
                Aluno aluno = alunoView.login();
                if (aluno != null) {
                    alunoView.menu(aluno);
                }
                break;
            case "4":
                System.out.println("\nSistema encerrado");
                System.exit(0);
                break;
            default:
                System.out.println("\nOpção inválida");
                break;
        }
    }
}
