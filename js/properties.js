// properties.js

// Manage property listings
const properties = [];

// Add property listing
function addProperty(property) {
    properties.push(property);
}

// Filter properties by criteria
function filterProperties(criteria) {
    return properties.filter(property => {
        return Object.keys(criteria).every(key => property[key] === criteria[key]);
    });
}

// Search properties by keyword
function searchProperties(keyword) {
    return properties.filter(property => property.description.includes(keyword));
}

// Display property details
function displayProperties() {
    properties.forEach(property => {
        console.log(`Title: ${property.title}`);
        console.log(`Description: ${property.description}`);
        console.log(`Price: $${property.price}`);
        console.log('--------------------');
    });
}

// Exporting functions for use in other modules
export { addProperty, filterProperties, searchProperties, displayProperties };