package com.hrms.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "attendance")
@Data
@NoArgsConstructor
public class Attendance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    @Column(nullable = false)
    private LocalDate date;

    private LocalDateTime clockInTime;

    private LocalDateTime clockOutTime;

    public Attendance(UserEntity user, LocalDate date, LocalDateTime clockInTime) {
        this.user = user;
        this.date = date;
        this.clockInTime = clockInTime;
    }
}
