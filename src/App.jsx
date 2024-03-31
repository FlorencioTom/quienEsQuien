import React from 'react';
import { useState} from 'react';
import persons from './persons';
import preguntas from './preguntas';
import Avatar from './Avatar';
import './App.css';
import { Button } from 'primereact/button';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import Swal from 'sweetalert2';

const App = () => {

  const [avatarElegido, setAvatarElegido] = useState([]);
  const [personajes, setPersonajes] = useState(persons);
  const [jugando, setJugando] = useState(false);
  const [numeroAleatorio, setNumeroAletorio] = useState(null);

  /*useEffect(() => {
    console.log(avatarElegido);
  }, [avatarElegido]);*/

  const azar = () => {
    const numeroAzar = Math.floor(Math.random() * persons.length) + 1;
    setNumeroAletorio(numeroAzar);
    setAvatarElegido(persons[numeroAzar]);

    /*console.log(numeroAleatorio);*/
  }
  const start = () => {
    setJugando(true);
    setPersonajes(persons);
    azar();
    console.log(avatarElegido);
  }

  const descarte = (pregunta, respuesta) => {
    console.log(avatarElegido);
    console.log(respuesta);
    let clave = pregunta.key;
    let valor = respuesta;

    if(avatarElegido[clave] === respuesta){

      let nuevosPersonajes = personajes.filter( (personaje) => {
        
        if(personaje[clave] != valor){
          personaje.eliminado = true;
          return personaje;
        }
        if(personaje[clave] == valor){
          return personaje;
        }

      });

      /*let nuevosPersonajes = personajes.map(personaje => {
        if (personaje[clave] === valor) {
          let nuevoPersonaje = { ...personaje };
          nuevoPersonaje.eliminado = true; 
          return nuevoPersonaje;
        } else {
          return personaje;
        }
      });*/

      setPersonajes(nuevosPersonajes);
    }
  }

  const esEste = (clicado) => {
    console.log("Clicaste en "+clicado+" y el es "+numeroAleatorio);
    if(clicado === numeroAleatorio){
      setJugando(false);
      setPersonajes(persons);
      Swal.fire({
        title: "Enhorabuena, hacertaste",
        text: "You clicked the button!",
        icon: "success"
      }).then(() => {
        window.location.reload();
      });    
    }else{
      //ese que no es hay que deshabilitarlo
      Swal.fire({
        title: "Ese no es",
        icon: "error"
      });      
    }
  }

  const reload = () => {
    location.reload();
  }

  return (
    <section>
      <div className={!jugando ? 'start visible' : 'start oculto'}>
          <Button severity='info' className='boton' label='Haz click a qui para jugar' raised onClick={() => start()}></Button>
      </div>
      <div className={jugando ? 'personas visible' : 'personas oculto'}>
          {
            personajes.map( (pers, index) => {
              return(
                <div className='' key={index}>
                  {(index == numeroAleatorio)?
                    <Avatar key={index}  elElegido={true} caracteristicas={pers} avatarNum={index} func={esEste}></Avatar>
                  :
                    <Avatar key={index}  elElegido={false} caracteristicas={pers} avatarNum={index} func={esEste}></Avatar>
                  }
                </div> 
              )
            })
          }
      </div>
      <div className={jugando ? 'preguntas visible' : 'preguntas oculto'}>
          {
            preguntas.map( (pregunta, index) => {
              return(
                <div className='pregunta' key={index}>
                  <h2>{pregunta.title}</h2>
                  <div className='botones'>
                    {
                      pregunta.questions.map( (resp, index) => {
                        return(<Button severity='info' className='boton' key={index} label={resp} raised onClick={ () => descarte(pregunta,resp)}/>); 
                      })
                    }
                  </div>
                </div>
              )
            })
          }
      </div>
    </section>
  )
}

export default App;
