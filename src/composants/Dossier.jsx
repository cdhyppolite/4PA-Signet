import './Dossier.scss';
import IconButton from '@mui/material/IconButton';
import SortIcon from '@mui/icons-material/Sort';
import CloseIcon from '@mui/icons-material/Close';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import couvertureDefaut from '../images/couverture-defaut.webp';
import { convertirDate } from '../code/helper';
import { useState, useContext } from 'react';
import FrmDossier from './FrmDossier';
import * as signetModele from '../code/signet-modele';
import { UtilisateurContext } from './Appli';
import { ButtonUnstyled } from '@mui/base';

export default function Dossier({ id, titre, couleur, dateModif, couverture, supprimerDossier, modifierDossier, ajouterSignet, top3 }) {
  // État carte active
  const[carteActive, setCarteActive] = useState(false);
  // Identifiant de l'utilisateur 
  const utilisateur = useContext(UtilisateurContext)
  const uid = utilisateur.uid;

  // État des signets du dossier
  const [signets, setSignets] = useState(top3 || []);
  // État du menu contextuel
  const [eltAncrage, setEltAncrage] = useState(null);
  const ouvertMenu = Boolean(eltAncrage);

  // État du formulaire de modification
  const [ouvertFrm, setOuvertFrm] = useState(false);

  function gererMenu(evt) {
    setEltAncrage(evt.currentTarget);
    evt.stopPropagation();
  };

  function gererFermerMenu(evt) {
    setEltAncrage(null);
    evt.stopPropagation();
  };

  function afficherFormulaireModifier(evt) {
    evt.stopPropagation();
    // Ouvrir le formulaire de modification du dossier (transférer l'info sir le
    // dossier dans le formulaire) ...
    setOuvertFrm(true);
    // ... puis fermer le menu.
    gererFermerMenu(evt);
  }

  function gererSupprimer(evt) {
    evt.stopPropagation();
    // Appeler la fonction de ListeDossiers qui gère la suppression dans Firestore
    supprimerDossier(id);

    // ... puis fermer le menu.
    gererFermerMenu(evt);
  }

  // Tester si l'URL dans la variable couverture est valide
  let urlCouverture;
  try {
    urlCouverture = new URL(couverture);
  }
  catch (e) {
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
    // Récupérer le titre

    /*fetch("https://cors-anywhere.herokuapp.com/corsdemo/" + url)
    .then(reponse => reponse.text())
    .then(
      chaineDoc => {
        const doc = new DOMParser().parseFromString(chaineDoc,"text/html");
        // const titre = doc.querySelectorAll('title')[0].innerText;
        // console.log(titre);
        if (url == '') { url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSESQdWf_4jX4ECxu40tOY5gMGll0IdxV69lIreQKwuUI-5Z8_77UJw6fiToSM2XWLHimM&usqp=CAU' }
      }
    );*/
    ajouterSignet(id, url, "Avenir");
    
  }

  function gererDragEnter(evt) {
    evt.preventDefault();
    setDropzone(true);
  }

  function gererDragLeave(evt) {
    evt.preventDefault();
    setDropzone(false);
  }

  function gererDropImg(evt) {
    let url = evt.dataTransfer.getData("URL");
    modifierDossier(id, titre, url, couleur);
  }

  function ajouterSignet(idDossier, url, titre) {
    if (url == '') { url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSESQdWf_4jX4ECxu40tOY5gMGll0IdxV69lIreQKwuUI-5Z8_77UJw6fiToSM2XWLHimM&usqp=CAU' }
    const derniers3 = [...signets, { url: url, titre: titre }].slice(-3);
    console.log(idDossier + ' ' + url);
    signetModele.creer(uid, idDossier, derniers3).then(
      () => setSignets(derniers3)
    );
  }

  return (
    // Remarquez l'objet JS donné à la valeur de l'attribut style en JSX, voir : 
    // https://reactjs.org/docs/dom-elements.html#style
    <article className={'Dossier ' + (dropzone ? 'dropzone' : '') + (carteActive ? 'actif' : '')} onDrop={gererDrop} onDragOver={gererDragOver} onDragEnter={gererDragEnter} onDragLeave={gererDragLeave} style={{ backgroundColor: couleur }}>
      <div className="carte">
        <div className="endroit" onClick={() => setCarteActive(true)}>
          <div className="couverture">
            <IconButton className="deplacer" aria-label="déplacer" disableRipple={true}>
              <SortIcon />
            </IconButton>
            <img className={(dropzone ? 'dropzone' : '')} /*onDrop={gererDropImg}*/ src={couverture || couvertureDefaut} alt={titre} />
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
        </div>
        <div className="envers">
          <ButtonUnstyled className="touner-carte" onClick={() => setCarteActive(false)}>
            <CloseIcon/>
          </ButtonUnstyled>
          {
            signets.map(
              (signet, position) => <a key={position} href={signet.url} target="_blank">{signet.titre}</a>
            )
          }
        </div>
      </div>
      <FrmDossier gererActionDossier={modifierDossier} ouvert={ouvertFrm} setOuvert={setOuvertFrm} id={id} titre_p={titre} couleur_p={couleur} couverture_p={couverture} action={'Modifier'} />
    </article>
  );
}