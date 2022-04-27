import './Dossier.scss'; 
import IconButton from '@mui/material/IconButton';
import SortIcon from '@mui/icons-material/Sort';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import couvertureDefaut from '../images/couverture-defaut.webp';
import { convertirDate } from '../code/helper';
import { useState } from 'react';
import FrmDossier from './FrmDossier';

export default function Dossier({id, titre, couleur, dateModif, couverture, supprimerDossier, modifierDossier, ajouterSignet}) {
  // État du menu contextuel
  const [eltAncrage, setEltAncrage] = useState(null);
  const ouvertMenu = Boolean(eltAncrage);

  // État du formulaire de modification
  const [ouvertFrm, setOuvertFrm] = useState(false);

  function gererMenu(event) {
    setEltAncrage(event.currentTarget);
  };

  function gererFermerMenu() {
    
    setEltAncrage(null);
  };

  function afficherFormulaireModifier() {
    // Ouvrir le formulaire de modification du dossier (transférer l'info sir le
    // dossier dans le formulaire) ...
    setOuvertFrm(true);
    // ... puis fermer le menu.
    gererFermerMenu();
  }
  
  function gererSupprimer() {
    // Appeler la fonction de ListeDossiers qui gère la suppression dans Firestore
    supprimerDossier(id);

    // ... puis fermer le menu.
    gererFermerMenu();
  }

  // Tester si l'URL dans la variable couverture est valide
  let urlCouverture;
  try {
    urlCouverture = new URL(couverture);
  }
  catch(e) {
    couverture = couvertureDefaut;
  }
  // État dropzone
  const [dropzone, setDropzone] = useState(false)

  function gererDragOver(evt) {
    evt.preventDefault();
  }

  function gererDrop(evt) {
    evt.preventDefault();
    setDropzone(false);
    let url = evt.dataTransfer.getData("URL");
    ajouterSignet(id, url);
  }

  function gererDragEnter(evt) {
    evt.preventDefault();
    setDropzone(true);
  }

  function gererDragLeave(evt) {
    evt.preventDefault();
    setDropzone(false);
  }
  return (
    // Remarquez l'objet JS donné à la valeur de l'attribut style en JSX, voir : 
    // https://reactjs.org/docs/dom-elements.html#style
    <article className={'Dossier ' +(dropzone ? 'dropzone' : '')} onDrop={gererDrop} onDragOver={gererDragOver} onDragEnter={gererDragEnter} onDragLeave={gererDragLeave} style={{backgroundColor: couleur}}>
      <div className="couverture">
        <IconButton className="deplacer" aria-label="déplacer" disableRipple={true}>
          <SortIcon />
        </IconButton>
        <img src={couverture || couvertureDefaut} alt={titre}/>
      </div>
      <div className="info">
        <h2>{titre}</h2>
        <p>Modifié : {convertirDate(dateModif.seconds)}</p>
      </div>
      <IconButton onClick={gererMenu} className="modifier" aria-label="modifier" size="small">
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="menu-contextuel-dossier"
        anchorEl={eltAncrage}
        open={ouvertMenu}
        onClose={gererFermerMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={afficherFormulaireModifier}>Modifier</MenuItem>
        <MenuItem onClick={gererSupprimer}>Supprimer</MenuItem>
      </Menu>
      <FrmDossier gererActionDossier={modifierDossier} ouvert={ouvertFrm} setOuvert={setOuvertFrm} id={id} titre_p={titre} couleur_p={couleur} couverture_p={couverture} action={'Modifier'}/>
    </article>
  );
}