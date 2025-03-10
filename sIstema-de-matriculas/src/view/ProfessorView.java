package view;

import java.util.List;
import java.util.Scanner;

import controller.ProfessorController;
import model.Professor;

public class ProfessorView {
    private Scanner scanner = new Scanner(System.in);
    private ProfessorController professorController;

    public ProfessorView(ProfessorController professorController) {
        this.professorController = professorController;
    }

    public void addProfessor() {
        System.out.println("Digite o nome do professor: ");
        String nome = scanner.nextLine();
        System.out.println("Digite o email do professor: ");
        String email = scanner.nextLine();
        System.out.println("Digite a senha do professor: ");
        String senha = scanner.nextLine();
        professorController.addProfessor(nome, email, senha);
    }

    public void listarProfessores() {
        List<Professor> professores = professorController.getProfessores();
        professores.forEach(professor -> System.out.println(professores.indexOf(professor) + 1 + " - " + professor));
    }

    public Professor login() {
        System.out.print("Digite o email do professor: ");
        String email = scanner.nextLine();
        System.out.print("Digite a senha do professor: ");
        String senha = scanner.nextLine();
        Professor professor = professorController.login(email, senha);
        if (professor != null) {
            return professor;
        } else {
            System.out.println("Usuário ou senha inválidos!");
            return null;
        }
    }

    public void menu() {
        int opcao = 0;
        while (opcao != 3) {
            System.out.println("1 - Adicionar professor");
            System.out.println("2 - Listar professores");
            System.out.println("3 - Sair");
            opcao = scanner.nextInt();
            scanner.nextLine();
            switch (opcao) {
                case 1:
                    addProfessor();
                    break;
                case 2:
                    listarProfessores();
                    break;
                case 3:
                    System.out.println("Saindo...");
                    break;
                default:
                    System.out.println("Opção inválida");
                    break;
            }
        }
    }
}
