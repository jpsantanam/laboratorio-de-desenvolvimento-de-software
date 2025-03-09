package view;

import java.util.ArrayList;
import java.util.Scanner;

import controller.CursoController;
import model.Aluno;
import model.Disciplina;

public class CursoView {
    private Scanner scanner = new Scanner(System.in);
    private CursoController cursoController;

    public CursoView(CursoController cursoController) {
        this.cursoController = cursoController;
    }

    public void addCurso() {
        System.out.println("Digite o nome do curso: ");
        String nome = scanner.nextLine();
        System.out.println("Digite o número de créditos do curso: ");
        int creditos = scanner.nextInt();
        cursoController.addCurso(nome, creditos);
    }

    public void listarCursos() {
        cursoController.listarCursos();
    }
}


