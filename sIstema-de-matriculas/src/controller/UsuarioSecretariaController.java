package controller;

import java.util.UUID;

import dao.UsuariosSecretariaDao;
import model.UsuarioSecretaria;

public class UsuarioSecretariaController {
    private UsuariosSecretariaDao usuariosSecretariaDao;

    public UsuarioSecretariaController(UsuariosSecretariaDao usuariosSecretariaDao) {
        this.usuariosSecretariaDao = usuariosSecretariaDao;
    }

    public void addUsuarioSecretaria(String nome, String email, String senha) {
        String id = UUID.randomUUID().toString();
        usuariosSecretariaDao.addUsuarioSecretaria(new UsuarioSecretaria(nome, id, email, senha));
    }

    public UsuarioSecretaria login(String email, String senha) {
        return usuariosSecretariaDao.getUsuariosSecretaria().stream()
                .filter(u -> u.getEmail().equals(email) && u.getSenha().equals(senha))
                .findFirst()
                .orElse(null);
    }

}
