/**
 * Configuration options for the CKH Booking Engine
 */
export interface CkhBookingEngineOptions {
    /** The target element ID or element where the booking engine will be rendered */
    target: string | HTMLElement;

    /** API endpoint for the booking service */
    apiEndpoint?: string;

    /** API key for authentication */
    apiKey?: string;

    /** Theme configuration */
    theme?: {
        primaryColor?: string;
        secondaryColor?: string;
        fontFamily?: string;
        borderRadius?: string;
    };

    /** Language/locale settings */
    locale?: string;

    /** Currency settings */
    currency?: string;

    /** Date format settings */
    dateFormat?: string;

    /** Custom CSS classes */
    customClasses?: {
        container?: string;
        input?: string;
        button?: string;
        calendar?: string;
    };

    /** Event callbacks */
    callbacks?: {
        onBookingStart?: () => void;
        onBookingComplete?: (booking: any) => void;
        onBookingError?: (error: Error) => void;
        onDateSelect?: (date: Date) => void;
    };

    /** Debug mode */
    debug?: boolean;
}

/**
 * Booking data interface
 */
export interface BookingData {
    checkIn: Date;
    checkOut: Date;
    guests: number;
    rooms: number;
    propertyId?: string;
    roomType?: string;
}

/**
 * CakraHub Booking Engine
 * A versatile booking engine library that can be used in various environments
 */
export class CkhBookingEngine {
    private options: CkhBookingEngineOptions;
    private container: HTMLElement | null = null;
    private isInitialized = false;

    /**
     * Creates a new instance of the CKH Booking Engine
     * @param options Configuration options for the booking engine
     */
    constructor(options: CkhBookingEngineOptions) {
        this.options = { ...this.getDefaultOptions(), ...options };
        this.validateOptions();
        this.init();
    }

    /**
     * Get default configuration options
     */
    private getDefaultOptions(): Partial<CkhBookingEngineOptions> {
        return {
            theme: {
                primaryColor: '#007bff',
                secondaryColor: '#6c757d',
                fontFamily: 'Arial, sans-serif',
                borderRadius: '4px'
            },
            locale: 'en-US',
            currency: 'USD',
            dateFormat: 'MM/dd/yyyy',
            debug: false
        };
    }

    /**
     * Validate the provided options
     */
    private validateOptions(): void {
        if (!this.options.target) {
            throw new Error('CkhBookingEngine: target option is required');
        }
    }

    /**
     * Initialize the booking engine
     */
    private init(): void {
        try {
            this.setupContainer();
            this.renderBookingForm();
            this.attachEventListeners();
            this.isInitialized = true;

            if (this.options.debug) {
                console.log('CkhBookingEngine initialized successfully', this.options);
            }
        } catch (error) {
            console.error('Failed to initialize CkhBookingEngine:', error);
            if (this.options.callbacks?.onBookingError) {
                this.options.callbacks.onBookingError(error as Error);
            }
        }
    }

    /**
     * Setup the container element
     */
    private setupContainer(): void {
        if (typeof this.options.target === 'string') {
            this.container = document.getElementById(this.options.target);
            if (!this.container) {
                this.container = document.querySelector(this.options.target);
            }
        } else {
            this.container = this.options.target;
        }

        if (!this.container) {
            throw new Error(`CkhBookingEngine: Could not find target element: ${this.options.target}`);
        }

        // Add base CSS class
        this.container.classList.add('ckh-booking-engine');
        if (this.options.customClasses?.container) {
            this.container.classList.add(this.options.customClasses.container);
        }
    }

    /**
     * Render the booking form HTML
     */
    private renderBookingForm(): void {
        if (!this.container) return;

        const html = `
      <div class="ckh-booking-form" style="
        font-family: ${this.options.theme?.fontFamily};
        border-radius: ${this.options.theme?.borderRadius};
      ">
        <div class="ckh-form-header">
          <h3 style="color: ${this.options.theme?.primaryColor};">Book Your Stay</h3>
        </div>
        
        <div class="ckh-form-body">
          <div class="ckh-form-row">
            <div class="ckh-form-group">
              <label for="ckh-checkin">Check-in Date</label>
              <input type="date" id="ckh-checkin" class="ckh-input ${this.options.customClasses?.input || ''}" required>
            </div>
            <div class="ckh-form-group">
              <label for="ckh-checkout">Check-out Date</label>
              <input type="date" id="ckh-checkout" class="ckh-input ${this.options.customClasses?.input || ''}" required>
            </div>
          </div>
          
          <div class="ckh-form-row">
            <div class="ckh-form-group">
              <label for="ckh-guests">Guests</label>
              <select id="ckh-guests" class="ckh-input ${this.options.customClasses?.input || ''}">
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4 Guests</option>
                <option value="5">5+ Guests</option>
              </select>
            </div>
            <div class="ckh-form-group">
              <label for="ckh-rooms">Rooms</label>
              <select id="ckh-rooms" class="ckh-input ${this.options.customClasses?.input || ''}">
                <option value="1">1 Room</option>
                <option value="2">2 Rooms</option>
                <option value="3">3 Rooms</option>
                <option value="4">4+ Rooms</option>
              </select>
            </div>
          </div>
          
          <div class="ckh-form-actions">
            <button type="button" id="ckh-search-btn" class="ckh-btn ckh-btn-primary ${this.options.customClasses?.button || ''}"
              style="background-color: ${this.options.theme?.primaryColor}; border-radius: ${this.options.theme?.borderRadius};">
              Search Available Rooms
            </button>
          </div>
        </div>
      </div>
    `;

        this.container.innerHTML = html;
        this.injectStyles();
    }

    /**
     * Inject default CSS styles
     */
    private injectStyles(): void {
        if (document.getElementById('ckh-booking-engine-styles')) return;

        const styles = `
      <style id="ckh-booking-engine-styles">
        .ckh-booking-engine {
          max-width: 600px;
          margin: 0 auto;
        }
        
        .ckh-booking-form {
          border: 1px solid #ddd;
          padding: 20px;
          background: #fff;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .ckh-form-header h3 {
          margin: 0 0 20px 0;
          text-align: center;
        }
        
        .ckh-form-row {
          display: flex;
          gap: 15px;
          margin-bottom: 15px;
        }
        
        .ckh-form-group {
          flex: 1;
        }
        
        .ckh-form-group label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
          color: #333;
        }
        
        .ckh-input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          font-size: 14px;
          box-sizing: border-box;
        }
        
        .ckh-input:focus {
          outline: none;
          border-color: ${this.options.theme?.primaryColor};
          box-shadow: 0 0 5px rgba(0,123,255,0.3);
        }
        
        .ckh-form-actions {
          text-align: center;
          margin-top: 20px;
        }
        
        .ckh-btn {
          padding: 12px 30px;
          border: none;
          cursor: pointer;
          font-size: 16px;
          font-weight: bold;
          color: white;
          transition: background-color 0.3s ease;
        }
        
        .ckh-btn:hover {
          opacity: 0.9;
        }
        
        .ckh-btn:active {
          transform: translateY(1px);
        }
        
        @media (max-width: 768px) {
          .ckh-form-row {
            flex-direction: column;
            gap: 10px;
          }
        }
      </style>
    `;

        document.head.insertAdjacentHTML('beforeend', styles);
    }

    /**
     * Attach event listeners
     */
    private attachEventListeners(): void {
        const searchBtn = document.getElementById('ckh-search-btn');
        const checkinInput = document.getElementById('ckh-checkin') as HTMLInputElement;
        const checkoutInput = document.getElementById('ckh-checkout') as HTMLInputElement;

        // Search button click
        searchBtn?.addEventListener('click', () => {
            this.handleSearch();
        });

        // Date selection callbacks
        checkinInput?.addEventListener('change', (e) => {
            const date = new Date((e.target as HTMLInputElement).value);
            this.options.callbacks?.onDateSelect?.(date);
        });

        checkoutInput?.addEventListener('change', (e) => {
            const date = new Date((e.target as HTMLInputElement).value);
            this.options.callbacks?.onDateSelect?.(date);
        });
    }

    /**
     * Handle search button click
     */
    private handleSearch(): void {
        try {
            const bookingData = this.getBookingData();

            if (this.options.callbacks?.onBookingStart) {
                this.options.callbacks.onBookingStart();
            }

            // Simulate API call or trigger custom booking logic
            this.processBooking(bookingData);

        } catch (error) {
            console.error('Booking search failed:', error);
            if (this.options.callbacks?.onBookingError) {
                this.options.callbacks.onBookingError(error as Error);
            }
        }
    }

    /**
     * Get current booking data from form
     */
    private getBookingData(): BookingData {
        const checkinInput = document.getElementById('ckh-checkin') as HTMLInputElement;
        const checkoutInput = document.getElementById('ckh-checkout') as HTMLInputElement;
        const guestsSelect = document.getElementById('ckh-guests') as HTMLSelectElement;
        const roomsSelect = document.getElementById('ckh-rooms') as HTMLSelectElement;

        if (!checkinInput.value || !checkoutInput.value) {
            throw new Error('Please select check-in and check-out dates');
        }

        return {
            checkIn: new Date(checkinInput.value),
            checkOut: new Date(checkoutInput.value),
            guests: parseInt(guestsSelect.value),
            rooms: parseInt(roomsSelect.value)
        };
    }

    /**
     * Process the booking (can be overridden or extended)
     */
    private processBooking(bookingData: BookingData): void {
        if (this.options.debug) {
            console.log('Processing booking:', bookingData);
        }

        // Simulate processing time
        setTimeout(() => {
            if (this.options.callbacks?.onBookingComplete) {
                this.options.callbacks.onBookingComplete(bookingData);
            } else {
                alert(`Booking search completed!\nCheck-in: ${bookingData.checkIn.toDateString()}\nCheck-out: ${bookingData.checkOut.toDateString()}\nGuests: ${bookingData.guests}\nRooms: ${bookingData.rooms}`);
            }
        }, 1000);
    }

    /**
     * Update booking engine options
     */
    public updateOptions(newOptions: Partial<CkhBookingEngineOptions>): void {
        this.options = { ...this.options, ...newOptions };
        if (this.isInitialized) {
            this.renderBookingForm();
            this.attachEventListeners();
        }
    }

    /**
     * Destroy the booking engine instance
     */
    public destroy(): void {
        if (this.container) {
            this.container.innerHTML = '';
            this.container.classList.remove('ckh-booking-engine');
        }

        // Remove injected styles
        const styleElement = document.getElementById('ckh-booking-engine-styles');
        if (styleElement) {
            styleElement.remove();
        }

        this.isInitialized = false;
    }

    /**
     * Get current booking engine version
     */
    public static getVersion(): string {
        return '1.0.0';
    }
}