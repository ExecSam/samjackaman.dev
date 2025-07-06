// Typewriter Effect Configuration
const typewriterMessages = [
    "Connecting to backend services...",
    "Successfully connected to samjackaman.dev",
    "Welcome to my digital domain.",
    "Ready to explore?",
    "Type \"help\" for available commands..."
];

class TypewriterEffect {
    constructor(element, messages, speed = 100) {
        this.element = element;
        this.messages = messages;
        this.speed = speed;
        this.messageIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.isComplete = false;
        this.cursor = document.querySelector('.cursor');
        this.setupCursor();
    }

    setupCursor() {
        // Create a temporary canvas to measure text width
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        // Set font to match the terminal font
        this.ctx.font = '16px "Source Code Pro", monospace';
    }

    updateCursorPosition() {
        const currentText = this.element.textContent;
        const textWidth = this.ctx.measureText(currentText).width;
        this.cursor.style.left = textWidth + 'px';
    }

    type() {
        if (this.isComplete) return;

        const currentMessage = this.messages[this.messageIndex];
        
        if (this.isDeleting) {
            // Deleting characters
            this.element.textContent = currentMessage.substring(0, this.charIndex - 1);
            this.charIndex--;
            this.updateCursorPosition();
            
            if (this.charIndex === 0) {
                this.isDeleting = false;
                this.messageIndex++;
                
                // Check if we've completed all messages
                if (this.messageIndex >= this.messages.length) {
                    this.complete();
                    return;
                }
                
                setTimeout(() => this.type(), 500);
                return;
            }
        } else {
            // Typing characters
            this.element.textContent = currentMessage.substring(0, this.charIndex + 1);
            this.charIndex++;
            this.updateCursorPosition();
            
            if (this.charIndex === currentMessage.length) {
                // If this is the last message, don't delete it
                if (this.messageIndex === this.messages.length - 1) {
                    this.complete();
                    return;
                }
                
                setTimeout(() => {
                    this.isDeleting = true;
                    this.type();
                }, 2000);
                return;
            }
        }
        
        const typingSpeed = this.isDeleting ? this.speed / 2 : this.speed;
        setTimeout(() => this.type(), typingSpeed + Math.random() * 50);
    }

    complete() {
        this.isComplete = true;
        // Enable user input
        this.enableUserInput();
    }

    enableUserInput() {
        const promptSection = document.querySelector('.prompt-section');
        const commandsHint = document.querySelector('.commands-hint');
        
        // Make the prompt interactive
        promptSection.style.cursor = 'text';
        commandsHint.style.display = 'block';
        
        // Add input field (hidden but functional)
        const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.className = 'hidden-input';
        inputField.style.position = 'absolute';
        inputField.style.left = '-9999px';
        inputField.style.opacity = '0';
        promptSection.appendChild(inputField);
        
        // Focus on input when clicking the prompt
        promptSection.addEventListener('click', () => {
            inputField.focus();
        });
        
        // Handle typing
        inputField.addEventListener('input', (e) => {
            this.element.textContent = e.target.value;
            this.updateCursorPosition();
        });
        
        // Handle enter key
        inputField.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const command = e.target.value.toLowerCase().trim();
                this.handleCommand(command);
                e.target.value = '';
                this.element.textContent = '';
                this.updateCursorPosition();
            }
        });
        
        // Auto-focus the input
        setTimeout(() => inputField.focus(), 100);
    }

    handleCommand(command) {
        const bootSequence = new BootSequence();
        
        if (command === 'help') {
            this.element.textContent = 'Available commands: help, enter, start';
            this.updateCursorPosition();
            setTimeout(() => {
                this.element.textContent = '';
                this.updateCursorPosition();
            }, 3000);
        } else if (command === 'enter' || command === 'start' || command === '') {
            bootSequence.enterMainInterface();
        } else {
            this.element.textContent = `Command "${command}" not found. Type "help" for available commands.`;
            this.updateCursorPosition();
            setTimeout(() => {
                this.element.textContent = '';
                this.updateCursorPosition();
            }, 3000);
        }
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
            this.showStatus('Message sent successfully! I\'ll respond within 24 hours.', 'success');
            this.form.reset();
            
        } catch (error) {
            // Show error message
            this.showStatus('Failed to send message. Please try again or contact me directly.', 'error');
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

        // Listen for keyboard input (Enter or Space to skip)
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

// Theme Controller (simplified)
class ThemeController {
    constructor() {
        this.currentTheme = 'default';
        this.themes = {
            default: {
                '--primary-green': '#00ff41',
                '--secondary-green': '#00aa2b',
                '--text-primary': '#00ff41'
            },
            professional: {
                '--primary-green': '#4a9eff',
                '--secondary-green': '#357abd',
                '--text-primary': '#4a9eff'
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

// Professional console message
console.log(`
╔═══════════════════════════════════════╗
║           Sam Jackaman                ║
║       Full Stack Developer           ║
║                                       ║
║  Thanks for checking the console!     ║
║  Let's build something amazing.       ║
╚═══════════════════════════════════════╝
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