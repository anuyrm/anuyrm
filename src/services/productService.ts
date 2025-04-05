
import axios from 'axios';
import { Product } from '../types';

const BASE_URL = 'http://localhost:8080/product';

export const getProducts = async (): Promise<Product[]> => {
  const res = await axios.get<Product[]>(BASE_URL);
  return res.data;
};

export const saveProduct = async (product: Product): Promise<void> => {
  if (product.id) {
    await axios.put(`${BASE_URL}/${product.id}`, product);
  } else {
    await axios.post(BASE_URL, product);
  }
};
