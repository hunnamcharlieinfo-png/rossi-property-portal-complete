// Properties Data - with descriptions
const properties = [
    {
        id: 1,
        title: "Tuscan Villa",
        location: "Chianti Region, Tuscany",
        region: "tuscany",
        type: "villa",
        price: 850000,
        bedrooms: 4,
        bathrooms: 3,
        size: 320,
        featured: true,
        status: "available",
        description: "Stunning 17th-century villa with rolling vineyard views. This magnificent property features original terracotta floors, high ceilings, and a state-of-the-art kitchen renovated in 2022. Perfect for those seeking authentic Tuscan charm."
    },
    {
        id: 2,
        title: "Lake Como Residence",
        location: "Bellagio, Lombardy",
        region: "lombardy",
        type: "villa",
        price: 1200000,
        bedrooms: 3,
        bathrooms: 2,
        size: 250,
        featured: true,
        status: "viewing-scheduled",
        description: "Exclusive waterfront villa on the shores of Lake Como. Large terraces overlooking the lake, private dock, and modern amenities. This prestigious property is a symbol of Italian elegance and refinement."
    },
    {
        id: 3,
        title: "Historic Apartment",
        location: "Centro Storico, Rome",
        region: "lazio",
        type: "apartment",
        price: 650000,
        bedrooms: 2,
        bathrooms: 2,
        size: 180,
        featured: true,
        status: "new",
        description: "Charming apartment in Rome's historic center, just steps from the Colosseum and Roman Forum. Recently restored with period details and modern conveniences, offering the best of both worlds."
    },
    {
        id: 4,
        title: "Venetian Penthouse",
        location: "Grand Canal, Venice",
        region: "veneto",
        type: "penthouse",
        price: 2100000,
        bedrooms: 3,
        bathrooms: 3,
        size: 210,
        featured: false,
        status: "available",
        description: "Ultra-luxury penthouse with Canal Grande views. Contemporary design meets Venetian tradition in this exceptional property. Private rooftop terrace and premium finishes throughout."
    },
    {
        id: 5,
        title: "Sicilian Farmhouse",
        location: "Taormina, Sicily",
        region: "sicily",
        type: "farmhouse",
        price: 480000,
        bedrooms: 5,
        bathrooms: 4,
        size: 380,
        featured: false,
        status: "available",
        description: "Charming farmhouse in the Sicilian countryside near Taormina. Features a working almond and lemon grove, guest cottage, and stunning views of Mount Etna. Ideal for agritourism or family retreat."
    },
    {
        id: 6,
        title: "Florence City Loft",
        location: "Historic Center, Florence",
        region: "tuscany",
        type: "apartment",
        price: 720000,
        bedrooms: 2,
        bathrooms: 2,
        size: 150,
        featured: false,
        status: "new",
        description: "Contemporary loft in the heart of Florence's historic center. High ceilings, exposed beams, and modern design. Walking distance to the Duomo, Uffizi Gallery, and all major attractions."
    },
    {
        id: 7,
        title: "Amalfi Coast Villa",
        location: "Positano, Amalfi Coast",
        region: "amalfi",
        type: "villa",
        price: 3200000,
        bedrooms: 4,
        bathrooms: 4,
        size: 290,
        featured: true,
        status: "available",
        description: "Breathtaking clifftop villa overlooking the Tyrrhenian Sea. Direct beach access, infinity pool, and luxury finishes. This is the epitome of Mediterranean living at its finest."
    },
    {
        id: 8,
        title: "Milan Modern Apartment",
        location: "Brera District, Milan",
        region: "lombardy",
        type: "apartment",
        price: 890000,
        bedrooms: 3,
        bathrooms: 2,
        size: 195,
        featured: false,
        status: "available",
        description: "Sophisticated penthouse in Milan's trendy Brera district. Designer interiors, smart home technology, and access to the city's best galleries, restaurants, and shopping."
    },
    {
        id: 9,
        title: "Tuscan Countryside Estate",
        location: "San Gimignano, Tuscany",
        region: "tuscany",
        type: "villa",
        price: 1450000,
        bedrooms: 6,
        bathrooms: 5,
        size: 450,
        featured: false,
        status: "available",
        description: "Impressive estate with panoramic Tuscan views. Features multiple guest cottages, infinity pool, olive grove, and wine production facilities. Perfect for family reunions or boutique hotel conversion."
    },
    {
        id: 10,
        title: "Lake Garda Cottage",
        location: "Sirmione, Lake Garda",
        region: "lombardy",
        type: "cottage",
        price: 540000,
        bedrooms: 2,
        bathrooms: 2,
        size: 120,
        featured: false,
        status: "available",
        description: "Charming lakeside cottage with direct access to Lake Garda. Ideal for weekend retreats or year-round living. Close to water sports, restaurants, and picturesque medieval villages."
    }
];

let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
let scheduledViewings = JSON.parse(localStorage.getItem('scheduledViewings')) || [];
let infoRequests = JSON.parse(localStorage.getItem('infoRequests')) || [];
let filteredProperties = [...properties];
let currentView = 'grid';

// Render Properties
function renderProperties(propertiesToRender = filteredProperties) {
    const grid = document.getElementById('propertiesGrid');
    if (!grid) return;

    if (propertiesToRender.length === 0) {
        grid.innerHTML = '<p style="text-align: center; padding: 3rem; color: var(--charcoal);">No properties found matching your criteria.</p>';
        updateResultsCount(0);
        return;
    }

    grid.innerHTML = propertiesToRender.map(property => {
        const propertyImage = ImageService.loadImage(property);
        return `
        <div class="property-card" onclick="viewProperty(${property.id})">
            <div class="property-image" style="position: relative;">
                <img src="${propertyImage}" alt="${property.title}" style="width:100%;height:100%;object-fit:cover;display:block;">
                ${property.status === 'new' ? '<span class="property-badge">New</span>' : ''}
            </div>
            <div class="property-content">
                <h3 class="property-title">${property.title}</h3>
                <p class="property-location">📍 ${property.location}</p>
                <div class="property-details">
                    <span class="property-detail">🛏️ ${property.bedrooms} Beds</span>
                    <span class="property-detail">🚿 ${property.bathrooms} Baths</span>
                    <span class="property-detail">📐 ${property.size} m²</span>
                </div>
                <div class="property-footer">
                    <div class="property-price">€${property.price.toLocaleString()}</div>
                    <button class="btn-favorite ${favorites.includes(property.id) ? 'active' : ''}" 
                            onclick="event.stopPropagation(); toggleFavorite(${property.id})">
                        <svg viewBox="0 0 24 24">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    `}).join('');

    updateResultsCount(propertiesToRender.length);
}

// Filter Properties
function filterProperties() {
    const region = document.getElementById('regionFilter')?.value || '';
    const type = document.getElementById('typeFilter')?.value || '';
    const price = document.getElementById('priceFilter')?.value || '';
    const bedrooms = document.getElementById('bedroomsFilter')?.value || '';

    filteredProperties = properties.filter(property => {
        const matchRegion = !region || property.region === region;
        const matchType = !type || property.type === type;
        const matchBedrooms = !bedrooms || property.bedrooms >= parseInt(bedrooms);
        
        let matchPrice = true;
        if (price) {
            const [min, max] = price.split('-').map(Number);
            const priceInK = property.price / 1000;
            matchPrice = priceInK >= min && priceInK < max;
        }

        return matchRegion && matchType && matchPrice && matchBedrooms;
    });

    renderProperties();
}

// Sort Properties
function sortProperties() {
    const sortBy = document.getElementById('sortFilter')?.value || 'featured';

    switch(sortBy) {
        case 'price-low':
            filteredProperties.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProperties.sort((a, b) => b.price - a.price);
            break;
        case 'newest':
            filteredProperties.sort((a, b) => b.id - a.id);
            break;
        case 'size-large':
            filteredProperties.sort((a, b) => b.size - a.size);
            break;
        default:
            filteredProperties.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    renderProperties();
}

// Reset Filters
function resetFilters() {
    document.getElementById('regionFilter').value = '';
    document.getElementById('typeFilter').value = '';
    document.getElementById('priceFilter').value = '';
    document.getElementById('bedroomsFilter').value = '';
    document.getElementById('sortFilter').value = 'featured';
    
    filteredProperties = [...properties];
    renderProperties();
}

// Toggle View
function setView(view, el) {
    currentView = view;
    const grid = document.getElementById('propertiesGrid');
    const buttons = document.querySelectorAll('.view-btn');

    buttons.forEach(btn => btn.classList.remove('active'));

    // If an element was provided (via onclick="setView(..., this)"), use it
    if (el && el.classList) {
        el.classList.add('active');
    } else {
        // Fallback: activate button by matching a data-view attribute or position
        const btnToActivate = Array.from(buttons).find(b => b.dataset.view === view) || buttons[0];
        if (btnToActivate) btnToActivate.classList.add('active');
    }

    if (grid) {
        if (view === 'list') {
            grid.classList.add('list-view');
        } else {
            grid.classList.remove('list-view');
        }
    }
}

// Toggle Favorite
function toggleFavorite(propertyId) {
    const index = favorites.indexOf(propertyId);
    
    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(propertyId);
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
    renderProperties();
}

// View Property Details
function viewProperty(propertyId) {
    const property = properties.find(p => p.id === propertyId);
    if (!property) {
        alert('❌ Property not found');
        return;
    }

    const modal = document.getElementById('modal');
    if (!modal) {
        alert('❌ Modal not found. Please refresh the page.');
        return;
    }

    const title = document.getElementById('modalTitle');
    const body = document.getElementById('modalBody');

    if (!title || !body) {
        alert('❌ Modal elements not found. Please refresh the page.');
        return;
    }

    const propertyImage = ImageService.loadImage(property);

    title.textContent = `🏡 ${property.title}`;
    body.innerHTML = `
        <div style="margin-bottom: 1.5rem;">
            <div style="height: 300px; border-radius: 12px; margin-bottom: 1.5rem; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                <img src="${propertyImage}" alt="${property.title}" style="width:100%;height:100%;object-fit:cover;display:block;">
            </div>
        </div>
        
        <div style="background: var(--cream); padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                <div>
                    <p style="color: #7F8C8D; font-size: 0.9rem; margin-bottom: 0.3rem;">📍 Location</p>
                    <p style="font-weight: 600; color: var(--navy);">${property.location}</p>
                </div>
                <div>
                    <p style="color: #7F8C8D; font-size: 0.9rem; margin-bottom: 0.3rem;">💰 Price</p>
                    <p style="font-weight: 600; color: var(--gold); font-size: 1.2rem;">€${property.price.toLocaleString()}</p>
                </div>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
                <div>
                    <p style="color: #7F8C8D; font-size: 0.9rem; margin-bottom: 0.3rem;">🛏️ Bedrooms</p>
                    <p style="font-weight: 600; font-size: 1.2rem;">${property.bedrooms}</p>
                </div>
                <div>
                    <p style="color: #7F8C8D; font-size: 0.9rem; margin-bottom: 0.3rem;">🚿 Bathrooms</p>
                    <p style="font-weight: 600; font-size: 1.2rem;">${property.bathrooms}</p>
                </div>
                <div>
                    <p style="color: #7F8C8D; font-size: 0.9rem; margin-bottom: 0.3rem;">📐 Size</p>
                    <p style="font-weight: 600; font-size: 1.2rem;">${property.size} m²</p>
                </div>
            </div>
        </div>
        
        <p style="margin-bottom: 1.5rem; color: var(--charcoal); line-height: 1.7;">${property.description}</p>
        
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
            <button class="download-btn" style="flex: 1; cursor: pointer; min-width: 150px;" onclick="openScheduleForm(${property.id})">📅 Schedule Viewing</button>
            <button class="download-btn" style="flex: 1; cursor: pointer; min-width: 150px;" onclick="openInfoForm(${property.id})">📧 Request Info</button>
        </div>
    `;

    modal.classList.add('active');
}

// Schedule Viewing Form
function openScheduleForm(propertyId) {
    const property = properties.find(p => p.id === propertyId);
    if (!property) {
        alert('❌ Property not found');
        return;
    }

    const modal = document.getElementById('modal');
    if (!modal) {
        alert('❌ Modal not found. Please refresh the page.');
        return;
    }

    const title = document.getElementById('modalTitle');
    const body = document.getElementById('modalBody');

    if (!title || !body) {
        alert('❌ Modal elements not found. Please refresh the page.');
        return;
    }

    title.textContent = `📅 Schedule Viewing - ${property.title}`;
    body.innerHTML = `
        <form onsubmit="submitScheduleViewing(event, ${propertyId})">
            <div class="form-group" style="margin-bottom: 1rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Your Name *</label>
                <input type="text" required style="width: 100%; padding: 0.8rem; border: 2px solid var(--cream); border-radius: 8px; font-size: 1rem;" placeholder="Enter your name">
            </div>
            
            <div class="form-group" style="margin-bottom: 1rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Email Address *</label>
                <input type="email" required style="width: 100%; padding: 0.8rem; border: 2px solid var(--cream); border-radius: 8px; font-size: 1rem;" placeholder="your@email.com">
            </div>
            
            <div class="form-group" style="margin-bottom: 1rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Phone Number *</label>
                <input type="tel" required style="width: 100%; padding: 0.8rem; border: 2px solid var(--cream); border-radius: 8px; font-size: 1rem;" placeholder="+39 XXX XXXX XXXX">
            </div>
            
            <div class="form-group" style="margin-bottom: 1rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Preferred Date *</label>
                <input type="date" required style="width: 100%; padding: 0.8rem; border: 2px solid var(--cream); border-radius: 8px; font-size: 1rem;">
            </div>
            
            <div class="form-group" style="margin-bottom: 1rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Preferred Time *</label>
                <input type="time" required style="width: 100%; padding: 0.8rem; border: 2px solid var(--cream); border-radius: 8px; font-size: 1rem;">
            </div>
            
            <div class="form-group" style="margin-bottom: 1.5rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Additional Notes</label>
                <textarea style="width: 100%; padding: 0.8rem; border: 2px solid var(--cream); border-radius: 8px; font-size: 1rem; resize: vertical; height: 80px;" placeholder="Any additional information..."></textarea>
            </div>
            
            <div style="display: flex; gap: 1rem;">
                <button type="submit" class="download-btn" style="flex: 1; cursor: pointer;">✓ Confirm Viewing</button>
                <button type="button" class="download-btn" style="flex: 1; cursor: pointer; background: #7F8C8D;" onclick="closeModal()">← Back</button>
            </div>
        </form>
    `;
    
    modal.classList.add('active');
}

// Submit Schedule Viewing
function submitScheduleViewing(event, propertyId) {
    event.preventDefault();
    
    // Get form inputs using querySelector (more reliable)
    const form = event.target;
    const inputs = form.querySelectorAll('input, textarea');
    
    if (inputs.length < 6) {
        alert('❌ Form error. Please refresh and try again.');
        return false;
    }
    
    const name = inputs[0].value.trim();
    const email = inputs[1].value.trim();
    const phone = inputs[2].value.trim();
    const date = inputs[3].value;
    const time = inputs[4].value;
    const notes = inputs[5].value.trim();
    
    // Validation
    if (!name || !email || !phone || !date || !time) {
        alert('⚠️ Please fill in all required fields');
        return false;
    }
    
    const viewing = {
        propertyId,
        name,
        email,
        phone,
        date,
        time,
        notes,
        timestamp: new Date().toISOString()
    };
    
    scheduledViewings.push(viewing);
    localStorage.setItem('scheduledViewings', JSON.stringify(scheduledViewings));
    
    alert(`✅ Viewing scheduled for ${date} at ${time}.\n\nWe'll send a confirmation to ${email}.`);
    closeModal();
    return false;
}

// Request Info Form
function openInfoForm(propertyId) {
    const property = properties.find(p => p.id === propertyId);
    if (!property) {
        alert('❌ Property not found');
        return;
    }

    const modal = document.getElementById('modal');
    if (!modal) {
        alert('❌ Modal not found. Please refresh the page.');
        return;
    }

    const title = document.getElementById('modalTitle');
    const body = document.getElementById('modalBody');

    if (!title || !body) {
        alert('❌ Modal elements not found. Please refresh the page.');
        return;
    }

    title.textContent = `📧 Request Information - ${property.title}`;
    body.innerHTML = `
        <form onsubmit="submitInfoRequest(event, ${propertyId})">
            <div class="form-group" style="margin-bottom: 1rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Your Name *</label>
                <input type="text" required style="width: 100%; padding: 0.8rem; border: 2px solid var(--cream); border-radius: 8px; font-size: 1rem;" placeholder="Enter your name">
            </div>
            
            <div class="form-group" style="margin-bottom: 1rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Email Address *</label>
                <input type="email" required style="width: 100%; padding: 0.8rem; border: 2px solid var(--cream); border-radius: 8px; font-size: 1rem;" placeholder="your@email.com">
            </div>
            
            <div class="form-group" style="margin-bottom: 1rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Phone Number *</label>
                <input type="tel" required style="width: 100%; padding: 0.8rem; border: 2px solid var(--cream); border-radius: 8px; font-size: 1rem;" placeholder="+39 XXX XXXX XXXX">
            </div>
            
            <div class="form-group" style="margin-bottom: 1rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">What would you like to know? *</label>
                <select required style="width: 100%; padding: 0.8rem; border: 2px solid var(--cream); border-radius: 8px; font-size: 1rem;">
                    <option value="">-- Select a topic --</option>
                    <option value="pricing">💰 Pricing & Payment Terms</option>
                    <option value="availability">📅 Availability & Negotiation</option>
                    <option value="legal">⚖️ Legal & Documentation</option>
                    <option value="renovation">🔨 Renovation History</option>
                    <option value="neighbors">👥 Neighborhood Info</option>
                    <option value="other">❓ Other Questions</option>
                </select>
            </div>
            
            <div class="form-group" style="margin-bottom: 1.5rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Your Message *</label>
                <textarea style="width: 100%; padding: 0.8rem; border: 2px solid var(--cream); border-radius: 8px; font-size: 1rem; resize: vertical; height: 100px;" placeholder="Tell us more..." required></textarea>
            </div>
            
            <label style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1.5rem; cursor: pointer;">
                <input type="checkbox" required>
                <span style="font-size: 0.9rem;">I consent to being contacted about this property</span>
            </label>
            
            <div style="display: flex; gap: 1rem;">
                <button type="submit" class="download-btn" style="flex: 1; cursor: pointer;">✓ Send Request</button>
                <button type="button" class="download-btn" style="flex: 1; cursor: pointer; background: #7F8C8D;" onclick="closeModal()">← Back</button>
            </div>
        </form>
    `;
    
    modal.classList.add('active');
}

// Submit Info Request
function submitInfoRequest(event, propertyId) {
    event.preventDefault();
    
    // Get form inputs using querySelector (more reliable)
    const form = event.target;
    const inputs = form.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], select, textarea');
    const checkbox = form.querySelector('input[type="checkbox"]');
    
    if (inputs.length < 5) {
        alert('❌ Form error. Please refresh and try again.');
        return false;
    }
    
    const name = inputs[0].value.trim();
    const email = inputs[1].value.trim();
    const phone = inputs[2].value.trim();
    const topic = inputs[3].value;
    const message = inputs[4].value.trim();
    const consent = checkbox ? checkbox.checked : false;
    
    // Validation
    if (!name || !email || !phone || !topic || !message) {
        alert('⚠️ Please fill in all required fields');
        return false;
    }
    
    if (!consent) {
        alert('⚠️ Please check the consent box to continue');
        return false;
    }
    
    const request = {
        propertyId,
        name,
        email,
        phone,
        topic,
        message,
        timestamp: new Date().toISOString()
    };
    
    infoRequests.push(request);
    localStorage.setItem('infoRequests', JSON.stringify(infoRequests));
    
    alert(`✅ Thank you! Your request has been sent.\n\nWe'll get back to you at ${email} within 24 hours.`);
    closeModal();
    return false;
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('propertiesGrid')) {
        renderProperties();
    }
});

// Update Results Count
function updateResultsCount(count) {
    const countEl = document.getElementById('resultsCount');
    if (countEl) {
        countEl.textContent = count;
    }
}

// Pagination
function changePage(direction) {
    alert(`Pagination ${direction} - Feature coming soon!`);
}
