# CKH Booking Engine CDN Usage

## 🌐 CDN Links

### Latest Version
```html
<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/gh/cakramediadata2022/plugin_be_cdn@latest/dist/ckh-booking-engine.umd.js"></script>

<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/cakramediadata2022/plugin_be_cdn@latest/dist/style.css">
```

### Specific Version (Recommended for Production)
```html
<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/gh/cakramediadata2022/plugin_be_cdn@v1.0.0/dist/ckh-booking-engine.umd.js"></script>

<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/cakramediadata2022/plugin_be_cdn@v1.0.0/dist/style.css">
```

## 📦 Available Formats

- **UMD** (Universal): `ckh-booking-engine.umd.js` - Works in browsers, Node.js, AMD
- **ES Modules**: `ckh-booking-engine.es.js` - Modern browsers with ES6 imports
- **CommonJS**: `ckh-booking-engine.cjs.js` - Node.js applications
- **AMD**: `ckh-booking-engine.amd.js` - RequireJS applications

## 🚀 Quick Start

```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/cakramediadata2022/plugin_be_cdn@latest/dist/style.css">
</head>
<body>
    <div id="booking-container"></div>
    
    <script src="https://cdn.jsdelivr.net/gh/cakramediadata2022/plugin_be_cdn@latest/dist/ckh-booking-engine.umd.js"></script>
    <script>
        const bookingEngine = new CkhBookingEngine({
            target: 'booking-container',
            apiKey: 'your-api-key', // Optional
            debug: true
        });
    </script>
</body>
</html>
```

## 🔄 Auto-Updates

jsDelivr automatically updates when you:
1. Create a new release/tag in GitHub
2. The CDN updates within 24 hours
3. Use `@latest` for automatic updates or `@v1.0.0` for version pinning

## 📊 CDN Statistics

Check usage statistics at: https://www.jsdelivr.com/package/gh/cakramediadata2022/plugin_be_cdn