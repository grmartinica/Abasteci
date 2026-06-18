import { useState, useEffect } from 'react';
import { getSupabase } from './lib/supabaseClient';
import { Refuel, Vehicle } from './types';
import Auth from './components/Auth';
import RefuelForm from './components/RefuelForm';
import RefuelList from './components/RefuelList';
import RefuelChart from './components/RefuelChart';

export default function App() {
  const [session, setSession] = useState(null);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  useEffect(() => {
    const supabase = getSupabase();
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  if (!session) {
    return <Auth />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 text-slate-800">
      <div className="max-w-md mx-auto">
        <header className="mb-8">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Abasteci</h1>
            <p className="text-slate-600 mt-2">Olá, {session.user.email}.</p>
            <button onClick={() => getSupabase().auth.signOut()} className="text-sm text-red-600">Sair</button>
        </header>

        {/* vehicle selection/addition placeholder */}
        <div className="mb-4 p-2 bg-white rounded border">
            <p className="text-sm font-semibold">Veículos:</p>
            {/* Logic for vehicle selection goes here */}
        </div>
        
        <RefuelForm onAdd={() => {}} />
        <RefuelChart refuels={[]} />
        <RefuelList refuels={[]} />
      </div>
    </div>
  );
}
