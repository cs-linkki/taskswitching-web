package linkki.datahandler;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Scanner;
import org.apache.poi.hssf.extractor.ExcelExtractor;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.poifs.filesystem.POIFSFileSystem;

public class ExcelToJsonParser {

    public static void main(String[] args) throws Exception {
        parse("data/TS_kirjainteht_listat.xls", "src/main/webapp/static/data/characterreaction-data.json", false);
        parse("data/TS_nroteht_listat.xls", "src/main/webapp/static/data/numberreaction-data.json", true);
        parseTSEntries("data/TS_tehtvaihto_listat.xls", "src/main/webapp/static/data/taskswitching-data.json", false);
        parseReactionTimeEntries("data/Listat_reaktioaikatesti.xlsx", "src/main/webapp/static/data/reaction-data.json", false);
    }

    public static void parse(String in, String out, boolean reverseLists) throws Exception {
        InputStream inp = new FileInputStream(in);
        HSSFWorkbook wb = new HSSFWorkbook(new POIFSFileSystem(inp));
        ExcelExtractor extractor = new ExcelExtractor(wb);

        extractor.setFormulasNotResults(true);
        extractor.setIncludeSheetNames(false);
        String text = extractor.getText();

        Document document = new Document();
        Sheet currentSheet = new Sheet();

        Scanner s = new Scanner(text);
        while (s.hasNextLine()) {
            String line = s.nextLine();
            Entry entry = null;

            try {
                entry = new Entry(line);
            } catch (IllegalArgumentException e) {
                if (!currentSheet.isEmpty()) {
                    document.add(currentSheet);
                    currentSheet = new Sheet();
                }

                continue;
            }

            currentSheet.add(entry);
        }

        System.out.println("Total sheets in document: " + document.size());
        System.out.println(document);

        List<Sheet> newSheets = new ArrayList<Sheet>();
        for (Sheet sheet : document) {
            Sheet sh = new Sheet();
            sh.addAll(sheet);
            Collections.reverse(sh);
            newSheets.add(sh);
        }


        if (reverseLists) {
            document.addAll(0, newSheets);
        } else {
            document.addAll(newSheets);
        }


        ObjectMapper mapper = new ObjectMapper();
        mapper.writeValue(new File(out), document);

    }

    public static void parseTSEntries(String in, String out, boolean reverseLists) throws Exception {
        InputStream inp = new FileInputStream(in);
        HSSFWorkbook wb = new HSSFWorkbook(new POIFSFileSystem(inp));
        ExcelExtractor extractor = new ExcelExtractor(wb);

        extractor.setFormulasNotResults(true);
        extractor.setIncludeSheetNames(false);
        String text = extractor.getText();

        Document document = new Document();
        Sheet currentSheet = new Sheet();

        Scanner s = new Scanner(text);
        while (s.hasNextLine()) {
            String line = s.nextLine();
            Entry entry = null;

            try {
                entry = new TaskSwitchingEntry(line);
            } catch (IllegalArgumentException e) {
                if (!currentSheet.isEmpty()) {
                    document.add(currentSheet);
                    currentSheet = new Sheet();
                }

                continue;
            }

            currentSheet.add(entry);
        }

        System.out.println("Total sheets in document: " + document.size());
        System.out.println(document);

        List<Sheet> newSheets = new ArrayList<Sheet>();
        for (Sheet sheet : document) {
            Sheet sh = new Sheet();
            sh.addAll(sheet);
            Collections.reverse(sh);
            newSheets.add(sh);
        }


        if (reverseLists) {
            document.addAll(0, newSheets);
        } else {
            document.addAll(newSheets);
        }


        ObjectMapper mapper = new ObjectMapper();
        mapper.writeValue(new File(out), document);
    }

    private static void parseReactionTimeEntries(String in, String out, boolean reverseLists) throws Exception {
        InputStream inp = new FileInputStream(in);
        HSSFWorkbook wb = new HSSFWorkbook(new POIFSFileSystem(inp));
        ExcelExtractor extractor = new ExcelExtractor(wb);

        extractor.setFormulasNotResults(true);
        extractor.setIncludeSheetNames(false);
        String text = extractor.getText();

        Document document = new Document();
        Sheet currentSheet = new Sheet();

        Scanner s = new Scanner(text);
        while (s.hasNextLine()) {
            String line = s.nextLine();
            Entry entry = null;

            try {
                entry = new TaskSwitchingEntry(line);
            } catch (IllegalArgumentException e) {
                if (!currentSheet.isEmpty()) {
                    document.add(currentSheet);
                    currentSheet = new Sheet();
                }

                continue;
            }

            currentSheet.add(entry);
        }

        System.out.println("Total sheets in document: " + document.size());
        System.out.println(document);

        List<Sheet> newSheets = new ArrayList<Sheet>();
        for (Sheet sheet : document) {
            Sheet sh = new Sheet();
            sh.addAll(sheet);
            Collections.reverse(sh);
            newSheets.add(sh);
        }


        if (reverseLists) {
            document.addAll(0, newSheets);
        } else {
            document.addAll(newSheets);
        }


        ObjectMapper mapper = new ObjectMapper();
        mapper.writeValue(new File(out), document);
    }
}

class TaskSwitchingEntry extends Entry {

    String place;

    public TaskSwitchingEntry(String line) throws IllegalArgumentException {
        super(line);
        String[] data = line.split("\\s+");

        if (data[0].length() != 2) {
            throw new IllegalArgumentException("illegal text length");
        }

        text = data[0];
        align = data[1];
        location = data[2];
        place = data[3];
        correctAnswer = data[4];
    }

    public String getPlace() {
        return place;
    }

    @Override
    public String toString() {
        return super.toString() + "\t" + place;
    }
}

class Entry {

    String text;
    String align;
    String location;
    String correctAnswer;

    public Entry(String line) throws IllegalArgumentException {
        String[] data = line.split("\\s+");

        if (data[0].length() != 2) {
            throw new IllegalArgumentException("illegal text length");
        }

        text = data[0];
        text = text.toLowerCase().replaceAll("y", "i");
        align = data[1];
        location = data[2];
        correctAnswer = data[3];
    }

    public String getText() {
        return text;
    }

    public String getAlign() {
        return align;
    }

    public String getLocation() {
        return location;
    }

    public String getCorrectAnswer() {
        return correctAnswer;
    }

    @Override
    public String toString() {
        return text + "\t" + align + "\t" + location + "\t" + correctAnswer;
    }
}

class Sheet extends ArrayList<Entry> {
}

class Document extends ArrayList<Sheet> {
}
