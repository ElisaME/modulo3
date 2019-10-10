import React, {Component} from 'react';
import Navbar from './Navbar';
import AUTH_SERVICE from '../services/auth';

class Test extends Component {
  constructor(props) {
    super(props)
    this.state = {
      A:{},
      valueA:0,
      B:{},
      valueB:0,
      C:{},
      valueC:0,
      D:{},
      valueD:0,
      currentStep: 1,
      results:{
        A:'',
        B:'',
        C:'',
        D:''
      }
    }
  }

  incrementA = e => {
    let { A } = this.state;
    const key = e.target.name;
    A[key] = Number(e.target.value);
    this.setState({ A });
    this.totalA()
  }
  
  totalA = () => { 
    let { A , valueA } = this.state;
    valueA = Object.values(A).reduce((a, b) => a + b)
    this.setState({valueA})
    this.setState(prevState => ({
      results: {                   
          ...prevState.results,    
          A: valueA       
      }
    }))
    console.log(valueA)
  }
  incrementB = e => {
    let { B } = this.state;
    const key = e.target.name;
    B[key] = Number(e.target.value);
    this.setState({ B });
    this.totalB()
  }
  
  totalB = () => { 
    let { B , valueB } = this.state;
    valueB = Object.values(B).reduce((a, b) => a + b)
    this.setState({valueB})
    this.setState(prevState => ({
      results: {                   
          ...prevState.results,    
          B: valueB
      }
    }))
    console.log(valueB)
  }
  incrementC = e => {
    let { C } = this.state;
    const key = e.target.name;
    C[key] = Number(e.target.value);
    this.setState({ C });
    this.totalC()
  }
  
  totalC = () => { 
    let { C , valueC } = this.state;
    valueC = Object.values(C).reduce((a, b) => a + b)
    this.setState({valueC})
    this.setState(prevState => ({
      results: {                   
          ...prevState.results,    
          C: valueC       
      }
    }))
    console.log(valueC)
  }
  incrementD = e => {
    let { D } = this.state;
    const key = e.target.name;
    D[key] = Number(e.target.value);
    this.setState({ D });
    this.totalD()
  }
  
  totalD = () => { 
    let { D , valueD } = this.state;
    valueD = Object.values(D).reduce((a, b) => a + b)
    this.setState({valueD})
    this.setState(prevState => ({
      results: {                   
          ...prevState.results,    
          D: valueD      
      }
    }))
    console.log(valueD)
  }

  _next = () => {
    let currentStep = this.state.currentStep
    currentStep =  currentStep + 1
    this.setState({
      currentStep: currentStep
    })
  }
    
  _prev = () => {
    let currentStep = this.state.currentStep
    currentStep = currentStep <= 1? 1: currentStep - 1
    this.setState({
      currentStep: currentStep
    })
  }

/*
* the functions for our button
*/
previousButton() {
  let currentStep = this.state.currentStep;
  if(currentStep !==1){
    return (
      <button 
        className="button secondary" 
        type="button" onClick={this._prev}>
      Previous
      </button>
    )
  }
  return null;
}

nextButton(){
  let currentStep = this.state.currentStep;
  if(currentStep < 4){
    return (
      <button 
        className="button secondary is-pulled-right" 
        type="button" onClick={this._next}>
      Next
      </button>        
    )
  }
  return null;
}

  onSubmit = (e) => {
    e.preventDefault()
    console.log(this.state.results)
    AUTH_SERVICE.sendTest(this.state.results)
    .then((response) => 
      console.log(response),
      this.props.history.push('/auth/profile')
    )
    .catch((error) => console.log(error))
  }
  
  render() {    
    return (
      <React.Fragment>
      <Navbar></Navbar>
      <section className="hero is-light">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">
              Test: Dominancia cerebral
            </h1>
            <h2 className="subtitle">Utilice una escala numérica de 1 a 5</h2>
            <p>Lo que HAGO MEJOR:5. Lo que HAGO BIEN:4. Lo que HAGO REGULAR:3. Lo que MENOS BIEN:2. Lo que HAGO PEOR:1.</p>
          </div>
        </div>
      </section>
      <section id="test">
        <div className="container">
          <h2 className="subtitle">Sección {this.state.currentStep} </h2> 
          <form onSubmit={this.onSubmit}>
          {/* 
            render the form steps and pass required props in
          */}
            <Step1 
              currentStep={this.state.currentStep} 
              increment={this.incrementA}
            />
            <Step2 
              currentStep={this.state.currentStep} 
              increment={this.incrementB}
            />
            <Step3 
              currentStep={this.state.currentStep} 
              increment={this.incrementC}
            />
            <Step4 
              currentStep={this.state.currentStep} 
              increment={this.incrementD}
            />
            {this.previousButton()}
            {this.nextButton()}
          </form>
        </div>
      </section>
      </React.Fragment>
    );
  }
}

function Step1(props) {
  if (props.currentStep !== 1) {
    return null
  } 
  return(
    <React.Fragment>
    <div className="field columns">
      <div className="control column is-8">
        <p className="question">1.	Tengo Habilidades específicas en el campo de las matemáticas y las ciencias</p>
        {/* <input name="email" className="input" type="text" placeholder="Text input" value={props.email} onChange={props.handleChange}/> */}
      </div>
      <div className="column is-4 multiple-option">
        <input required onChange={props.increment} type="radio" name="A0" value="1"/>1
        <input required onChange={props.increment} type="radio" name="A0" value="2"/>2
        <input required onChange={props.increment} type="radio" name="A0" value="3"/>3
        <input required onChange={props.increment} type="radio" name="A0" value="4"/>4
        <input required onChange={props.increment} type="radio" name="A0" value="5"/>5
        </div>
    </div>
    <div className="field columns">
      <div className="control column is-8">
        <p className="question">2.	Pienso que la mejor forma de resolver un problema es siendo analítico.</p>
      </div>
      <div className="column is-4 multiple-option">
        <input required onChange={props.increment} type="radio" name="A1" value="1"/>1
        <input required onChange={props.increment} type="radio" name="A1" value="2"/>2
        <input required onChange={props.increment} type="radio" name="A1" value="3"/>3
        <input required onChange={props.increment} type="radio" name="A1" value="4"/>4
        <input required onChange={props.increment} type="radio" name="A1" value="5"/>5
      </div>
    </div>
    <div className="field columns">
      <div className="control column is-8">
        <p className="question">3.	Me inclino hacia la crítica en todos los asuntos.</p>
      </div>
      <div className="column is-4 multiple-option">
        <input required onChange={props.increment} type="radio" name="A2" value="1"/>1
        <input required onChange={props.increment} type="radio" name="A2" value="2"/>2
        <input required onChange={props.increment} type="radio" name="A2" value="3"/>3
        <input required onChange={props.increment} type="radio" name="A2" value="4"/>4
        <input required onChange={props.increment} type="radio" name="A2" value="5"/>5
      </div>
    </div>
    <div className="field columns">
      <div className="control column is-8">
        <p className="question">4.	Tengo habilidades para solucionar problemas complejos de manera lógica.</p>
      </div>
      <div className="column is-4 multiple-option">
        <input required onChange={props.increment} type="radio" name="A3" value="1"/>1
        <input required onChange={props.increment} type="radio" name="A3" value="2"/>2
        <input required onChange={props.increment} type="radio" name="A3" value="3"/>3
        <input required onChange={props.increment} type="radio" name="A3" value="4"/>4
        <input required onChange={props.increment} type="radio" name="A3" value="5"/>5
      </div>
    </div>
    <div className="field columns">
      <div className="control column is-8">
        <p className="question">5.	Antes de tomar algo como verdadero, lo compruebo, e indago otras fuentes.</p>
      </div>
      <div className="column is-4 multiple-option">
        <input required onChange={props.increment} type="radio" name="A4" value="1"/>1
        <input required onChange={props.increment} type="radio" name="A4" value="2"/>2
        <input required onChange={props.increment} type="radio" name="A4" value="3"/>3
        <input required onChange={props.increment} type="radio" name="A4" value="4"/>4
        <input required onChange={props.increment} type="radio" name="A4" value="5"/>5
      </div>
    </div>
    <div className="field columns">
      <div className="control column is-8">
        <p className="question">6.	Tengo capacidad de comprender, y manipular números y estadísticas de acuerdo con un fin.</p>
      </div>
      <div className="column is-4 multiple-option">
        <input required onChange={props.increment} type="radio" name="A5" value="1"/>1
        <input required onChange={props.increment} type="radio" name="A5" value="2"/>2
        <input required onChange={props.increment} type="radio" name="A5" value="3"/>3
        <input required onChange={props.increment} type="radio" name="A5" value="4"/>4
        <input required onChange={props.increment} type="radio" name="A5" value="5"/>5
      </div>
    </div>
    <div className="field columns">
      <div className="control column is-8">
        <p className="question">7.	Me gusta solucionar problemas inclinándome  a conocerlos y buscar mediciones exactas.</p>
      </div>
      <div className="column is-4 multiple-option">
        <input required onChange={props.increment} type="radio" name="A6" value="1"/>1
        <input required onChange={props.increment} type="radio" name="A6" value="2"/>2
        <input required onChange={props.increment} type="radio" name="A6" value="3"/>3
        <input required onChange={props.increment} type="radio" name="A6" value="4"/>4
        <input required onChange={props.increment} type="radio" name="A6" value="5"/>5
      </div>
    </div>
    <div className="field columns">
      <div className="control column is-8">
        <p className="question">8.	Tengo la capacidad frente a los problemas de razonar en forma deductiva, a partir de alguna teoría.</p>
      </div>
      <div className="column is-4 multiple-option">
        <input required onChange={props.increment} type="radio" name="A7" value="1"/>1
        <input required onChange={props.increment} type="radio" name="A7" value="2"/>2
        <input required onChange={props.increment} type="radio" name="A7" value="3"/>3
        <input required onChange={props.increment} type="radio" name="A7" value="4"/>4
        <input required onChange={props.increment} type="radio" name="A7" value="5"/>5
      </div>
    </div>
    <div className="field columns">
      <div className="control column is-8">
        <p className="question">9.	Ante un problema; al descomponer las ideas las relaciono con la totalidad.</p>
      </div>
      <div className="column is-4 multiple-option">
        <input required onChange={props.increment} type="radio" name="A8" value="1"/>1
        <input required onChange={props.increment} type="radio" name="A8" value="2"/>2
        <input required onChange={props.increment} type="radio" name="A8" value="3"/>3
        <input required onChange={props.increment} type="radio" name="A8" value="4"/>4
        <input required onChange={props.increment} type="radio" name="A8" value="5"/>5
      </div>
    </div>
    <div className="field columns">
      <div className="control column is-8">
        <p className="question">10.	Selecciono alternativas sobre la base de la razón-inteligencia; en	oposición al instinto, a la emoción.</p>
      </div>
      <div className="column is-4 multiple-option">
        <input required onChange={props.increment} type="radio" name="A9" value="1"/>1
        <input required onChange={props.increment} type="radio" name="A9" value="2"/>2
        <input required onChange={props.increment} type="radio" name="A9" value="3"/>3
        <input required onChange={props.increment} type="radio" name="A9" value="4"/>4
        <input required onChange={props.increment} type="radio" name="A9" value="5"/>5
      </div>
    </div>
    </React.Fragment>
  );
}

function Step2(props) {
  if (props.currentStep !== 2) {
    return null
  } 
  return(
    <React.Fragment>
    <div className="field columns">
      <div className="control column is-8">
        <p className="question">1.	La planificación y la organización son prioritarias en mis actividades.</p>
        {/* <input required name="email" className="input" type="text" placeholder="Text input" value={props.email} onChange={props.handleChange}/> */}
      </div>
      <div className="column is-4 multiple-option">
        <input required onChange={props.increment} type="radio" name="B0" value="1"/>1
        <input required onChange={props.increment} type="radio" name="B0" value="2"/>2
        <input required onChange={props.increment} type="radio" name="B0" value="3"/>3
        <input required onChange={props.increment} type="radio" name="B0" value="4"/>4
        <input required onChange={props.increment} type="radio" name="B0" value="5"/>5
        </div>
    </div>
    <div className="field columns">
      <div className="control column is-8">
        <p className="question">2.	Es importante para mi tener un lugar para cada cosa y cada cosa en su lugar.</p>
      </div>
      <div className="column is-4 multiple-option">
        <input required onChange={props.increment} type="radio" name="B1" value="1"/>1
        <input required onChange={props.increment} type="radio" name="B1" value="2"/>2
        <input required onChange={props.increment} type="radio" name="B1" value="3"/>3
        <input required onChange={props.increment} type="radio" name="B1" value="4"/>4
        <input required onChange={props.increment} type="radio" name="B1" value="5"/>5
      </div>
    </div>
    <div className="field columns">
      <div className="control column is-8">
        <p className="question">3.	Acostumbro escuchar las opiniones de los demás y hacer aclaraciones.</p>
      </div>
      <div className="column is-4 multiple-option">
        <input required onChange={props.increment} type="radio" name="B2" value="1"/>1
        <input required onChange={props.increment} type="radio" name="B2" value="2"/>2
        <input required onChange={props.increment} type="radio" name="B2" value="3"/>3
        <input required onChange={props.increment} type="radio" name="B2" value="4"/>4
        <input required onChange={props.increment} type="radio" name="B2" value="5"/>5
      </div>
    </div>
    <div className="field columns">
      <div className="control column is-8">
        <p className="question">4.	Prefiero las instrucciones específicas en lugar de aquellas generales que dejan muchos detalles opcionales.</p>
      </div>
      <div className="column is-4 multiple-option">
        <input required onChange={props.increment} type="radio" name="B3" value="1"/>1
        <input required onChange={props.increment} type="radio" name="B3" value="2"/>2
        <input required onChange={props.increment} type="radio" name="B3" value="3"/>3
        <input required onChange={props.increment} type="radio" name="B3" value="4"/>4
        <input required onChange={props.increment} type="radio" name="B3" value="5"/>5
      </div>
    </div>
    <div className="field columns">
      <div className="control column is-8">
        <p className="question">5.	Pongo mucha atención en los pequeños detalles o partes de un proyecto.</p>
      </div>
      <div className="column is-4 multiple-option">
        <input required onChange={props.increment} type="radio" name="B4" value="1"/>1
        <input required onChange={props.increment} type="radio" name="B4" value="2"/>2
        <input required onChange={props.increment} type="radio" name="B4" value="3"/>3
        <input required onChange={props.increment} type="radio" name="B4" value="4"/>4
        <input required onChange={props.increment} type="radio" name="B4" value="5"/>5
      </div>
    </div>
    <div className="field columns">
      <div className="control column is-8">
        <p className="question">6.	Tengo capacidad de comprender, y manipular números y estadísticas de acuerdo con un fin.</p>
      </div>
      <div className="column is-4 multiple-option">
        <input required onChange={props.increment} type="radio" name="B5" value="1"/>1
        <input required onChange={props.increment} type="radio" name="B5" value="2"/>2
        <input required onChange={props.increment} type="radio" name="B5" value="3"/>3
        <input required onChange={props.increment} type="radio" name="B5" value="4"/>4
        <input required onChange={props.increment} type="radio" name="B5" value="5"/>5
      </div>
    </div>
    <div className="field columns">
      <div className="control column is-8">
        <p className="question">7.	Pienso que trabajar con un método paso a paso es la mejor manera de resolver mi problema.</p>
      </div>
      <div className="column is-4 multiple-option">
        <input required onChange={props.increment} type="radio" name="B6" value="1"/>1
        <input required onChange={props.increment} type="radio" name="B6" value="2"/>2
        <input required onChange={props.increment} type="radio" name="B6" value="3"/>3
        <input required onChange={props.increment} type="radio" name="B6" value="4"/>4
        <input required onChange={props.increment} type="radio" name="B6" value="5"/>5
      </div>
    </div>
    <div className="field columns">
      <div className="control column is-8">
        <p className="question">8.	Tengo habilidades específicas en el manejo de auditorio o hablar en público.</p>
      </div>
      <div className="column is-4 multiple-option">
        <input required onChange={props.increment} type="radio" name="B7" value="1"/>1
        <input required onChange={props.increment} type="radio" name="B7" value="2"/>2
        <input required onChange={props.increment} type="radio" name="B7" value="3"/>3
        <input required onChange={props.increment} type="radio" name="B7" value="4"/>4
        <input required onChange={props.increment} type="radio" name="B7" value="5"/>5
      </div>
    </div>
    <div className="field columns">
      <div className="control column is-8">
        <p className="question">9.	Formulo métodos o medios para alcanzar un fin deseado, antes de pasar a la acción.</p>
      </div>
      <div className="column is-4 multiple-option">
        <input required onChange={props.increment} type="radio" name="B8" value="1"/>1
        <input required onChange={props.increment} type="radio" name="B8" value="2"/>2
        <input required onChange={props.increment} type="radio" name="B8" value="3"/>3
        <input required onChange={props.increment} type="radio" name="B8" value="4"/>4
        <input required onChange={props.increment} type="radio" name="B8" value="5"/>5
      </div>
    </div>
    <div className="field columns">
      <div className="control column is-8">
        <p className="question">10.	Tengo la capacidad de coordinar a las personas o de ordenar los elementos para lograr relaciones coherentes y armoniosas</p>
      </div>
      <div className="column is-4 multiple-option">
        <input required onChange={props.increment} type="radio" name="B9" value="1"/>1
        <input required onChange={props.increment} type="radio" name="B9" value="2"/>2
        <input required onChange={props.increment} type="radio" name="B9" value="3"/>3
        <input required onChange={props.increment} type="radio" name="B9" value="4"/>4
        <input required onChange={props.increment} type="radio" name="B9" value="5"/>5
      </div>
    </div>
    </React.Fragment>
  );
}

function Step3(props) {
  if (props.currentStep !== 3) {
    return null
  } 
  return(
    <React.Fragment>
    <div className="field columns">
      <div className="control column is-8">
        <p className="question">1.	Prefiero trabajar en equipo que hacerlo solo.</p>
        {/* <input required name="email" className="input" type="text" placeholder="Text input" value={props.email} onChange={props.handleChange}/> */}
      </div>
      <div className="column is-4 multiple-option">
        <input required onChange={props.increment} type="radio" name="C0" value="1"/>1
        <input required onChange={props.increment} type="radio" name="C0" value="2"/>2
        <input required onChange={props.increment} type="radio" name="C0" value="3"/>3
        <input required onChange={props.increment} type="radio" name="C0" value="4"/>4
        <input required onChange={props.increment} type="radio" name="C0" value="5"/>5
        </div>
    </div>
    <div className="field columns">
      <div className="control column is-8">
        <p className="question">2.	Es importante para mí estar en muchas oportunidades acompañado.</p>
      </div>
      <div className="column is-4 multiple-option">
        <input required onChange={props.increment} type="radio" name="C1" value="1"/>1
        <input required onChange={props.increment} type="radio" name="C1" value="2"/>2
        <input required onChange={props.increment} type="radio" name="C1" value="3"/>3
        <input required onChange={props.increment} type="radio" name="C1" value="4"/>4
        <input required onChange={props.increment} type="radio" name="C1" value="5"/>5
      </div>
    </div>
    <div className="field columns">
      <div className="control column is-8">
        <p className="question">3.	Creo en la trascendencia humana, en algo superior o espiritual </p>
      </div>
      <div className="column is-4 multiple-option">
        <input required onChange={props.increment} type="radio" name="C2" value="1"/>1
        <input required onChange={props.increment} type="radio" name="C2" value="2"/>2
        <input required onChange={props.increment} type="radio" name="C2" value="3"/>3
        <input required onChange={props.increment} type="radio" name="C2" value="4"/>4
        <input required onChange={props.increment} type="radio" name="C2" value="5"/>5
      </div>
    </div>
    <div className="field columns">
      <div className="control column is-8">
        <p className="question">4.	Soy emotivo frente a las situaciones difíciles. </p>
      </div>
      <div className="column is-4 multiple-option">
        <input required onChange={props.increment} type="radio" name="C3" value="1"/>1
        <input required onChange={props.increment} type="radio" name="C3" value="2"/>2
        <input required onChange={props.increment} type="radio" name="C3" value="3"/>3
        <input required onChange={props.increment} type="radio" name="C3" value="4"/>4
        <input required onChange={props.increment} type="radio" name="C3" value="5"/>5
      </div>
    </div>
    <div className="field columns">
      <div className="control column is-8">
        <p className="question">5.	A menudo actúo para solucionar problemas de tipo social.</p>
      </div>
      <div className="column is-4 multiple-option">
        <input required onChange={props.increment} type="radio" name="C4" value="1"/>1
        <input required onChange={props.increment} type="radio" name="C4" value="2"/>2
        <input required onChange={props.increment} type="radio" name="C4" value="3"/>3
        <input required onChange={props.increment} type="radio" name="C4" value="4"/>4
        <input required onChange={props.increment} type="radio" name="C4" value="5"/>5
      </div>
    </div>
    <div className="field columns">
      <div className="control column is-8">
        <p className="question">6.	En muchas ocasiones prima más en mis decisiones, lo emotivo que lo lógico y lo racional.</p>
      </div>
      <div className="column is-4 multiple-option">
        <input required onChange={props.increment} type="radio" name="C5" value="1"/>1
        <input required onChange={props.increment} type="radio" name="C5" value="2"/>2
        <input required onChange={props.increment} type="radio" name="C5" value="3"/>3
        <input required onChange={props.increment} type="radio" name="C5" value="4"/>4
        <input required onChange={props.increment} type="radio" name="C5" value="5"/>5
      </div>
    </div>
    <div className="field columns">
      <div className="control column is-8">
        <p className="question">7.	Disfruto, observo y me emociono frente a la belleza de la naturaleza. </p>
      </div>
      <div className="column is-4 multiple-option">
        <input required onChange={props.increment} type="radio" name="C6" value="1"/>1
        <input required onChange={props.increment} type="radio" name="C6" value="2"/>2
        <input required onChange={props.increment} type="radio" name="C6" value="3"/>3
        <input required onChange={props.increment} type="radio" name="C6" value="4"/>4
        <input required onChange={props.increment} type="radio" name="C6" value="5"/>5
      </div>
    </div>
    <div className="field columns">
      <div className="control column is-8">
        <p className="question">8.	Tengo habilidades para percibir, entender, manipular posiciones relativas de los objetos en el espacio.</p>
      </div>
      <div className="column is-4 multiple-option">
        <input required onChange={props.increment} type="radio" name="C7" value="1"/>1
        <input required onChange={props.increment} type="radio" name="C7" value="2"/>2
        <input required onChange={props.increment} type="radio" name="C7" value="3"/>3
        <input required onChange={props.increment} type="radio" name="C7" value="4"/>4
        <input required onChange={props.increment} type="radio" name="C7" value="5"/>5
      </div>
    </div>
    <div className="field columns">
      <div className="control column is-8">
        <p className="question">9.	Utilizo todos mis sentidos con frecuencia para resolver problemas (olfato, vista, gusto, tacto, oído)</p>
      </div>
      <div className="column is-4 multiple-option">
        <input required onChange={props.increment} type="radio" name="C8" value="1"/>1
        <input required onChange={props.increment} type="radio" name="C8" value="2"/>2
        <input required onChange={props.increment} type="radio" name="C8" value="3"/>3
        <input required onChange={props.increment} type="radio" name="C8" value="4"/>4
        <input required onChange={props.increment} type="radio" name="C8" value="5"/>5
      </div>
    </div>
    <div className="field columns">
      <div className="control column is-8">
        <p className="question">10.	Tengo la capacidad de desarrollar y mantener buena comunicación con diferentes tipos de personas.</p>
      </div>
      <div className="column is-4 multiple-option">
        <input required onChange={props.increment} type="radio" name="C9" value="1"/>1
        <input required onChange={props.increment} type="radio" name="C9" value="2"/>2
        <input required onChange={props.increment} type="radio" name="C9" value="3"/>3
        <input required onChange={props.increment} type="radio" name="C9" value="4"/>4
        <input required onChange={props.increment} type="radio" name="C9" value="5"/>5
      </div>
    </div>
    </React.Fragment>
  );
}

function Step4(props) {
  if (props.currentStep !== 4) {
    return null
  } 
  return(
    <React.Fragment>
    <div className="field columns">
      <div className="control column is-8">
        <p className="question">1.	Tengo interés muy fuerte o talento para pintar, dibujar, esquematizar, con la música, poesía, escultura, etc. </p>
        {/* <input required name="email" className="input" type="text" placeholder="Text input" value={props.email} onChange={props.handleChange}/> */}
      </div>
      <div className="column is-4 multiple-option">
        <input required onChange={props.increment} type="radio" name="D0" value="1"/>1
        <input onChange={props.increment} type="radio" name="D0" value="2"/>2
        <input onChange={props.increment} type="radio" name="D0" value="3"/>3
        <input onChange={props.increment} type="radio" name="D0" value="4"/>4
        <input onChange={props.increment} type="radio" name="D0" value="5"/>5
        </div>
    </div>
    <div className="field columns">
      <div className="control column is-8">
        <p className="question">2.	Tengo la capacidad de razonar en forma avanzada y creativa, siendo capaz de adquirir, modificar y retener conocimientos.</p>
      </div>
      <div className="column is-4 multiple-option">
        <input onChange={props.increment} type="radio" name="D1" value="1"/>1
        <input onChange={props.increment} type="radio" name="D1" value="2"/>2
        <input onChange={props.increment} type="radio" name="D1" value="3"/>3
        <input onChange={props.increment} type="radio" name="D1" value="4"/>4
        <input onChange={props.increment} type="radio" name="D1" value="5"/>5
      </div>
    </div>
    <div className="field columns">
      <div className="control column is-8">
        <p className="question">3.	Produzco nuevas ideas e innovaciones en mi trabajo.</p>
      </div>
      <div className="column is-4 multiple-option">
        <input onChange={props.increment} type="radio" name="D2" value="1"/>1
        <input onChange={props.increment} type="radio" name="D2" value="2"/>2
        <input onChange={props.increment} type="radio" name="D2" value="3"/>3
        <input onChange={props.increment} type="radio" name="D2" value="4"/>4
        <input onChange={props.increment} type="radio" name="D2" value="5"/>5
      </div>
    </div>
    <div className="field columns">
      <div className="control column is-8">
        <p className="question">4.	Tengo la capacidad de entender y hacer uso de imágenes visuales y verbales para representar semejanzas y diferencias.</p>
      </div>
      <div className="column is-4 multiple-option">
        <input onChange={props.increment} type="radio" name="D3" value="1"/>1
        <input onChange={props.increment} type="radio" name="D3" value="2"/>2
        <input onChange={props.increment} type="radio" name="D3" value="3"/>3
        <input onChange={props.increment} type="radio" name="D3" value="4"/>4
        <input onChange={props.increment} type="radio" name="D3" value="5"/>5
      </div>
    </div>
    <div className="field columns">
      <div className="control column is-8">
        <p className="question">5.	Tengo la capacidad de percibir y entender una problemática global sin entrar en el detalle de los elementos que la componen.</p>
      </div>
      <div className="column is-4 multiple-option">
        <input onChange={props.increment} type="radio" name="D4" value="1"/>1
        <input onChange={props.increment} type="radio" name="D4" value="2"/>2
        <input onChange={props.increment} type="radio" name="D4" value="3"/>3
        <input onChange={props.increment} type="radio" name="D4" value="4"/>4
        <input onChange={props.increment} type="radio" name="D4" value="5"/>5
      </div>
    </div>
    <div className="field columns">
      <div className="control column is-8">
        <p className="question">6.	A menudo mis mejores ideas se producen cuando no estoy haciendo nada en particular</p>
      </div>
      <div className="column is-4 multiple-option">
        <input onChange={props.increment} type="radio" name="D5" value="1"/>1
        <input onChange={props.increment} type="radio" name="D5" value="2"/>2
        <input onChange={props.increment} type="radio" name="D5" value="3"/>3
        <input onChange={props.increment} type="radio" name="D5" value="4"/>4
        <input onChange={props.increment} type="radio" name="D5" value="5"/>5
      </div>
    </div>
    <div className="field columns">
      <div className="control column is-8">
        <p className="question">7.	Prefiero ser conocido y recordado como una persona imaginativa y fantasiosa.</p>
      </div>
      <div className="column is-4 multiple-option">
        <input onChange={props.increment} type="radio" name="D6" value="1"/>1
        <input onChange={props.increment} type="radio" name="D6" value="2"/>2
        <input onChange={props.increment} type="radio" name="D6" value="3"/>3
        <input onChange={props.increment} type="radio" name="D6" value="4"/>4
        <input onChange={props.increment} type="radio" name="D6" value="5"/>5
      </div>
    </div>
    <div className="field columns">
      <div className="control column is-8">
        <p className="question">8.	Puedo frecuentemente anticiparme a la solución de los problemas.</p>
      </div>
      <div className="column is-4 multiple-option">
        <input onChange={props.increment} type="radio" name="D7" value="1"/>1
        <input onChange={props.increment} type="radio" name="D7" value="2"/>2
        <input onChange={props.increment} type="radio" name="D7" value="3"/>3
        <input onChange={props.increment} type="radio" name="D7" value="4"/>4
        <input onChange={props.increment} type="radio" name="D7" value="5"/>5
      </div>
    </div>
    <div className="field columns">
      <div className="control column is-8">
        <p className="question">9.	Tengo la capacidad de utilizar o comprender objetos, símbolos y señales complejas.</p>
      </div>
      <div className="column is-4 multiple-option">
        <input onChange={props.increment} type="radio" name="D8" value="1"/>1
        <input onChange={props.increment} type="radio" name="D8" value="2"/>2
        <input onChange={props.increment} type="radio" name="D8" value="3"/>3
        <input onChange={props.increment} type="radio" name="D8" value="4"/>4
        <input onChange={props.increment} type="radio" name="D8" value="5"/>5
      </div>
    </div>
    <div className="field columns">
      <div className="control column is-8">
        <p className="question">10.	Utiizo el juego y el sentido del humor en muchas de mis actividades.</p>
      </div>
      <div className="column is-4 multiple-option">
        <input onChange={props.increment} type="radio" name="D9" value="1"/>1
        <input onChange={props.increment} type="radio" name="D9" value="2"/>2
        <input onChange={props.increment} type="radio" name="D9" value="3"/>3
        <input onChange={props.increment} type="radio" name="D9" value="4"/>4
        <input onChange={props.increment} type="radio" name="D9" value="5"/>5
      </div>
    </div>
    <button className="button is-success is-pulled-right">Enviar</button>
    </React.Fragment>
  );
}

export default Test;