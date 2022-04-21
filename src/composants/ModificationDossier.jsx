import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TwitterPicker } from 'react-color';
import { useState } from 'react';

export default function ModificationDossier({ id, titre_p, couleur_p, couverture_p,ouvert, setOuvert, gererModifierDossier }) {
    const [titre, setTitre] = useState('');
    const [couverture, setCouverture] = useState('');
    const [couleur, setCouleur] = useState('#000');

    const gererOuvrir = () => {
        setOuvert(true);
    };

    const gererFermer = () => {
        // Constater le bogue avant de réinitialiser les états des valeurs de formulaire
        // setTitre(titre_p);
        // setCouverture(couverture_p);
        // setCouleur(couleur_p)
        setOuvert(false);
    };

    function gererSoumettre() {
        // Code qui gère l'ajout dans Firestore
        // alert("ferme toi!");
        console.log("ferme-toi");
        if (titre.search(/\w{2,}/i) != -1) {
            gererModifierDossier(id,titre, couverture, couleur);
            gererFermer();
            
            // gererModificationDossier(titre, couverture, couleur);
            if ((titre!=titre_p) || (couverture!=couverture_p) || (couleur!=couleur_p)) {
                
            }
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
                        defaultValue={titre_p}
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
                        defaultValue={(""+couverture_p)}
                    />
                    {/* Choix de couleur */}
                    <TwitterPicker
                        triangle='hide'
                        color={couleur}
                        colors={["#FF1493", "#00BFFF", "#288B22", "#DC143C"]}
                        width="auto"
                        onChangeComplete={(couleur, e) => setCouleur(couleur.hex)}
                        defaultValue={couleur_p}
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
