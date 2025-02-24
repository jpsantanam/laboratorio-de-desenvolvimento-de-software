import java.util.ArrayList;

public class Curso {
    private String nome;
    private int creditos;
    private ArrayList<CursoDisciplina> gradeDisciplinas;
    private AreasConhecimento areaDoConhecimento;
    private ArrayList<Matricula> matriculas;

    public Curso(String nome, int creditos, ArrayList<CursoDisciplina> gradeDisciplinas,
            AreasConhecimento areaDoConhecimento, ArrayList<Matricula> matriculas) {
        this.nome = nome;
        this.creditos = creditos;
        this.gradeDisciplinas = gradeDisciplinas;
        this.areaDoConhecimento = areaDoConhecimento;
        this.matriculas = matriculas;
    }

    public String getNome() {
        return nome;
    }

    public int getCreditos() {
        return creditos;
    }

    public ArrayList<CursoDisciplina> getGradeDisciplinas() {
        return gradeDisciplinas;
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

    public void setGradeDisciplinas(ArrayList<CursoDisciplina> gradeDisciplinas) {
        this.gradeDisciplinas = gradeDisciplinas;
    }

    public void setAreaDoConhecimento(AreasConhecimento areaDoConhecimento) {
        this.areaDoConhecimento = areaDoConhecimento;
    }

    public void setMatriculas(ArrayList<Matricula> matriculas) {
        this.matriculas = matriculas;
    }
}
