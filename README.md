# Professional Portfolio Website

© 2026 LaravelDev2026. All rights reserved.

**Notice:** This code is provided for portfolio demonstration purposes only.
Unauthorized copying, modification, distribution, or commercial use is prohibited.

#### Version: 1.0.0

#### Date: Jan 19th 2026

A modern, responsive website template for service-based businesses with a fully functional contact form.

## Features

- ✅ Fully responsive design (mobile-first)
- ✅ Modern, clean UI with professional styling
- ✅ Working contact form with AJAX submission
- ✅ Form validation (client & server-side)
- ✅ Email sending via PHPMailer
- ✅ SEO optimized structure
- ✅ Accessible navigation
- ✅ Cross-browser compatible

## Technologies Used

- HTML5
- CSS3 (Flexbox/Grid)
- JavaScript (ES6+)
- PHP 7.4+
- PHPMailer for email

## Installation

### Quick Start

1. **Clone or download** the project files
2. **Upload** to your web server
3. **Configure** the settings in `php/config.php`
4. **Test** the contact form

### Configuration

1. Open `php/config.php` and update:
    - Email settings
    - SMTP credentials
    - Site information

2. For PHPMailer:
    - Install via composer: `composer require phpmailer/phpmailer`
    - Or download and include manually

### Testing

1. Open `index.html` in your browser
2. Test the contact form submission
3. Check email delivery

## File Structure

1. professional-service-website/
2. ├── index.html # Main HTML file
3. ├── style.css # All CSS styles
4. ├── js/
5. │ └── main.js # JavaScript functionality
6. ├── php/
7. │ ├── config.php # Configuration settings
8. │ ├── contact-form.php # Form processing
9. │ └── mailer.php # Email sending class
10. ├── assets/
11. │ ├── images/ # Website images
12. │ └── icons/ # Favicon & icons
13. └── README.md # This file

## Customization

### Colors

Edit the CSS variables in `style.css`:
:root {
--primary-color: #2563eb;
--secondary-color: #7c3aed;
/* ... other variables */
}

## Customization

### Content

- Update text in `index.html`
- Replace images in `assets/images/`
- Modify services in the services section

### Features

- Add more sections (Portfolio, Team, Testimonials)
- Implement database for contact form submissions
- Add blog functionality
- Integrate payment gateway

## Security Notes

1. **Always** configure SMTP with app passwords
2. **Enable** HTTPS on production
3. **Regularly** update dependencies
4. **Implement** CAPTCHA for production use
5. **Sanitize** all user inputs

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## License

This project is available for personal and commercial use with attribution.

## Support

For issues or questions:

1. Check the configuration settings
2. Enable error reporting in `config.php`
3. Check server PHP version (requires 7+)
4. Verify SMTP settings are correct

## Developer Contact

#### Email: laraveldev2026@gmail.com

#### GitHub: github.com/LaravelDev2026
