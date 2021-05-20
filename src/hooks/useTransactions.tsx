import { createContext, useEffect, useState, ReactNode, useContext } from 'react'
import { api } from '../services/api';

const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData);

interface Transaction {
    id: number,
    title: string,
    type: string,
    amount: number,
    createdAt: string,
    category: string,
}

interface TransactionForm {
    title: string,
    type: string,
    amount: number,
    category: string,
}

interface TransactionsProviderProps{
    children: ReactNode;
}

interface TransactionsContextData {
    transactions: Transaction[],
    createTransaction: (transaction: TransactionForm) => Promise<void>;
}

export function TransactionsProvider({ children }: TransactionsProviderProps){
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    
    useEffect(() => {
        api.get('transactions')
            .then(response => setTransactions(response.data.transactions)) 
    }, []);

    async function createTransaction(transaction: TransactionForm){
       const response = await api.post('/transactions', {
           ...transaction,
           createdAt: new Date()
       }); 
       const transactionStored = response.data.transaction;

       setTransactions([
           ...transactions,
           transactionStored
       ])
    }


    return(
        <TransactionsContext.Provider value={{transactions, createTransaction}}>
            {children}
        </TransactionsContext.Provider>
    )
}

export function useTransactions() {
    const context = useContext(TransactionsContext);
    return context;
} 