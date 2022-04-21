import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TwitterPicker } from 'react-color';
import { useState } from 'react';

export default function ModificationDossier({ id, titre_p, couleur_p, couverture_p, ouvert, setOuvert, modifierDossier }) {
    const [titre, setTitre] = useState(titre_p);
    const [couverture, setCouverture] = useState(couverture_p);
    const [couleur, setCouleur] = useState(couleur_p);

    const gererOuvrir = () => {
        setOuvert(true);
    };

    const gererFermer = () => {
        // Il faut réinitialiser les états des valeurs de formulaire car sinon 
        // les dernières valeurs saisies seront sauvegardées dans les 'états'
        // du composant
        setTitre(titre_p);
        setCouverture(couverture_p);
        setCouleur(couleur_p)
        setOuvert(false);
    };

    function gererSoumettre() {
        // Code qui gère l'ajout dans Firestore
        if(titre.search(/[a-z]{2,}/i) != -1) {
            modifierDossier(id, titre, couverture, couleur);
            gererFermer();
        }
    }

    return (
        <div>
            <Dialog open={ouvert} onClose={gererFermer}>
                <DialogTitle>Modifier ce dossier</DialogTitle>
                <DialogContent>
                    {/* Titre du dossier */}
                    <TextField
                        autoFocus
                        margin="dense"
                        id="titre"
                        label="Titre du dossier (Minimum deux lettres)"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={e => setTitre(e.target.value)}
                        defaultValue={titre}
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
                        defaultValue={couverture}
                    />
                    {/* Choix de couleur */}
                    <TwitterPicker
                        triangle='hide'
                        color={couleur_p}
                        colors={["#FF1493", "#00BFFF", "#288B22", "#DC143C"]}
                        width="auto"
                        onChangeComplete={(couleur, e) => setCouleur(couleur.hex)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={gererFermer}>Annuler</Button>
                    <Button onClick={gererSoumettre}>Modifier</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}