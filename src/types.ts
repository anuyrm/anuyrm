
export interface Product {
    id?: number;
    sku: string;
    description: string;
    price: number;
  }
  export interface Address {
    street?: string;
    city?: string;
    county?: string;
    postcode: string; // still required for validation
  }
  
  export interface Customer {
    id?: number;
    name: string;
    address: Address;
  }
  
  