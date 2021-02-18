export class Address {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  apartmentNumber: string;
  zipCode: string;
  city: string;
  description: string;
  contactType: string;
}

enum ContactType {
  DELIVERY = 'DELIVERY',
  INVOICE = 'INVOICE',
}
