package com.hrms.controller;

import com.hrms.model.Attendance;
import com.hrms.service.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {

    private final AttendanceService attendanceService;

    @Autowired
    public AttendanceController(AttendanceService attendanceService) {
        this.attendanceService = attendanceService;
    }

    @PostMapping("/clock-in")
    public ResponseEntity<?> clockIn(Authentication authentication) {
        try {
            Attendance attendance = attendanceService.clockIn(authentication.getName());
            return new ResponseEntity<>(attendance, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/clock-out")
    public ResponseEntity<?> clockOut(Authentication authentication) {
        try {
            Attendance attendance = attendanceService.clockOut(authentication.getName());
            return new ResponseEntity<>(attendance, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/my-history")
    public ResponseEntity<List<Attendance>> getMyAttendance(Authentication authentication) {
        List<Attendance> history = attendanceService.getUserAttendance(authentication.getName());
        return new ResponseEntity<>(history, HttpStatus.OK);
    }
}
