import './Entete.scss';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import LanguageIcon from '@mui/icons-material/Language';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Avatar from '@mui/material/Avatar';
// https://mui.com/components/material-icons/

export default function Entete(props) {
    let nom = "Carl-David Hyppolite";
    // let nom = prompt("Entrez votre nom:", "Carl-David Hyppolite");
    let logo ="1";
    if (nom != "Carl-David Hyppolite") logo = "2";
    let imgTaille =30;
    return (
        <header className="Entete">
            <h1>Signets</h1>
            <nav>
            <input type="checkbox" id="cc-option-user" />
                <div className="option-user">
                    <div><SettingsIcon/></div>
                    <div><LanguageIcon/></div>
                    <div><Brightness4Icon/></div>
                    <div><LogoutIcon/></div>
                </div>
                <a href="#">{nom}</a>
                <div>
                    <label htmlFor="cc-option-user">
                        <Avatar className="avatar" alt="Carl-David Hyppolite" src={"img/logos/logo"+logo+".webp"} width={imgTaille} height={imgTaille} />
                    </label>
                </div>
            </nav>
        </header>
    );
}