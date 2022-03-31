import { async } from "@firebase/util";
import { getDocs, collection, addDoc, Timestamp, getDoc } from "firebase/firestore";
import { bdFirestore } from "./init";

// Obtenir tout les dossiers d'un utilisateur
export async function lireTout(idUtilisateur) {
    return getDocs(
        collection(bdFirestore, 'signets', idUtilisateur, 'dossiers')
    ).then(
        res => res.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    );
}
export async function creer(idUtilisateur, dossier) {
    dossier.dateModif = Timestamp.now();
    let coll = collection(bdFirestore, 'signets', idUtilisateur, 'dossiers');
    let refDoc = addDoc(coll, dossier);
    return await getDoc(refDoc);
}