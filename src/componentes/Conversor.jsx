import React from 'react'

//Três escalas de temperatura
const escalas = {
    c: 'Celsius',
    f: 'Fahrenheit',
    k: 'Kelvin'
};

//Funções de conversão
function fahrenheitToCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}
  
function celsiusToFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}

function kelvinToCelsius(kelvin) {
    return kelvin - 273;
}

function kelvinToFahrenheit(kelvin) {
    return (((kelvin - 273)/5) * 9) + 32;
}

function celsiusToKelvin(celsius) {
    return celsius + 273;
}

function fahrenheitToKelvin(fahrenheit) {
    return (((fahrenheit - 32) /9) *5) + 273;
}

//Essa função apenas valida se o que foi digitado na entrada não é um valor inválido
//Recebe uma temperatura e uma funçao de conversão como argumentos
function validarConversao(temperatura, funcaoDeConversao) {
//Tenta converter e verifica se o resultado é um NaN
  const entrada = parseFloat(temperatura);
  if (Number.isNaN(entrada)) {
    return '';
  }
//Realiza a conversão, arredonda o resultado e retorna a string correspondente
  const saida = funcaoDeConversao(entrada);
  const resultado = Math.round(saida * 1000) / 1000;
  return resultado.toString();
}


class Entrada extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

/*Essa função é executada quando o elemento input é modificado
está específicado em onChange.
O que essa função faz é mudar o state para atualiza-lo de acordo
com a entrada (o que foi digitado) para depois atualizar a interface
*/
  handleChange(e) {
    this.props.onTemperatureChange(e.target.value);
  }

/*O método render mostra o que deve ser renderizado*/
  render() {
    /*props.temperatura é o que foi passado a este componente (Entrada) pelo
    componente pai (conversor) que o renderiza*/
    const temperatura = this.props.temperatura;
    const escala = this.props.escala;
    return (
      <fieldset>
        {/*A escala em que a conversão será realizada é passada pelo componente pai
        via props*/}
        <legend>Digite a temperatura em {escalas[escala]}:</legend>
        <input value={temperatura}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}
  
class Conversor extends React.Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.handleKelvinChange = this.handleKelvinChange.bind(this);
    this.state = {temperatura: '', escala: 'c'};
  }

  handleCelsiusChange(temperatura) {
    this.setState({escala: 'c', temperatura});
  }

  handleFahrenheitChange(temperatura) {
    this.setState({escala: 'f', temperatura});
  }

  handleKelvinChange(temperatura) {
    this.setState({escala: 'k', temperatura});
  }

  render() {
    const escala = this.state.escala;
    const temperatura = this.state.temperatura;
    /*Operador ternário condicional múltiplo: verifica se a escala é Fahrenheit
    se não for verifica se é kelvin, se não for retorna a temperatura em celsius.*/
    const celsius = escala === 'f' ? validarConversao(temperatura, fahrenheitToCelsius) : escala === 'k' ? validarConversao(temperatura, kelvinToCelsius) : temperatura;
    const fahrenheit = escala === 'c' ? validarConversao(temperatura, celsiusToFahrenheit) : escala === 'k' ? validarConversao(temperatura, kelvinToFahrenheit) : temperatura;
    const kelvin = escala === 'c' ? validarConversao(temperatura, celsiusToKelvin) : escala === 'f' ? validarConversao(temperatura, fahrenheitToKelvin) : temperatura;

/*O que deve ser renderizado: três componentes Entrada, cada um é renderizado 
com as props passadas */
    return (
      <div>
        <Entrada
          escala="c"
          temperatura={celsius}
          onTemperatureChange={this.handleCelsiusChange} />
        <Entrada
          escala="f"
          temperatura={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange} />
        <Entrada
          escala="k"
          temperatura={kelvin}
          onTemperatureChange={this.handleKelvinChange} />
      </div>
    );
  }
}
  
export default Conversor
  