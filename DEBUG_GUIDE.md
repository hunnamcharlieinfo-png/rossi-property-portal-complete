# 🔧 Debug & Test Guide

## Quick Browser Console Tests

Open your browser's **Developer Tools (F12)** and paste these commands in the **Console** tab:

### 1. **Check Authentication**
```javascript
// Should return: "true" if logged in
localStorage.getItem('isLoggedIn')

// Should return: your email
localStorage.getItem('userEmail')
```

### 2. **Check Image Service**
```javascript
// Should return: ImageService object
console.log(ImageService)

// Should return: SVG data URI (base64)
ImageService.generatePropertyImage(properties[0])
```

### 3. **Check Properties Array**
```javascript
// Should return: 10 properties
console.log(properties.length)

// Check first property structure
console.log(properties[0])
```

### 4. **Check Favorites**
```javascript
// Should return: array of favorited property IDs
JSON.parse(localStorage.getItem('favorites'))

// Add a favorite manually
localStorage.setItem('favorites', JSON.stringify([1, 2, 3]))
renderProperties() // Refresh display
```

### 5. **Check Modal**
```javascript
// Should return: Modal element
document.getElementById('modal')

// Trigger modal
viewProperty(1)
```

### 6. **Check Form Submission**
```javascript
// Test schedule viewing submission
const event = {
    target: document.querySelector('form'),
    preventDefault: () => {}
};
submitScheduleViewing(event, 1)

// Check saved viewings
JSON.parse(localStorage.getItem('scheduledViewings'))
```

### 7. **Clear All Data & Reset**
```javascript
// Clear saved data
localStorage.removeItem('isLoggedIn')
localStorage.removeItem('userEmail')
localStorage.removeItem('userName')
localStorage.removeItem('favorites')
localStorage.removeItem('scheduledViewings')
localStorage.removeItem('infoRequests')

// Reload page
location.reload()
```

---

## Common Issues & Solutions

### **Issue: Images Not Showing**
**Symptoms**: Property cards show broken image icon

**Diagnosis**:
```javascript
// Check if ImageService exists
typeof ImageService !== 'undefined'

// Test image generation
const testImg = ImageService.loadImage(properties[0])
console.log(testImg) // Should start with "data:image/svg+xml"
```

**Solutions**:
1. Ensure `js/image-service.js` is loaded before `js/properties.js`
2. Check browser console for JavaScript errors
3. Try: `renderProperties(properties)` to re-render

### **Issue: Forms Not Submitting**
**Symptoms**: Click "Schedule Viewing" or "Request Info" but nothing happens

**Diagnosis**:
```javascript
// Check if modal opens
openScheduleForm(1)

// Check if form elements exist
document.querySelector('form')

// Check if functions are callable
typeof openScheduleForm === 'function'
```

**Solutions**:
1. Ensure all HTML pages have `<div id="modal">` structure
2. Check that script loading order is: auth.js → image-service.js → properties.js → main.js
3. Look for JavaScript errors in Console (F12)

### **Issue: Favorites Not Saving**
**Symptoms**: Click heart button but selection doesn't persist

**Diagnosis**:
```javascript
// Check favorites in storage
JSON.parse(localStorage.getItem('favorites'))

// Check favorite button state
document.querySelector('.btn-favorite')

// Test toggle
toggleFavorite(1)
```

**Solutions**:
1. Check that `renderProperties()` is called after `toggleFavorite()`
2. Ensure localStorage is enabled in browser
3. Try clearing all data and starting fresh

### **Issue: Login Not Working**
**Symptoms**: Register/login shows alert but doesn't redirect

**Diagnosis**:
```javascript
// Test login manually
localStorage.setItem('isLoggedIn', 'true')
localStorage.setItem('userEmail', 'test@example.com')
localStorage.setItem('userName', 'Test User')
location.href = 'index.html' // Redirect
```

**Solutions**:
1. Check email validation: `isValidEmail('test@example.com')`
2. Check password is at least 6 chars for login, 8 for register
3. Look for JavaScript errors in Console

### **Issue: Modal Not Opening**
**Symptoms**: Click property but modal doesn't appear

**Diagnosis**:
```javascript
// Check modal exists
document.getElementById('modal')

// Check modal is visible
document.getElementById('modal').classList.contains('active')

// Manually open modal
document.getElementById('modal').classList.add('active')
```

**Solutions**:
1. Ensure `js/main.js` is loaded (contains closeModal function)
2. Check CSS is loading: inspect modal element styling
3. Try: `viewProperty(1)` in console

---

## Step-by-Step Verification

### **Phase 1: Authentication**
1. Open `login.html`
2. Register new account (any email/password)
3. Should redirect to dashboard
4. Check console: `localStorage.getItem('isLoggedIn')` should be "true"

### **Phase 2: Property Display**
1. On dashboard, scroll to "Featured Properties"
2. Should see 3 property cards with images
3. Check console: `properties.length` should be 10
4. Check images are SVG: right-click image → inspect → src should start with "data:image/svg+xml"

### **Phase 3: Property Interactions**
1. Click any property card
2. Modal should open with detailed view
3. Check console for errors (F12 → Console)
4. Try "Schedule Viewing" button
5. Form should appear in modal

### **Phase 4: Form Submission**
1. Fill out "Schedule Viewing" form
2. Click "Confirm Viewing"
3. Should see success message with confirmation
4. Check console: `JSON.parse(localStorage.getItem('scheduledViewings'))`
5. Should see array with your submission

### **Phase 5: Favorites**
1. Click heart icon on property
2. Icon should fill/change color
3. Click "Favorites" in navigation
4. Property should appear in favorites list
5. Check console: `JSON.parse(localStorage.getItem('favorites'))`

---

## Browser Console Error Reference

### **"X is not defined"**
```
Cause: Function or variable not loaded
Fix: Check script loading order in HTML
```

### **"Cannot read property 'classList' of null"**
```
Cause: HTML element not found
Fix: Verify modal/grid HTML exists in page
```

### **"Property.region is undefined"**
```
Cause: Properties array not loaded correctly
Fix: Check js/properties.js loads before usage
```

### **"ImageService is not defined"**
```
Cause: image-service.js not loaded
Fix: Ensure script tag in HTML before properties.js
```

---

## Reset & Quick Fix Commands

```javascript
// 1. FULL RESET - Start fresh (runs in browser console)
localStorage.clear()
location.reload()

// 2. LOGIN AS TEST USER
localStorage.setItem('isLoggedIn', 'true')
localStorage.setItem('userEmail', 'test@example.com')
localStorage.setItem('userName', 'Test User')
location.href = 'index.html'

// 3. RELOAD ALL DATA
location.reload()

// 4. TEST IMAGE SERVICE
ImageService.loadImage(properties[0])

// 5. RENDER PROPERTIES
renderProperties(properties)

// 6. CLOSE MODAL
closeModal()

// 7. CHECK ALL FUNCTIONS EXIST
[
  'handleLogin', 'handleRegister', 'handleLogout',
  'openScheduleForm', 'openInfoForm', 'viewProperty',
  'toggleFavorite', 'filterProperties', 'closeModal',
  'renderProperties'
].forEach(fn => console.log(`${fn}: ${typeof window[fn]}`))
```

---

## If Everything Fails

**Nuclear Option** (clears everything):

1. Open login.html
2. Press F12 (Developer Tools)
3. Go to Application → Storage → Local Storage
4. Delete ANY entries for your domain
5. Refresh page (F5)
6. Try again fresh

---

## Network Issues

If images not loading despite SVG generation:

```javascript
// Check if browser blocks data URIs
fetch(ImageService.loadImage(properties[0]))
  .then(() => console.log('✅ Data URI works'))
  .catch(() => console.log('❌ Data URI blocked'))
```

Most browsers support SVG data URIs. If blocked, try:
- Disable browser extensions
- Try incognito/private mode
- Try different browser

---

## Performance Check

```javascript
// Check for slow operations
console.time('renderProperties')
renderProperties(properties)
console.timeEnd('renderProperties')

// Should complete in < 100ms
```

---

## Firebase/DevTools Tips

Press F12, then try these tabs:

1. **Console**: Run debug commands above
2. **Application → Storage → Local Storage**: View saved data
3. **Elements**: Inspect modal HTML structure
4. **Network**: Check if images load (should see data: URIs)
5. **Sources**: Set breakpoints in JS functions

---

## Quick Status Check Script

Copy and run in console for full system status:

```javascript
console.log('=== ROSSI PROPERTY PORTAL - STATUS CHECK ===');
console.log('✅ Auth Status:', !!localStorage.getItem('isLoggedIn'));
console.log('✅ Properties Loaded:', properties?.length || 'NOT LOADED');
console.log('✅ ImageService:', typeof ImageService !== 'undefined' ? 'LOADED' : 'MISSING');
console.log('✅ Modal Element:', !!document.getElementById('modal'));
console.log('✅ Favorites:', JSON.parse(localStorage.getItem('favorites'))?.length || 0);
console.log('✅ Viewings Scheduled:', JSON.parse(localStorage.getItem('scheduledViewings'))?.length || 0);
console.log('✅ Info Requests:', JSON.parse(localStorage.getItem('infoRequests'))?.length || 0);
console.log('=== END STATUS CHECK ===');
```

---

## Still Not Working?

Check:
1. Are you on the correct page (login.html or index.html)?
2. Are scripts loading? (Inspector → Network tab)
3. Are there JavaScript errors? (F12 → Console)
4. Is localStorage enabled? (Try: `localStorage.setItem('test', '1')`)
5. Is browser cache cleared? (Ctrl+Shift+Del)

---

**For additional help, check WEBSITE_VERIFICATION.md or contact support.**
