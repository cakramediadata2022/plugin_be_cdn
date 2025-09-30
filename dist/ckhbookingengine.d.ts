import 'litepicker/dist/css/litepicker.css';
/**
 * Configuration options for the CKH Booking Engine
 */
export interface CkhBookingEngineOptions {
    /** The target element ID or element where the booking engine will be rendered */
    target: string | HTMLElement;
    /** API key for authentication (optional - required only for fetching availability data) */
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
    /** Custom redirect URL for payment success (optional - defaults to https://cakrasoft.net/confirmation-payment) */
    redirectUrl?: string;
    /** Enable automatic search on initialization (default: true) */
    autoSearch?: boolean;
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
 * Room availability interfaces
 */
export interface RoomImage {
    image_name: string;
}
export interface RoomRate {
    rate_code: string;
    rate_name: string;
    rate_description: string;
    rate_price: number;
    is_close: number;
}
export interface Room {
    room_code: string;
    room_name: string;
    room_description: string;
    room_max_adult: number;
    room_max_children: number;
    room_bed: number;
    room_size: number;
    number_of_rooms: number;
    image_details: RoomImage[];
    rate_details: RoomRate[];
}
export interface AvailabilityResponse {
    StatusCode: number;
    Result: Room[];
    Message?: string;
}
/**
 * Booking form data interface
 */
export interface BookingFormData {
    fullName: string;
    email: string;
    phone: string;
    country: string;
    state: string;
    city: string;
    postCode: string;
    roomCode: string;
    rateCode: string;
    roomPrice: number;
    checkIn: string;
    checkOut: string;
    adults: number;
    children: number;
}
/**
 * Booking API response interface
 */
export interface BookingResponse {
    StatusCode: number;
    Result?: {
        booking_code: string;
        payment_id: string;
        payment_token: string;
        payment_url: {
            redirect_url: string;
        };
    };
    Message?: string;
}
/**
 * CakraHub Booking Engine
 * A versatile booking engine library that can be used in various environments
 */
export declare class CkhBookingEngine {
    private options;
    private container;
    private isInitialized;
    private currentBookingContext;
    private readonly baseUrl;
    /**
     * Creates a new instance of the CKH Booking Engine
     * @param options Configuration options for the booking engine
     */
    constructor(options: CkhBookingEngineOptions);
    /**
     * Get default configuration options
     */
    private getDefaultOptions;
    /**
     * Validate the provided options
     */
    private validateOptions;
    /**
     * Initialize the booking engine
     */
    private init;
    /**
     * Setup the container element
     */
    private setupContainer;
    /**
     * Render the booking form HTML
     */
    private renderBookingForm;
    /**
     * Set CSS custom properties for dynamic theming
     */
    private setCSSCustomProperties;
    /**
     * Attach event listeners
     */
    private attachEventListeners;
    /**
     * Handle search button click
     */
    private handleSearch;
    /**
     * Perform initial search automatically with default dates
     */
    private performInitialSearch;
    /**
     * Get current booking data from form
     */
    private getBookingData;
    /**
     * Request room availability from the booking engine API
     */
    private requestToBookingEngine;
    /**
     * Display demo rooms when no API key is provided
     */
    private displayDemoRooms;
    /**
     * Display rooms in the UI
     */
    private displayRooms;
    /**
     * Create a room card element
     */
    private createRoomCard;
    /**
     * Display error message
     */
    private displayError;
    /**
     * Toggle rates dropdown for a room
     */
    toggleRates(roomId: string): void;
    /**
     * Select a specific rate for a room
     */
    selectRate(roomId: string, rateCode: string, rateName: string, ratePrice: number, rateDescription: string): void;
    /**
     * Open booking form modal
     */
    openBookingForm(roomId: string, roomName: string, rateName: string, ratePrice: string): void;
    /**
     * Close booking form modal
     */
    closeBookingForm(): void;
    /**
     * Submit booking form
     */
    submitBooking(): Promise<void>;
    /**
     * Reset booking form fields
     */
    private resetBookingForm;
    /**
     * Open payment modal
     */
    openPaymentModal(paymentUrl: string, bookingCode: string): void;
    /**
     * Close payment modal
     */
    closePaymentModal(): void;
    /**
     * Update booking engine options
     */
    updateOptions(newOptions: Partial<CkhBookingEngineOptions>): void;
    /**
     * Destroy the booking engine instance
     */
    destroy(): void;
    /**
     * Get current booking engine version
     */
    static getVersion(): string;
}
//# sourceMappingURL=ckhbookingengine.d.ts.map