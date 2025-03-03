import java.util.ArrayList;

public class Disciplina {
    private final int MAX_MATRICULAS = 60;
    private final int MIN_MATRICULAS = 3;
    private String nome;
    private int creditos;
    private boolean ativa;
    private AreasConhecimento areaDoConhecimento;
    private ArrayList<Matricula> matriculas;

    public Disciplina(String nome, int creditos, boolean ativa, AreasConhecimento areaDoConhecimento,
            ArrayList<Matricula> matriculas) {
        this.nome = nome;
        this.creditos = creditos;
        this.ativa = ativa;
        this.areaDoConhecimento = areaDoConhecimento;
        this.matriculas = matriculas;
    }

    public String getNome() {
        return nome;
    }

    public int getCreditos() {
        return creditos;
    }

    public boolean isAtiva() {
        return ativa;
    }

    public AreasConhecimento getAreaDoConhecimento() {
        return areaDoConhecimento;
    }

    public ArrayList<Matricula> getMatriculas() {
        return matriculas;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setCreditos(int creditos) {
        this.creditos = creditos;
    }

    public void setAtiva(boolean ativa) {
        this.ativa = ativa;
    }

    public void setAreaDoConhecimento(AreasConhecimento areaDoConhecimento) {
        this.areaDoConhecimento = areaDoConhecimento;
    }

    public void setMatriculas(ArrayList<Matricula> matriculas) {
        this.matriculas = matriculas;
    }

    public void setAtiva(ArrayList<Matricula> matriculas) {
        // TODO
    }
}