public class Usuario {
    private String nome;
    private String senha;
    private String id;

    public Usuario(String nome, String senha, String id) {
        this.nome = nome;
        this.senha = senha;
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public String getSenha() {
        return senha;
    }

    public String getId() {
        return id;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void fazerLogin(String nome, String senha) {
        //TODO
    }
}
