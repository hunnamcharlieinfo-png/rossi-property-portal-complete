// Main JavaScript for Rossi Property Portal

// Loader
window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.classList.add('hidden');
        }
    }, 1500);
});

// Mobile Menu Toggle
function toggleMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    if (navMenu) {
        navMenu.classList.toggle('active');
    }
}

// Notifications Toggle
function toggleNotifications() {
    alert('Notifications panel coming soon!');
}

// Logout Handler
function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        // Clear user session from localStorage
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userName');
        
        // Redirect to login page
        window.location.href = 'login.html';
    }
}

// Modal Functions
function openModal(type) {
    const modal = document.getElementById('modal');
    const title = document.getElementById('modalTitle');
    const body = document.getElementById('modalBody');

    const content = {
        profile: {
            title: 'Client Profile',
            body: `
                <p style="margin-bottom: 1rem;">Manage your personal information and preferences.</p>
                <div style="background: var(--cream); padding: 1.5rem; border-radius: 8px; margin-bottom: 1rem;">
                    <strong>Name:</strong> John Smith<br>
                    <strong>Email:</strong> client@example.com<br>
                    <strong>Phone:</strong> +39 XXX XXX XXXX<br>
                    <strong>Preferred Regions:</strong> Tuscany, Lombardy, Lazio
                </div>
                <button class="download-btn" onclick="window.location.href='profile.html'">Edit Profile</button>
            `
        },
        schedule: {
            title: 'Viewing Schedule',
            body: `
                <p style="margin-bottom: 1rem;">Your upcoming property viewings.</p>
                <div style="background: var(--cream); padding: 1.5rem; border-radius: 8px; margin-bottom: 1rem;">
                    <strong>Lake Como Residence</strong><br>
                    Date: February 15, 2026<br>
                    Time: 10:00 AM<br>
                    Location: Bellagio, Lombardy
                </div>
                <div style="background: var(--cream); padding: 1.5rem; border-radius: 8px; margin-bottom: 1rem;">
                    <strong>Tuscan Villa</strong><br>
                    Date: February 18, 2026<br>
                    Time: 2:00 PM<br>
                    Location: Chianti, Tuscany
                </div>
                <button class="download-btn">Add to Calendar</button>
            `
        }
    };

    const data = content[type] || content.profile;
    title.textContent = data.title;
    body.innerHTML = data.body;
    modal.classList.add('active');
}

function closeModal() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Close modal on outside click
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target.id === 'modal') closeModal();
        });
    }
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#') && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Document Download Handler
function downloadDocument(docType) {
    // Create a simple text document and trigger download
    const timestamp = new Date().toLocaleDateString();
    let content = '';
    
    if (docType === 'portfolio') {
        content = `PROPERTY PORTFOLIO REPORT\n\nDate: ${timestamp}\n\nYour saved properties and viewing schedule.\n\nThis is a placeholder document.`;
    } else if (docType === 'schedule') {
        const viewings = JSON.parse(localStorage.getItem('scheduledViewings')) || [];
        content = `VIEWING SCHEDULE REPORT\n\nDate: ${timestamp}\n\nScheduled Viewings: ${viewings.length}\n\n`;
        viewings.forEach((v, i) => {
            content += `${i+1}. ${v.name} - ${v.date} at ${v.time}\n`;
        });
    } else if (docType === 'requests') {
        const requests = JSON.parse(localStorage.getItem('infoRequests')) || [];
        content = `INFORMATION REQUESTS REPORT\n\nDate: ${timestamp}\n\nRequests Sent: ${requests.length}\n\n`;
        requests.forEach((r, i) => {
            content += `${i+1}. Topic: ${r.topic} - Status: Pending\n`;
        });
    } else {
        content = `ROSSI REAL ESTATE DOCUMENT\n\nDate: ${timestamp}\n\nThis is your ${docType} document.`;
    }
    
    // Create blob and download
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `rossi-${docType}-${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    alert(`✅ ${docType} document downloaded successfully!`);
}

// Set User Name
function setUserName() {
    const userNameEl = document.getElementById('userName');
    if (userNameEl) {
        // Get from localStorage or session
        const userName = localStorage.getItem('userName') || 'Valued Client';
        userNameEl.textContent = userName;
    }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', setUserName);
