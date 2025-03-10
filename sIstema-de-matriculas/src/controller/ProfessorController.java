package controller;

import java.util.List;
import java.util.UUID;

import dao.ProfessoresDao;
import model.Professor;

public class ProfessorController {
    private ProfessoresDao professoresDao;

    public ProfessorController(ProfessoresDao professoresDao) {
        this.professoresDao = professoresDao;
    }

    public void addProfessor(String nome, String email, String senha) {
        String id = UUID.randomUUID().toString();
        professoresDao.addProfessor(new Professor(nome, id, email, senha));
    }

    public List<Professor> getProfessores() {
        return professoresDao.getProfessores();
    }

    public Professor login(String email, String senha) {
        return professoresDao.getProfessores().stream()
                .filter(professor -> professor.getEmail().equals(email) && professor.getSenha().equals(senha))
                .findFirst()
                .orElse(null);
    }
}
