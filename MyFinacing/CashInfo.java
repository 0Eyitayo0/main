public class CashInfo {
    private int dollarBill; // The dollar bill: $1, $5, $10, $20, $100
    private int quantity; // The quantity of the dollar bill
    private int total; // The amount of dollars
    private boolean isOffered;

    public CashInfo() {
        this.dollarBill = 0;
        this.quantity = 0;
        this.isOffered = false;
    }

    public CashInfo(int dollarBill, int quantity, boolean isOffered) {
        this.dollarBill = dollarBill;
        this.quantity = quantity;
        this.isOffered = isOffered;
    }

    public void setDollarBill(int dollarBill) {
        this.dollarBill = dollarBill;
    }

    public int getDollarBill() {
        return this.dollarBill;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public int getQuantity() {
        return this.quantity;
    }

    public int getTotal() {
        total = dollarBill * quantity;
        return total;
    }

    public boolean getIsOffered() {
        return this.isOffered;
    }

    public String toString() {
        String result = "$" + getDollarBill() + " x" + getQuantity() + " = $" + getTotal();
        if (isOffered)
            result += " ✅";
        return result;
    }
}
