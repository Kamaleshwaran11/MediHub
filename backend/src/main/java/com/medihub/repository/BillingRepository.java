package com.medihub.repository;

import com.medihub.model.Billing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BillingRepository extends JpaRepository<Billing, Long> {
    @Query("SELECT b FROM Billing b WHERE LOWER(b.patient.name) LIKE LOWER(CONCAT('%', :patientName, '%'))")
    List<Billing> findByPatientNameContainingIgnoreCase(@Param("patientName") String patientName);
    
    List<Billing> findByStatus(String status);
}