export class Address {
  id?: number;
  // lockerName?: string;
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






export enum ContactType {
  DELIVERY = 'DELIVERY',
  INVOICE = 'INVOICE',
  PARCEL = 'PARCEL',
}
