import React from 'react';

const Avatar = ({caracteristicas, avatarNum, func, elElegido}) => {
  if(caracteristicas.eliminado){
    return (
      <div className='personaE'>
        
        <img className={'avatar eliminado'} src={caracteristicas.img} /*onClick={ () => func(avatarNum)}*/ alt='avatar'/>
      </div>     
    )
  }else{
    return (
      <div className='persona'>
        
        <img className={elElegido ? 'avatar elElegido' : 'avatar'} src={caracteristicas.img} onClick={ () => func(avatarNum)} alt='avatar'/>
      </div>
      
    )
  }
             
}

export default Avatar;

