package com.medihub.service;

import com.medihub.model.Medicine;
import com.medihub.repository.PharmacyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PharmacyService {

    @Autowired
    private PharmacyRepository repo;

    // Get all medicines (paginated)
    public Page<Medicine> getAllMedicines(int page, int size) {
        return repo.findAll(PageRequest.of(page, size));
    }

    // Search by productName or saltComposition
    public List<Medicine> searchMedicines(String keyword) {
        return repo.findByProductNameContainingIgnoreCaseOrSaltCompositionContainingIgnoreCase(keyword, keyword);
    }

    // Save a new medicine (for future: admin panel)
    public Medicine saveMedicine(Medicine medicine) {
        return repo.save(medicine);
    }

    // Get medicine by ID
    public Medicine getMedicineById(int id) {
        return repo.findById(id).orElse(null);
    }

    // Delete medicine
    public void deleteMedicine(int id) {
        repo.deleteById(id);
    }

    public int countMedicines() {
    return (int) repo.count();
    }
}
