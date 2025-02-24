import java.util.Date;

public class Cobranca {
    private double valor;
    private Date dataDeVencimento;
    private boolean paga;

    public Cobranca(double valor, Date dataDeVencimento, boolean paga) {
        this.valor = valor;
        this.dataDeVencimento = dataDeVencimento;
        this.paga = paga;
    }

    public double getValor() {
        return valor;
    }

    public Date getDataDeVencimento() {
        return dataDeVencimento;
    }

    public boolean isPaga() {
        return paga;
    }

    public void setValor(double valor) {
        this.valor = valor;
    }

    public void setDataDeVencimento(Date dataDeVencimento) {
        this.dataDeVencimento = dataDeVencimento;
    }

    public void setPaga(boolean paga) {
        this.paga = paga;
    }

    public void pagar() {
        //TODO
    }
}
