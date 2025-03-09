package view;

import java.util.Scanner;

import controller.DisciplinaController;
import model.Disciplina;

public class DisciplinaView {
    private Scanner scanner = new Scanner(System.in);
    private DisciplinaController disciplinaController;

    public DisciplinaView(DisciplinaController disciplinaController) {
        this.disciplinaController = disciplinaController;
    }

    public void addDisciplina() {
        System.out.println("Digite o nome da disciplina: ");
        String nome = scanner.nextLine();
        System.out.println("Digite o nome do professor: ");
        String professor = scanner.nextLine();
        disciplinaController.addDisciplina(nome, professor);
    }

    public void listarDisciplinas() {
        disciplinaController.getDisciplinas().forEach(disciplina -> System.out.println(disciplina));
    }

    public Disciplina selecionarDisciplina() {
        System.out.println("Escolha a disciplina: ");
        listarDisciplinas();
        String id = scanner.nextLine();
        System.out.println("id: " + id);
        Disciplina disciplina = disciplinaController.getDisciplinaById(id);
        return disciplina;
    }

    public void menu() {
        int opcao = 0;
        while (opcao != 3) {
            System.out.println("1 - Adicionar disciplina");
            System.out.println("2 - Listar disciplinas");
            System.out.println("3 - Sair");
            opcao = scanner.nextInt();
            scanner.nextLine();
            switch (opcao) {
                case 1:
                    addDisciplina();
                    break;
                case 2:
                    listarDisciplinas();
                    break;
                case 3:
                    break;
                default:
                    System.out.println("Opção inválida");
                    break;
            }
        }
    }
}
