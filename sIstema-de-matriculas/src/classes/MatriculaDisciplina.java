public class MatriculaDisciplina {
    private double frequencia;
    private double nota;

    public MatriculaDisciplina(double frequencia, double nota) {
        this.frequencia = frequencia;
        this.nota = nota;
    }

    public double getFrequencia() {
        return frequencia;
    }

    public double getNota() {
        return nota;
    }

    public void setFrequencia(double frequencia) {
        this.frequencia = frequencia;
    }

    public void setNota(double nota) {
        this.nota = nota;
    }
}
