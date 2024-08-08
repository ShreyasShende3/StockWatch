import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import { MenuItem, Select, FormControl, InputLabel, Button, Typography, Card, CardContent, CardMedia, Grid } from '@mui/material';
import axios from 'axios';

const Stock = () => {
  const [selectedStock, setSelectedStock] = useState('');
  const [stockData, setStockData] = useState(null);
  const [newsData, setNewsData] = useState([]);

  const stocks = [
    { value: 'AAPL', label: 'Apple' },
    { value: 'GOOGL', label: 'Google' },
    { value: 'AMZN', label: 'Amazon' },
    { value: 'MSFT', label: 'Microsoft' },
    { value: 'TSLA', label: 'Tesla' },
    { value: 'INTC', label: 'Intel' },
    { value: 'BAC', label: 'BOFA' },
    { value: 'NVDA', label: 'Nvidia' },
    { value: 'AMD', label: 'AMD' },
  ];

  const handleStockChange = (event) => {
    setSelectedStock(event.target.value);
  };

  const loadStockData = () => {
    const apiUrl = `your-api-url/stocks/${selectedStock}`;

    axios.get(apiUrl)
      .then((response) => {
        const { historical_data, news } = response.data;
        setStockData(historical_data);
        setNewsData(news);
      })
      .catch((error) => console.error('Error fetching stock data:', error));
  };

  const renderCandlestickPlot = () => {
    if (!stockData) return null;

    const trace = {
      x: stockData.map((row) => row.Date),
      close: stockData.map((row) => parseFloat(row.Close)),
      high: stockData.map((row) => parseFloat(row.High)),
      low: stockData.map((row) => parseFloat(row.Low)),
      open: stockData.map((row) => parseFloat(row.Open)),
      type: 'candlestick',
      xaxis: 'x',
      yaxis: 'y',
    };

    const layout = {
      title: `${selectedStock} Candlestick Plot`,
      xaxis: { title: 'Date' },
      yaxis: { title: 'Price' },
      width: 1600,
      height: 800,
    };

    return <Plot data={[trace]} layout={layout} />;
  };

  const renderTopNews = () => {
    if (newsData.length === 0) return null;

    return (
      <div>
        <Typography variant="h6" gutterBottom>
          Top News for {selectedStock}
        </Typography>
        <Grid container spacing={2}>
          {newsData.map((newsItem, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card style={{ maxWidth: 345 }}>
                {newsItem.image && (
                  <CardMedia
                    component="img"
                    height="140"
                    image={newsItem.image}
                    alt={newsItem.headline}
                  />
                )}
                <CardContent>
                  <Typography variant="h6">
                    <a href={newsItem.url} target="_blank" rel="noopener noreferrer">
                      {newsItem.headline}
                    </a>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  };

  return (
    <div style={{ padding: '20px' }}>
      <FormControl fullWidth margin="normal">
        <InputLabel>Stock</InputLabel>
        <Select value={selectedStock} onChange={handleStockChange}>
          {stocks.map((stock) => (
            <MenuItem key={stock.value} value={stock.value}>
              {stock.label}
            </MenuItem>
          ))}
        </Select>
        <Button variant="contained" onClick={loadStockData} disabled={!selectedStock} style={{ marginTop: '10px' }}>
          Load Data
        </Button>
      </FormControl>

      <div style={{ marginTop: '20px' }}>
        {renderCandlestickPlot()}
      </div>
      
      <div style={{ marginTop: '20px' }}>
        {renderTopNews()}
      </div>
    </div>
  );
};

export default Stock;
