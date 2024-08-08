import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button, Select, MenuItem, FormControl, InputLabel, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
import axios from 'axios';

const Preferences = () => {
  const [selectedStock, setSelectedStock] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [sellPercentage, setSellPercentage] = useState('');
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [stocks, setStocks] = useState([]);
  const preferencesApiEndpoint = 'your-api-endpoint'; // Replace with your API endpoint
  const snsApiEndpoint = 'your-sns-api-endpoint'; // Replace with your SNS API endpoint

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const user = await getCurrentUser(); 
        setUserId(user.username); // Set user ID to state
        const attributes = await fetchUserAttributes(); 
        setEmail(attributes.email); 
      } catch (error) {
        console.error('Error fetching user info', error);
      }
    };

    fetchUserInfo();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchStocks();
    }
  }, [userId]);

  const fetchStocks = async () => {
    try {
      const response = await axios.get(preferencesApiEndpoint, {
        params: {
          user_id: userId,
        },
      });
      setStocks(response.data);
    } catch (error) {
      console.error('Error fetching stocks:', error);
    }
  };

  const handleStockChange = (event) => {
    setSelectedStock(event.target.value);
  };

  const handleSavePreferences = async () => {
    try {
      console.log('Saving preferences with:', {
        email, 
        userId,
        selectedStock,
        purchasePrice,
        sellPercentage,
      });

      const existingPreference = stocks.find((stock) => stock.stock_symbol === selectedStock);
      if (existingPreference) {
        alert('A preference for this stock already exists. Please delete the existing one.');
        return;
      }
  
      await axios.post(preferencesApiEndpoint, {
        user_id: userId,
        email: email,
        stock_symbol: selectedStock,
        purchase_price: purchasePrice,
        sell_percentage: sellPercentage,
      });
  
      setSelectedStock('');
      setPurchasePrice('');
      setSellPercentage('');
  
      fetchStocks();
    } catch (error) {
      console.error('Error saving stock preference', error);
    }
  };
  

  const handleSubscribeToTracker = async () => {
    try {
      console.log('Sending request with:', { email, user_id: userId });
      await axios.post(snsApiEndpoint, {
        email: email,
        user_id: userId,
      });
    }
      catch (error) {
        console.error('Error subscribing to tracker:', error);
        alert('Failed to subscribe to tracker. Please try again later.');
      }
    };
  const deleteStockPreference = async (stockSymbol) => {
    try {
      await axios.delete(preferencesApiEndpoint, {
        data: {
          user_id: userId,
          stock_symbol: stockSymbol,
        },
      });
      fetchStocks();
    } catch (error) {
      console.error('Error deleting stock preference', error);
    }
  };

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Stock Tracking Preferences
        </Typography>
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel>Select Stock</InputLabel>
          <Select
            value={selectedStock}
            onChange={handleStockChange}
            label="Select Stock"
          >
            <MenuItem value="AAPL">Apple</MenuItem>
            <MenuItem value="GOOGL">Google</MenuItem>
            <MenuItem value="AMZN">Amazon</MenuItem>
            <MenuItem value="MSFT">Microsoft</MenuItem>
            <MenuItem value="TSLA">Tesla</MenuItem>
            <MenuItem value="INTC">Intel</MenuItem>
            <MenuItem value="BAC">BOFA</MenuItem>
            <MenuItem value="NVDA">Nvidia</MenuItem>
            <MenuItem value="AMD">AMD</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          label="Purchase Price"
          type="number"
          value={purchasePrice}
          onChange={(e) => setPurchasePrice(e.target.value)}
        />
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          label="Sell Percentage"
          type="number"
          value={sellPercentage}
          onChange={(e) => setSellPercentage(e.target.value)}
        />
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Button variant="contained" color="primary" onClick={handleSubscribeToTracker}>
            Subscribe to Tracker
          </Button>
          <Button variant="contained" color="primary" onClick={handleSavePreferences}>
            Save Preferences
          </Button>
        </Box>
        <TableContainer component={Paper} sx={{ marginTop: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Stock Symbol</TableCell>
                <TableCell>Purchase Price</TableCell>
                <TableCell>Sell Percentage</TableCell>
                <TableCell>Sell Price</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stocks.map((stock) => (
                <TableRow key={stock.stock_symbol}>
                  <TableCell>{stock.stock_symbol}</TableCell>
                  <TableCell>{stock.purchase_price.toFixed(2)}</TableCell>
                  <TableCell>{stock.sell_percentage.toFixed(2)}%</TableCell>
                  <TableCell>{stock.sell_price.toFixed(2)}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => deleteStockPreference(stock.stock_symbol)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default Preferences;
