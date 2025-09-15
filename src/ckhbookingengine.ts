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

    // Set CSS custom properties for theming
    this.setCSSCustomProperties();

    const html = `
      <div class="ckh-booking-form">
        <div class="ckh-form-header">
          <h3>Book Your Stay</h3>
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
            <button type="button" id="ckh-search-btn" class="ckh-btn ckh-btn-primary ${this.options.customClasses?.button || ''}">
              Search Available Rooms
            </button>
          </div>
        </div>
      </div>
    `;

    this.container.innerHTML = html;
  }

  /**
   * Set CSS custom properties for dynamic theming
   */
  private setCSSCustomProperties(): void {
    if (!this.container) return;

    // Set CSS custom properties on the container element
    const style = this.container.style;

    if (this.options.theme?.primaryColor) {
      style.setProperty('--ckh-primary-color', this.options.theme.primaryColor);
    }

    if (this.options.theme?.secondaryColor) {
      style.setProperty('--ckh-secondary-color', this.options.theme.secondaryColor);
    }

    if (this.options.theme?.fontFamily) {
      style.setProperty('--ckh-font-family', this.options.theme.fontFamily);
    }

    if (this.options.theme?.borderRadius) {
      style.setProperty('--ckh-border-radius', this.options.theme.borderRadius);
    }
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

    this.isInitialized = false;
  }

  /**
   * Get current booking engine version
   */
  public static getVersion(): string {
    return '1.0.0';
  }
}