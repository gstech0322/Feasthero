// remember to keep these from lower values to higher values!
export const validBookingSizes = [
    { target: { name: 'bookingSize', value: 5 }, label: 5 },
    { target: { name: 'bookingSize', value: 6 }, label: 6 },
    { target: { name: 'bookingSize', value: 7 }, label: 7 },
    { target: { name: 'bookingSize', value: 8 }, label: 8 },
    { target: { name: 'bookingSize', value: 9 }, label: 9 },
    { target: { name: 'bookingSize', value: 10 }, label: 10 },
    { target: { name: 'bookingSize', value: 11 }, label: 11 },
    { target: { name: 'bookingSize', value: 12 }, label: 12 },
    { target: { name: 'bookingSize', value: 13 }, label: 13 },
    { target: { name: 'bookingSize', value: 14 }, label: 14 },
    { target: { name: 'bookingSize', value: 15 }, label: 15 },
    { target: { name: 'bookingSize', value: 16 }, label: 16 },
    { target: { name: 'bookingSize', value: 17 }, label: 17 },
    { target: { name: 'bookingSize', value: 18 }, label: 18 },
    { target: { name: 'bookingSize', value: 19 }, label: 19 },
    { target: { name: 'bookingSize', value: 20 }, label: 20 },
]

export const BOOKING_SESSION_NOT_ACTIVE_ERROR = "error: booking session not actuve";

export const selectDropDownStyle = {
    control: (base, state) => ({
        ...base,
        boxShadow: 'none',
        borderRadius: '0.5rem',
        padding: '0.8rem 0',
        border: '1px solid #C7C8C8 !important',

    }),
    singleValue: () => ({
        color: '#495057',
    }),
    dropdownIndicator: (base, state) => ({
        ...base,
        color: '#586168',
    })
}

export const CUSTOMER = "CUSTOMER";
export const ADMIN = "ADMIN";
export const CHEF = "CHEF"