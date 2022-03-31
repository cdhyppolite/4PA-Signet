import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import  {TwitterPicker} from 'react-color';
import { useState } from 'react';

export default function AjoutDossier({ouvert, setOuvert, gererAjoutDossier}) {

    const [titre, setTitre] = useState('');
    const [couverture, setCouverture] = useState('');
    const [couleur, setCouleur] = useState('#000');

  const gererOuvert = () => {
    setOuvert(true);
  };

  const gererFermer = () => {
      setTitre('');
      setCouverture('');
      setCouleur('#000');
      setOuvert(false);
  };

  function gererSoumettre() {
    // Ajout dans firestore
    gererAjoutDossier( titre, couverture, couleur);
    gererFermer();
  }

  return (
    <div>
      <Dialog open={ouvert} onClose={gererFermer}>
        <DialogTitle>Nouveau Dossier</DialogTitle>
        <DialogContent>
          <DialogContentText>Informations à compléter</DialogContentText>
          {/* Titre */}
          <TextField
            autoFocus
            margin="dense"
            id="titre"
            label="Titre du dossier"
            type="text"
            fullWidth
            variant="standard"
            onChange={evt => setTitre(evt.target.value)}
          />
          {/* Url Image */}
          <TextField
            autoFocus
            margin="dense"
            id="couverture"
            label="Image couverture du dossier"
            type="url"
            fullWidth
            variant="standard"
            onChange={evt => setCouverture(evt.target.value)}
          />
          {/* Couleur */}
          <TwitterPicker 
            color={couleur}
            width='auto'
            triangle='hide'
            colors={["deeppink", "deepskyblue", "forestgreen", "crimson"]}
            onChangeComplete= {(couleur, e) => setCouleur(couleur.hex)}
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={gererFermer}>Annuler</Button>
          <Button onClick={gererSoumettre}>Soumettre</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
