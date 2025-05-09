'use client';

import { useState } from 'react';

export default function ConstituencyForm() {
  const [constituencyNo, setConstituencyNo] = useState('');
  const [constituencyName, setConstituencyName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/constituency', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        constituency_no: parseInt(constituencyNo),
        constituency_name: constituencyName,
      }),
    });

    if (res.ok) {
      setMessage('Constituency added!');
      setConstituencyNo('');
      setConstituencyName('');
    } else {
      setMessage('Error adding constituency.');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '500px', margin: '0 auto' }}>
      <h2>Add Constituency</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          type="number"
          placeholder="Constituency No"
          value={constituencyNo}
          onChange={(e) => setConstituencyNo(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Constituency Name"
          value={constituencyName}
          onChange={(e) => setConstituencyName(e.target.value)}
          required
        />
        <button type="submit" style={{ padding: '0.5rem 1rem', background: '#0070f3', color: '#fff' }}>
          Submit
        </button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}
