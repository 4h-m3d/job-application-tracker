import React, { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { API_BASE } from '../config';

export default function Profile(){
  const { user, token, logout } = useContext(AuthContext);
  const [form, setForm] = useState({ name:user?.name || '', email:user?.email || '', password: '' });
  const [msg, setMsg] = useState(null);

  const onSave = async () => {
    try {
      const res = await fetch(`${API_BASE}/profile`, {
        method: 'PUT',
        headers: { 'Content-Type':'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) throw data;
      setMsg('Profile updated. Please login again if you changed the email/password.');
      // if changed critical info, force logout
      logout();
    } catch (err) {
      setMsg(err?.error || 'Update failed');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Profile</h2>
      <input placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 mb-2"/>
      <input placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 mb-2"/>
      <input placeholder="New password (leave blank to keep)" type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 mb-2"/>
      <div className="flex gap-2">
        <button onClick={onSave} className="px-3 py-1 bg-indigo-600 text-white rounded">Save</button>
      </div>
      {msg && <div className="mt-3 text-sm">{msg}</div>}
    </div>
  );
}
