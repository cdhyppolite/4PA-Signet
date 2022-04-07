import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TwitterPicker } from 'react-color';
import { useState } from 'react';

export default function AjoutDossier({ ouvert, setOuvert, gererAjoutDossier }) {
    const [titre, setTitre] = useState('');
    const [couverture, setCouverture] = useState('');
    const [couleur, setCouleur] = useState('#000');

    const gererOuvrir = () => {
        setOuvert(true);
    };

    const gererFermer = () => {
        // Constater le bogue avant de réinitialiser les états des valeurs de formulaire
        setTitre('');
        setCouverture('');
        setCouleur('#000')
        setOuvert(false);
    };

    function gererSoumettre() {
        // Code qui gère l'ajout dans Firestore
        if (titre.search(/\w{2,}/i) != -1) {
            gererAjoutDossier(titre, couverture, couleur);
            gererFermer();
        }
    }

    return (
        <div>
            <Dialog open={ouvert} onClose={gererFermer}>
                <DialogTitle>Ajouter un dossier</DialogTitle>
                <DialogContent>
                    {/* Titre du dossier */}
                    <TextField
                    autoComplete="off"
                        autoFocus
                        margin="dense"
                        id="titre"
                        label="Titre du dossier (Minimum deux lettres)"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={e => setTitre(e.target.value)}
                    />
                    {/* URL de l'image */}
                    <TextField
                        margin="dense"
                        id="couverture"
                        label="Image couverture du dossier"
                        type="url"
                        fullWidth
                        variant="standard"
                        style={{ marginBottom: "1.5rem" }}
                        onChange={e => setCouverture(e.target.value)}
                    />
                    {/* Choix de couleur */}
                    <TwitterPicker
                        triangle='hide'
                        color={couleur}
                        colors={["#FF1493", "#00BFFF", "#288B22", "#DC143C"]}
                        width="auto"
                        onChangeComplete={(couleur, e) => setCouleur(couleur.hex)}
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
