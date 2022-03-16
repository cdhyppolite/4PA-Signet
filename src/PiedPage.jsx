import './PiedPage.scss';
import GamepadIcon from '@mui/icons-material/Gamepad';

export default function PiedPage() {
    return (
        <footer className="PiedPage">
            <div className='btnPlus'>
                <GamepadIcon/>
            </div>
            <h1>&copy;{new Date().getFullYear()} - TIM Maisonneuve - Tous droits réservés</h1>
        </footer>
    );
}