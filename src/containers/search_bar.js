import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchWeather } from '../actions/index';

export class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            term: ''
        };

        // overrides local method below constructior by binding the new context of this
        this.onInputChange = this.onInputChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onInputChange(event) {
        this.setState({ term: event.target.value });
    }

    onFormSubmit(event) {
        // prevent form from submitting and page refreshing
        event.preventDefault();
        // fetch the dang weather!
        this.props.fetchWeather(this.state.term);
        this.setState({ term: '' });
    }

    render () {
        return (
            <form className="input-group" onSubmit={this.onFormSubmit}>
                <input
                    placeholder="Search your favorite city to get a 5 day forecast"
                    className="form-control"
                    value={this.state.term}
                    onChange={this.onInputChange}/>
                <span className="input-group-btn">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </span>
            </form>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchWeather }, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBar);
