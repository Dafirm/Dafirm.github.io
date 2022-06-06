import React from 'react';
import './ninja.css';


const Ninjas = ({ninjas, deleteNinja}) => {
  const ninjaList = ninjas.map(ninja => {
    if (ninja.age > 20){
      return(
        <div className = 'ninja' key ={ninja.id}>
          <div>Name: { ninja.name }</div>
          <div>Name: { ninja.age }</div>
          <div>Name: { ninja.belt }</div>
          <button onClick = {() => {deleteNinja(ninja.id)}}>Delete ninja</button>
        </div>
      )
    } else {
      return null
    }
  })

  return(
    <div className="ninja-list">
    { ninjaList}
    </div>
  )
}

export default Ninjas;
