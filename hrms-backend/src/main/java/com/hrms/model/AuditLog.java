package com.hrms.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "audit_logs")
@Data
@NoArgsConstructor
public class AuditLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;

    private String action; // CREATE, UPDATE, DELETE, LOGIN

    private String details;

    private LocalDateTime timestamp;

    public AuditLog(String username, String action, String details, LocalDateTime timestamp) {
        this.username = username;
        this.action = action;
        this.details = details;
        this.timestamp = timestamp;
    }
}
