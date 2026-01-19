<?php
    /**
     * Contact Form Processing Script
     * Handles form submission, validation, and email sending
     */

// Include configuration
    require_once 'config.php';
    require_once 'mailer.php';

// Set JSON header
    header('Content-Type: application/json');

// Initialize response array
    $response = [
        'success' => false, 'errors' => []
    ];

// Check if request is POST
    if ($_SERVER[ 'REQUEST_METHOD' ] !== 'POST') {
        $response[ 'message' ] = 'Invalid request method.';
        echo json_encode($response);
        exit;
    }

// Get and sanitize form data
    $name = sanitizeInput($_POST[ 'name' ] ?? '');
    $email = sanitizeInput($_POST[ 'email' ] ?? '');
    $phone = sanitizeInput($_POST[ 'phone' ] ?? '');
    $service = sanitizeInput($_POST[ 'service' ] ?? '');
    $message = sanitizeInput($_POST[ 'message' ] ?? '');

// Validate required fields
    $errors = [];
    
    if (empty($name)) {
        $errors[ 'name' ] = 'Name is required.';
    } elseif (strlen($name) < 2) {
        $errors[ 'name' ] = 'Name must be at least 2 characters.';
    }
    
    if (empty($email)) {
        $errors[ 'email' ] = 'Email is required.';
    } elseif ( ! filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[ 'email' ] = 'Please enter a valid email address.';
    }
    
    if (empty($message)) {
        $errors[ 'message' ] = 'Message is required.';
    } elseif (strlen($message) < 10) {
        $errors[ 'message' ] = 'Message must be at least 10 characters.';
    }

// If there are validation errors, return them
    if ( ! empty($errors)) {
        $response[ 'message' ] = MSG_VALIDATION_ERROR;
        $response[ 'errors' ] = $errors;
        echo json_encode($response);
        exit;
    }

// Prepare email content
    $emailSubject = "New Contact Form Submission - ".SITE_NAME;
    $emailBody = "
        <html lang=\"en\">
        <head>
            <title>New Contact Form Submission</title>
        </head>
        <body>
            <h2>New Contact Form Submission</h2>
            <p><strong>From:</strong> ".htmlspecialchars($name)." &lt;".htmlspecialchars($email)."&gt;</p>
            <p><strong>Phone:</strong> ".($phone ? : 'Not provided')."</p>
            <p><strong>Service Interested In:</strong> ".($service ? : 'Not specified')."</p>
            <p><strong>Message:</strong></p>
            <p>".nl2br(htmlspecialchars($message))."</p>
            <hr>
            <p><small>Submitted: ".date('F j, Y \a\t g:i a')."</small></p>
            <p><small>IP: {$_SERVER['REMOTE_ADDR']}</small></p>
        </body>
        </html>
    ";
    
    $plainTextBody = "
New Contact Form Submission
===========================

From: $name <$email>
Phone: ".($phone ? : 'Not provided')."
Service: ".($service ? : 'Not specified')."

Message:
{$message}

Submitted: ".date('F j, Y \a\t g:i a')."
IP Address: {$_SERVER['REMOTE_ADDR']}
";

// Send email using PHPMailer
    $mailer = new Mailer();
    $mailSent = $mailer -> sendEmail(ADMIN_EMAIL, $emailSubject, $emailBody, $plainTextBody, $email, $name);

// Send confirmation to user
    if ($mailSent) {
        $userSubject = "Thank you for contacting ".SITE_NAME;
        $userBody = "
            <html lang=\"en\">
            <body>
            <h2>Thank you for reaching out to us!</h2>
            <p>Dear $name,</p>
            <p>We have received your message and will get back to you within 24-48 hours.</p>
            <p>Best regards,<br>".SITE_NAME." Team</p>
            </body>
            </html>
        ";
        
        $mailer -> sendEmail($email, $userSubject, $userBody, "Thank you for contacting ".SITE_NAME.". We have received your message.");
    }
    
    if ($mailSent) {
        $response[ 'success' ] = true;
        $response[ 'message' ] = MSG_SUCCESS;
    } else {
        $response[ 'message' ] = MSG_ERROR;
    }

// Return JSON response
    echo json_encode($response);
    exit;
    
    /**
     * Sanitize input data
     */
    function sanitizeInput($data) : string
    {
        $data = trim($data);
        $data = stripslashes($data);
        return htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
    }
