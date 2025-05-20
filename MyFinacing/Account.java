import java.util.LinkedList;
import java.util.Scanner;

public class Account {
    public static final String ANSI_RED = "\u001b[31m";
    public static final String ANSI_GREY_BACKGROUND = "\u001b[0m";
    private LinkedList<Envelope> account = new LinkedList<>();

    public Account() {
    }

    public Integer envelopeExist(String envName) {
        if (account.isEmpty())
            return null;

        for (int i = 0; i < account.size(); i++) {
            if (account.get(i).getName().equals(envName)) {
                return i;
            }
        }

        return null;
    }

    public void addEnvelope(String envName, Scanner scnr) {
        while (envelopeExist(envName) != null) {
            System.out.println(ANSI_RED + "Error: An envelope within your account already possesses the name '" + envName + "'." + ANSI_GREY_BACKGROUND);
            System.out.print("Enter a different name: ");
            envName = scnr.nextLine();
        }
        account.add(new Envelope(envName));
    }

    public void removeEnvelope(String envName) {
        if (account.isEmpty()) {
            System.out.println(ANSI_RED + "Error: The account is empty." + ANSI_GREY_BACKGROUND);
            return;
        }

        Integer envIndex = envelopeExist(envName);

        if (envIndex != null) {
            account.remove(envIndex);
            return;
        }

        System.err.println(ANSI_RED + "Error: No envelope within the account possesses the name '" + envName + "'." + ANSI_GREY_BACKGROUND);
    }



    public void setEnvName(int currEnvIndex, String newEnvName) {
        account.get(currEnvIndex).setName(newEnvName);
    }

    public void addCashToEnv(int currEnvIndex, int dollarBill, int quantity) {
        account.get(currEnvIndex).addCash(dollarBill, quantity);
    }

    public void removeCashFromEnv(int currEnvIndex, int dollarBill, int quantity) {
        account.get(currEnvIndex).removeCash(dollarBill, quantity);
    }

    public void addDBToEnv(int currEnvIndex, int dollarBill, int quantity) {
        account.get(currEnvIndex).addDollarBill(dollarBill, quantity);
    }

    public void removeDBFromEnv(int currEnvIndex, int dollarBill) {
        account.get(currEnvIndex).removeDollarBill(dollarBill);
    }

    public Envelope getEnvelope(String envName) {
        Integer envIndex = envelopeExist(envName);
        return account.get(envIndex);
    }

    public int getAccountTotal() {
        int total = 0;

        for (Envelope envelope: account) {
            total += envelope.getTotal();
        }

        return total;
    }
    public String toString() {
        String result = "\n";

        if (getAccountTotal() == 0) {
            result = "Account is Empty!";
            return result;
        }

        for (Envelope envelope: account) {
            result += "\n" + envelope;
        }

        result += "\nTotal: " + getAccountTotal();

        return result;
    }
}
