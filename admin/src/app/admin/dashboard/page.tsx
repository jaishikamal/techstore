'use client';

import { useEffect } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { useApi } from '@/hooks/useApi';
import { dashboardApi } from '@/services/api';

interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalRevenue: number;
  monthlyRevenue: number;
}

interface ChartData {
  name: string;
  users: number;
  revenue: number;
}

export default function DashboardPage() {
  const { data: stats, loading: statsLoading, execute: fetchStats } = useApi<DashboardStats>(dashboardApi.getStats);
  const { data: chartData, loading: chartLoading, execute: fetchChartData } = useApi<ChartData[]>(dashboardApi.getChartData);

  useEffect(() => {
    fetchStats();
    fetchChartData();
  }, [fetchStats, fetchChartData]);

  const StatCard = ({ title, value }: { title: string; value: number }) => (
    <Card>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h4">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </Typography>
      </CardContent>
    </Card>
  );

  if (statsLoading || chartLoading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Total Users" value={stats?.totalUsers || 0} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Active Users" value={stats?.activeUsers || 0} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Total Revenue" value={stats?.totalRevenue || 0} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Monthly Revenue" value={stats?.monthlyRevenue || 0} />
        </Grid>

        {/* Charts */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Revenue Overview
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              User Growth
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="users" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
} 