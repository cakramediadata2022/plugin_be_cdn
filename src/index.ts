import { CkhBookingEngine } from './CkhBookingEngine';
import type { CkhBookingEngineOptions, BookingData } from './CkhBookingEngine';

// Export the main class and interfaces for module usage
export { CkhBookingEngine };
export type { CkhBookingEngineOptions, BookingData };

// Make the library globally available when used via CDN/UMD
declare global {
    interface Window {
        CkhBookingEngine: typeof CkhBookingEngine;
    }
}

// Auto-register on window object for CDN usage
if (typeof window !== 'undefined') {
    window.CkhBookingEngine = CkhBookingEngine;
}

// Default export for easier imports
export default CkhBookingEngine;