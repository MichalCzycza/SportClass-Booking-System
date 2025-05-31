import React, { useState, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import '../panelAdmina-styles/adminSite.css';

const PanelAdmina = () => {
    const [zajecia, setZajecia] = useState([]);
    const [uzytkownicy, setUzytkownicy] = useState([]);
    const [nazwaZajecia, setNazwaZajecia] = useState('');
    const [opisZajecia, setOpisZajecia] = useState('');
    const [dataZajecia, setDataZajecia] = useState('');
    const [godzinaZajecia, setGodzinaZajecia] = useState('');
    const [iloscMiejsc, setIloscMiejsc] = useState(0);
    const [rolaUzytkownika, setRolaUzytkownika] = useState('klient');
    const [trenerzy, setTrenerzy] = useState([]);
    const [wybranyTrener, setWybranyTrener] = useState('');
    const [edytowaneZajecieId, setEdytowaneZajecieId] = useState(null); // ID edytowanego zajęcia
    const [edytowaneDane, setEdytowaneDane] = useState({
        nazwa: '',
        opis: '',
        trener_id: '',
        data_zajec: '',
        godzina: '',
        ilosc_miejsc: 0,
    });

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        console.log(token);
        fetch('http://localhost:3000/zajecia', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token,
            },
        })
            .then(response => response.json())
            .then(data => setZajecia(data))
            .catch(error => console.error('Błąd pobierania zajęć:', error));

        fetch('http://localhost:3000/uzytkownicy', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token,
            },
        })
            .then(response => response.json())
            .then(data => setUzytkownicy(data))
            .catch(error => console.error('Błąd pobierania użytkowników:', error));

        fetch('http://localhost:3000/trenerzy', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token,
            },
        })
            .then((response) => response.json())
            .then((data) => setTrenerzy(data))
            .catch((error) => console.error('Błąd podczas pobierania trenerów:', error));
    }, []);

    const dodajZajecia = (e) => {
        e.preventDefault();
        const data = {
            nazwa: nazwaZajecia,
            opis: opisZajecia,
            id_trenera: wybranyTrener,
            data: dataZajecia,
            godzina: godzinaZajecia,
            ilosc_miejsc: iloscMiejsc
        };


        console.log(data)

        fetch('http://localhost:3000/zajecia/dodaj', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('authToken'),
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(() => {
                alert('Zajęcia zostały dodane!');
                setNazwaZajecia('');
                setOpisZajecia('');
                setDataZajecia('');
                setGodzinaZajecia('');
                setIloscMiejsc(0);

                fetch('http://localhost:3000/zajecia', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': localStorage.getItem('authToken'),
                    },
                })
                    .then(response => response.json())
                    .then(data => setZajecia(data))
                    .catch(error => console.error('Błąd odświeżania listy zajęć:', error));
            })
            .catch(error => console.error('Błąd dodawania zajęć:', error));
    };


    const rozpocznijEdycje = (zajecie) => {
        setEdytowaneZajecieId(zajecie.zajecia_id);
        setEdytowaneDane({
            nazwa: zajecie.nazwa,
            opis: zajecie.opis,
            trener_id: zajecie.trener_id,
            data_zajec: zajecie.data_zajec,
            godzina: zajecie.godzina,
            ilosc_miejsc: zajecie.ilosc_miejsc,
        });
    };

    const zmienDane = (e) => {
        const { name, value } = e.target;
        setEdytowaneDane((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const zapiszZmiany = (e) => {
        e.preventDefault();

        fetch(`http://localhost:3000/zajecia/edytuj/${edytowaneZajecieId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('authToken'),
            },
            body: JSON.stringify(edytowaneDane),
        })
            .then((response) => response.json())
            .then(() => {
                setEdytowaneZajecieId(null);
                fetch('http://localhost:3000/zajecia', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': localStorage.getItem('authToken'),
                    },
                })
                    .then((response) => response.json())
                    .then((data) => setZajecia(data))
                    .catch((error) => console.error('Błąd odświeżania listy zajęć:', error));
            })
            .catch((error) => console.error('Błąd zapisywania zmian:', error));
    };


    const usunZajecia = (idZajecia) => {
        fetch(`http://localhost:3000/zajecia/1/${idZajecia}/odwolaj`, {
            method: 'DELETE',
            headers: {
                'x-auth-token': localStorage.getItem('authToken'),
            },
        })
            .then(response => response.json())
            .then(() => {
                fetch('http://localhost:3000/zajecia', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': localStorage.getItem('authToken'),
                    },
                })
                    .then(response => response.json())
                    .then(data => setZajecia(data))
                    .catch(error => console.error('Błąd pobierania zajęć:', error));
            })
            .catch(error => console.error('Błąd usuwania zajęć:', error));
    };


    const zmienStatusUzytkownika = (idUzytkownika) => {
        const data = { status: 'nieaktywny' };

        fetch(`http://localhost:3000/uzytkownicy/${idUzytkownika}/zmienStatus`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('authToken'),
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(() => {
                fetchUsers();
            })
            .catch(error => console.error('Błąd zmiany statusu użytkownika:', error));
    };

    const fetchUsers = () => {
        fetch('http://localhost:3000/uzytkownicy', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('authToken'),
            },
        })
            .then(response => response.json())
            .then(data => {
                setUzytkownicy(data);
            })
            .catch(error => console.error('Błąd pobierania użytkowników:', error));
    };


    const nadajRoleUzytkownikowi = (idUzytkownika) => {
        const data = { rolaUzytkownika };

        console.log(data);
        console.log(idUzytkownika);

        fetch(`http://localhost:3000/uzytkownicy/${idUzytkownika}/rola`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('authToken'),
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(() => {
                fetch('http://localhost:3000/uzytkownicy', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': localStorage.getItem('authToken'),
                    },
                })
                    .then(response => response.json())
                    .then(data => setUzytkownicy(data))
                    .catch(error => console.error('Błąd pobierania użytkowników:', error));
            })
            .catch(error => console.error('Błąd nadawania roli użytkownikowi:', error));
    };


    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        sessionStorage.removeItem('user');
        navigate('/logowanie');
    };


    return (

        <div>
        <div className="header">
            <div className="left-section">
                <div className="custom-icon">
                    <a href="/">
                        <i className="fa-solid fa-dumbbell"></i>
                    </a>
                </div>
                <h1 className="tytul">Zbuduj swoje lepsze jutro</h1>
            </div>
            <div className="middle-section">
                <a href="/#oferta">
                    <button className="menu-button">Oferta</button>
                </a>

                <button className="menu-button">Nasze kluby</button>
                <button className="menu-button">O nas</button>
                <a href="/#stopka">
                    <button className="menu-button">Kontakt</button>
                </a>
            </div>

            <div className="right-section">
                <button className="zaloguj-button" onClick={handleLogout}>
                    Wyloguj się
                </button>
            </div>
        </div>

            <div className="adminSite">
                <h1>Panel Admina</h1>
                <div className="panel-admina-body">
            <div className="dodaj-zajecia">
                <h2 className="naglowek-dodaj-zajecia">Dodaj Zajęcia</h2>
                <form className="dodaj-zajecia-form" onSubmit={dodajZajecia}>
                    <div>
                        <label htmlFor="nazwaZajecia">Nazwa zajęć:</label>
                        <input
                            type="text"
                            id="nazwaZajecia"
                            value={nazwaZajecia}
                            onChange={(e) => setNazwaZajecia(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="opisZajecia">Opis zajęć:</label>
                        <input
                            type="text"
                            id="opisZajecia"
                            value={opisZajecia}
                            onChange={(e) => setOpisZajecia(e.target.value)}
                            required
                            />
                        </div>
                        <div>
                            <label htmlFor="dataZajecia">Data zajęć:</label>
                            <input
                                type="date"
                                id="dataZajecia"
                                value={dataZajecia}
                                onChange={(e) => setDataZajecia(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="godzinaZajecia">Godzina zajęć:</label>
                            <input
                                type="time"
                                id="godzinaZajecia"
                                value={godzinaZajecia}
                                onChange={(e) => setGodzinaZajecia(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="iloscMiejsc">Ilość miejsc:</label>
                            <input
                                type="number"
                                id="iloscMiejsc"
                                value={iloscMiejsc}
                                onChange={(e) => setIloscMiejsc(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="trener">Wybierz trenera:</label>
                            <select
                                id="trener"
                                value={wybranyTrener}
                                onChange={(e) => setWybranyTrener(e.target.value)}
                                required
                            >
                                <option value="">-- Wybierz trenera --</option>
                                {trenerzy.map((trener) => (
                                    <option key={trener.osoba_id} value={trener.osoba_id}>
                                        {trener.imie} {trener.nazwisko}
                                    </option>
                                ))}
                            </select>
                        </div>


                        <button type="submit">Dodaj zajęcia</button>
                    </form>
                </div>

                <div className="lista-zajec">
                    <h2 className="lista-zajec-naglowek">Lista zajęć</h2>
                    <ul>
                        {zajecia.map((zajecie) => (
                            <li key={zajecie.zajecia_id}>
                                <p>Nazwa: {zajecie.nazwa}</p>
                                <p>Opis: {zajecie.opis}</p>
                                <p>Trener: {zajecie.trener_id}</p>
                                <p>Data: {zajecie.data_zajec}</p>
                                <p>Godzina: {zajecie.godzina}</p>
                                <p>Ilość miejsc: {zajecie.ilosc_miejsc}</p>
                                <button onClick={() => rozpocznijEdycje(zajecie)}>Edytuj</button>
                                <button onClick={() => usunZajecia(zajecie.zajecia_id)}>Usuń</button>

                                {edytowaneZajecieId === zajecie.zajecia_id && (
                                    <form onSubmit={zapiszZmiany}>
                                        <div>
                                            <label htmlFor="nazwa">Nazwa:</label>
                                            <input
                                                type="text"
                                                name="nazwa"
                                                value={edytowaneDane.nazwa}
                                                onChange={zmienDane}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="opis">Opis:</label>
                                            <input
                                                type="text"
                                                name="opis"
                                                value={edytowaneDane.opis}
                                                onChange={zmienDane}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="data_zajec">Data:</label>
                                            <input
                                                type="date"
                                                name="data_zajec"
                                                value={edytowaneDane.data_zajec}
                                                onChange={zmienDane}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="godzina">Godzina:</label>
                                            <input
                                                type="time"
                                                name="godzina"
                                                value={edytowaneDane.godzina}
                                                onChange={zmienDane}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="ilosc_miejsc">Ilość miejsc:</label>
                                            <input
                                                type="number"
                                                name="ilosc_miejsc"
                                                value={edytowaneDane.ilosc_miejsc}
                                                onChange={zmienDane}
                                                required
                                            />
                                        </div>
                                        <button type="submit">Zapisz</button>
                                        <button type="button" onClick={() => setEdytowaneZajecieId(null)}>
                                            Anuluj
                                        </button>
                                    </form>
                                )}
                            </li>
                        ))}
                    </ul>

                </div>

                <div className="zarzadzaj-uzytkownikami">
                    <h2 className="zarzadzaj-uzytkownikami-naglowek">Zarządzanie użytkownikami</h2>
                    <ul>
                        {uzytkownicy.map((uzytkownik) => (
                            <li key={uzytkownik.osoba_id}>
                                <p>Imie: {uzytkownik.imie}</p>
                                <p>Nazwisko: {uzytkownik.nazwisko}</p>
                                <p>Email: {uzytkownik.email}</p>
                                <p>Telefon: {uzytkownik.telefon}</p>
                                <p>Rola: {uzytkownik.rola}</p>
                                <p>Data dołączenia: {uzytkownik.data_dolaczenia}</p>
                                <p>Status: {uzytkownik.status}</p>
                                <select onChange={(e) => setRolaUzytkownika(e.target.value)}>
                                    <option value="klient">klient</option>
                                    <option value="admin">admin</option>
                                    <option value="trener">trener</option>
                                </select>
                                <button className="nadaj-role-button" onClick={() => nadajRoleUzytkownikowi(uzytkownik.osoba_id)}>Nadaj rolę</button>
                                <button className="zmien-status-button" onClick={() => zmienStatusUzytkownika(uzytkownik.osoba_id)}>Zmień status
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
        </div>
    );
};

export default PanelAdmina;
