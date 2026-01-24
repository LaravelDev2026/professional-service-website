# Professional Portfolio Website

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
- PHP 8.2+
- PHPMailer for email

## Installation

### Quick Start

1. **Clone or download** the project files
2. **Configure** the settings in `php/config.php`
3. **Test** the contact form

### Configuration

1. Open `php/config.php` and update:
    - Email settings
    - SMTP credentials

2. For PHPMailer:
    - Install via composer: `composer require phpmailer/phpmailer`
    - Or download and include manually

### Testing

1. Open `index.html` in your browser
2. Browse the site then test the contact form submission
3. Check email delivery

## File Structure

```
professional-service-website/
├── index.html              # Home page
├── services.html           # Services page  
├── portfolio.html          # Portfolio page
├── about.html              # About page
├── contact.html            # Contact page
├── privacy-policy.html     # Privacy policy
├── terms-of-service.html   # Terms of service
├── style.css               # All CSS styles
├── LICENSE                 # License file
├── README.md               # Documentation
├── js/
│   └── main.js             # JavaScript functionality
├── php/
│   ├── config.php          # Main configuration
│   ├── contact-form.php    # Form processing
│   └── mailer.php          # Email sending class
├── assets/                 # Assets directory
│   ├── images/             # Website images
│   └── icons/              # Favicon & icons
├── vendor/                 # PHP dependencies (PHPMailer)
├── composer.json           # Composer configuration
└── composer.lock           # Composer lock file
└── git.ignore              # GitHub ignore file for security
```

## Customization

### Colors

Edit the CSS variables in `style.css`:

## Customization

## Security Notes

**Always** configure SMTP with app passwords - APP PASSWORD, NOT EMAIL LOGIN PASSWORD!

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## License

ALL RIGHTS RESERVED. This code is provided for portfolio demonstration purposes only.

**STRICTLY PROHIBITED:** Copying, modifying, distributing, or using this code for any purpose.

© 2026 PHPDev2026. All rights reserved.

## Support

For issues or questions:

1. Check the configuration settings
2. Enable error reporting in `config.php`
3. Check server PHP version (requires 8.2+)
4. Verify SMTP settings are correct

## Developer Contact

#### Email: phpdev2026@outlook.com

#### GitHub: github.com/phpdev2026

#### Dev Note: This project is shared to showcase my work and to give a live demo. It is NOT to be used as your own/distributed/edited etc.