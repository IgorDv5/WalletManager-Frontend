import { TransactionType } from "../enums/transaction-type.enum"; 


export interface Transaction {

  id?: number;
  amount: number;
  description: string;
  date: string;
  type: TransactionType;
  deletedAt?: string;
  categoryId: number;
  userId: number;

}