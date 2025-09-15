import Litepicker from 'litepicker';
import 'litepicker/dist/css/litepicker.css';

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

  <div class="ckh-form-body">
    <!-- Side by side row -->
    <div class="ckh-form-row flex gap-4">
      <!-- Date -->
      <div class="ckh-form-group flex-1">
        <label for="ckh-daterange">Check in / Check Out Date</label>
        <input
          type="text"
          id="ckh-daterange"
          class="ckh-input ${this.options.customClasses?.input || ''}"
          readonly
        />
      </div>

      <!-- Guests Dropdown -->
      <div class="ckh-form-group flex-1 relative">
        <label>Guests & Rooms</label>
        <div
          id="ckh-guests-toggle"
          class="ckh-input cursor-pointer bg-white border rounded px-3 py-2"
        >
          <span id="ckh-guests-summary">1 Adult, 0 Children, 1 Room</span>
        </div>

        <!-- Dropdown Panel -->
        <div
          id="ckh-guests-dropdown"
          class="absolute z-10 mt-2 w-full bg-white border rounded-lg shadow-lg p-4 space-y-3 hidden"
        >
          <!-- Adults -->
          <div class="flex items-center justify-between">
            <span>Adults</span>
            <div class="flex items-center gap-2">
              <button type="button" id="ckh-adults-minus" class="px-2 py-1 border rounded">-</button>
              <span id="ckh-adults-count">1</span>
              <button type="button" id="ckh-adults-plus" class="px-2 py-1 border rounded">+</button>
            </div>
          </div>

          <!-- Children -->
          <div class="flex items-center justify-between">
            <span>Children</span>
            <div class="flex items-center gap-2">
              <button type="button" id="ckh-children-minus" class="px-2 py-1 border rounded">-</button>
              <span id="ckh-children-count">0</span>
              <button type="button" id="ckh-children-plus" class="px-2 py-1 border rounded">+</button>
            </div>
          </div>

          <!-- Rooms -->
          <div class="flex items-center justify-between">
            <span>Rooms</span>
            <div class="flex items-center gap-2">
              <button type="button" id="ckh-rooms-minus" class="px-2 py-1 border rounded">-</button>
              <span id="ckh-rooms-count">1</span>
              <button type="button" id="ckh-rooms-plus" class="px-2 py-1 border rounded">+</button>
            </div>
          </div>

          <!-- Pets -->
          <hr class="my-2 border-gray-200" />
          <div class="flex items-center justify-between">
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" id="ckh-pets" class="w-4 h-4 text-blue-600 border-gray-300 rounded" />
              <span>Pet friendly</span>
            </label>
          </div>
        </div>
      </div>
    </div>

    <!-- Search -->
    <div class="ckh-form-actions mt-4">
      <button
        type="button"
        id="ckh-search-btn"
        class="ckh-btn w-full rounded-lg ckh-btn-primary ${this.options.customClasses?.button || ''}"
      >
        Search
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
    const dateRangeInput = document.getElementById('ckh-daterange') as HTMLInputElement;

    // Search button
    searchBtn?.addEventListener('click', () => this.handleSearch());

    // Litepicker
    if (dateRangeInput) {
      const picker = new Litepicker({
        element: dateRangeInput,
        singleMode: false,
        format: 'DD/MM/YYYY',
        autoApply: false,
        mobileFriendly: true,
        resetButton: true,
        numberOfMonths: window.innerWidth < 640 ? 1 : 2,
        numberOfColumns: window.innerWidth < 640 ? 1 : 2,
      });

      picker.on('selected', (start, end) => {
        const displayFormat = 'DD/MM/YYYY';

        dateRangeInput.dataset.checkin = start.format(displayFormat);
        dateRangeInput.dataset.checkout = end.format(displayFormat);

        dateRangeInput.value = `${start.format(displayFormat)} - ${end.format(displayFormat)}`;
      });


      // Guests dropdown toggle
      const toggle = document.getElementById('ckh-guests-toggle');
      const dropdown = document.getElementById('ckh-guests-dropdown');
      const summary = document.getElementById('ckh-guests-summary')!;

      let adults = 1, children = 0, rooms = 1;

      const updateSummary = () => {
        summary.textContent = `${adults} Adult${adults > 1 ? 's' : ''}, ${children} Child${children > 1 ? 'ren' : ''}, ${rooms} Room${rooms > 1 ? 's' : ''}`;
      };

      toggle?.addEventListener('click', () => {
        dropdown?.classList.toggle('hidden');
      });

      document.addEventListener('click', (e) => {
        if (!dropdown?.contains(e.target as Node) && !toggle?.contains(e.target as Node)) {
          dropdown?.classList.add('hidden');
        }
      });

      // Counter logic
      const setCounter = (idMinus: string, idPlus: string, get: () => number, set: (val: number) => void, min: number) => {
        const minus = document.getElementById(idMinus);
        const plus = document.getElementById(idPlus);
        const el = document.getElementById(idMinus.replace('-minus', '-count'))!;

        minus?.addEventListener('click', () => {
          const val = Math.max(min, get() - 1);
          set(val);
          el.textContent = val.toString();
          updateSummary();
        });

        plus?.addEventListener('click', () => {
          const val = get() + 1;
          set(val);
          el.textContent = val.toString();
          updateSummary();
        });
      };

      setCounter('ckh-adults-minus', 'ckh-adults-plus', () => adults, (v) => adults = v, 1);
      setCounter('ckh-children-minus', 'ckh-children-plus', () => children, (v) => children = v, 0);
      setCounter('ckh-rooms-minus', 'ckh-rooms-plus', () => rooms, (v) => rooms = v, 1);

      updateSummary();
    }

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
  const dateRangeInput = document.getElementById('ckh-daterange') as HTMLInputElement;
  const adults = parseInt(document.getElementById('ckh-adults-count')?.textContent || '1');
  const children = parseInt(document.getElementById('ckh-children-count')?.textContent || '0');
  const rooms = parseInt(document.getElementById('ckh-rooms-count')?.textContent || '1');
  const pets = (document.getElementById('ckh-pets') as HTMLInputElement)?.checked || false;

  if (!dateRangeInput.dataset.checkin || !dateRangeInput.dataset.checkout) {
    throw new Error('Please select check-in and check-out dates');
  }

  return {
    checkIn: new Date(dateRangeInput.dataset.checkin),
    checkOut: new Date(dateRangeInput.dataset.checkout),
    guests: adults + children,
    rooms,
    propertyId: pets ? 'pet-friendly' : undefined
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