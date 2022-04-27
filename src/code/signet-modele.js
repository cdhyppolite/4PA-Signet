import { bdFirestore } from "./init";
import { collection, getDoc, getDocs, addDoc, Timestamp, doc, updateDoc, deleteDoc, query, orderBy } from "firebase/firestore";

export async function creer(uid, idDossier, url) {
    // let doc = doc(bdFirestore, 'signets', idUtilisateur, 'dossiers',idDossier);
    // return await updateDoc(doc, objectModif);

}