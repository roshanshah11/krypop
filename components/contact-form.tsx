"use client";

import React, { useState } from 'react';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');
  const [submissionId, setSubmissionId] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setError('');
    setSubmissionId('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setSubmissionId(data.submissionId);
      } else {
        setStatus('error');
        setError(data.error ?? 'Unknown error');
      }
    } catch (err) {
      setStatus('error');
      setError('Network error');
      console.error('Contact form submission error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 space-y-4 bg-white rounded shadow">
      <div>
        <label htmlFor="contact-name" className="block font-semibold">Name</label>
        <input id="contact-name" name="name" value={form.name} onChange={handleChange} required maxLength={100} className="w-full border p-2 rounded" />
      </div>
      <div>
        <label htmlFor="contact-email" className="block font-semibold">Email</label>
        <input id="contact-email" name="email" type="email" value={form.email} onChange={handleChange} required maxLength={200} className="w-full border p-2 rounded" />
      </div>
      <div>
        <label htmlFor="contact-message" className="block font-semibold">Message</label>
        <textarea id="contact-message" name="message" value={form.message} onChange={handleChange} required maxLength={2000} rows={5} className="w-full border p-2 rounded" />
      </div>
      <button type="submit" disabled={status==='loading'} className="bg-black text-white px-4 py-2 rounded">
        {status==='loading' ? 'Sending...' : 'Send'}
      </button>
      {status==='success' && (
        <div className="text-green-600 mt-2">Thank you! Your message was sent. Submission ID: <span className="font-mono">{submissionId}</span></div>
      )}
      {status==='error' && (
        <div className="text-red-600 mt-2">Error: {error}</div>
      )}
    </form>
  );
}
