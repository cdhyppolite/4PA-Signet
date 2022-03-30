import './ListeDossiers.scss';
// import dossTab from '../data/liste-dossiers.json';
import Dossier from './Dossier';
import { useEffect } from 'react';
import * as dossierModele from '../code/dossier-modele';

export default function ListeDossiers({utilisateur, dossiers, setDossiers}) {
  // Lire les dossiers de l'utilisateur connecté
  useEffect(
    () =>  dossierModele.lireTout(utilisateur.uid).then(
      lesDossiers => setDossiers(lesDossiers)
    ),
    [utilisateur, setDossiers]
  );
  return (
    <ul className="ListeDossiers">
      {/*
        dossTab.map( 
          // Remarquez l'utilisation du "spread operator" pour "étaler" les 
          // propriétés de l'objet 'dossier' reçu en paramètre de la fonction
          // fléchée dans les props du composant 'Dossier' !!
          dossier =>  <li key={dossier.id}><Dossier {...dossier} /></li>
        )
      */}
    </ul>
  );
}