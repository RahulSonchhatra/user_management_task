export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    status: string;
    amount: number;
}

export interface Address {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: Geo
}

export interface Geo {
    lat: string
    lng: string
}

export interface Company {
    name: string
    catchPhrase: string
    bs: string
}
