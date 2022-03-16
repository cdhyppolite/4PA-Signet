import './ListeSignets.scss';
import Signet from './Signet';
import lesSignets from './data/signets.json';

export default function ListeSignets(props) {
    return (
        <section className="ListeSignets">
            <h2>Niveaux présent dans l'univers de <i>Super Mario</i></h2>
            <div className='Signets'>
                {
                    lesSignets.map(sig => <Signet key={sig.id} nom={sig.nom} sid={sig.id} couleur ={sig.couleur} date={sig.date} />)
                }
            </div>
        </section>
    );
}