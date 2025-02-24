public class Professor extends Usuario {
  private AreasConhecimento areaDeAtuacao;
  
    public Professor(String nome, String senha, String id, AreasConhecimento areaDeAtuacao) {
        super(nome, senha, id);
        this.areaDeAtuacao = areaDeAtuacao;
    }

    public AreasConhecimento getAreaDeAtuacao() {
        return areaDeAtuacao;
    }

    public void setAreaDeAtuacao(AreasConhecimento areaDeAtuacao) {
        this.areaDeAtuacao = areaDeAtuacao;
    }

    public void getAlunosMatriculados(Matricula matricula) {
        //TODO
    }
}