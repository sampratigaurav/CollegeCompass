"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function PlacementChart({ avgSalary }: { avgSalary: number | null }) {
  if (!avgSalary) {
    return (
      <div className="h-64 flex items-center justify-center bg-muted/30 rounded-xl border border-border border-dashed">
        <p className="text-sm font-medium text-muted-foreground">Insufficient data for salary trends</p>
      </div>
    );
  }

  // Mock historical data based on current avg salary
  const data = [
    { year: "2021", salary: Math.floor(avgSalary * 0.85) },
    { year: "2022", salary: Math.floor(avgSalary * 0.9) },
    { year: "2023", salary: avgSalary },
  ];

  return (
    <div className="h-72 w-full pt-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-border" opacity={0.5} />
          <XAxis 
            dataKey="year" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 12, fill: "currentColor", opacity: 0.7 }}
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false}
            tick={{ fontSize: 12, fill: "currentColor", opacity: 0.7 }}
            tickFormatter={(val) => `₹${(val / 100000).toFixed(1)}L`}
          />
          <Tooltip
            cursor={{ fill: "currentColor", opacity: 0.1 }}
            contentStyle={{ backgroundColor: "var(--background)", borderColor: "var(--border)", borderRadius: "8px", color: "var(--foreground)" }}
            formatter={(val: number) => [`₹${(val / 100000).toFixed(2)} LPA`, "Average Salary"]}
            labelStyle={{ color: "var(--muted-foreground)", fontWeight: "bold", marginBottom: "4px" }}
          />
          <Bar 
            dataKey="salary" 
            fill="var(--color-primary, #7c3aed)" 
            radius={[4, 4, 0, 0]} 
            maxBarSize={50}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
