package com.hrms.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender javaMailSender;

    @Autowired
    public EmailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    public void sendEmail(String to, String subject, String body) {
        // DEMO LOGIN: Print email to console so user can see it works
        System.out.println("========== EMAIL DEMO ==========");
        System.out.println("To: " + to);
        System.out.println("Subject: " + subject);
        System.out.println("Body: \n" + body);
        System.out.println("================================");

        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject(subject);
            message.setText(body);
            javaMailSender.send(message);
            System.out.println("Email sent successfully to SMTP server!");
        } catch (Exception e) {
            // Log error but don't stop the application flow
            System.err.println("Failed to send email: " + e.getMessage());
        }
    }
}
