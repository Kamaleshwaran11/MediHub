package com.medihub.repository;

import com.medihub.model.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PharmacyRepository extends JpaRepository<Medicine, Integer> {
    // Search by product name or salt composition
    List<Medicine> findByProductNameContainingIgnoreCaseOrSaltCompositionContainingIgnoreCase(String name, String salt);
}
