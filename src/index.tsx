import { createServer, Model } from "miragejs";
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

createServer({
  models: {
    transaction: Model,
  },

  seeds(server){
    server.db.loadData({
      transactions: [
        { 
          id: 1,
          title: 'Trampo App React',
          type: 'deposit',
          category: 'Dev',
          amount: 6000,
          createdAt: new Date('2021-05-19T22:00:00'),
        },
        { 
          id: 2,
          title: 'Aluguel Carro',
          type: 'withdraw',
          category: 'Transporte',
          amount: 1400,
          createdAt: new Date('2021-05-10T19:14:00'),
        },
      ]
    })
  },

  routes(){
      this.namespace = 'api';
      this.get('/transactions', () => {
        return this.schema.all('transaction');
      });

      this.post('/transactions', (schema, request) => {
        const data = JSON.parse(request.requestBody);
        return schema.create('transaction', data);
      });

  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);