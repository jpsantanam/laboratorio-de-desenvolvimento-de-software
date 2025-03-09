package dao;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import model.UsuarioSecretaria;

public class UsuariosSecretariaDao extends AbstractDao implements Serializable {

    private List<UsuarioSecretaria> usuariosSecretaria;
    private static UsuariosSecretariaDao instance;

    private final String localArquivo = "sistema-de-matriculas/src/data/UsuariosSecretaria.dat";

    private UsuariosSecretariaDao() {
        this.usuariosSecretaria = new ArrayList<>();
        carregaUsuariosSecretaria();
    }

    public static UsuariosSecretariaDao getInstance() {
        if (instance == null) {
            instance = new UsuariosSecretariaDao();
        }
        return instance;
    }

    public void addUsuarioSecretaria(UsuarioSecretaria usuarioSecretaria) {
        this.usuariosSecretaria.add(usuarioSecretaria);
        grava();
    }

    private void carregaUsuariosSecretaria() {
        this.usuariosSecretaria = super.leitura(localArquivo);
    }

    private void grava() {
        super.grava(localArquivo, usuariosSecretaria);
    }

    public List<UsuarioSecretaria> getUsuariosSecretaria() {
        return usuariosSecretaria;
    }

    public void excluirUsuarioSecretaria(UsuarioSecretaria usuarioSecretaria) {
        usuariosSecretaria.remove(usuarioSecretaria);
        grava();
    }

    public UsuarioSecretaria buscarUsuarioSecretariaPorNome(String nome) {
        return usuariosSecretaria.stream()
                .filter(usuarioSecretaria -> usuarioSecretaria.getNome().equals(nome))
                .findFirst()
                .orElse(null);
    }
}