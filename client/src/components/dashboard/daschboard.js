import React, { useState, useEffect } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, ArcElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import { Box, Typography, useTheme, Grid, Card, CardContent } from '@mui/material';

const backLink = "http://localhost:5000";

ChartJS.register(CategoryScale, LinearScale, ArcElement, BarElement, Title, Tooltip, Legend);

function Dashboard() {
  const theme = useTheme();
  const [data, setData] = useState({ consumers: 0, cis: 0, orders: 0, cases: 0, assets: 0 });
  const [statusData, setStatusData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const userEnv = localStorage.getItem('userEnv');
        const branch = userEnv === "DEV" ? "New_DevCI_Draft" : "Draft_tests_branch";

        const endpoints = ['consumer', 'ci', 'order', 'case', 'asset','contract'];
        const requests = endpoints.map(entity => 
          axios.get(`${backLink}/${entity}s/count-${entity}s/${branch}`, { headers: { Authorization: `Bearer ${token}` } })
        );
        
        const responses = await Promise.all(requests);
        const fetchedData = {};
        endpoints.forEach((entity, index) => {
          fetchedData[entity] = responses[index].data.count;
        });

        // Fetch status data for each entity
        const statusRequests = endpoints.map(entity => 
          axios.get(`${backLink}/${entity}s/count-${entity}s/${branch}`, { headers: { Authorization: `Bearer ${token}` } })
        );
        const statusResponses = await Promise.all(statusRequests);
        const fetchedStatusData = {};
        endpoints.forEach((entity, index) => {
          fetchedStatusData[entity] = statusResponses[index].data;
        });
        
        setData(fetchedData);
        setStatusData(fetchedStatusData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const pieChartData = {
    labels: Object.keys(data),
    datasets: [{
      data: Object.values(data),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#9C27B0','#FF9800'],
    }],
  };

  return (
    <Box sx={{ padding: '20px' }}>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <>
          {/* State Cards */}
          <Grid container spacing={2} justifyContent="center" sx={{ marginBottom: '30px' }}>
            {Object.entries(data).map(([entity, count]) => (
              <Grid item xs={12} sm={6} md={2} key={entity}>
                <Card>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h6">{entity.toUpperCase()}S</Typography>
                    <Typography variant="h4" color="primary">{count}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Pie Chart */}
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Entities Distribution</Typography>
                  <Pie data={pieChartData} />
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Bar Charts by Status 
          <Grid container spacing={2} sx={{ marginTop: '20px' }}>
            {Object.entries(statusData).map(([entity, statusInfo]) => (
              <Grid item xs={12} md={6} key={entity}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{entity.toUpperCase()} by Status</Typography>
                    <Bar 
                      data={{
                        labels: Object.keys(statusInfo),
                        datasets: [{
                          label: 'Count',
                          data: Object.values(statusInfo),
                          backgroundColor: '#36A2EB',
                        }],
                      }}
                      options={{ responsive: true }}
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>*/}
        </>
      )}
    </Box>
  );
}

export default Dashboard;
