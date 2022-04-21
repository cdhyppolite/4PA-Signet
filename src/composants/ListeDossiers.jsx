import './ListeDossiers.scss';
import Dossier from './Dossier';
import { useEffect } from 'react';
import * as dossierModele from '../code/dossier-modele';
import { Timestamp } from 'firebase/firestore';

export default function ListeDossiers({utilisateur, dossiers, setDossiers}) {
  // Lire les dossiers (de l'utilisateur connecté) dans Firestore
  useEffect(
    () => dossierModele.lireTout(utilisateur.uid).then(
      lesDossiers => setDossiers(lesDossiers)
    )
    , [utilisateur, setDossiers]
  );

  function supprimerDossier(idDossier) {
    // Utiliser le modèle des dossiers pour supprimer le dossier dans Firestore
    dossierModele.supprimer(utilisateur.uid, idDossier).then(
      () => setDossiers(dossiers.filter(
        dossier => dossier.id !== idDossier
      ))
    );
  }

  function modifierDossier(idDossier, nvTitre, nvCouverture, nvCouleur) {
    const lesModifs = {
      titre: nvTitre,
      couverture: nvCouverture,
      couleur: nvCouleur,
      dateModif: Timestamp.fromDate(new Date())
    };
    dossierModele.modifier(utilisateur.uid, idDossier, lesModifs).then(
      () => setDossiers(dossiers.map(
        dossier => {
          if(dossier.id === idDossier) {
            dossier.couverture = nvCouverture;
            dossier.couleur = nvCouleur;
            dossier.titre = nvTitre;
            dossier.dateModif = Timestamp.fromDate(new Date())
          }
          return dossier;
        }
      ))
    );
  }

  return (
    <ul className="ListeDossiers">
      {
        dossiers.map( 
          // Remarquez l'utilisation du "spread operator" pour "étaler" les 
          // propriétés de l'objet 'dossier' reçu en paramètre de la fonction
          // fléchée dans les props du composant 'Dossier' !!
          dossier =>  <li key={dossier.id}><Dossier {...dossier} supprimerDossier={supprimerDossier} modifierDossier={modifierDossier} /></li>
        )
      }
    </ul>
  );
}