// Typewriter Effect Configuration
const typewriterMessages = [
    "Accessing secure systems...",
    "Decrypting user profiles...",
    "Scanning for vulnerabilities...",
    "System compromised successfully.",
    "Welcome to my digital domain.",
    "Ready to explore the matrix?",
    "Type 'help' for available commands..."
];

class TypewriterEffect {
    constructor(element, messages, speed = 100) {
        this.element = element;
        this.messages = messages;
        this.speed = speed;
        this.messageIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.isWaiting = false;
    }

    type() {
        const currentMessage = this.messages[this.messageIndex];
        
        if (this.isDeleting) {
            // Deleting characters
            this.element.textContent = currentMessage.substring(0, this.charIndex - 1);
            this.charIndex--;
            
            if (this.charIndex === 0) {
                this.isDeleting = false;
                this.messageIndex = (this.messageIndex + 1) % this.messages.length;
                setTimeout(() => this.type(), 500); // Pause before typing next message
                return;
            }
        } else {
            // Typing characters
            this.element.textContent = currentMessage.substring(0, this.charIndex + 1);
            this.charIndex++;
            
            if (this.charIndex === currentMessage.length) {
                this.isWaiting = true;
                setTimeout(() => {
                    this.isDeleting = true;
                    this.isWaiting = false;
                    this.type();
                }, 2000); // Wait before starting to delete
                return;
            }
        }
        
        const typingSpeed = this.isDeleting ? this.speed / 2 : this.speed;
        setTimeout(() => this.type(), typingSpeed + Math.random() * 50);
    }

    start() {
        setTimeout(() => this.type(), 1000);
    }
}

// Navigation System
class NavigationSystem {
    constructor() {
        this.currentSection = 'about';
        this.sections = document.querySelectorAll('.content-section');
        this.navLinks = document.querySelectorAll('.navigation a[data-section]');
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const sectionId = link.getAttribute('data-section');
                this.navigateToSection(sectionId);
                this.updateActiveNavLink(link);
            });
        });
    }

    navigateToSection(sectionId) {
        this.sections.forEach(section => {
            section.classList.remove('active');
        });
        
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            setTimeout(() => {
                targetSection.classList.add('active');
            }, 100);
        }
        
        this.currentSection = sectionId;
    }

    updateActiveNavLink(activeLink) {
        this.navLinks.forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }
}

// Contact Form Handler
class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.submitBtn = this.form.querySelector('.submit-btn');
        this.statusDiv = document.getElementById('form-status');
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmission();
        });
    }

    async handleFormSubmission() {
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        this.submitBtn.classList.add('loading');
        this.hideStatus();
        
        try {
            // Simulate form submission (replace with actual endpoint)
            await this.simulateFormSubmission(data);
            
            // Show success message
            this.showStatus('Message transmitted successfully! I\'ll respond within 24 hours.', 'success');
            this.form.reset();
            
        } catch (error) {
            // Show error message
            this.showStatus('Transmission failed. Please try again or contact directly.', 'error');
        } finally {
            // Remove loading state
            this.submitBtn.classList.remove('loading');
        }
    }

    async simulateFormSubmission(data) {
        // Replace this with your actual form submission logic
        // For example, using fetch to send to your backend:
        /*
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
        */
        
        // Simulate network delay
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate 90% success rate
                if (Math.random() > 0.1) {
                    resolve();
                } else {
                    reject(new Error('Simulated network error'));
                }
            }, 2000);
        });
    }

    showStatus(message, type) {
        this.statusDiv.textContent = message;
        this.statusDiv.className = `form-status ${type}`;
        this.statusDiv.style.display = 'block';
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            this.hideStatus();
        }, 5000);
    }

    hideStatus() {
        this.statusDiv.style.display = 'none';
    }
}

// Boot Sequence Controller
class BootSequence {
    constructor() {
        this.bootScreen = document.getElementById('boot-screen');
        this.mainInterface = document.getElementById('main-interface');
        this.commandsHint = document.querySelector('.commands-hint');
    }

    start() {
        // Start typewriter effect after boot sequence
        setTimeout(() => {
            this.startTypewriter();
        }, 3000);

        // Make commands hint clickable
        this.commandsHint.addEventListener('click', () => {
            this.enterMainInterface();
        });

        // Auto-enter main interface after extended period
        setTimeout(() => {
            if (this.bootScreen.classList.contains('active')) {
                this.enterMainInterface();
            }
        }, 15000);

        // Listen for keyboard input
        document.addEventListener('keydown', (e) => {
            if (this.bootScreen.classList.contains('active') && 
                (e.key === 'Enter' || e.key === ' ')) {
                this.enterMainInterface();
            }
        });
    }

    startTypewriter() {
        const typewriterElement = document.getElementById('typewriter-text');
        const typewriter = new TypewriterEffect(typewriterElement, typewriterMessages, 80);
        typewriter.start();
    }

    enterMainInterface() {
        this.bootScreen.classList.remove('active');
        this.mainInterface.classList.add('active');
        
        // Initialize skill bar animations
        setTimeout(() => {
            this.animateSkillBars();
        }, 500);
    }

    animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-fill');
        skillBars.forEach((bar, index) => {
            setTimeout(() => {
                bar.style.opacity = '1';
                bar.style.transform = 'scaleX(1)';
            }, index * 100);
        });
    }
}

// Mobile Menu Controller
class MobileMenu {
    constructor() {
        this.sidebar = document.querySelector('.sidebar');
        this.setupMenuToggle();
    }

    setupMenuToggle() {
        // Create mobile menu toggle button
        const menuToggle = document.createElement('button');
        menuToggle.className = 'menu-toggle';
        menuToggle.innerHTML = '☰';
        menuToggle.setAttribute('aria-label', 'Toggle Menu');
        document.body.appendChild(menuToggle);

        // Toggle menu on button click
        menuToggle.addEventListener('click', () => {
            this.toggleMenu();
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
                this.closeMenu();
            }
        });

        // Close menu when clicking nav links on mobile
        const navLinks = this.sidebar.querySelectorAll('a[data-section]');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    this.closeMenu();
                }
            });
        });
    }

    toggleMenu() {
        this.sidebar.classList.toggle('open');
    }

    closeMenu() {
        this.sidebar.classList.remove('open');
    }
}

// Theme Controller
class ThemeController {
    constructor() {
        this.currentTheme = 'default';
        this.themes = {
            default: {
                '--primary-green': '#00ff41',
                '--secondary-green': '#00aa2b',
                '--text-primary': '#00ff41'
            },
            amber: {
                '--primary-green': '#ffb000',
                '--secondary-green': '#cc8800',
                '--text-primary': '#ffb000'
            },
            blue: {
                '--primary-green': '#00aaff',
                '--secondary-green': '#0088cc',
                '--text-primary': '#00aaff'
            },
            red: {
                '--primary-green': '#ff0040',
                '--secondary-green': '#cc0020',
                '--text-primary': '#ff0040'
            }
        };
    }

    switchTheme() {
        const themeKeys = Object.keys(this.themes);
        const currentIndex = themeKeys.indexOf(this.currentTheme);
        const nextIndex = (currentIndex + 1) % themeKeys.length;
        const nextTheme = themeKeys[nextIndex];
        
        this.applyTheme(nextTheme);
        this.currentTheme = nextTheme;
    }

    applyTheme(themeName) {
        const theme = this.themes[themeName];
        const root = document.documentElement;
        
        Object.entries(theme).forEach(([property, value]) => {
            root.style.setProperty(property, value);
        });
    }
}

// Glitch Effect Controller
class GlitchEffect {
    constructor() {
        this.setupGlitchElements();
    }

    setupGlitchElements() {
        // Add glitch effect to random elements occasionally
        setInterval(() => {
            this.triggerRandomGlitch();
        }, 10000); // Every 10 seconds
    }

    triggerRandomGlitch() {
        const glitchableElements = document.querySelectorAll('h2, .ascii-art, .terminal-title');
        const randomElement = glitchableElements[Math.floor(Math.random() * glitchableElements.length)];
        
        if (randomElement && !randomElement.classList.contains('glitch')) {
            randomElement.classList.add('glitch');
            randomElement.setAttribute('data-text', randomElement.textContent);
            
            setTimeout(() => {
                randomElement.classList.remove('glitch');
                randomElement.removeAttribute('data-text');
            }, 500);
        }
    }
}

// Matrix Rain Effect (Optional Enhancement)
class MatrixRain {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.drops = [];
        this.chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
        this.fontSize = 10;
        this.columns = 0;
        this.isRunning = false;
    }

    init() {
        // Create canvas for matrix effect
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '1';
        this.canvas.style.opacity = '0.1';
        document.body.appendChild(this.canvas);

        this.ctx = this.canvas.getContext('2d');
        this.resize();
        
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        this.drops = Array(this.columns).fill(1);
    }

    draw() {
        if (!this.isRunning) return;

        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = '#00ff41';
        this.ctx.font = `${this.fontSize}px monospace`;

        for (let i = 0; i < this.drops.length; i++) {
            const text = this.chars[Math.floor(Math.random() * this.chars.length)];
            this.ctx.fillText(text, i * this.fontSize, this.drops[i] * this.fontSize);

            if (this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            this.drops[i]++;
        }

        requestAnimationFrame(() => this.draw());
    }

    start() {
        if (!this.canvas) this.init();
        this.isRunning = true;
        this.draw();
    }

    stop() {
        this.isRunning = false;
    }
}

// Application Initializer
class App {
    constructor() {
        this.bootSequence = new BootSequence();
        this.navigation = new NavigationSystem();
        this.contactForm = new ContactForm();
        this.mobileMenu = new MobileMenu();
        this.themeController = new ThemeController();
        this.glitchEffect = new GlitchEffect();
        this.matrixRain = new MatrixRain();
    }

    init() {
        // Start boot sequence
        this.bootSequence.start();
        
        // Start subtle matrix rain effect
        setTimeout(() => {
            this.matrixRain.start();
        }, 5000);

        // Add global keyboard shortcuts
        this.setupKeyboardShortcuts();
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + K for theme switch
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.themeController.switchTheme();
            }
            
            // Escape to close mobile menu
            if (e.key === 'Escape') {
                this.mobileMenu.closeMenu();
            }
        });
    }
}

// Global Functions
function toggleTheme() {
    app.themeController.switchTheme();
}

// Initialize Application
let app;

document.addEventListener('DOMContentLoaded', () => {
    app = new App();
    app.init();
});

// Add some console art for developers who inspect the page
console.log(`
 ____                    _            _                            
/ ___|  __ _ _ __ ___    | | __ _  ___| | ____ _ _ __ ___   __ _ _ __  
\\___ \\ / _\` | '_ \` _ \\   | |/ _\` |/ __| |/ / _\` | '_ \` _ \\ / _\` | '_ \\ 
 ___) | (_| | | | | | |  | | (_| | (__|   < (_| | | | | | | (_| | | | |
|____/ \\__,_|_| |_| |_|  | |\\__,_|\\___|_|\\_\\__,_|_| |_| |_|\\__,_|_| |_|
                        _/ |                                          
                       |__/                                           

Welcome to the matrix, fellow developer! 🚀
Found something interesting? Let's connect!
`);

// Easter egg for konami code
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    konamiCode = konamiCode.slice(-konamiPattern.length);
    
    if (konamiCode.join(',') === konamiPattern.join(',')) {
        // Activate special effect
        document.body.style.animation = 'glitch-1 0.5s infinite';
        setTimeout(() => {
            document.body.style.animation = '';
            alert('🎉 Konami Code Activated! You\'ve unlocked the secret developer mode!');
        }, 2000);
    }
}); 