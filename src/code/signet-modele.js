import { bdFirestore } from "./init";
import { collection, getDoc, getDocs, addDoc, Timestamp, doc, updateDoc, deleteDoc, query, orderBy } from "firebase/firestore";

/**
 * 
 * @param {String} uid 
 * @param {String} idDossier 
 * @param {String} url 
 * @param {Object} derniers3 
 * @returns {Promise<void>} Promesse sans paramètres
 */

export async function creer(uid, idDossier, derniers3) {
    let docRef = doc(bdFirestore, 'signets', uid, 'dossiers', idDossier);
    return await updateDoc(docRef, { top3: derniers3 });

}