package com.medihub.repository;

import com.medihub.model.Billing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BillingRepository extends JpaRepository<Billing, Long> {
    List<Billing> findByPatientNameContainingIgnoreCase(String patientName);
    List<Billing> findByStatus(String status);
}