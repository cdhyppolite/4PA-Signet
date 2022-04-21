import './ListeDossiers.scss';
import Dossier from './Dossier';
import { useEffect, useState } from 'react';
import { Timestamp } from 'firebase/firestore';
import * as dossierModele from '../code/dossier-modele';

export default function ListeDossiers({utilisateur, dossiers, setDossiers}) {
  // console.log("Objet utilisateur retourné par le Provider GoogleAuth : ", utilisateur);

  // Lire les dossiers (de l'utilisateur connecté) dans Firestore
  useEffect(
    () => dossierModele.lireTout(utilisateur.uid).then(
      lesDossiers => setDossiers(lesDossiers)
    )
    , [utilisateur, setDossiers]
  );

  function supprimerDossier(idDossier) {
    dossierModele.supprimer(utilisateur.uid, idDossier).then(
      () => setDossiers(dossiers.filter(
        dossier => dossier.id !== idDossier
      ))
    );
  }

  function modifierDossier(idDossier,new_titre, new_couverture, new_couleur) {
    const lesModif = {
      couleur: new_couleur,
      couverture: new_couverture,
      titre: new_titre,
      dateModif: Timestamp.fromDate(new Date())
    }
    dossierModele.modifier(utilisateur.uid,idDossier,lesModif).then(
      () => {
        setDossiers(dossiers.map(dossier => {
          if (dossier.id == idDossier) {
            dossier.couleur = new_couleur;
            dossier.couverture = new_couverture;
            dossier.titre = new_titre;
            dossier.dateModif = Timestamp.fromDate(new Date());
          }
          return dossier;
        }))
      }
    );
  }

  return (
    <ul className="ListeDossiers">
      {
        dossiers.map( 
          // Remarquez l'utilisation du "spread operator" pour "étaler" les 
          // propriétés de l'objet 'dossier' reçu en paramètre de la fonction
          // fléchée dans les props du composant 'Dossier' !!
          dossier =>  <li key={dossier.id}><Dossier {...dossier}  supprimerDossier={supprimerDossier} modifierDossier={modifierDossier} uid={utilisateur.uid}/></li>
        )
      }
    </ul>
  );
}