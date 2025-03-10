package model;

public enum TipoMatricula {
    OBRIGATORIA(4), OPTATIVA(2);

    private int maxMatriculas;

    TipoMatricula(int maxMatriculas) {
        this.maxMatriculas = maxMatriculas;
    }

    public int getMaxMatriculas() {
        return maxMatriculas;
    }
}