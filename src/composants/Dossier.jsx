import './Dossier.scss'; 
import IconButton from '@mui/material/IconButton';
import SortIcon from '@mui/icons-material/Sort';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {convertirDate} from '../code/helper';
import couvertureDefault from '../images/couverture-default.webp'
import { useState } from 'react';
import ModificationDossier from './ModificationDossier';
export default function Dossier({ modifierDossier,dossiers, setDossiers, uid,id, titre, couleur, dateModif, couverture, supprimerDossier}) {

  // Menu contextuel
  const [eltAncrage, setEltAncrage] = useState(null);
  const ouvertMenu = Boolean(eltAncrage);

  // Modification formulaire
  const [ouvertFrm, setOuvertFrm] = useState(false);

  function gererMenu(event) {
    setEltAncrage(event.currentTarget);
  };
  function gererFermerMenu() {
    setEltAncrage(null);
  };

  function gererFormulaireModifier() {
    gererFermerMenu(); // Fermer le formulaire
    setOuvertFrm(true);

  }
  function gererSupprimer() {
    gererFermerMenu(); // Fermer le formulaire
    supprimerDossier(id) // Supprimer le dossier
  }

  function gererModifier() {
    modifierDossier(id,titre,couverture,couleur)
  }
  
  // Tester URl
  let urlCouverture;
  try { urlCouverture = new URL(couverture); }
  catch(e) { couverture = couvertureDefault; }
  
  return (
    // Remarquez l'objet JS donné à la valeur de l'attribut style en JSX, voir : 
    // https://reactjs.org/docs/dom-elements.html#style
    <article className="Dossier" style={{backgroundColor: couleur}}>
      <div className="couverture">
        <IconButton className="deplacer" aria-label="déplacer" disableRipple={true}>
          <SortIcon />
        </IconButton>
        <div className='divImg'><img src={couverture || couvertureDefault} alt={titre}/></div>
      </div>
      <div className="info">
        <h2><b>{titre}</b></h2>
        <p><b>Modifié</b> : {convertirDate(dateModif.seconds)}</p>
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
        <MenuItem onClick={gererFormulaireModifier}>Modifier</MenuItem>
        <MenuItem onClick={gererSupprimer}>Supprimer</MenuItem>
      </Menu>
      <ModificationDossier gererModifierDossier={gererModifier} id={id} titre_p={titre} couleur_p={couleur} couverture_p={couverture} ouvert={ouvertFrm} setOuvert={setOuvertFrm}/>
    </article>
  );
}
