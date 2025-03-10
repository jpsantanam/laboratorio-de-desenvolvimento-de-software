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


}

