package com.hrms.repository;

import com.hrms.model.Attendance;
import com.hrms.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    Optional<Attendance> findByUserAndDate(UserEntity user, LocalDate date);

    List<Attendance> findByUserOrderByDateDesc(UserEntity user);
}
