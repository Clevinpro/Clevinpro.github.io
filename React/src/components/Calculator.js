import React, {Component} from 'react';

const scaleNames = {
    c: 'Celsius',
    f: 'Farenheit'
}

function toCelsius (farenheit) {
    return (farenheit - 32 ) * 5 / 9;
}

function toFarenheit (celsius) {
    return (celsius * 5 / 9 ) + 32;
}

function tryConvert (value, convert) {
    const input = parseFloat(value);
    if (Number.isNaN(input)) {
        return '';
    }
    const output = convert(input);
    const rounded = Math.round( output * 100 ) / 100;
    return rounded.toString();  
}

function BoilingVerdict(props) {
    if(props.celsius >= 100) {
        return <p>The water would boil.</p>;
    }
    return <p>The water would not boil.</p>;
}

class TemperatureInput extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onChange(e.target.value);
    }

    render () {

        const value = this.props.value;
        const scale = this.props.scale;
        return (
            <fieldset>
                <legend>Enter temperature in {scaleNames[scale]}:</legend>
                <input onChange={this.handleChange}
                 value={value} />
            </fieldset>
        )
    }
    
}

export default class Calculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '0',
            scale: 'c'
        }
        this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
        this.handleFarenheitChange = this.handleFarenheitChange.bind(this);
    }

    handleCelsiusChange(value) {
        this.setState({ scale: 'c', value})
    }

    handleFarenheitChange (value) {
        this.setState({ scale: 'f', value})
    }

    

    render() {

        const scale = this.state.scale;
        const value = this.state.value;
        const celsius = scale === 'f' ? tryConvert(value, toCelsius) : value;
        const farenheit = scale === 'c' ? tryConvert(value, toFarenheit) : value;
        return (
            <div>
                <TemperatureInput
                    value={celsius}
                    scale="c"
                    onChange={this.handleCelsiusChange}
                 />   
                 <TemperatureInput
                    value={farenheit}
                    scale="f"
                    onChange={this.handleFarenheitChange}
                 /> 
                 <BoilingVerdict 
                    celsius={parseFloat(celsius)}
                 />

            </div>
        );
    }
}
