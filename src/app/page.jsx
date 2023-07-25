"use client"
import React, { useState } from 'react';
import axios from 'axios';

function ConversionComponent() {
  const [busdAmount, setBusdAmount] = useState('');
  const [nairaAmount, setNairaAmount] = useState('');

  const handleConversion = () => {
    const apiUrl = 'https://dashboard.encryptbox.co.uk/api/v1/live/getbuyrate';
    const token = '0Coc24mjYhIsJ8bPSZWYKGjVKYHeWBhDjgqIqiFK4Hf9FsLN5HTMpRxej85pMwGx';

    axios.post(apiUrl, {
      amount: busdAmount,
      coin_name: 'busd'
    }, {
      headers: {
        token: token
      },
    })
      .then(response => {
        const { coin } = response.data;
        setNairaAmount(coin);
      })
      .catch(error => {
        console.error('Conversion API Error:', error);
      });
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <div className="flex flex-col gap-4 mb-4">
        <label htmlFor="input">Enter An Amount in Naira To Convert To Busd</label>
        <input
          type="number"
          value={busdAmount}
          onChange={e => setBusdAmount(e.target.value)}
          className="p-2 border border-gray-300 rounded"
          placeholder="Enter BUSD Amount"
        />
        <button
          onClick={handleConversion}
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Convert
        </button>
      </div>
      {nairaAmount && (
        <p className="text-xl font-bold">Busd Amount: N {nairaAmount}</p>
      )}
    </div>
  );
}

export default ConversionComponent;
