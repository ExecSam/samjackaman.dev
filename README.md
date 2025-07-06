# Sam Jackaman - Terminal Portfolio Website

A minimalistic, hacker-themed portfolio website with terminal aesthetics, typewriter effects, and Matrix-inspired design elements.

## 🚀 Features

- **Terminal Boot Sequence**: Authentic system startup with typewriter effects
- **Interactive Typewriter**: Cycles through intriguing messages with realistic typing/backspacing
- **Matrix Rain Effect**: Subtle background animation with Japanese characters
- **Terminal Navigation**: Command-line style navigation between sections
- **Responsive Design**: Fully mobile-responsive with slide-out menu
- **Multiple Themes**: Switch between green, amber, blue, and red terminal themes
- **Glitch Effects**: Random glitch animations for extra hacker authenticity
- **Contact Form**: Professional contact form with loading states and validation
- **Easter Eggs**: Hidden features including Konami code activation
- **SEO Optimized**: Clean HTML structure and meta tags

## 📁 Project Structure

```
samjackaman.dev/
├── index.html          # Main HTML structure
├── style.css           # All styling and animations
├── script.js           # Interactive functionality
└── README.md           # This file
```

## 🛠️ Setup & Deployment

### Option 1: Static File Hosting (Recommended)

This website is built with vanilla HTML, CSS, and JavaScript - no build process required!

1. **Clone or download** the files to your desired location
2. **Upload** all files to your web server or hosting platform
3. **Configure** the contact form (see below)
4. **Access** via your domain - the site will work immediately

**Compatible with:**
- Netlify (drag & drop deployment)
- Vercel
- GitHub Pages
- Any static file hosting service
- Apache/Nginx servers
- CDN deployments

### Option 2: Docker Deployment

Create a simple `Dockerfile`:

```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Build and run:
```bash
docker build -t samjackaman-site .
docker run -p 8080:80 samjackaman-site
```

### Option 3: Local Development

Simply open `index.html` in any modern browser. For best results during development, use a local server:

```bash
# Python 3
python -m http.server 8000

# Node.js (with live-server)
npx live-server

# PHP
php -S localhost:8000
```

## 📧 Contact Form Configuration

The contact form currently uses a simulation function. To make it functional, you have several options:

### Option 1: Backend API Integration

Replace the `simulateFormSubmission` method in `script.js` with actual form submission:

```javascript
async simulateFormSubmission(data) {
    const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    
    if (!response.ok) {
        throw new Error('Form submission failed');
    }
    
    return response.json();
}
```

### Option 2: Formspree Integration

1. Sign up at [Formspree.io](https://formspree.io)
2. Get your form endpoint
3. Update the form submission:

```javascript
async simulateFormSubmission(data) {
    const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    
    if (!response.ok) {
        throw new Error('Form submission failed');
    }
}
```

### Option 3: Netlify Forms

1. Add `netlify` attribute to the form in HTML:
```html
<form class="contact-form" id="contact-form" netlify>
```

2. Update the JavaScript to use Netlify's form handling:
```javascript
async simulateFormSubmission(data) {
    const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            'form-name': 'contact',
            ...data
        })
    });
    
    if (!response.ok) {
        throw new Error('Form submission failed');
    }
}
```

### Option 4: EmailJS Integration

1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Include their SDK in your HTML:
```html
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
```

3. Update the submission function:
```javascript
async simulateFormSubmission(data) {
    return emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', data, 'YOUR_PUBLIC_KEY');
}
```

## 🎨 Customization

### Personal Information

Update the following sections in `index.html`:

1. **About Section**: Update the JSON object with your details
2. **Skills Section**: Modify skill categories and percentages
3. **Projects Section**: Replace with your actual projects
4. **Contact Info**: Update all contact details and social links

### Content Customization

**Typewriter Messages**: Edit the `typewriterMessages` array in `script.js`:
```javascript
const typewriterMessages = [
    "Your custom message here...",
    "Another intriguing message...",
    // Add more messages
];
```

**ASCII Art**: Replace the ASCII art in the sidebar (search for `ascii-art` class)

**Colors & Themes**: Modify CSS custom properties in `style.css`:
```css
:root {
    --primary-green: #00ff41;    /* Main accent color */
    --secondary-green: #00aa2b;  /* Secondary accent */
    --text-primary: #00ff41;     /* Primary text color */
    /* ... other variables */
}
```

### Adding New Sections

1. Add HTML structure in `index.html`
2. Add navigation link with `data-section` attribute
3. Style in `style.css`
4. Update navigation system in `script.js`

## 🎯 Interactive Features

### Keyboard Shortcuts
- **Ctrl/Cmd + K**: Switch color themes
- **Enter/Space**: Skip boot sequence
- **Escape**: Close mobile menu
- **Konami Code**: Hidden easter egg (↑↑↓↓←→←→BA)

### Mouse Interactions
- **Click anywhere**: Skip boot sequence
- **Hover effects**: Navigation and interactive elements
- **Mobile swipe**: Responsive navigation

### Theme Switching
Click "theme --switch" in the navigation or use Ctrl+K to cycle through:
- Matrix Green (default)
- Amber Terminal
- Blue Terminal  
- Red Alert

## 🔧 Advanced Configuration

### Performance Optimization

**Reduce Matrix Rain Effect**: In `script.js`, modify the opacity or disable:
```javascript
// Reduce intensity
this.canvas.style.opacity = '0.05';

// Or disable completely
// this.matrixRain.start();
```

**Optimize Animations**: Adjust animation timing in CSS:
```css
/* Faster typewriter effect */
.typewriter { animation-duration: 0.5s; }

/* Reduce glitch frequency */
/* Change interval in script.js from 10000 to 30000 */
```

### Mobile Optimization

The site is fully responsive, but you can adjust breakpoints in `style.css`:
```css
@media (max-width: 768px) { /* Tablet styles */ }
@media (max-width: 480px) { /* Mobile styles */ }
```

## 🚨 Browser Compatibility

**Recommended**: Modern browsers (Chrome, Firefox, Safari, Edge)

**Supported Features**:
- CSS Grid & Flexbox
- CSS Custom Properties
- ES6+ JavaScript
- Canvas API
- Fetch API

**Fallbacks**: The site degrades gracefully in older browsers, with core functionality maintained.

## 📱 Mobile Experience

- **Touch-friendly**: All interactive elements are touch-optimized
- **Slide menu**: Mobile navigation with smooth animations
- **Responsive text**: Scales appropriately for all screen sizes
- **Performance**: Optimized animations for mobile devices

## 🛡️ Security Considerations

- **No external dependencies**: All code is self-contained
- **Form validation**: Client-side validation with server-side recommended
- **XSS Protection**: Safe innerHTML usage throughout
- **HTTPS Ready**: Designed for secure hosting

## 📊 Analytics Integration

To add analytics, include your tracking code before the closing `</head>` tag:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

## 🐛 Troubleshooting

**Contact form not working**: Check browser console for errors and verify your form submission setup.

**Animations not smooth**: Ensure hardware acceleration is enabled in your browser.

**Mobile menu not appearing**: Verify CSS media queries and JavaScript event listeners.

**Matrix effect performance issues**: Reduce canvas opacity or disable on lower-end devices.

## 🎉 Additional Features

- **Console Easter Egg**: Check browser console for ASCII art
- **Accessibility**: ARIA labels and keyboard navigation
- **SEO Friendly**: Semantic HTML and meta tags
- **Print Styles**: Clean printing layout
- **Dark Mode**: Already implemented as default theme

## 📝 License

This project is open source. Feel free to customize and use for your own portfolio!

---

**Created with passion for clean code and beautiful design.**
**Ready to deploy? Just upload and go! 🚀** 