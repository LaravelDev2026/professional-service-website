<?php
    /**
     * PHPMailer Wrapper Class
     * Handles email sending with SMTP configuration
     *
     * Requires PHPMailer library:
     * Install via composer: composer require phpmailer/phpmailer
     * Or download from: https://github.com/PHPMailer/PHPMailer
     */

// Include PHPMailer classes
    require_once __DIR__.'/../vendor/autoload.php';
    
    use PHPMailer\PHPMailer\Exception;
    use PHPMailer\PHPMailer\PHPMailer;
    
    class Mailer
    {
        private PHPMailer $mail;
        
        public function __construct()
        {
            $this -> mail = new PHPMailer(true);
            
            try {
                // Server settings
                $this -> mail -> isSMTP();
                $this -> mail -> Host = SMTP_HOST;
                $this -> mail -> SMTPAuth = true;
                $this -> mail -> Username = SMTP_USER;
                $this -> mail -> Password = SMTP_PASS;
                $this -> mail -> SMTPSecure = SMTP_SECURE;
                $this -> mail -> Port = SMTP_PORT;
                
                // Sender
                $this -> mail -> setFrom(SITE_EMAIL, SITE_NAME);
                $this -> mail -> addReplyTo(SITE_EMAIL, SITE_NAME);
                
                // Content
                $this -> mail -> isHTML();
                $this -> mail -> CharSet = 'UTF-8';
                
            } catch (Exception $e) {
                error_log("Mailer Error: ".$e -> getMessage());
            }
        }
        
        /**
         * Send email
         *
         * @param  string  $to  - Recipient email
         * @param  string  $subject  - Email subject
         * @param  string  $htmlBody  - HTML content
         * @param  string  $textBody  - Plain text content
         * @param  string  $replyTo  - Reply-to email
         * @param  string  $replyName  - Reply-to name
         * @return bool - Success status
         */
        public function sendEmail(string $to, string $subject, string $htmlBody, string $textBody = '', string $replyTo = '', string $replyName = '') : bool
        {
            try {
                // Clear previous recipients
                $this -> mail -> clearAllRecipients();
                $this -> mail -> clearReplyTos();
                
                // Add recipient
                $this -> mail -> addAddress($to);
                
                // Add reply-to if specified
                if ( ! empty($replyTo)) {
                    $this -> mail -> addReplyTo($replyTo, $replyName ?? '');
                }
                
                // Subject and body
                $this -> mail -> Subject = $subject;
                $this -> mail -> Body = $htmlBody;
                $this -> mail -> AltBody = ! empty($textBody) ? $textBody : strip_tags($htmlBody);
                
                // Send email
                $this -> mail -> send();
                return true;
                
            } catch (Exception) {
                error_log("Mailer Error: ".$this -> mail -> ErrorInfo);
                return false;
            }
        }
        
    }
