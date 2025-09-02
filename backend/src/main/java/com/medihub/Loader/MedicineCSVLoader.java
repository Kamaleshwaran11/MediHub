package com.medihub.Loader;

import com.medihub.model.Medicine;
import com.opencsv.CSVReader;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import com.medihub.service.PharmacyService;
import java.io.FileReader;
import java.math.BigDecimal;

@Component
public class MedicineCSVLoader implements CommandLineRunner {

    private final PharmacyService service;

    public MedicineCSVLoader(PharmacyService service) {
        this.service = service;
    }

    @Override
    public void run(String... args) throws Exception {
        // 🔹 Put your medicine.csv file inside: backend/src/main/resources/
        // Example full path: backend/src/main/resources/medicine.csv

        if(service.countMedicines() == 0) { // only load if DB empty
            try (CSVReader reader = new CSVReader(new FileReader("backend/src/main/resources/medicine_data.csv"))) {
                String[] line;
                reader.readNext(); // skip header
                while ((line = reader.readNext()) != null) {
                    Medicine m = new Medicine();
                    m.setSubCategory(line[0]);
                    m.setProductName(line[1]);
                    m.setSaltComposition(line[2]);
                    m.setProductPrice(new BigDecimal(line[3].replaceAll("[^\\d.]", "")));
                    m.setProductManufactured(line[4]);
                    m.setMedicineDesc(line[5]);
                    m.setSideEffects(line[6]);
                    m.setDrugInteractions(line[7]);
                    service.saveMedicine(m);
                }
            }
            System.out.println("✅ Medicine CSV imported into MySQL from src/main/resources/medicine.csv");
        }
    }
}
