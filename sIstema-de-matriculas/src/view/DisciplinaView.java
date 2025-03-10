package view;

import java.util.List;
import java.util.Scanner;

import controller.DisciplinaController;
import model.Disciplina;
import model.Matricula;
import model.Professor;

public class DisciplinaView {
    private Scanner scanner = new Scanner(System.in);
    private DisciplinaController disciplinaController;
    private ProfessorView professorView;

    public DisciplinaView(DisciplinaController disciplinaController, ProfessorView professorView) {
        this.disciplinaController = disciplinaController;
        this.professorView = professorView;
    }

    public void addDisciplina() {
        System.out.println("\nDigite o nome da disciplina: ");
        String nome = scanner.nextLine();
        Professor professor = professorView.selecionarProfessor();
        disciplinaController.addDisciplina(nome, professor);
    }

    public List<Disciplina> listarDisciplinas() {
        System.out.println("\nDisciplinas: ");
        List<Disciplina> disciplinas = disciplinaController.getDisciplinas();
        disciplinas.forEach(disciplina -> System.out.println(disciplinas.indexOf(disciplina) + 1 + " - " + disciplina));
        return disciplinas;
    }

    public Disciplina selecionarDisciplina() {
        List<Disciplina> disciplinas = listarDisciplinas();
        System.out.print("Escolha a disciplina: ");
        int id = scanner.nextInt();
        Disciplina disciplina = disciplinas.get(id - 1);
        return disciplina;
    }

    public void encerrarMatriculas() {
        List<Matricula> matriculasCanceladas = disciplinaController.cancelarDisciplinas();
        if (matriculasCanceladas.isEmpty()) {
            System.out.println("Nenhuma matrícula foi cancelada");
            return;
        } else {
            System.out.println("Matrículas canceladas: ");
            matriculasCanceladas.forEach(matricula -> System.out.println(matricula));
        }
    }

    public void menu() {
        String opcao = "0";
        while (opcao != "3") {
            System.out.println("\nMenu de disciplinas\n");
            System.out.println("1 - Adicionar disciplina");
            System.out.println("2 - Listar disciplinas");
            System.out.println("3 - Sair\n");
            System.out.print("Digite a opção desejada: ");

            opcao = scanner.nextLine();

            switch (opcao) {
                case "1":
                    addDisciplina();
                    break;
                case "2":
                    listarDisciplinas();
                    break;
                case "3":
                    System.out.println("\nSistema encerrado");
                    break;
                default:
                    System.out.println("Opção inválida");
                    break;
            }
        }
    }
}
