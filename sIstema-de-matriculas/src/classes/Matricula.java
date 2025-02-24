public class Matricula {
    private int creditosCursados;
    private TipoMatricula tipo;

    public Matricula(int creditosCursados, TipoMatricula tipo) {
        this.creditosCursados = creditosCursados;
        this.tipo = tipo;
    }

    public int getCreditosCursados() {
        return creditosCursados;
    }

    public TipoMatricula getTipo() {
        return tipo;
    }

    public void setCreditosCursados(int creditosCursados) {
        this.creditosCursados = creditosCursados;
    }

    public void setTipo(TipoMatricula tipo) {
        this.tipo = tipo;
    }

    public void gerarCobranca() {
        //TODO
    }
}
