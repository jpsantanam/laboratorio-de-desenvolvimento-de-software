package view;

import java.util.Scanner;

import controller.AlunoController;

public class AlunoView {
    private AlunoController alunoController;

    public AlunoView(AlunoController alunoController) {
        this.alunoController = alunoController;
    }

    private Scanner scanner = new Scanner(System.in);

    public void addAluno() {
        System.out.println("Digite o nome do aluno: ");
        String nome = scanner.nextLine();
        System.out.println("Digite o email do aluno: ");
        String email = scanner.nextLine();
        System.out.println("Digite a senha do aluno: ");
        String senha = scanner.nextLine();
        System.out.println("Digite o curso do aluno: ");
        String curso = scanner.nextLine();
        alunoController.addAluno(nome, email, senha, curso);
    }

    public void listarAlunos() {
        alunoController.listarAlunos();
    }
}