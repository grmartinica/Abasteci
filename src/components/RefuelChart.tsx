import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Refuel } from '../types';

interface Props {
  refuels: Refuel[];
}

export default function RefuelChart({ refuels }: Props) {
  const data = refuels.reduce((acc: any[], refuel) => {
    const date = new Date(refuel.date);
    const month = date.toLocaleString('pt-BR', { month: 'short' });
    const year = date.getFullYear();
    const key = `${month}/${year}`;
    
    const existing = acc.find(item => item.month === key);

    if (existing) {
      existing.total += refuel.totalPaid;
    } else {
      acc.push({ month: key, total: refuel.totalPaid });
    }
    return acc;
  }, []).sort((a,b) => new Date(a.month).getTime() - new Date(b.month).getTime());

  return (
    <div className="mt-6 p-4 bg-white shadow rounded-lg h-64">
      <h2 className="text-xl font-semibold mb-4">Gasto Mensal (R$)</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="month" className="text-xs" />
          <YAxis />
          <Tooltip formatter={(value: number) => `R$ ${value.toFixed(2)}`} />
          <Bar dataKey="total" fill="#0f172a" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
