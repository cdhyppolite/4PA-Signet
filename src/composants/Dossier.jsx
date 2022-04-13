import './Dossier.scss'; 
import IconButton from '@mui/material/IconButton';
import SortIcon from '@mui/icons-material/Sort';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {convertirDate} from '../code/helper';
import couvertureDefault from '../images/couverture-default.webp'
import { useState } from 'react';
export default function Dossier({id, titre, couleur, dateModif, couverture, supprimerDossier}) {

  const [eltAncrage, setEltAncrage] = useState(null);
  const ouvert = Boolean(eltAncrage);

  function gererMenu(event) {
    setEltAncrage(event.currentTarget);
  };
  function gererFermer() {
    setEltAncrage(null);
  };

  function gererFormulaireModifier() {
    gererFermer(); // Fermer le formulaire

  }
  function gererSupprimer() {
    gererFermer(); // Fermer le formulaire
    supprimerDossier(id) // Supprimer le dossier
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
        <img src={couverture || couvertureDefault} alt={titre}/>
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
        open={ouvert}
        onClose={gererFermer}
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
    </article>
  );
}
