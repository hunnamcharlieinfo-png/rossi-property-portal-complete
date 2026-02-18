// Dashboard JavaScript

// Load Featured Properties on Dashboard
document.addEventListener('DOMContentLoaded', () => {
    const featuredGrid = document.getElementById('featuredProperties');
    if (!featuredGrid) return;

    // Get featured properties
    const featured = properties.filter(p => p.featured).slice(0, 3);

    featuredGrid.innerHTML = featured.map(property => {
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
                    <button class="btn-favorite ${favorites.includes(property.id) ? 'active' : ''}" onclick="event.stopPropagation(); toggleFavorite(${property.id})">
                        <svg viewBox="0 0 24 24">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    `}).join('');
});
