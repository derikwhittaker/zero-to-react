import React, { Component } from 'react';

import StocksListing from './listing';
import StocksActions from './actions';

import stocksService from '../../services/stockService';

class StocksPage extends Component {

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
            <React.Fragment>
                <h2>Portfolio</h2>
                <StocksActions />
                <StocksListing stocks={data.stocks} totals={data.totals} />
            </React.Fragment>
        )
    }
}

export default StocksPage;