const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');

// Extract navbar and footer using basic string splitting
const navMatch = indexHtml.match(/(<nav[\s\S]*?<\/nav>)/);
const footerMatch = indexHtml.match(/(<footer[\s\S]*?<\/footer>)/);
const headMatch = indexHtml.match(/(<head>[\s\S]*?<\/head>)/);

const nav = navMatch ? navMatch[1] : '';
const footer = footerMatch ? footerMatch[1] : '';
const head = headMatch ? headMatch[1] : '';

const createPage = (filename, title, content) => {
    const pageHtml = `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
${head.replace('<title>AccoFin Consultancy | Trusted Financial &amp; Tax Solutions in Kerala</title>', '<title>' + title + ' | AccoFin</title>').replace('<title>AccoFin Consultancy | Trusted Financial & Tax Solutions in Kerala</title>', '<title>' + title + ' | AccoFin</title>')}
<body class="bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark font-sans selection:bg-primary/10 transition-colors duration-300 animate-fade-in flex flex-col min-h-screen">
    ${nav}
    
    <main class="flex-grow pt-32 pb-24 relative overflow-hidden">
        <!-- Minimal Pattern Background -->
        <div class="absolute inset-0 pattern-bg opacity-30 pointer-events-none z-0"></div>
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 bg-white dark:bg-card-dark rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 p-8 md:p-12">
            ${content}
        </div>
    </main>
    
    ${footer}
    
    <script>
        // Simple dark mode toggle logic
        const themeToggleBtn = document.getElementById('theme-toggle');
        const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
        const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

        if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
            typeof themeToggleLightIcon !== 'undefined' && themeToggleLightIcon && themeToggleLightIcon.classList.remove('hidden');
        } else {
            document.documentElement.classList.remove('dark');
            typeof themeToggleDarkIcon !== 'undefined' && themeToggleDarkIcon && themeToggleDarkIcon.classList.remove('hidden');
        }
    </script>
</body>
</html>`;
    // Also strip the cache-bust script just in case it crept in
    fs.writeFileSync(filename, pageHtml.replace('<script type="module" src="/cache-bust.js"></script>', ''), 'utf8');
};

const comingSoonContent = `
    <div class="text-center py-20">
        <h1 class="text-4xl md:text-5xl font-serif text-secondary dark:text-white mt-2 tracking-tight mb-6">Coming Soon</h1>
        <p class="text-lg text-gray-500 dark:text-gray-400 mb-10 max-w-xl mx-auto">This page is currently under development. Subscribe to our newsletter to receive updates on when it goes live.</p>
        
        <form class="max-w-md mx-auto flex gap-3 flex-col sm:flex-row" onsubmit="event.preventDefault(); alert('Subscribed successfully!');">
            <input type="email" required placeholder="Enter your email address" class="flex-grow px-5 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-secondary dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all shadow-sm">
            <button type="submit" class="px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-opacity-90 transition-all shadow-lg shadow-primary/20 whitespace-nowrap">Subscribe</button>
        </form>
    </div>
`;

const privacyContent = `
    <h1 class="text-4xl md:text-5xl font-serif text-secondary dark:text-white mt-2 tracking-tight mb-8">Privacy Policy</h1>
    <div class="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 space-y-6">
        <p><strong>Effective Date:</strong> January 1, 2026</p>
        
        <h2 class="text-2xl font-bold text-secondary dark:text-white mt-10 mb-4">1. Introduction</h2>
        <p>AccoFin Consultancy ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy outlines how we collect, process, and safeguard your personal data in compliance with the Digital Personal Data Protection (DPDP) Act, 2023 of India.</p>
        
        <h2 class="text-2xl font-bold text-secondary dark:text-white mt-10 mb-4">2. Data We Collect</h2>
        <p>We may collect personal data such as your name, contact information, financial details, and business metrics necessary for providing our consultancy, tax, and compliance services. All data is collected only with explicit consent and for a specified purpose.</p>
        
        <h2 class="text-2xl font-bold text-secondary dark:text-white mt-10 mb-4">3. Purpose and Usage</h2>
        <p>Your data is utilized strictly for executing requested financial services, ensuring statutory compliance, maintaining secure communications, and fulfilling legal obligations required by regulatory bodies like the ICAI and MCA India.</p>
        
        <h2 class="text-2xl font-bold text-secondary dark:text-white mt-10 mb-4">4. Data Security & Storage</h2>
        <p>We employ robust, state-of-the-art security measures to prevent unauthorized access, breaches, or tampering. Data is maintained locally within Indian servers where applicable to adhere to national data sovereignty and compliance mandates.</p>
        
        <h2 class="text-2xl font-bold text-secondary dark:text-white mt-10 mb-4">5. Your Rights</h2>
        <p>Under the DPDP Act 2023, you retain the right to:</p>
        <ul class="list-disc pl-6 space-y-2">
            <li>Access the personal data we hold about you.</li>
            <li>Correct inaccurate or incomplete data.</li>
            <li>Withdraw your consent at any time.</li>
            <li>Request the erasure of your personal data when no longer necessary for its stipulated purpose.</li>
        </ul>
        
        <h2 class="text-2xl font-bold text-secondary dark:text-white mt-10 mb-4">6. Contact Us</h2>
        <p>For any grievances or queries related to data protection, please contact our designated Data Protection Officer via the <a href="contact.html" class="text-primary hover:underline">Contact Us</a> page.</p>
    </div>
`;

const termsContent = `
    <h1 class="text-4xl md:text-5xl font-serif text-secondary dark:text-white mt-2 tracking-tight mb-8">Terms of Service</h1>
    <div class="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 space-y-6">
        <p><strong>Effective Date:</strong> January 1, 2026</p>
        
        <h2 class="text-2xl font-bold text-secondary dark:text-white mt-10 mb-4">1. Acceptance of Terms</h2>
        <p>By accessing or using the AccoFin Consultancy website and services, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions, you must refrain from using our platform.</p>
        
        <h2 class="text-2xl font-bold text-secondary dark:text-white mt-10 mb-4">2. Services Rendered</h2>
        <p>AccoFin Consultancy provides professional advisory, financial compliance, and tax consultation services. While we strive to provide accurate and timely counsel, the ultimate responsibility for business decisions and regulatory compliance rests with the client or their respective entity.</p>
        
        <h2 class="text-2xl font-bold text-secondary dark:text-white mt-10 mb-4">3. Confidentiality</h2>
        <p>We adhere to strict confidentiality protocols. Information shared with us during the course of a business relationship will never be disclosed to third parties unless mandated by law or necessary for explicit service execution (e.g., filing tax returns).</p>
        
        <h2 class="text-2xl font-bold text-secondary dark:text-white mt-10 mb-4">4. Limitation of Liability</h2>
        <p>Under no circumstances shall AccoFin Consultancy be liable for any indirect, incidental, special, or consequential damages resulting from the use or inability to use our services, or from reliance on the information provided, even if we have been advised of the possibility of such damages.</p>
        
        <h2 class="text-2xl font-bold text-secondary dark:text-white mt-10 mb-4">5. Governing Law</h2>
        <p>These Terms shall be interpreted and governed in accordance with the laws of India. Any disputes arising directly or indirectly from these Terms shall be subject to the exclusive jurisdiction of the courts located in Trivandrum, Kerala.</p>
        
        <p class="mt-8">If you have any questions regarding these Terms, please reach out to us via our <a href="contact.html" class="text-primary hover:underline">Contact page</a>.</p>
    </div>
`;

createPage('coming-soon.html', 'Coming Soon', comingSoonContent);
createPage('privacy.html', 'Privacy Policy', privacyContent);
createPage('terms.html', 'Terms of Service', termsContent);
console.log('Successfully created the legal and coming soon pages!');
