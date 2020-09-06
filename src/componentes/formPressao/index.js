import React, { Component } from 'react';


export default class FormPressao extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() { }

  componentDidUpdate(prevProps, prevState) { }

  validaFormPressao = (evento) =>{
    evento.preventDefault();
    const novoCadastro = {
      autor: this.autor.value,
      horario: this.horario.value,
      valorMaior: this.valorMaior.value,
      valorMenor: this.valorMenor.value,
    }

    this.props.atualizaDadosPressao({...novoCadastro});
  }

  render() {
    const {props} = this;
    const {dataAtual} = props;
    const horarioAtual = dataAtual.hora + ":" + dataAtual.minuto;

    return (
      <form className="form formPressao" onSubmit = {this.validaFormPressao}>
        <p>
          Autor registro:&nbsp;
          <input type="text" placeholder="Nome autor" ref={(r) => {this.autor = r}}/>
        </p>

        <p>
          Horário:&nbsp;
          <input type="time" placeholder="Horário medição" ref={(r) => {this.horario = r}} defaultValue={horarioAtual}/>
        </p>

        <p>
          Valor maior:&nbsp;
          <input type="tel" placeholder="Valor maior" ref={(r) => {this.valorMaior = r}}/>
        </p>

        <p>
          Valor menor:&nbsp;
          <input type="tel" placeholder="Valor menor" ref={(r) => {this.valorMenor = r}}/>
        </p>

        <p>
          <button>Cadastrar</button>
        </p>
      </form>
    );
  }
}