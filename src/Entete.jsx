import './Entete.scss';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import LanguageIcon from '@mui/icons-material/Language';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Avatar from '@mui/material/Avatar';
import { authFirebase } from './code/init';
// https://mui.com/components/material-icons/

export default function Entete({utilisateur, setUtilisateur}) {

    function deconnexion() {
        authFirebase.signOut().then(
            () => setUtilisateur(null)
        );
      }

    return (
        <header className="Entete">
            <h1>Signets</h1>
            <nav>
            <input type="checkbox" id="cc-option-user" />
                <div className="option-user">
                    <div><SettingsIcon/></div>
                    <div><LanguageIcon/></div>
                    <div><Brightness4Icon/></div>
                    <div className="btnDeco" onClick={deconnexion}><LogoutIcon/></div>
                </div>
                <a href="#">{utilisateur.displayName}</a>
                <div>
                    <label htmlFor="cc-option-user">
                        <Avatar className="avatar" alt={utilisateur.displayName} src={utilisateur.photoURL} />
                    </label>
                </div>
            </nav>
        </header>
    );
}