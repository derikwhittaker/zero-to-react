import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import {
    Grid,
    Button,
    Icon,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableFooter,
    TableRow
} from 'material-ui';
import numeral from 'numeral';

import logo from './logo.svg';
import './App.css';

import StocksPage from './components/stocks/page';
import StockPurchasePage from './components/stocksPurchase/page';


import stocksService from './services/stockService';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {
                stocks: [],
                totals: {}
            }
        }
    }

    componentWillMount() {
        stocksService.GetStocks()
            .then(results => {
                if (results.successful) {
                    const stocks = results.data;
                    const data = this.state.data;

                    const totals = {
                        units: 0,
                        totalGain: 0,
                        totalValue: 0
                    }

                    stocks.forEach(stock => {
                        totals.units += stock.units;
                        totals.totalGain += stock.totalGain;
                        totals.totalValue += stock.value;
                    });

                    data.stocks = stocks;
                    data.totals = totals;

                    this.setState({ data });
                }
            });
    }

    render() {

        const { data } = this.state;

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>

                <div className='Body'>
                    <h2>Portfolio</h2>
                    <Grid container className='stocks-actions-container'>
                        <Grid item xs={12} className='grid-right'>
                            <div>
                                <Button variant="raised" color="primary">
                                    Purchase
                                </Button>
                            </div>
                        </Grid>
                    </Grid>

                    <Grid container>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Symbol</TableCell>
                                    <TableCell numeric>Units #</TableCell>
                                    <TableCell numeric>Last Price</TableCell>
                                    <TableCell numeric>Purchase Price</TableCell>
                                    <TableCell numeric>Total Gain $</TableCell>
                                    <TableCell numeric>Value</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.stocks.map(stock => {
                                    return (<TableRow key={stock.symbol}>
                                        <TableCell>{stock.symbol}</TableCell>
                                        <TableCell numeric>{stock.units}</TableCell>
                                        <TableCell numeric>{numeral(stock.lastPrice).format('$0,0.00')}</TableCell>
                                        <TableCell numeric>{numeral(stock.purchasePrice).format('$0,0.00')}</TableCell>
                                        <TableCell numeric>{numeral(stock.totalGain).format('$0,0.00')}</TableCell>
                                        <TableCell numeric>{numeral(stock.totalValue).format('$0,0.00')}</TableCell>
                                    </TableRow>)
                                })}

                            </TableBody>

                            <TableFooter>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell numeric>{data.totals.units}</TableCell>
                                    <TableCell numeric></TableCell>
                                    <TableCell numeric></TableCell>
                                    <TableCell numeric>{numeral(data.totals.totalGain).format('$0,0.00')}</TableCell>
                                    <TableCell numeric>{numeral(data.totals.totalValue).format('$0,0.00')}</TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </Grid>

                </div>
            </div>
        );
    }
}

export default App;
