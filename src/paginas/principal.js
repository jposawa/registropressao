import React, {Component} from 'react';
import Inicio from './inicio';

import './principal.css';

export default class Principal extends Component{
    constructor(props){
        super(props);

        this.state = {};
    }

    componentDidMount(){}

    componentDidUpdate(prevProps, prevState){}

    render(){
        return(
            <>
            <Inicio/>
            </>
        );
    }
}