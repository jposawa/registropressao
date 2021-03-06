import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';

import ListaPressao from '../componentes/listaPressao';
import FormPressao from '../componentes/formPressao';

const configFb = {
  apiKey: "AIzaSyBBYiOulkKOg17wa8QW_NIQcP_NTfcuUUA",
  authDomain: "registropressao.firebaseapp.com",
  databaseURL: "https://registropressao.firebaseio.com",
  projectId: "registropressao",
  storageBucket: "registropressao.appspot.com",
  messagingSenderId: "310239750526",
  appId: "1:310239750526:web:9a3744e12f3a884a732b2f",
  measurementId: "G-LC53RTE4L9"
}

const tabelaFb = {
  pressao: "/pressao/",
}

export default class Inicio extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dadosPressao:{},
      dataAtual:{
        hash:undefined,
        ano:undefined,
        mes:undefined,
        dia:undefined,
        hora:undefined,
        minuto:undefined,
      },
      atualizaLista:false,
      mostraFormPressao:false,
    };

    try{
      firebase.initializeApp(configFb);

      // this.auth = firebase.auth();
      this.db = firebase.database();
    }
    catch(erro){
      console.log(erro);
    }
  }

  componentDidMount() {
    // this.pegaDataAtual();
    this.atualizaStateDataAtual({...this.pegaDataAtual()});
    this.pegaDadosPressao();
  }

  componentDidUpdate(prevProps, prevState) { }

  pegaDataAtual = () =>{
    const {state} = this;
    const dataAtual = {...state.dataAtual};
    const novaData = new Date();

    dataAtual.hash = novaData;
    dataAtual.ano = novaData.getFullYear();
    dataAtual.mes = novaData.getMonth()+1;
    dataAtual.dia = novaData.getDate();
    dataAtual.hora = novaData.getHours();
    dataAtual.minuto = novaData.getMinutes();
    dataAtual.horarioCompleto = novaData.getHours() + ":" + novaData.getMinutes() + ":" + novaData.getSeconds();

    // this.setState({dataAtual:{...dataAtual}});
    return {...dataAtual};
  }

  atualizaStateDataAtual = (novaData) =>{
    if(novaData !== null && novaData !== undefined)
    {
      this.setState({dataAtual:{...novaData}});
    }
  }

  pegaDadosPressao = () =>{
    // const {state} = this;
    // const dadosPressao = {...state.dadosPressao};

    const referenciaPressao = this.db.ref(tabelaFb.pressao);

    referenciaPressao.on("value", snapshot =>{
      const resultado = snapshot.val();

      // console.log(resultado);
      this.setState({dadosPressao:resultado});
    })
  }

  atualizaDadosPressao = (novaPressao) =>{
    const {state} = this;
    // const dadosPressao = {...state.dadosPressao};
    const dataAtual = this.pegaDataAtual();
    let caminho = "";
    let updates = {};

    caminho += tabelaFb.pressao + dataAtual.ano + "/" + dataAtual.mes + "/" + dataAtual.dia + "/" + dataAtual.horarioCompleto;

    updates[caminho] = novaPressao;
    this.alternaAtualiza(true);

    try{
      this.db.ref().update(updates).then(() => {
        console.log("Salvou com sucesso");
        alert("Registrado com sucesso");
      })
    }
    catch(err){
      console.log(err);
    }
  }

  alternaAtualiza = (novoValor) =>{
    let atualizaLista = false;

    if(novoValor)
    {
      atualizaLista = true;
    }

    this.setState({atualizaLista:atualizaLista});
  }

  alternaFormPressao = (valor) =>{
    let _mostraForm = false;

    if(valor)
    {
      _mostraForm = valor;
    }

    this.setState({mostraFormPressao:_mostraForm});
  }

  render() {
    const {state} = this;

    return (
      <div className="corpoPagina">
        <div className="slotListaPressao">
          <ListaPressao
            dadosPressao = {this.state.dadosPressao}
            atualizaLista = {this.state.atualizaLista}
            mostraFormPressao = {this.state.mostraFormPressao}
            pegaDataAtual = {this.pegaDataAtual}
            alternaAtualiza = {this.alternaAtualiza}
            alternaFormPressao = {this.alternaFormPressao}
          />
        </div>

        <div className={state.mostraFormPressao ? "slotFormPressao" : "slotFormPressao slotRecolhido"}>
          <FormPressao
            dataAtual = {this.state.dataAtual}
            mostraFormPressao = {this.state.mostraFormPressao}
            atualizaDadosPressao = {this.atualizaDadosPressao}
            pegaDataAtual = {this.pegaDataAtual}
          />
        </div>
      </div>
    );
  }
}