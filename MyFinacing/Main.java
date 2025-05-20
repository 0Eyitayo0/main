import java.util.Scanner;

public class Main {
    public static final String ANSI_RED = "\u001b[31m";
    public static final String ANSI_GREY_BACKGROUND = "\u001b[0m";
    private Account account = new Account();

    public static void main(String[] args) {
        Scanner scnr = new Scanner(System.in);

        Main main = new Main();

        Envelope[] allOfferings = new Envelope[7];

        Envelope newEnv = new Envelope("New Envelope");

        newEnv.addCash(10, 2);
        newEnv.removeCash(10,2);


        System.out.println(newEnv);


        while (true) {
            System.out.print("What would you like to do?\n\t[ Create a new Envelope (CE) ]\n\t[...]\n\t[ Q to quit ]\n\tChoice: ");
            String userChoice = scnr.nextLine();

            switch (userChoice) {
                case ("CE") -> main.createEnvelope("Hello World", scnr);
                case ("Q") -> {
                    System.out.println(main.account);
                    System.exit(0);
                }
                default -> System.out.println(ANSI_RED + "Error: Invalid input!" + ANSI_GREY_BACKGROUND);
            }
        }

//        allOfferings[0] = new Envelope("Blue Envelope");
//        allOfferings[0].addCash(5,15);
//        System.out.println(allOfferings[0]);
//        allOfferings[1] = new Envelope("Green Envelope");
//        allOfferings[1].addCash(5,6);
//        allOfferings[1].addCash(20,6);
//        System.out.println(allOfferings[1]);
//        allOfferings[2] = new Envelope("Brown Envelope");
//        allOfferings[2].addCash(20,1);
//        System.out.println(allOfferings[2]);
//        allOfferings[3] = new Envelope("Zion Cousin Envelope");
//        allOfferings[3].addCash(5,2);
//        allOfferings[3].addCash(20,1);
//        System.out.println(allOfferings[3]);
//        allOfferings[4] = new Envelope("Zion Office (Special) Envelope");
//        allOfferings[4].addCash(20,5);
//        System.out.println(allOfferings[4]);
//        allOfferings[5] = new Envelope("IUBA Club Envelope");
//        allOfferings[5].addCash(5,1);
//        allOfferings[5].addCash(20,1);
//        System.out.println(allOfferings[5]);
//        allOfferings[6] = new Envelope("IUBA Dinner Envelope");
//        allOfferings[6].addCash(5,2);
//        allOfferings[6].addCash(20,1);
//        System.out.println(allOfferings[6]);
//        System.out.println("Total: " + (allOfferings[0].getTotal() + allOfferings[1].getTotal() + allOfferings[2].getTotal() + allOfferings[3].getTotal() + allOfferings[4].getTotal() + allOfferings[5].getTotal() + allOfferings[6].getTotal()));
//
//        System.out.println();
//
//        Envelope wallet = new Envelope("Next Sabbath Offering Withdrawals");
//        wallet.addCash(5, 29);
//        wallet.addCash(20, 10);
//        wallet.addCash(100, 1);
//        System.out.println(wallet);
    }

    public void createEnvelope(String name, Scanner scnr) {
        account.addEnvelope(name, scnr);
        envelopOperations(name, scnr);
    }

    private void envelopOperations(String envName, Scanner scnr) {
        Integer envIndex = account.envelopeExist(envName);

        if (envIndex == null) {
            System.out.println(ANSI_RED + "Error: No envelope name '" + envName + "' exist within the account."  + ANSI_GREY_BACKGROUND);
            return;
        }

        while (true) {
            try {
                //System.out.print("What Operations Would you Like to Perform on Envelope { " + envName + " }?\n\t[ Change Name (CN) ]\n\t[ Add Cash (AC) ]\n\t[ Remove Cash (RC) ]\n\t[ Add Dollar Bill (AD) ]\n\t[ Remove Dollar Bill (RD) ]\n\t[ Return to Main Menu (M) ]\n\tChoice: ");
                String userChoice = userInput("What Operations Would you Like to Perform on Envelope { " + envName + " }?\n\t[ Change Name (CN) ]\n\t[ Add Cash (AC) ]\n\t[ Remove Cash (RC) ]\n\t[ Add Dollar Bill (AD) ]\n\t[ Remove Dollar Bill (RD) ]\n\t[ Return to Main Menu (M) ]\n\tChoice: ", scnr);

                switch (userChoice) {
                    case ("CN") -> {
                        String newEnvName = userInput("Enter the new name of the envelope: ", scnr);

                        if (account.envelopeExist(newEnvName) == null) {
                            envName = newEnvName;
                            account.setEnvName(envIndex, newEnvName);
                        } else {
                            System.out.println(ANSI_RED + "Error: Another envelope with the new name '" + newEnvName + "' already exists!" + ANSI_GREY_BACKGROUND);
                        }
                        System.out.println("\n" + account.getEnvelope(envName) + "\n");
                    }
                    case ("AC") -> {
                        account.addCashToEnv(envIndex, Integer.parseInt(userInput("Dollar Bill: ", scnr)), Integer.parseInt(userInput("Quantity: ", scnr)));
                        System.out.println("\n" + account.getEnvelope(envName) + "\n");
                    }
                    case ("RC") -> {
                        account.removeCashFromEnv(envIndex, Integer.parseInt(userInput("Dollar Bill: ", scnr)), Integer.parseInt(userInput("Quantity: ", scnr)));
                        System.out.println("\n" + account.getEnvelope(envName) + "\n");
                    }
                    case ("AD") -> {
                        account.addDBToEnv(envIndex, Integer.parseInt(userInput("Dollar Bill: ", scnr)), Integer.parseInt(userInput("Quantity: ", scnr)));
                        System.out.println("\n" + account.getEnvelope(envName) + "\n");
                    }
                    case ("RD") -> {
                        account.removeDBFromEnv(envIndex, Integer.parseInt(userInput("Dollar Bill: ", scnr)));
                        System.out.println("\n" + account.getEnvelope(envName) + "\n");
                    }
                    case ("M") -> {
                        System.out.println(account);
                        return;
                    }
                    default -> System.out.println(ANSI_RED + "Error: Invalid input!" + ANSI_GREY_BACKGROUND);
                }
            } catch (NumberFormatException e) {
                System.out.println(ANSI_RED + "Error: Could not convert input into numeric value!" + ANSI_GREY_BACKGROUND);
            }
        }
    }

    private String userInput(String prompt, Scanner scnr) {
        System.out.print(prompt);
        return scnr.nextLine();
    }
}