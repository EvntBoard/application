package fr.evntboard.keyboard;

import java.awt.*;
import java.util.Scanner;
import org.json.JSONObject;

public class App {

    public static void main(String[] args) throws AWTException {
        Robot robot = new Robot();
        Scanner scan = new Scanner(System.in);
        String input;

        while(scan.hasNextLine() && !((input = scan.nextLine()).equals(""))){
            JSONObject obj = new JSONObject(input);
            String action = (String) obj.get("action");
            Integer key;

            switch (action) {
                case "press":
                    key = (Integer) obj.get("key");
                    robot.keyPress(key);
                    break;
                case "release":
                    key = (Integer) obj.get("key");
                    robot.keyRelease(key);
                    break;
                default:
                    System.out.println("Unknow action : " + action);
                    break;
            }
        }
    }
}
