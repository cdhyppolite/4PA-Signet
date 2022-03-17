import './Appli.scss';
import Entete from './Entete';
import PiedPage from './PiedPage';
import ListeSignets from './ListeSignets';
import Accueil from './Accueil';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { authFirebase } from './code/init';

export default function Appli() {
  // État utilisateurs
  const [utilisateur, setUtilisateur] = useState(null);

  // État de connexion
  useEffect(
    () => onAuthStateChanged(authFirebase, user => setUtilisateur),
    []
  )

  return (
    utilisateur ?
    <div className="Appli">
      <Entete utilisateur={utilisateur} setUtilisateur={setUtilisateur}/>
      <ListeSignets/>
      <PiedPage />
      </div>
      :
      <Accueil setUtilisateur ={setUtilisateur}/>
  );
}
