# 🏨 CKH Booking Engine

A versatile and customizable booking engine library built with TypeScript that can be used via CDN, npm, or as a module in various JavaScript environments.

## 🚀 Features

- **Multiple Module Formats**: Supports UMD, AMD, CJS, and ESM
- **CDN Ready**: Auto-registers on window object for easy CDN usage
- **TypeScript Support**: Full TypeScript definitions included
- **Responsive Design**: Mobile-friendly booking forms
- **Customizable Themes**: Easy styling and branding
- **Event Callbacks**: Hook into booking lifecycle events
- **Target Element Flexible**: Use element ID or DOM element reference
- **Zero Dependencies**: Lightweight with no external dependencies

## 📦 Installation

### Via NPM
```bash
npm install ckh-booking-engine
```

### Via CDN (jsDelivr)
```html
<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/cakramediadata2022/plugin_be_cdn@latest/dist/style.css">

<!-- JavaScript - Latest version -->
<script src="https://cdn.jsdelivr.net/gh/cakramediadata2022/plugin_be_cdn@latest/dist/ckh-booking-engine.umd.js"></script>

<!-- JavaScript - Specific version (recommended for production) -->
<script src="https://cdn.jsdelivr.net/gh/cakramediadata2022/plugin_be_cdn@v1.0.0/dist/ckh-booking-engine.umd.js"></script>
```

### Via unpkg (NPM CDN)
```html
<!-- CSS -->
<link rel="stylesheet" href="https://unpkg.com/ckh-booking-engine@latest/dist/style.css">

<!-- JavaScript -->
<script src="https://unpkg.com/ckh-booking-engine@latest/dist/ckh-booking-engine.umd.js"></script>
```

## 🔧 Basic Usage

### CDN Usage
```html
<!DOCTYPE html>
<html>
<head>
    <title>My Hotel Booking</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/cakramediadata2022/plugin_be_cdn@latest/dist/style.css">
</head>
<body>
    <div id="booking-form"></div>
    
    <script src="https://cdn.jsdelivr.net/gh/cakramediadata2022/plugin_be_cdn@latest/dist/ckh-booking-engine.umd.js"></script>
    <script>
        // Library automatically available as window.CkhBookingEngine
        const booking = new CkhBookingEngine({
            target: 'booking-form',
            apiKey: 'your-api-key', // Optional
            autoSearch: true,
            callbacks: {
                onBookingComplete: (data) => console.log('Booking completed:', data)
            }
        });
    </script>
</body>
</html>
```

### ES6 Modules
```javascript
import { CkhBookingEngine } from 'ckh-booking-engine';

const booking = new CkhBookingEngine({
    target: '#booking-form'
});
```

### CommonJS
```javascript
const { CkhBookingEngine } = require('ckh-booking-engine');

const booking = new CkhBookingEngine({
    target: document.getElementById('booking-form')
});
```

### TypeScript
```typescript
import { CkhBookingEngine, CkhBookingEngineOptions } from 'ckh-booking-engine';

const options: CkhBookingEngineOptions = {
    target: '#booking-form',
    theme: {
        primaryColor: '#007bff'
    }
};

const booking = new CkhBookingEngine(options);
```

## ⚙️ Configuration Options

```typescript
interface CkhBookingEngineOptions {
    // Required: Target element
    target: string | HTMLElement;
    
    // API Configuration
    apiEndpoint?: string;
    apiKey?: string;
    
    // Theme Customization
    theme?: {
        primaryColor?: string;      // Default: '#007bff'
        secondaryColor?: string;    // Default: '#6c757d'
        fontFamily?: string;        // Default: 'Arial, sans-serif'
        borderRadius?: string;      // Default: '4px'
    };
    
    // Localization
    locale?: string;               // Default: 'en-US'
    currency?: string;             // Default: 'USD'
    dateFormat?: string;           // Default: 'MM/dd/yyyy'
    
    // Custom CSS Classes
    customClasses?: {
        container?: string;
        input?: string;
        button?: string;
        calendar?: string;
    };
    
    // Event Callbacks
    callbacks?: {
        onBookingStart?: () => void;
        onBookingComplete?: (booking: BookingData) => void;
        onBookingError?: (error: Error) => void;
        onDateSelect?: (date: Date) => void;
    };
    
    // Development
    debug?: boolean;              // Default: false
}
```

## 🎨 Styling Examples

### Custom Theme
```javascript
const booking = new CkhBookingEngine({
    target: '#booking-form',
    theme: {
        primaryColor: '#28a745',
        secondaryColor: '#6c757d',
        fontFamily: 'Georgia, serif',
        borderRadius: '8px'
    }
});
```

### Custom CSS Classes
```javascript
const booking = new CkhBookingEngine({
    target: '#booking-form',
    customClasses: {
        container: 'my-booking-container',
        input: 'my-input-style',
        button: 'my-button-style'
    }
});
```

```css
.my-booking-container {
    border: 2px solid #007bff;
    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}

.my-input-style {
    border: 1px solid #007bff;
    border-radius: 8px;
}

.my-button-style {
    background: linear-gradient(45deg, #007bff, #0056b3);
    text-transform: uppercase;
}
```

## 📅 Event Handling

```javascript
const booking = new CkhBookingEngine({
    target: '#booking-form',
    callbacks: {
        onBookingStart: () => {
            console.log('User started booking process');
            // Show loading indicator
        },
        
        onBookingComplete: (bookingData) => {
            console.log('Booking completed:', bookingData);
            // Redirect to confirmation page
            window.location.href = '/confirmation';
        },
        
        onBookingError: (error) => {
            console.error('Booking failed:', error);
            // Show error message to user
            alert('Booking failed: ' + error.message);
        },
        
        onDateSelect: (date) => {
            console.log('Date selected:', date);
            // Update availability calendar
        }
    }
});
```

## 🔄 Dynamic Updates

```javascript
// Update theme dynamically
booking.updateOptions({
    theme: {
        primaryColor: '#dc3545',
        borderRadius: '15px'
    }
});

// Update callbacks
booking.updateOptions({
    callbacks: {
        onBookingComplete: (data) => {
            // New completion handler
            sendAnalytics('booking_completed', data);
        }
    }
});
```

## 🧹 Cleanup

```javascript
// Destroy the booking engine instance
booking.destroy();
```

## 📱 React Integration

```jsx
import React, { useEffect, useRef } from 'react';
import { CkhBookingEngine } from 'ckh-booking-engine';

function BookingComponent() {
    const bookingRef = useRef(null);
    const engineRef = useRef(null);
    
    useEffect(() => {
        if (bookingRef.current && !engineRef.current) {
            engineRef.current = new CkhBookingEngine({
                target: bookingRef.current,
                theme: {
                    primaryColor: '#007bff'
                },
                callbacks: {
                    onBookingComplete: (data) => {
                        console.log('Booking completed in React:', data);
                    }
                }
            });
        }
        
        return () => {
            if (engineRef.current) {
                engineRef.current.destroy();
                engineRef.current = null;
            }
        };
    }, []);
    
    return <div ref={bookingRef} />;
}

export default BookingComponent;
```

## 📱 Vue.js Integration

```vue
<template>
    <div ref="bookingContainer"></div>
</template>

<script>
import { CkhBookingEngine } from 'ckh-booking-engine';

export default {
    name: 'BookingWidget',
    
    mounted() {
        this.booking = new CkhBookingEngine({
            target: this.$refs.bookingContainer,
            theme: {
                primaryColor: '#42b883'
            }
        });
    },
    
    beforeDestroy() {
        if (this.booking) {
            this.booking.destroy();
        }
    }
};
</script>
```

## 🚀 Development

### Setup
```bash
# Clone the repository
git clone https://github.com/cakramediadata2022/plugin_be_cdn.git

# Install dependencies
cd plugin_be_cdn
npm install

# Start development server
npm run dev
```

### Build
```bash
# Build all formats
npm run build

# Type checking
npm run type-check

# Linting
npm run lint
```

### Output Files
After building, the following files will be generated in the `dist/` folder:

- `ckh-booking-engine.es.js` - ES6 modules
- `ckh-booking-engine.cjs.js` - CommonJS
- `ckh-booking-engine.umd.js` - UMD (Universal Module Definition)
- `ckh-booking-engine.amd.js` - AMD (Asynchronous Module Definition)
- `index.d.ts` - TypeScript definitions

## 🔧 API Reference

### CkhBookingEngine Class

#### Constructor
- `new CkhBookingEngine(options: CkhBookingEngineOptions)`

#### Methods
- `updateOptions(newOptions: Partial<CkhBookingEngineOptions>): void`
- `destroy(): void`
- `static getVersion(): string`

#### Types
- `CkhBookingEngineOptions` - Configuration interface
- `BookingData` - Booking information interface

## 🔧 Development

### Local Development
```bash
# Install dependencies
npm install

# Start development server (with hot reload)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run type-check
```

### Testing the Plugin
1. Run `npm run dev` to start the development server
2. Open `http://localhost:5173` in your browser
3. Test different configurations and API integrations
4. Use the built-in testing environment with:
   - Basic implementation testing
   - Custom theme testing  
   - API key testing (live and demo modes)
   - CDN usage examples

### Development Features
- 🔄 **Hot Reload**: Automatic refresh on code changes
- 🐛 **Debug Mode**: Enable with `debug: true` for console logging
- 🎭 **Demo Mode**: Test without API key using sample data
- 🔑 **API Testing**: Test with real API keys in development
- 📱 **Responsive Testing**: Test across different screen sizes

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [Documentation](https://your-docs-site.com)
- [Demo](https://your-demo-site.com)
- [GitHub](https://github.com/cakramediadata2022/plugin_be_cdn)
- [NPM](https://www.npmjs.com/package/ckh-booking-engine)

## 📞 Support

For support, email support@cakrahub.com or create an issue on GitHub.

---

Made with ❤️ by [CakraHub](https://cakrahub.com)