<!-- This file is needed in contact-form.php -->

<?php
    /**
     * Configuration File
     * Database and Email Settings
     *
     * IMPORTANT: Update these values with your actual settings
     */

// Enable error reporting for development
    use Random\RandomException;
    
    error_reporting(E_ALL);
    ini_set('display_errors', 1);

// Email Configuration
    const SITE_EMAIL = 'phpdev2026@outlook.com'; // Change to your email
    const SITE_NAME = 'Example Web Solutions'; // Change to your company name
    const ADMIN_EMAIL = 'phpdev2026@outlook.com'; // Change to your email

// SMTP Configuration (for PHPMailer)
    const SMTP_HOST = 'smtp.gmail.com'; // Change to your SMTP server
    const SMTP_USER = 'your-email@example.com'; // Change to your email
    const SMTP_PASS = 'your-app-password';// Use app password for email account
    const SMTP_PORT = 587; // Setup for Gmail
    const SMTP_SECURE = 'tls'; // Setup for Gmail

// Response Messages
    const MSG_SUCCESS = 'Thank you! Your message has been sent successfully.';
    const MSG_ERROR = 'Sorry, there was an error sending your message. Please try again.';
    const MSG_VALIDATION_ERROR = 'Please fill in all required fields correctly.';

// Security - CSRF Token (if implementing)
    session_start();
    if (empty($_SESSION[ 'csrf_token' ])) {
        try {
            $_SESSION[ 'csrf_token' ] = bin2hex(random_bytes(32));
        } catch (RandomException $e) {
        
        }
    }
    define('CSRF_TOKEN', $_SESSION[ 'csrf_token' ]);

// Timezone setting
    date_default_timezone_set('America/New_York'); // Change to your timezone
