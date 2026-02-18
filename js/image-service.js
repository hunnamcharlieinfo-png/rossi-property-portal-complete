// Image Service - Generate SVG placeholder images for properties
const ImageService = {
    // Property image colors based on region
    regionColors: {
        tuscany: { bg: '#8B7355', accent: '#D4A574' },
        lombardy: { bg: '#2C5F7F', accent: '#6BA3D6' },
        lazio: { bg: '#C85A54', accent: '#E8A89B' },
        veneto: { bg: '#4A7C59', accent: '#8FB49F' },
        sicily: { bg: '#E89B7B', accent: '#F5D5B8' },
        amalfi: { bg: '#006B8F', accent: '#4FA8D5' }
    },

    // Generate SVG image for a property
    generatePropertyImage: function(property) {
        const colors = this.regionColors[property.region] || { bg: '#B89850', accent: '#E5D4A6' };
        const typeEmoji = this.getTypeEmoji(property.type);
        
        const svg = `
            <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
                <!-- Background -->
                <defs>
                    <linearGradient id="grad-${property.id}" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:${colors.bg};stop-opacity:1" />
                        <stop offset="100%" style="stop-color:${colors.accent};stop-opacity:1" />
                    </linearGradient>
                </defs>
                <rect width="400" height="300" fill="url(#grad-${property.id})" />
                
                <!-- Sky gradient effect -->
                <ellipse cx="200" cy="80" rx="180" ry="100" fill="${colors.accent}" opacity="0.3" />
                
                <!-- Building/Property shape -->
                <rect x="80" y="120" width="240" height="140" fill="white" opacity="0.9" rx="8" />
                
                <!-- Windows -->
                <rect x="100" y="140" width="30" height="30" fill="${colors.bg}" opacity="0.8" rx="2" />
                <rect x="150" y="140" width="30" height="30" fill="${colors.bg}" opacity="0.8" rx="2" />
                <rect x="200" y="140" width="30" height="30" fill="${colors.bg}" opacity="0.8" rx="2" />
                <rect x="250" y="140" width="30" height="30" fill="${colors.bg}" opacity="0.8" rx="2" />
                
                <rect x="100" y="190" width="30" height="30" fill="${colors.bg}" opacity="0.8" rx="2" />
                <rect x="150" y="190" width="30" height="30" fill="${colors.bg}" opacity="0.8" rx="2" />
                <rect x="200" y="190" width="30" height="30" fill="${colors.bg}" opacity="0.8" rx="2" />
                <rect x="250" y="190" width="30" height="30" fill="${colors.bg}" opacity="0.8" rx="2" />
                
                <!-- Door -->
                <rect x="185" y="230" width="30" height="40" fill="${colors.bg}" opacity="0.8" rx="2" />
                
                <!-- Property Type Icon -->
                <text x="200" y="60" font-size="48" text-anchor="middle" dominant-baseline="middle">${typeEmoji}</text>
                
                <!-- Location Badge -->
                <circle cx="350" cy="30" r="25" fill="white" opacity="0.9" />
                <text x="350" y="35" font-size="12" text-anchor="middle" fill="${colors.bg}" font-weight="bold">€${Math.floor(property.price / 100000) * 100}K</text>
            </svg>
        `;
        
        return 'data:image/svg+xml;base64,' + btoa(svg);
    },

    // Get emoji for property type
    getTypeEmoji: function(type) {
        const emojis = {
            villa: '🏡',
            apartment: '🏢',
            farmhouse: '🏠',
            penthouse: '🏙️',
            cottage: '🏘️'
        };
        return emojis[type] || '🏠';
    },

    // Load image with fallback
    loadImage: function(property) {
        // Always use generated SVG instead of external files
        return this.generatePropertyImage(property);
    }
};
