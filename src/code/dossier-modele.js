import { getDocs, collection } from "firebase/firestore";
import { bdFirestore } from "./init";

// Obtenir tout les dossiers d'un utilisateur
export async function lireTout(idUtilisateur) {
    return getDocs(
        collection(bdFirestore, 'signets', idUtilisateur, 'dossiers')
    ).then(
        res => res.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    );
}