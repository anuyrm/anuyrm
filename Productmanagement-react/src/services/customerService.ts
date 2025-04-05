// src/services/customerService.ts
import axios from 'axios';
import { Customer } from '../types';

const BASE_URL = 'http://localhost:8080/customer';

export const getCustomers = async (): Promise<Customer[]> => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

export const saveCustomer = async (customer: Customer): Promise<void> => {
  if (customer.id) {
    await axios.put(`${BASE_URL}/${customer.id}`, customer);
  } else {
    await axios.post(BASE_URL, customer);
  }
};
