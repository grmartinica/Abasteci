import { useState } from 'react';
import { getSupabase } from '../lib/supabaseClient';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuth = async (isSignUp: boolean) => {
    setLoading(true);
    const supabase = getSupabase();
    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) alert(error.message);
      else alert('Check your email for confirmation!');
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) alert(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg w-full max-w-sm mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Login / Registro - Abasteci</h2>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="block w-full p-2 mb-2 border rounded" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" className="block w-full p-2 mb-4 border rounded" />
      <button onClick={() => handleAuth(false)} disabled={loading} className="w-full bg-slate-900 text-white p-2 rounded mb-2">Login</button>
      <button onClick={() => handleAuth(true)} disabled={loading} className="w-full bg-slate-100 text-slate-900 p-2 rounded">Registrar</button>
    </div>
  );
}
