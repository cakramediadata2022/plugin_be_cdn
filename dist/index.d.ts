import { CkhBookingEngine } from './ckhbookingengine';
import type { CkhBookingEngineOptions, BookingData } from './ckhbookingengine';
import './styles.css';
export { CkhBookingEngine };
export type { CkhBookingEngineOptions, BookingData };
declare global {
    interface Window {
        CkhBookingEngine: typeof CkhBookingEngine;
    }
}
export default CkhBookingEngine;
//# sourceMappingURL=index.d.ts.map