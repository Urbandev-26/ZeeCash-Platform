document.addEventListener('DOMContentLoaded', () => {
    // Header Scroll Effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Loan Calculator
    const userNameInput = document.getElementById('userName');
    const loanAmountInput = document.getElementById('loanAmount');
    const loanDurationSelect = document.getElementById('loanDuration');
    const itemTypeSelect = document.getElementById('itemType');
    
    const interestOutput = document.getElementById('interestOutput');
    const dueDateOutput = document.getElementById('dueDateOutput');
    const totalOutput = document.getElementById('totalOutput');
    const calcApplyBtn = document.getElementById('calcApplyBtn');

    function calculateLoan() {
        const name = userNameInput.value.trim();
        let amount = parseFloat(loanAmountInput.value) || 0;
        
        // Enforce K20,000 upper limit
        if (amount > 20000) {
            amount = 20000;
            loanAmountInput.value = 20000;
        }

        const rate = parseFloat(loanDurationSelect.value);
        const item = itemTypeSelect.value;
        
        const interest = amount * rate;
        const total = amount + interest;

        // Calculate Due Date based on rate value
        let durationDays = 7;
        if (rate === 0.18) durationDays = 14;
        else if (rate === 0.25) durationDays = 21;
        else if (rate === 0.35) durationDays = 28;

        const today = new Date();
        const dueDate = new Date(today);
        dueDate.setDate(today.getDate() + durationDays);
        
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        const dueDateString = dueDate.toLocaleDateString('en-US', options);

        // Update UI
        interestOutput.textContent = `K${interest.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
        dueDateOutput.textContent = dueDateString;
        totalOutput.textContent = `K${total.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

        // Validation: Required Name
        if (!name) {
            calcApplyBtn.classList.add('disabled');
            calcApplyBtn.style.opacity = '0.5';
            calcApplyBtn.style.pointerEvents = 'none';
            calcApplyBtn.textContent = 'Enter Name to Apply';
            calcApplyBtn.href = '#';
        } else {
            calcApplyBtn.classList.remove('disabled');
            calcApplyBtn.style.opacity = '1';
            calcApplyBtn.style.pointerEvents = 'auto';
            calcApplyBtn.textContent = 'Apply Now on WhatsApp';
            
            // Structured WhatsApp Message Template
            const message = `Hello ZeeCash, I would like to apply for a loan.\n\n` +
                            `Name: ${name}\n` + 
                            `Loan Amount: K${amount.toLocaleString()}\n` +
                            `Loan Duration: ${durationDays} Days (${durationDays / 7} ${durationDays === 7 ? 'Week' : 'Weeks'})\n` +
                            `Collateral Item: ${item}`;
            
            calcApplyBtn.href = `https://wa.me/260979588145?text=${encodeURIComponent(message)}`;
        }
    }

    userNameInput.addEventListener('input', calculateLoan);
    loanAmountInput.addEventListener('input', calculateLoan);
    loanDurationSelect.addEventListener('change', calculateLoan);
    itemTypeSelect.addEventListener('change', calculateLoan);

    // Initial calculation
    calculateLoan();

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
    }

    // Smooth scroll for anchors (excluding external links like WhatsApp)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || !href.startsWith('#')) return; // Ignore plain # or external links
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Simple reveal animation on scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-up');
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
});
