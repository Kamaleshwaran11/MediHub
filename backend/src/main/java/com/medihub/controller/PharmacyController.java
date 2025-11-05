package com.medihub.controller;

import com.medihub.model.Medicine;
import com.medihub.repository.PharmacyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medicines")
@CrossOrigin("*") // allow frontend (HTML/React) to call API
public class PharmacyController {

    @Autowired
    private PharmacyRepository repo;

    // Pagination API
    @GetMapping
    public Page<Medicine> getAllMedicines(@RequestParam(defaultValue = "0") int page,
                                          @RequestParam(defaultValue = "50") int size) {
        return repo.findAll(PageRequest.of(page, size));
    }

    //  Search API
    @GetMapping("/search")
    public List<Medicine> searchMedicines(@RequestParam String keyword) {
        return repo.findByProductNameContainingIgnoreCaseOrSaltCompositionContainingIgnoreCase(keyword, keyword);
    }
}
