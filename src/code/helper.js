//  Convertir la date
export function convertirDate(dateEnTimestamp) {
    const date = new Date(dateEnTimestamp * 1000);
    const annee = date.getFullYear();
    const listeDesMois = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    const mois = listeDesMois[date.getMonth()];
    const jour = date.getDate();
    return `${(jour < 10 ? '0' : '') + jour} ${mois} ${annee} à ${heureDeuxChiffre( date.getHours(),date.getMinutes(), date.getSeconds() )}`;
}

function heureDeuxChiffre(heures, minutes, secondes) {
    let h = (heures < 10 ? '0' : '') + heures;
    let m = (minutes < 10 ? '0' : '') + minutes;
    let s = (secondes < 10 ? '0' : '') + secondes;
    return `${h}:${m}:${s}`
}