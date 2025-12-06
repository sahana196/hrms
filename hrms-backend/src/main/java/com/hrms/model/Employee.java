package com.hrms.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "employees")
@Data
@NoArgsConstructor
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String department;

    @Column(nullable = false)
    private String designation;

    @Column(nullable = true) // Set to true initially or strictly map to DB. If DB is NOT NULL, we must
                             // populate it.
    private String position;

    private LocalDate dateOfJoining;

    private double salary;

    // Link to UserEntity for login credentials if needed, or keep separate
    // For now, simple employee record

    // Audit fields could go here or in a base class
}
