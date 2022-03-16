import './Signet.scss';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import NotesIcon from '@mui/icons-material/Notes';

export default function Signet(props) {
        let ficherImage ="img/signets/" + props.sid + ".webp";
    return (
        <article className="Signet" style={{ backgroundColor: props.couleur }}>
        <div className="Signet__divImg">
            <div className='btnSig haut'><NotesIcon/></div>
            <img src={"img/signets/" + props.sid + ".webp"} alt={props.nom} />
        </div> 
        <div className="titre">
            <h1>{props.nom}</h1>
            <h6>Modifié le: <i>{props.date}</i></h6>
            <div className='btnSig bas'> <MoreVertIcon/> </div>
        </div> 
        </article>
    );
}