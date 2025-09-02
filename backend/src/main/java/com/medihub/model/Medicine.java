package com.medihub.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "medicines")
public class Medicine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int medicineId;

    private String subCategory;
    private String productName;
    private String saltComposition;
    private BigDecimal productPrice;
    private String productManufactured;

    @Column(columnDefinition = "TEXT")
    private String medicineDesc;

    @Column(columnDefinition = "TEXT")
    private String sideEffects;

    @Column(columnDefinition = "TEXT")
    private String drugInteractions;

    // Getters and Setters
    public int getMedicineId() { return medicineId; }
    public void setMedicineId(int medicineId) { this.medicineId = medicineId; }

    public String getSubCategory() { return subCategory; }
    public void setSubCategory(String subCategory) { this.subCategory = subCategory; }

    public String getProductName() { return productName; }
    public void setProductName(String productName) { this.productName = productName; }

    public String getSaltComposition() { return saltComposition; }
    public void setSaltComposition(String saltComposition) { this.saltComposition = saltComposition; }

    public BigDecimal getProductPrice() { return productPrice; }
    public void setProductPrice(BigDecimal productPrice) { this.productPrice = productPrice; }

    public String getProductManufactured() { return productManufactured; }
    public void setProductManufactured(String productManufactured) { this.productManufactured = productManufactured; }

    public String getMedicineDesc() { return medicineDesc; }
    public void setMedicineDesc(String medicineDesc) { this.medicineDesc = medicineDesc; }

    public String getSideEffects() { return sideEffects; }
    public void setSideEffects(String sideEffects) { this.sideEffects = sideEffects; }

    public String getDrugInteractions() { return drugInteractions; }
    public void setDrugInteractions(String drugInteractions) { this.drugInteractions = drugInteractions; }
}
