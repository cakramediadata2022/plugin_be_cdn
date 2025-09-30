import Litepicker from 'litepicker';
import 'litepicker/dist/css/litepicker.css';
/**
 * CakraHub Booking Engine
 * A versatile booking engine library that can be used in various environments
 */
export class CkhBookingEngine {
    /**
     * Creates a new instance of the CKH Booking Engine
     * @param options Configuration options for the booking engine
     */
    constructor(options) {
        this.container = null;
        this.isInitialized = false;
        this.currentBookingContext = {};
        this.baseUrl = 'https://chsres.com/api/plugin/v1';
        this.options = { ...this.getDefaultOptions(), ...options };
        this.validateOptions();
        this.init();
    }
    /**
     * Get default configuration options
     */
    getDefaultOptions() {
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
            autoSearch: true,
            debug: false
        };
    }
    /**
     * Validate the provided options
     */
    validateOptions() {
        if (!this.options.target) {
            throw new Error('CkhBookingEngine: target option is required');
        }
    }
    /**
     * Initialize the booking engine
     */
    init() {
        try {
            this.setupContainer();
            this.renderBookingForm();
            this.attachEventListeners();
            this.isInitialized = true;
            if (this.options.debug) {
                console.log('CkhBookingEngine initialized successfully');
                console.log('API Key:', this.options.apiKey ? `${this.options.apiKey.substring(0, 8)}...` : 'Not provided');
                console.log('Options:', { ...this.options, apiKey: '[HIDDEN]' });
            }
            // Automatically perform initial search with default dates if enabled
            if (this.options.autoSearch !== false) {
                this.performInitialSearch();
            }
        }
        catch (error) {
            console.error('Failed to initialize CkhBookingEngine:', error);
            if (this.options.callbacks?.onBookingError) {
                this.options.callbacks.onBookingError(error);
            }
        }
    }
    /**
     * Setup the container element
     */
    setupContainer() {
        if (typeof this.options.target === 'string') {
            this.container = document.getElementById(this.options.target);
            if (!this.container) {
                this.container = document.querySelector(this.options.target);
            }
        }
        else {
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
    renderBookingForm() {
        if (!this.container)
            return;
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

<!-- Room Results Container -->
<div id="ckh-room-preview" class="mt-6"></div>

<!-- Booking Form Modal -->
<div id="ckh-booking-modal" class="fixed inset-0 z-50 hidden bg-black bg-opacity-50">
  <div class="flex items-center justify-center min-h-screen p-4">
    <div class="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6 flex flex-col gap-4 w-full max-h-[90vh] overflow-y-auto">
      <!-- Close Button -->
      <div class="flex justify-between items-center mb-2">
        <h2 class="text-xl font-bold text-gray-800">Hotel Booking Form</h2>
        <button id="ckh-close-booking" class="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
      </div>

      <!-- Room Type (readonly) -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <div>
          <label class="text-sm font-medium text-gray-600">Room Type</label>
          <input type="text" id="ckh-booking-room-type" readonly class="w-full border rounded-lg py-2 text-sm outline-none bg-gray-100 cursor-not-allowed" />
        </div>
        <div>
          <label class="text-sm font-medium text-gray-600">Room Price</label>
          <input type="text" id="ckh-booking-room-price" readonly class="w-full border rounded-lg py-2 text-sm outline-none bg-gray-100 cursor-not-allowed" />
        </div>
      </div>

      <!-- Guest Info -->
      <div class="flex flex-col gap-3">
        <div>
          <label class="text-sm font-medium text-gray-600">Full Name</label>
          <input type="text" id="ckh-booking-full-name" placeholder="Enter your name" class="w-full border rounded-lg py-2 text-sm outline-none focus:border-blue-500" />
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="text-sm font-medium text-gray-600">Email Address</label>
            <input type="email" id="ckh-booking-email" placeholder="you@example.com" class="w-full border rounded-lg py-2 text-sm outline-none focus:border-blue-500" />
          </div>
          <div>
            <label class="text-sm font-medium text-gray-600">Phone Number</label>
            <input type="tel" id="ckh-booking-phone" placeholder="+62 812 3456 7890" class="w-full border rounded-lg py-2 text-sm outline-none focus:border-blue-500" />
          </div>
        </div>
      </div>

      <!-- Dates -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <div>
          <label class="text-sm font-medium text-gray-600">Check-In</label>
          <input type="date" id="ckh-booking-checkin" readonly class="w-full border rounded-lg py-2 text-sm outline-none bg-gray-100 cursor-not-allowed" />
        </div>
        <div>
          <label class="text-sm font-medium text-gray-600">Check-Out</label>
          <input type="date" id="ckh-booking-checkout" readonly class="w-full border rounded-lg py-2 text-sm outline-none bg-gray-100 cursor-not-allowed" />
        </div>
      </div>

      <!-- Guests -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <div>
          <label class="text-sm font-medium text-gray-600">Adults</label>
          <input type="number" id="ckh-booking-adults" min="1" readonly class="w-full border rounded-lg py-2 text-sm outline-none bg-gray-100 cursor-not-allowed" />
        </div>
        <div>
          <label class="text-sm font-medium text-gray-600">Children</label>
          <input type="number" id="ckh-booking-children" min="0" readonly class="w-full border rounded-lg py-2 text-sm outline-none bg-gray-100 cursor-not-allowed" />
        </div>
      </div>

      <!-- Address -->
      <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="text-sm font-medium text-gray-600">Country</label>
          <input type="text" id="ckh-booking-country" placeholder="Enter country" class="w-full border rounded-lg py-2 text-sm outline-none focus:border-blue-500" />
        </div>
        <div>
          <label class="text-sm font-medium text-gray-600">State</label>
          <input type="text" id="ckh-booking-state" placeholder="Enter state" class="w-full border rounded-lg py-2 text-sm outline-none focus:border-blue-500" />
        </div>
        <div>
          <label class="text-sm font-medium text-gray-600">City</label>
          <input type="text" id="ckh-booking-city" placeholder="Enter city" class="w-full border rounded-lg py-2 text-sm outline-none focus:border-blue-500" />
        </div>
        <div>
          <label class="text-sm font-medium text-gray-600">Post Code</label>
          <input type="text" id="ckh-booking-postcode" placeholder="Enter post code" class="w-full border rounded-lg py-2 text-sm outline-none focus:border-blue-500" />
        </div>
      </div>

      <!-- Submit -->
      <button id="ckh-submit-booking" class="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all mb-4">Book Now</button>
    </div>
  </div>
</div>

<!-- Payment Modal -->
<div id="ckh-payment-modal" class="fixed inset-0 bg-black bg-opacity-75 z-50 hidden">
  <div class="flex items-center justify-center min-h-screen p-2 md:p-4">
    <div class="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden w-full max-h-[98vh] overflow-y-auto">
      <!-- Header -->
      <div class="flex justify-between items-center p-4 border-b bg-gray-50 sticky top-0 z-10">
        <div>
          <h2 class="text-xl font-bold text-gray-800">Complete Your Payment</h2>
          <p class="text-sm text-gray-600">Booking Code: <span id="ckh-booking-code-display" class="font-mono font-semibold text-blue-600"></span></p>
        </div>
        <button id="ckh-close-payment" class="text-gray-500 hover:text-gray-700 text-2xl font-bold px-2">&times;</button>
      </div>

      <!-- Payment Iframe Container -->
      <div class="relative" style="height: 80vh; min-height: 600px;">
        <iframe id="ckh-payment-iframe" src="about:blank" class="w-full h-full border-0" style="height: 100%; min-height: 600px;" allow="payment" scrolling="yes" frameborder="0" sandbox="allow-same-origin allow-scripts allow-forms allow-top-navigation allow-popups allow-modals"></iframe>
        <div id="ckh-payment-loading" class="absolute inset-0 bg-white flex items-center justify-center">
          <div class="text-center">
            <svg class="animate-spin h-12 w-12 text-blue-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
            <p class="text-gray-600">Loading payment gateway...</p>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="p-4 border-t bg-gray-50 text-center">
        <p class="text-xs text-gray-500">Secure payment powered by Midtrans. Your payment information is encrypted and secure.</p>
      </div>
    </div>
  </div>
</div>

  `;
        this.container.innerHTML = html;
    }
    /**
     * Set CSS custom properties for dynamic theming
     */
    setCSSCustomProperties() {
        if (!this.container)
            return;
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
    attachEventListeners() {
        const searchBtn = document.getElementById('ckh-search-btn');
        const dateRangeInput = document.getElementById('ckh-daterange');
        // Search button
        searchBtn?.addEventListener('click', () => this.handleSearch());
        // Litepicker
        if (dateRangeInput) {
            // Set default dates (today and tomorrow)
            const today = new Date();
            const tomorrow = new Date();
            tomorrow.setDate(today.getDate() + 1);
            const picker = new Litepicker({
                element: dateRangeInput,
                singleMode: false,
                format: 'DD/MM/YYYY',
                autoApply: false,
                mobileFriendly: true,
                resetButton: true,
                numberOfMonths: window.innerWidth < 640 ? 1 : 2,
                numberOfColumns: window.innerWidth < 640 ? 1 : 2,
                startDate: today,
                endDate: tomorrow,
            });
            // Set initial dataset values in ISO format
            const todayFormatted = today.toISOString().split('T')[0];
            const tomorrowFormatted = tomorrow.toISOString().split('T')[0];
            dateRangeInput.dataset.checkin = todayFormatted;
            dateRangeInput.dataset.checkout = tomorrowFormatted;
            dateRangeInput.value = `${today.toLocaleDateString('en-GB')} - ${tomorrow.toLocaleDateString('en-GB')}`;
            picker.on('selected', (start, end) => {
                const displayFormat = 'DD/MM/YYYY';
                const isoFormat = 'YYYY-MM-DD';
                // Store dates in ISO format for reliable parsing
                dateRangeInput.dataset.checkin = start.format(isoFormat);
                dateRangeInput.dataset.checkout = end.format(isoFormat);
                // Display in user-friendly format
                dateRangeInput.value = `${start.format(displayFormat)} - ${end.format(displayFormat)}`;
            });
            // Guests dropdown toggle
            const toggle = document.getElementById('ckh-guests-toggle');
            const dropdown = document.getElementById('ckh-guests-dropdown');
            const summary = document.getElementById('ckh-guests-summary');
            let adults = 1, children = 0, rooms = 1;
            const updateSummary = () => {
                summary.textContent = `${adults} Adult${adults > 1 ? 's' : ''}, ${children} Child${children > 1 ? 'ren' : ''}, ${rooms} Room${rooms > 1 ? 's' : ''}`;
            };
            toggle?.addEventListener('click', () => {
                dropdown?.classList.toggle('hidden');
            });
            document.addEventListener('click', (e) => {
                if (!dropdown?.contains(e.target) && !toggle?.contains(e.target)) {
                    dropdown?.classList.add('hidden');
                }
            });
            // Counter logic
            const setCounter = (idMinus, idPlus, get, set, min) => {
                const minus = document.getElementById(idMinus);
                const plus = document.getElementById(idPlus);
                const el = document.getElementById(idMinus.replace('-minus', '-count'));
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
        // Booking modal event listeners
        const closeBookingBtn = document.getElementById('ckh-close-booking');
        const submitBookingBtn = document.getElementById('ckh-submit-booking');
        const closePaymentBtn = document.getElementById('ckh-close-payment');
        closeBookingBtn?.addEventListener('click', () => this.closeBookingForm());
        submitBookingBtn?.addEventListener('click', () => this.submitBooking());
        closePaymentBtn?.addEventListener('click', () => this.closePaymentModal());
        // Close modals when clicking outside
        document.addEventListener('click', (e) => {
            const bookingModal = document.getElementById('ckh-booking-modal');
            const paymentModal = document.getElementById('ckh-payment-modal');
            if (e.target === bookingModal) {
                this.closeBookingForm();
            }
            if (e.target === paymentModal) {
                this.closePaymentModal();
            }
        });
        // Close modals with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeBookingForm();
                this.closePaymentModal();
            }
        });
        // Payment iframe loading handler
        const paymentIframe = document.getElementById('ckh-payment-iframe');
        const loadingOverlay = document.getElementById('ckh-payment-loading');
        paymentIframe?.addEventListener('load', function () {
            if (this.src !== 'about:blank' && loadingOverlay) {
                loadingOverlay.style.display = 'none';
            }
            else if (loadingOverlay) {
                loadingOverlay.style.display = 'flex';
            }
        });
        // Expose global functions for room card interactions
        window.ckhBookingEngine = this;
    }
    /**
     * Handle search button click
     */
    handleSearch() {
        try {
            const bookingData = this.getBookingData();
            if (this.options.callbacks?.onBookingStart) {
                this.options.callbacks.onBookingStart();
            }
            // Format dates for API
            const startDate = bookingData.checkIn.toISOString().split('T')[0];
            const endDate = bookingData.checkOut.toISOString().split('T')[0];
            const adults = parseInt(document.getElementById('ckh-adults-count')?.textContent || '1');
            const children = parseInt(document.getElementById('ckh-children-count')?.textContent || '0');
            // Request room availability
            this.requestToBookingEngine(startDate, endDate, adults, children);
        }
        catch (error) {
            console.error('Booking search failed:', error);
            if (this.options.callbacks?.onBookingError) {
                this.options.callbacks.onBookingError(error);
            }
        }
    }
    /**
     * Perform initial search automatically with default dates
     */
    performInitialSearch() {
        try {
            // Use a small delay to ensure the DOM elements are fully rendered
            setTimeout(() => {
                if (this.options.debug) {
                    console.log('Performing initial search with default dates...');
                }
                // Get default dates (today and tomorrow) - same as set in attachEventListeners
                const today = new Date();
                const tomorrow = new Date();
                tomorrow.setDate(today.getDate() + 1);
                const startDate = today.toISOString().split('T')[0];
                const endDate = tomorrow.toISOString().split('T')[0];
                const adults = 1;
                const children = 0;
                // Request room availability with default parameters
                this.requestToBookingEngine(startDate, endDate, adults, children);
                if (this.options.callbacks?.onBookingStart) {
                    this.options.callbacks.onBookingStart();
                }
            }, 100);
        }
        catch (error) {
            console.error('Initial search failed:', error);
            if (this.options.callbacks?.onBookingError) {
                this.options.callbacks.onBookingError(error);
            }
        }
    }
    /**
     * Get current booking data from form
     */
    getBookingData() {
        const dateRangeInput = document.getElementById('ckh-daterange');
        const adults = parseInt(document.getElementById('ckh-adults-count')?.textContent || '1');
        const children = parseInt(document.getElementById('ckh-children-count')?.textContent || '0');
        const rooms = parseInt(document.getElementById('ckh-rooms-count')?.textContent || '1');
        const pets = document.getElementById('ckh-pets')?.checked || false;
        if (!dateRangeInput.dataset.checkin || !dateRangeInput.dataset.checkout) {
            throw new Error('Please select check-in and check-out dates');
        }
        // Parse dates more reliably
        if (this.options.debug) {
            console.log('Date parsing debug:', {
                checkinRaw: dateRangeInput.dataset.checkin,
                checkoutRaw: dateRangeInput.dataset.checkout,
                inputValue: dateRangeInput.value
            });
        }
        const checkInDate = new Date(dateRangeInput.dataset.checkin);
        const checkOutDate = new Date(dateRangeInput.dataset.checkout);
        // Validate that dates are valid
        if (isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime())) {
            console.error('Date parsing failed:', {
                checkinRaw: dateRangeInput.dataset.checkin,
                checkoutRaw: dateRangeInput.dataset.checkout,
                checkinParsed: checkInDate,
                checkoutParsed: checkOutDate
            });
            throw new Error('Invalid date format. Please select valid dates.');
        }
        return {
            checkIn: checkInDate,
            checkOut: checkOutDate,
            guests: adults + children,
            rooms,
            propertyId: pets ? 'pet-friendly' : undefined
        };
    }
    /**
     * Request room availability from the booking engine API
     */
    async requestToBookingEngine(startDate, endDate, adults, children) {
        if (!this.options.apiKey) {
            this.displayDemoRooms();
            return;
        }
        try {
            if (this.options.debug) {
                console.log('Requesting room availability:', { startDate, endDate, adults, children });
            }
            const headers = new Headers();
            headers.append('token', this.options.apiKey);
            headers.append('Origin', window.location.origin);
            const params = new URLSearchParams({
                'StartDate': startDate,
                'EndDate': endDate,
                'Adults': adults.toString(),
                'Children': children.toString()
            });
            const apiUrl = `${this.baseUrl}/roomavailability?${params.toString()}`;
            if (this.options.debug) {
                console.log('API Request URL:', apiUrl);
            }
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: headers,
                redirect: 'follow'
            });
            const data = await response.json();
            if (this.options.debug) {
                console.log('API Response:', data);
            }
            this.displayRooms(data);
        }
        catch (error) {
            console.error('API Error:', error);
            this.displayError('Error loading rooms. Please try again.');
            if (this.options.callbacks?.onBookingError) {
                this.options.callbacks.onBookingError(error);
            }
        }
    }
    /**
     * Display demo rooms when no API key is provided
     */
    displayDemoRooms() {
        const demoRooms = [
            {
                room_code: 'DLX',
                room_name: 'Deluxe Room',
                room_description: 'Spacious deluxe room with city view and modern amenities.',
                room_max_adult: 2,
                room_max_children: 1,
                room_bed: 1,
                room_size: 35,
                number_of_rooms: 5,
                image_details: [{ image_name: 'https://picsum.photos/400/300?random=1' }],
                rate_details: [
                    {
                        rate_code: 'STDRRO',
                        rate_name: 'Standard Rate - Room Only',
                        rate_description: 'Best flexible rate without breakfast',
                        rate_price: 850000,
                        is_close: 0
                    },
                    {
                        rate_code: 'STDBB',
                        rate_name: 'Standard Rate with Breakfast',
                        rate_description: 'Includes daily breakfast for 2 persons',
                        rate_price: 950000,
                        is_close: 0
                    }
                ]
            },
            {
                room_code: 'SUP',
                room_name: 'Superior Room',
                room_description: 'Elegant superior room with premium facilities and garden view.',
                room_max_adult: 3,
                room_max_children: 2,
                room_bed: 2,
                room_size: 42,
                number_of_rooms: 3,
                image_details: [{ image_name: 'https://picsum.photos/400/300?random=2' }],
                rate_details: [
                    {
                        rate_code: 'SUPRO',
                        rate_name: 'Superior Rate - Room Only',
                        rate_description: 'Premium room without meals',
                        rate_price: 1200000,
                        is_close: 0
                    },
                    {
                        rate_code: 'SUPBB',
                        rate_name: 'Superior with Breakfast',
                        rate_description: 'Includes breakfast and welcome drink',
                        rate_price: 1350000,
                        is_close: 0
                    }
                ]
            }
        ];
        const demoResponse = {
            StatusCode: 0,
            Result: demoRooms
        };
        this.displayRooms(demoResponse);
    }
    /**
     * Display rooms in the UI
     */
    displayRooms(data) {
        const roomPreview = document.getElementById('ckh-room-preview');
        if (!roomPreview)
            return;
        if (data.StatusCode === 0 && data.Result && data.Result.length > 0) {
            // Clear existing content
            roomPreview.innerHTML = '';
            // Loop through rooms and create cards
            data.Result.forEach(room => {
                const roomCard = this.createRoomCard(room);
                roomPreview.appendChild(roomCard);
            });
        }
        else {
            roomPreview.innerHTML = '<div class="text-center py-8 text-gray-500">No rooms available for the selected dates.</div>';
        }
    }
    /**
     * Create a room card element
     */
    createRoomCard(room) {
        const roomDiv = document.createElement('div');
        const imageUrl = room.image_details && room.image_details[0] ? room.image_details[0].image_name : 'https://picsum.photos/400/300';
        // Find the cheapest rate
        const rates = room.rate_details || [];
        const availableRates = rates.filter(rate => rate.is_close === 0);
        const cheapestRate = availableRates.length > 0 ?
            availableRates.reduce((min, rate) => rate.rate_price < min.rate_price ? rate : min) : null;
        // Generate unique ID for this room card
        const roomId = `ckh-room-${room.room_code}-${Math.random().toString(36).substr(2, 9)}`;
        roomDiv.innerHTML = `
      <div id="${roomId}" class="flex flex-col mb-3 md:flex-row max-w-4xl mx-auto rounded-2xl shadow-lg overflow-hidden bg-white cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1" data-all-rates='${JSON.stringify(availableRates)}' data-current-rate='${cheapestRate ? cheapestRate.rate_code : ''}' data-room-code='${room.room_code}'>
        <!-- Image -->
        <img src="${imageUrl}" alt="${room.room_name}" class="w-full md:w-72 h-64 md:h-auto object-cover" />

        <!-- Content -->
        <div class="flex flex-col justify-between p-4 flex-1">
          <!-- Title -->
          <h2 class="text-lg md:text-xl font-semibold leading-snug">${room.room_name}</h2>

          <!-- Rating -->
          <div class="flex items-center gap-2 mt-1">
            <div class="text-yellow-500 text-sm">★★★★★</div>
            <span class="text-xs md:text-sm text-gray-500">Available Rooms: ${room.number_of_rooms}</span>
          </div>

          <!-- Room Details -->
          <p class="text-xs md:text-sm text-gray-500">Max Adults: ${room.room_max_adult} | Max Children: ${room.room_max_children}</p>

          <!-- Categories -->
          <div class="flex flex-wrap gap-1 mt-1">
            <span class="px-2 py-0.5 rounded-full border-solid border-gray-300 text-[11px] md:text-xs">${room.room_bed} Bed${room.room_bed > 1 ? 's' : ''}</span>
            <span class="px-2 py-0.5 rounded-full border-solid border-gray-300 text-[11px] md:text-xs">Room Size: ${room.room_size}sqm</span>
            <span class="px-2 py-0.5 rounded-full border-solid border-gray-300 text-[11px] md:text-xs">${room.room_code}</span>
          </div>

          <!-- Description -->
          <p class="text-xs md:text-sm text-gray-600 mt-2 line-clamp-2">${room.room_description || 'Comfortable room with excellent amenities.'}</p>

          <!-- Rate Selection -->
          <div class="mt-3">
            ${cheapestRate ? `
            <!-- Cheapest Rate Display -->
            <div class="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
              <div>
                <p class="text-sm font-medium text-gray-800">${cheapestRate.rate_name}</p>
                <p class="text-xs text-gray-500">${cheapestRate.rate_description}</p>
              </div>
              <div class="text-right">
                <p class="text-lg font-bold text-blue-600">IDR ${cheapestRate.rate_price.toLocaleString()}</p>
                <p class="text-xs text-gray-500">per night</p>
              </div>
            </div>

            <!-- Show All Rates Button -->
            ${availableRates.length > 1 ? `
            <button onclick="window.ckhBookingEngine.toggleRates('${roomId}')" class="w-full mt-2 text-sm text-blue-600 hover:text-blue-800 flex items-center justify-center gap-1">
              <span>View ${availableRates.length - 1} more rate${availableRates.length > 2 ? 's' : ''}</span>
              <svg class="w-4 h-4 transition-transform" id="${roomId}-arrow" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <!-- All Rates Dropdown -->
            <div id="${roomId}-rates" class="hidden mt-2 space-y-2">
              ${availableRates.slice(1).map(rate => `
                <div class="flex items-center justify-between p-2 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer" onclick="window.ckhBookingEngine.selectRate('${roomId}', '${rate.rate_code}', '${rate.rate_name}', ${rate.rate_price}, '${rate.rate_description}')">
                  <div>
                    <p class="text-sm font-medium text-gray-800">${rate.rate_name}</p>
                    <p class="text-xs text-gray-500">${rate.rate_description}</p>
                  </div>
                  <div class="text-right">
                    <p class="text-lg font-bold text-gray-800">IDR ${rate.rate_price.toLocaleString()}</p>
                    <p class="text-xs text-gray-500">per night</p>
                  </div>
                </div>
              `).join('')}
            </div>
            ` : ''}
            ` : `
            <div class="p-2 bg-red-50 rounded-lg">
              <p class="text-sm text-red-600">No rates available</p>
            </div>
            `}
          </div>

          <!-- Book Now Button -->
          <div class="mt-3">
            <button onclick="window.ckhBookingEngine.openBookingForm('${roomId}', '${room.room_name}', '${cheapestRate ? cheapestRate.rate_name : ''}', '${cheapestRate ? cheapestRate.rate_price : 0}')" class="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors" ${!cheapestRate ? 'disabled' : ''}>
              ${cheapestRate ? 'Book Now' : 'Not Available'}
            </button>
          </div>
        </div>
      </div>
    `;
        return roomDiv;
    }
    /**
     * Display error message
     */
    displayError(message) {
        const roomPreview = document.getElementById('ckh-room-preview');
        if (roomPreview) {
            roomPreview.innerHTML = `<div class="text-center py-8 text-red-500">${message}</div>`;
        }
    }
    /**
     * Toggle rates dropdown for a room
     */
    toggleRates(roomId) {
        const ratesDiv = document.getElementById(roomId + '-rates');
        const arrow = document.getElementById(roomId + '-arrow');
        if (ratesDiv && arrow) {
            if (ratesDiv.classList.contains('hidden')) {
                ratesDiv.classList.remove('hidden');
                arrow.style.transform = 'rotate(180deg)';
            }
            else {
                ratesDiv.classList.add('hidden');
                arrow.style.transform = 'rotate(0deg)';
            }
        }
    }
    /**
     * Select a specific rate for a room
     */
    selectRate(roomId, rateCode, rateName, ratePrice, rateDescription) {
        const roomCard = document.getElementById(roomId);
        if (!roomCard) {
            console.error('Room card not found for ID:', roomId);
            return;
        }
        const mainRateDisplay = roomCard.querySelector('.bg-gray-50');
        if (!mainRateDisplay) {
            console.error('Rate display not found in room card:', roomId);
            return;
        }
        // Update the main rate display
        mainRateDisplay.innerHTML = `
      <div>
        <p class="text-sm font-medium text-gray-800">${rateName}</p>
        <p class="text-xs text-gray-500">${rateDescription}</p>
      </div>
      <div class="text-right">
        <p class="text-lg font-bold text-blue-600">IDR ${ratePrice.toLocaleString()}</p>
        <p class="text-xs text-gray-500">per night</p>
      </div>
    `;
        // Get all available rates and filter out the selected one
        const allRates = JSON.parse(roomCard.dataset.allRates || '[]');
        const otherRates = allRates.filter((rate) => rate.rate_code !== rateCode);
        // Update the dropdown content
        const ratesDropdown = document.getElementById(roomId + '-rates');
        if (ratesDropdown) {
            ratesDropdown.innerHTML = otherRates.map((rate) => `
        <div class="flex items-center justify-between p-2 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer" onclick="window.ckhBookingEngine.selectRate('${roomId}', '${rate.rate_code}', '${rate.rate_name}', ${rate.rate_price}, '${rate.rate_description}')">
          <div>
            <p class="text-sm font-medium text-gray-800">${rate.rate_name}</p>
            <p class="text-xs text-gray-500">${rate.rate_description}</p>
          </div>
          <div class="text-right">
            <p class="text-lg font-bold text-gray-800">IDR ${rate.rate_price.toLocaleString()}</p>
            <p class="text-xs text-gray-500">per night</p>
          </div>
        </div>
      `).join('');
        }
        // Update the "View more rates" text
        const viewMoreButton = roomCard.querySelector(`[onclick*="toggleRates('${roomId}')"] span`);
        const remainingCount = otherRates.length;
        if (remainingCount > 0 && viewMoreButton) {
            viewMoreButton.textContent = `View ${remainingCount} more rate${remainingCount > 1 ? 's' : ''}`;
        }
        // Update the current rate in dataset
        roomCard.dataset.currentRate = rateCode;
        // Hide the rates dropdown
        this.toggleRates(roomId);
        if (this.options.debug) {
            console.log('Selected rate:', { roomId, rateCode, rateName, ratePrice, rateDescription });
        }
    }
    /**
     * Open booking form modal
     */
    openBookingForm(roomId, roomName, rateName, ratePrice) {
        const adults = document.getElementById('ckh-adults-count')?.textContent || '1';
        const children = document.getElementById('ckh-children-count')?.textContent || '0';
        // Get selected rate data from room card
        const roomCard = document.getElementById(roomId);
        let selectedRate = rateName;
        let selectedPrice = ratePrice;
        let roomCode = '';
        let rateCode = '';
        if (roomCard) {
            const currentRateCode = roomCard.dataset.currentRate;
            const allRates = JSON.parse(roomCard.dataset.allRates || '[]');
            const currentRate = allRates.find((rate) => rate.rate_code === currentRateCode);
            if (currentRate) {
                selectedRate = currentRate.rate_name;
                selectedPrice = currentRate.rate_price.toString();
                rateCode = currentRate.rate_code;
            }
            roomCode = roomCard.dataset.roomCode || '';
        }
        // Store booking context for submission
        this.currentBookingContext = {
            roomId: roomId,
            roomCode: roomCode,
            rateCode: rateCode,
            roomName: roomName,
            rateName: selectedRate,
            ratePrice: parseFloat(selectedPrice)
        };
        // Get the ISO format dates from the date range input
        const dateRangeInput = document.getElementById('ckh-daterange');
        const checkInISO = dateRangeInput?.dataset.checkin || '';
        const checkOutISO = dateRangeInput?.dataset.checkout || '';
        // Populate form fields
        document.getElementById('ckh-booking-room-type').value = roomName + ' - ' + selectedRate;
        document.getElementById('ckh-booking-room-price').value = 'IDR ' + parseInt(selectedPrice).toLocaleString() + ' / night';
        document.getElementById('ckh-booking-checkin').value = checkInISO;
        document.getElementById('ckh-booking-checkout').value = checkOutISO;
        document.getElementById('ckh-booking-adults').value = adults;
        document.getElementById('ckh-booking-children').value = children;
        // Show modal
        const modal = document.getElementById('ckh-booking-modal');
        if (modal) {
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    }
    /**
     * Close booking form modal
     */
    closeBookingForm() {
        const modal = document.getElementById('ckh-booking-modal');
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    }
    /**
     * Submit booking form
     */
    async submitBooking() {
        // Get form data
        const formData = {
            fullName: document.getElementById('ckh-booking-full-name').value,
            email: document.getElementById('ckh-booking-email').value,
            phone: document.getElementById('ckh-booking-phone').value,
            country: document.getElementById('ckh-booking-country').value,
            state: document.getElementById('ckh-booking-state').value,
            city: document.getElementById('ckh-booking-city').value,
            postCode: document.getElementById('ckh-booking-postcode').value,
            checkIn: document.getElementById('ckh-booking-checkin').value,
            checkOut: document.getElementById('ckh-booking-checkout').value,
            adults: parseInt(document.getElementById('ckh-booking-adults').value),
            children: parseInt(document.getElementById('ckh-booking-children').value),
            roomCode: this.currentBookingContext.roomCode || 'DLX',
            rateCode: this.currentBookingContext.rateCode || 'STDRRO',
            roomPrice: this.currentBookingContext.ratePrice || 0
        };
        // Basic validation
        if (!formData.fullName || !formData.email || !formData.phone) {
            alert('Please fill in all required fields (Name, Email, Phone)');
            return;
        }
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('Please enter a valid email address');
            return;
        }
        if (!this.options.apiKey) {
            // Demo mode
            setTimeout(() => {
                this.closeBookingForm();
                alert(`Demo Booking Submitted!\n\nRoom: ${this.currentBookingContext.roomName}\nGuest: ${formData.fullName}\nEmail: ${formData.email}\n\nNote: Add API key for real booking processing.`);
            }, 1000);
            return;
        }
        const submitButton = document.getElementById('ckh-submit-booking');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'Processing...';
        submitButton.disabled = true;
        try {
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('token', this.options.apiKey);
            const bookingPayload = {
                booking_form: {
                    room_code: formData.roomCode,
                    rate_code: formData.rateCode,
                    room_price: formData.roomPrice,
                    arrival_date: formData.checkIn,
                    arrival_time: '14:00',
                    departure_date: formData.checkOut,
                    guest_detail: {
                        name: formData.fullName,
                        phone: formData.phone,
                        email: formData.email,
                        address: {
                            area: formData.city,
                            country: formData.country,
                            city: formData.city,
                            state: formData.state,
                            postCode: formData.postCode
                        }
                    },
                    guests: formData.adults,
                    rooms: 1
                },
                payment_info: {
                    redirect_url: this.options.redirectUrl || 'https://cakrasoft.net/confirmation-payment',
                    send_url_to_email: true
                }
            };
            if (this.options.debug) {
                console.log('Booking payload:', bookingPayload);
            }
            const response = await fetch(`${this.baseUrl}/createbooking`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(bookingPayload),
                redirect: 'follow'
            });
            const result = await response.json();
            if (this.options.debug) {
                console.log('Booking API Response:', result);
            }
            if (result.StatusCode === 0 && result.Result && result.Result.payment_url && result.Result.payment_url.redirect_url) {
                // Success - show payment iframe
                const bookingCode = result.Result.booking_code;
                const paymentUrl = result.Result.payment_url.redirect_url;
                if (this.options.debug) {
                    console.log('Booking successful:', {
                        bookingCode: bookingCode,
                        paymentId: result.Result.payment_id,
                        paymentToken: result.Result.payment_token,
                        paymentUrl: paymentUrl
                    });
                }
                // Close booking form and show payment modal
                this.closeBookingForm();
                this.openPaymentModal(paymentUrl, bookingCode);
                // Reset form
                this.resetBookingForm();
                if (this.options.callbacks?.onBookingComplete) {
                    this.options.callbacks.onBookingComplete({
                        ...formData,
                        checkIn: new Date(formData.checkIn),
                        checkOut: new Date(formData.checkOut),
                        guests: formData.adults + formData.children,
                        rooms: 1,
                        bookingCode: bookingCode,
                        paymentUrl: paymentUrl
                    });
                }
            }
            else {
                alert('Booking submission failed. Please try again or contact support.');
                console.error('Booking failed:', result);
            }
        }
        catch (error) {
            console.error('Booking API Error:', error);
            alert('An error occurred while submitting your booking. Please try again.');
            if (this.options.callbacks?.onBookingError) {
                this.options.callbacks.onBookingError(error);
            }
        }
        finally {
            // Restore button state
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        }
    }
    /**
     * Reset booking form fields
     */
    resetBookingForm() {
        document.getElementById('ckh-booking-full-name').value = '';
        document.getElementById('ckh-booking-email').value = '';
        document.getElementById('ckh-booking-phone').value = '';
        document.getElementById('ckh-booking-country').value = '';
        document.getElementById('ckh-booking-state').value = '';
        document.getElementById('ckh-booking-city').value = '';
        document.getElementById('ckh-booking-postcode').value = '';
    }
    /**
     * Open payment modal
     */
    openPaymentModal(paymentUrl, bookingCode) {
        // Set the iframe source
        document.getElementById('ckh-payment-iframe').src = paymentUrl;
        // Update booking code display
        const bookingCodeDisplay = document.getElementById('ckh-booking-code-display');
        if (bookingCodeDisplay) {
            bookingCodeDisplay.textContent = bookingCode;
        }
        // Show payment modal
        const modal = document.getElementById('ckh-payment-modal');
        if (modal) {
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    }
    /**
     * Close payment modal
     */
    closePaymentModal() {
        const modal = document.getElementById('ckh-payment-modal');
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
        // Clear iframe source to stop loading
        document.getElementById('ckh-payment-iframe').src = 'about:blank';
    }
    /**
     * Update booking engine options
     */
    updateOptions(newOptions) {
        this.options = { ...this.options, ...newOptions };
        if (this.isInitialized) {
            this.renderBookingForm();
            this.attachEventListeners();
        }
    }
    /**
     * Destroy the booking engine instance
     */
    destroy() {
        if (this.container) {
            this.container.innerHTML = '';
            this.container.classList.remove('ckh-booking-engine');
        }
        this.isInitialized = false;
    }
    /**
     * Get current booking engine version
     */
    static getVersion() {
        return '1.0.0';
    }
}
