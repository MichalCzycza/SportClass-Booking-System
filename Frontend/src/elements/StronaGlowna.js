import React from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../index-styles/index.css';
import '../index-styles/header.css';
import '../index-styles/footer.css';
import '../index-styles/oferta.css';
import '../index-styles/kalkulator-bmi.css';
import '../index-styles/zajecia.css';
import '../index-styles/subskrybuj.css';
import tapeta from '../photos/tapeta.jpg';
import fitness from '../photos/fitness.jpg';
import joga from '../photos/joga.jpg';
import boks from '../photos/boks.jpg';
import logo from '../photos/logo.webp';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { calculateBMI } from '../scripts/bmiCalculator';


const Strona = () => {

    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/logowanie');
    };

    return (
        <div>
            <div className="header">
                <div className="left-section">
                    <div className="custom-icon">
                        <i className="fa-solid fa-dumbbell"></i>
                    </div>
                    <h1 className="tytul">Zbuduj swoje lepsze jutro</h1>
                </div>
                <div className="middle-section">
                    <a href="#oferta">
                        <button href="#oferta" className="menu-button">Oferta</button>
                    </a>

                    <button className="menu-button">Nasze kluby</button>
                    <button className="menu-button">O nas</button>
                    <a href="#stopka">
                        <button className="menu-button">Kontakt</button>
                    </a>

                </div>

                <div className="right-section">
                    <button className="zaloguj-button" onClick={handleLoginClick}>
                        Zaloguj się
                    </button>
                </div>
            </div>

            <div id="oferta" className="content">
            <div className="oferta">
                    <div className="background">
                        <img src={tapeta} alt="Tapeta" />
                    </div>
                    <h2 className="oferta-napis">Oferta</h2>
                    <div className="tabela">
                        <table className="my-table" cellpadding="10">
                            <tr><th>Typ</th><th>Cena</th><th>Czas trwania</th></tr>
                            <tr><th>Trening personalny</th><th>100zł</th><th>1 godzina</th></tr>
                            <tr><th>Karnet</th><th>299zł</th><th>1 miesiąc</th></tr>
                            <tr><th>Strefa wellness</th><th>49zł</th><th>1 wejście</th></tr>
                        </table>
                    </div>
                    <div className="info">
                        <h1>Łap rabat 80% i ruszaj się, jak lubisz!</h1>
                        <p>W naszych klubach honorujemy Medicover Sport oraz Multisport, FitProfit i PZU Sport.</p>
                        <p>Posiadacze kart sportowych mogą korzystać z klubu w godzinach pracy managerów.</p>
                        <hr style={{border: '2px solid white', width: '45%'}} />
                    </div>
                </div>

                <div className="zdjecia-oferta">
                    <h1 className="title-oferta">Poznaj naszą ofertę</h1>
                    <p>O krok bliżej do twojego sukcesu</p>
                    <hr style={{border: '2px solid white', width: '3%'}} />
                    <div className="zdjecia">
                        <div className="zdjecie-ramka">
                            <img className="typ-zajec" src={joga} alt="Yoga" />
                            <h1>Yoga</h1>
                            <p>Odpocznij psychicznie podczas ćwiczeń relaksacyjnych i oddechowych.</p>
                        </div>
                        <div className="zdjecie-ramka">
                            <img className="typ-zajec" src={fitness} alt="Zumba" />
                            <h1>Zumba</h1>
                            <p>Daj się porwać do tańca gorącym, latynoskim rytmom.</p>
                        </div>
                        <div className="zdjecie-ramka">
                            <img className="typ-zajec" src={boks} alt="Boks" />
                            <h1>Boks</h1>
                            <p>Wyładuj stres na worku bokserskim. Naucz się wyprowadzać ciosy i trzymać gardę</p>
                        </div>
                    </div>
                    <hr className="linia" style={{border: '1px solid white', width: '55%'}} />
                </div>

                <div className="kalkulator-bmi">
                    <h1 className="bmi-title">Oblicz swoję BMI</h1>
                    <div className="inputs">
                        <div className="input">
                            <p className="input-opis">Waga w kg</p>
                            <input className="inp" id="number1" type="text" placeholder="Waga" />
                        </div>
                        <div className="input">
                            <p className="input-opis">Wzrost w cm</p>
                            <input className="inp" id="number2" type="text" placeholder="Wzrost" />
                        </div>
                    </div>
                    <div>
                        <button className="licz-button" onClick={calculateBMI}>Oblicz</button>
                    </div>
                    <div className="wynik-bmi">
                        <p id="result">BMI wynosi: 0</p>
                    </div>
                    <hr className="linia" style={{border: '1px solid white', width: '55%'}} />
                </div>

                <div className="formularz">
                    <h1>Subskrybuj</h1>
                    <p>Zapisz się aby dostawać powiadomenia o najnoszwych promocjach</p>
                    <form action="https://api.web3forms.com/submit" method="POST">
                        <input type="hidden" name="access_key" value="90a31f5b-6985-457b-b956-ab727e203d23"/>
                        <input name="email" className="f-input" type="text" placeholder="E-mail"/>
                        <button className="licz-button">Subskrybuj</button>
                    </form>
                    <hr className="linia" style={{border: '1px solid white', width: '100%'}}/>
                </div>
            </div>

            <div className="footer" id="stopka">
                <div className="footer-section-left">
                    <div className="dane-kontaktowe">
                        <strong className="masz-pytanie">Masz pytania?</strong>
                        <p className="Kontakt">Biuro Obsługi Klienta</p>
                        <p className="numer-telefonu">+48 796 674 772</p>
                        <p className="godziny-otwarcia">PN-CZ 8:00-20:00 | PT 8:00-17:00</p>
                    </div>
                </div>

                <div className="footer-section-middle">
                    <p className="obserwuj-nas">Obserwuj nas!</p>
                    <div className="brand-icon">
                        <i className="fa-brands fa-facebook"></i>
                        <i className="fa-brands fa-instagram"></i>
                        <i className="fa-brands fa-spotify"></i>
                        <i className="fa-brands fa-youtube"></i>
                        <i className="fa-brands fa-tiktok"></i>
                    </div>
                </div>

                <div className="footer-section-right">
                    <img src={logo} className="logo" alt="Logo" />
                </div>
            </div>
        </div>
    );
};

export default Strona;
