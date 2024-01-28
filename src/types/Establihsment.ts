export type Establishment = {
  id?: string;
  name: string;
  cnpj: string;
  address: string;
  phone: string;
  motorcycleSpaces: number;
  carSpaces: number;
  createdAt?: Date;
  updatedAt?: Date;
  occupiedCarSpaces: number;
  occupiedMotorcycleSpaces: number;
};