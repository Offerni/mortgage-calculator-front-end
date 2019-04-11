import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import '../Styles/Components.css';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';



class FormComponents extends Component {

    constructor() {
        super();
        this.state = {
            info: {}
        };
    }
    
    handleChange = event => {
        let info = {};
        Object.assign(info, this.state.info);
        info[event.target.name] = event.target.value;
        this.setState({info});
    };
     
    handleDisabled = () => {
        const {
            property_price,
            down_payment,
            annual_interest_rate,
            amortization_period,
            payment_schedule
        } = this.state.info;

        if (!property_price || !down_payment || !annual_interest_rate || !amortization_period || !payment_schedule) {
            return true;
        }

        return false;
    }

    render() {
        const {onSubmit} = this.props;
        console.log(this.state);
        return(
        <div>    
            <form className="form-component" name="form">
                <div className="select-field">
                    <TextField
                        value={this.state.info.propertyPrice}
                        onBlur={this.handleChange}
                        name="property_price"
                        id="standard-with-placeholder"
                        label="Property Price"
                        margin="normal"
                        type="number"
                        required
                        inputProps={{min:0, max: 999999999 }}
                        
                    />
                </div>
                <div className="select-field">
                    <TextField
                        value={this.state.info.downPayment}
                        onBlur={this.handleChange}
                        name="down_payment"
                        id="standard-with-placeholder"
                        label="Down Payment"
                        margin="normal"
                        type="number"
                        required
                        inputProps={{min:0, max: 99999999 }}
                    />
                </div>
                <div className="select-field">
                    <TextField
                        value={this.state.info.annualInterestRate}
                        onBlur={this.handleChange}
                        name="annual_interest_rate"
                        id="standard-with-placeholder"
                        label="Interest Rate"
                        margin="normal"
                        type="number"
                        required
                        inputProps={{min:0, max: 999 }}
                    />
                </div>
                <div className="select-field">
                    <TextField
                        value={this.state.info.amortizationPeriod}
                        onBlur={this.handleChange}
                        name="amortization_period"                    
                        id="standard-with-placeholder"
                        label="Amortization Period"
                        margin="normal"
                        type="number"
                        required
                        inputProps={
                            {
                                step: 5,
                                min: 5,
                                max: 30
                            }
                            }
                    />
                </div>
                <div className="select-field">
                    <FormControl>
                    <InputLabel htmlFor="form">Payment Schedule</InputLabel>
                        <Select
                            value={this.state.info.payment_schedule || ''}
                            inputProps={{
                            name: 'payment_schedule',
                            id: 'payment-schedule',
                            }}
                            onChange={this.handleChange}
                        >
                            <MenuItem value={"monthly"}>Monthly</MenuItem>
                            <MenuItem value={"bi-weekly"}>Bi-weekly</MenuItem>
                            <MenuItem value={"accelerated"}>Accelerated</MenuItem>                        
                        </Select>
                    </FormControl>
                </div>
            </form>
            <div className="btn-form">
                <Button
                    onClick={() => onSubmit(this.state.info)}
                    variant="contained" color="primary"
                    type="button"
                    disabled={this.handleDisabled()}
                >
                    Calculate
                </Button>
            </div>
        </div>
       
        );
    }
}

export default FormComponents;
