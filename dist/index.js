import { CkhBookingEngine } from './ckhbookingengine';
import './styles.css';
// Export the main class and interfaces for module usage
export { CkhBookingEngine };
// Auto-register on window object for CDN usage
if (typeof window !== 'undefined') {
    window.CkhBookingEngine = CkhBookingEngine;
}
// Default export for easier imports
export default CkhBookingEngine;
