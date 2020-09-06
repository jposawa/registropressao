import React, { Component } from 'react';


export default class ListaPressao extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataEscolhida:{
        ano:undefined,
        mes:undefined,
        dia:undefined,
      },
      registroDiaEscolhido:{},
    };
  }

  componentDidMount() {
    const dataAtual = this.props.pegaDataAtual();
    const novaData = {
      ano: dataAtual.ano,
      mes: dataAtual.mes,
      dia: dataAtual.dia,
    };

    this.setState({dataEscolhida:novaData});
    // this.atualizaCampoData();
  }

  componentDidUpdate(prevProps, prevState) {
    const {props, state} = this;
    const prevDataEscolhida = prevState.dataEscolhida;
    const {dataEscolhida} = state;

    const strPrevData = Object.values(prevDataEscolhida).join('-');
    const strData = Object.values(dataEscolhida).join('-');
    // console.log(props.atualizaLista);
    // console.log(prevProps.atualizaLista);

    if(props.atualizaLista !== prevProps.atualizaLista && props.atualizaLista)
    {
      this.atualizaRegistro();
    }

    if(prevState.dataEscolhida != state.dataEscolhida)
    {
      this.atualizaCampoData();
    }
  }

  atualizaDataEscolhida = () =>{
    const valorData = this.dataE.value;

    if(valorData !== null && valorData != undefined && valorData !== "")
    {
      const [ano,mes,dia] = valorData.split('-');
      const novaData = {
        ano:parseInt(ano),
        mes:parseInt(mes),
        dia:parseInt(dia),
      };

      this.setState({dataEscolhida:novaData});

      this.atualizaRegistro();
    }
  }

  atualizaCampoData = () =>{
    const [campoData] = document.getElementsByClassName("campoData");
    const dataEscolhida = {...this.state.dataEscolhida};
    let txtData = "";

    if(dataEscolhida.dia < 10)
    {
      dataEscolhida.dia = "0"+dataEscolhida.dia;
    }

    if(dataEscolhida.mes < 10)
    {
      dataEscolhida.mes = "0" + dataEscolhida.mes;
    }

    txtData += dataEscolhida.ano + '-' + dataEscolhida.mes + "-" + dataEscolhida.dia;

    console.log(txtData);
    console.log(campoData.value);

    if(campoData.value !== txtData)
    {
      campoData.value = txtData;
    }
    // console.log(dataEscolhida);
  }

  atualizaRegistro = () =>{
    const {props, state} = this;
    const {dadosPressao} = props;
    const {dataEscolhida} = state;
    let registroAtual = {};
    // console.log(dadosPressao);

    try{
      // console.log(dadosPressao);
      // console.log(dadosPressao[dataEscolhida.ano]);
      registroAtual = dadosPressao[dataEscolhida.ano][dataEscolhida.mes][dataEscolhida.dia];

      this.setState({registroDiaEscolhido:{...registroAtual}});
      props.alternaAtualiza();
    }
    catch(erro){
      console.log(erro);
    }
  }

  render() {
    const {props, state} = this;
    const listaRegistros = Object.values(state.registroDiaEscolhido);
    const date = new Date();
    let mes = state.dataEscolhida.mes;
    let dia = state.dataEscolhida.dia;

    if(mes < 10)
    {
      mes = "0"+mes;
    }

    if(dia < 10)
    {
      dia = "0" + dia;
    }

    const dataAtual = state.dataEscolhida.ano + '-' + mes + '-' + dia;

    // console.log(dataAtual);
    // const dataAtual = props.dataAtual.ano + '-' + props.dataAtual.mes + '-' + props.dataAtual.dia;
    
    // console.log(listaRegistros);
    return (
      <>
      <div className="slotMudaData">
        <p><input type="date" className="input campoData" ref={(r) => {this.dataE = r}} defaultValue={dataAtual}/></p>
        <p><button className="botao btnMudaData" onClick={this.atualizaDataEscolhida}>Pesquisar</button></p>
      </div>
      <ul className="lista listaPressao">
      {
        listaRegistros.length === 0 ? 
          <p>Nenhum registro nesse dia</p>
        :
          listaRegistros.map(registro => (
            <li key={registro.horario}>
              <p>Cadastrado por: {registro.autor}</p>
              <p>Horário: {registro.horario}</p>
              <p>Pressão: {registro.valorMaior} / {registro.valorMenor}</p>
            </li>
          ))
      }
      </ul>
      </>
    );
  }
}