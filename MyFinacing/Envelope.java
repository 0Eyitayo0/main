import java.util.LinkedList;

public class Envelope {
    public static final String ANSI_RED = "\u001b[31m";
    public static final String ANSI_GREY_BACKGROUND = "\u001b[0m";
    private String name;
    private LinkedList<CashInfo> envelope = new LinkedList<CashInfo>();

    public Envelope(String name) {
        this.name = name;
        envelope.add(new CashInfo(5, 0, false));
        envelope.add(new CashInfo(20, 0, false));
        envelope.add(new CashInfo(100, 0, false));
    }

    public Envelope(String name, int dollarBill, int quantity, boolean isOffered) {
        this.name = name;
        envelope.add(new CashInfo(dollarBill, quantity, isOffered));
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return this.name;
    }

    public void addCash(int dollarBill, int quantity) { // Adds to a currently existing CashInfo object in envelope
        for (CashInfo bill: envelope) {
            if (bill.getDollarBill() == dollarBill) {
                bill.setQuantity(bill.getQuantity() + quantity);
                return;
            }
        }
        System.out.println(ANSI_RED + "Error: Unable to add $" + dollarBill + " to the envelope! A $" + dollarBill + " bill does not exist within the envelope { " + this.name + " }." + ANSI_GREY_BACKGROUND);
    }

    public void removeCash(int dollarBill, int quantity) { // Subtracts the quantity of a chosen cash object which exists within envelope
        for (CashInfo bill: envelope) {
            if (bill.getDollarBill() == dollarBill) {
                if (bill.getQuantity() <= quantity) {
                    bill.setQuantity(0);
                    return;
                }
                bill.setQuantity(bill.getQuantity() - quantity);
                return;
            }
        }
        System.out.println(ANSI_RED + "Error: Unable to remove $" + dollarBill + " from the envelope! A $" + dollarBill + " bill does not exist within the envelope { " + this.name + " }." + ANSI_GREY_BACKGROUND);
    }

    public void addDollarBill(int dollarBill, int quantity) { // Add a new CashInfo object to the envelope
        for (int i = 0; i < envelope.size(); i++) {
            if (envelope.get(i).getDollarBill() == dollarBill) {
                System.out.println(ANSI_RED + "Error: Unable to add the $" + envelope.get(i).getDollarBill() + " bill into the envelope { " + this.name + " }! It's already in there!" + ANSI_GREY_BACKGROUND);
                return;
            }
        }
        envelope.add(new CashInfo(dollarBill, quantity, false));
    }

    public void removeDollarBill(int dollarBill) { // Removes a currently existing CashInfo object from envelope
        if (!envelope.isEmpty() && envelope.getLast().getDollarBill() == dollarBill) {
            envelope.remove(envelope.getLast());
        } else {
            for (int i = 0; i < (envelope.size() - 1) && envelope.get(i + 1) != null; i++) {
                if (envelope.get(i) != null && envelope.get(i).getDollarBill() == dollarBill) {
                    envelope.remove(i);
                    return;
                }
            }
            // If the dollar bill is not removed, then it's because the dollar bill was not found
            System.out.println(ANSI_RED + "Error: No $" + dollarBill + " bill has been found within the envelope { " + this.name + " }." + ANSI_GREY_BACKGROUND);
        }
    }

    public int getTotal() {
        int total = 0;

        for (CashInfo cash: envelope) {
            total += cash.getTotal();
        }

        return total;
    }

    public String toString() {
        String result = name + ":\n";
        boolean isAllOffered = true;

        if (getTotal() == 0) {
            result += "\tEnvelope is empty!";

        } else {
            for (CashInfo cashInfo: envelope) {
                if (cashInfo.getTotal() != 0) {
                    result += "\t" + cashInfo.toString() + "\n";
                }

                if (!cashInfo.getIsOffered())
                    isAllOffered = false;
            }

            result += "\tTotal: $" + getTotal();
            if (isAllOffered)
                result += " ✅";
        }


        return result;
    }
}
