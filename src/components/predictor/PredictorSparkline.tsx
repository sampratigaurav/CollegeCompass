"use client";

import { LineChart, Line, ResponsiveContainer, YAxis, Tooltip } from "recharts";

interface PredictorSparklineProps {
  data: { round: number; closing_rank: number }[];
  color: string;
}

export default function PredictorSparkline({ data, color }: PredictorSparklineProps) {
  if (!data || data.length === 0) return null;

  return (
    <div className="h-10 w-24">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <YAxis domain={['dataMin', 'dataMax']} hide />
          <Tooltip 
            contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '4px', fontSize: '10px', color: '#fff', padding: '4px 8px' }}
            itemStyle={{ color: '#fff' }}
            labelStyle={{ display: 'none' }}
            formatter={(val: any) => [Number(val).toLocaleString(), 'Rank']}
          />
          <Line 
            type="monotone" 
            dataKey="closing_rank" 
            stroke={color} 
            strokeWidth={2} 
            dot={{ r: 2, fill: color, strokeWidth: 0 }} 
            activeDot={{ r: 4, strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
