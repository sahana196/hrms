package com.hrms.service;

import com.hrms.model.Attendance;
import com.hrms.model.UserEntity;
import com.hrms.repository.AttendanceRepository;
import com.hrms.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final UserRepository userRepository;

    @Autowired
    public AttendanceService(AttendanceRepository attendanceRepository, UserRepository userRepository) {
        this.attendanceRepository = attendanceRepository;
        this.userRepository = userRepository;
    }

    public Attendance clockIn(String username) {
        UserEntity user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        LocalDate today = LocalDate.now();
        if (attendanceRepository.findByUserAndDate(user, today).isPresent()) {
            throw new RuntimeException("Already clocked in for today");
        }

        Attendance attendance = new Attendance(user, today, LocalDateTime.now());
        return attendanceRepository.save(attendance);
    }

    public Attendance clockOut(String username) {
        UserEntity user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        LocalDate today = LocalDate.now();
        Attendance attendance = attendanceRepository.findByUserAndDate(user, today)
                .orElseThrow(
                        () -> new RuntimeException("No attendance record found for today. Please clock in first."));

        if (attendance.getClockOutTime() != null) {
            throw new RuntimeException("Already clocked out for today");
        }

        attendance.setClockOutTime(LocalDateTime.now());
        return attendanceRepository.save(attendance);
    }

    public List<Attendance> getUserAttendance(String username) {
        UserEntity user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return attendanceRepository.findByUserOrderByDateDesc(user);
    }
}
