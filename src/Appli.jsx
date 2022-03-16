import './Appli.scss';
import Entete from './Entete';
import PiedPage from './PiedPage';
import ListeSignets from './ListeSignets';
import Accueil from './Accueil';
import { useState, useEffect } from 'react';

// import ListeProduits from './ListeProduits';
// import {useState} from 'react';

export default function Appli() {
  // État utilisateurs
  const [utilisateur, setutilisateur] = useState(null);
  return (
    utilisateur ?
    <div className="Appli">
      <Entete/>
      <ListeSignets/>
      <PiedPage />
      </div>
      :
      <Accueil/>
  );
}
