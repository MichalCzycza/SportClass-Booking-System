import React, { useState, useEffect } from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import '../panelKlienta-styles/content.css';

const PanelTrenera = () => {
    const [zajecia, setZajecia] = useState([]);
    const { id } = useParams();
    const [stareHaslo, setStareHaslo] = useState('');
    const [noweHaslo, setNoweHaslo] = useState('');
    const [potwierdzenieHasla, setPotwierdzenieHasla] = useState('');
    const [hasloError, setHasloError] = useState('');
    const [participants, setParticipants] = useState({});
    const [expandedZajecieId, setExpandedZajecieId] = useState(null);


    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (id) {
            fetch(`http://localhost:3000/zajeciaTrenera/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': localStorage.getItem('authToken'),
                },
            })
                .then(response => response.json())
                .then(data => setZajecia(data))
                .catch(error => console.error('Błąd pobierania zajęć:', error));
        }
    }, [id]);

    const zmienHaslo = (e) => {
        e.preventDefault();

        if (noweHaslo !== potwierdzenieHasla) {
            setHasloError('Nowe hasło i potwierdzenie hasła muszą być takie same');
            return;
        }

        const data = {
            stareHaslo: stareHaslo,
            noweHaslo: noweHaslo,
        };

        fetch(`http://localhost:3000/${id}/zmienHaslo`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('authToken'),
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Hasło zostało zmienione!');
                    setStareHaslo('');
                    setNoweHaslo('');
                    setPotwierdzenieHasla('');
                } else {
                    setHasloError(data.message || 'Błąd zmiany hasła');
                }
            })
            .catch(error => {
                setHasloError('Błąd zmiany hasła');
                console.error(error);
            });
    };

    const odwolajZajecia = (idZajecia) => {
        fetch(`http://localhost:3000/zajecia/${id}/${idZajecia}/odwolaj`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('authToken'),
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data && data.success) {
                    fetch(`http://localhost:3000/zajeciaTrenera/${id}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'x-auth-token': localStorage.getItem('authToken'),
                        },
                    })
                        .then(response => response.json())
                        .then(updatedZajecia => {
                            setZajecia(updatedZajecia);
                        })
                }
            })
    };

    const fetchParticipants = (idZajecia) => {
        fetch(`http://localhost:3000/zajecia/${idZajecia}/uczestnicy`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('authToken'),
            },
        })
            .then(response => response.json())
            .then(data => {
                setParticipants(prevState => ({
                    ...prevState,
                    [idZajecia]: data
                }));
                setExpandedZajecieId(idZajecia);
            })
            .catch(error => console.error('Błąd pobierania uczestników:', error));
    };

    const potwierdzUdzial = (idZajecia, idUczestnika) => {
        fetch(`http://localhost:3000/zajecia/${idZajecia}/uczestnik/${idUczestnika}/potwierdz`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('authToken'),
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    fetchParticipants(idZajecia);
                }
            })
            .catch(error => console.error('Błąd potwierdzania uczestnictwa:', error));
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
            <h1 className="p">Panel Trenera</h1>
            <div className="panel-body">
                <div className="Profil">
                    <h2 className="napis-zmien-haslo">Zmień hasło</h2>
                    <form className="form-haslo" onSubmit={zmienHaslo}>
                        <div>
                            <label htmlFor="stareHaslo">Stare hasło</label>
                            <input
                                type="password"
                                id="stareHaslo"
                                value={stareHaslo}
                                onChange={(e) => setStareHaslo(e.target.value)}
                                placeholder="Stare hasło"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="noweHaslo">Nowe hasło</label>
                            <input
                                type="password"
                                id="noweHaslo"
                                value={noweHaslo}
                                onChange={(e) => setNoweHaslo(e.target.value)}
                                placeholder="Nowe hasło"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="potwierdzenieHasla">Potwierdzenie nowego hasła</label>
                            <input
                                type="password"
                                id="potwierdzenieHasla"
                                value={potwierdzenieHasla}
                                onChange={(e) => setPotwierdzenieHasla(e.target.value)}
                                placeholder="Powtórz nowe hasło"
                                required
                            />
                        </div>
                        {hasloError && <p className="error">{hasloError}</p>}
                        <button className="przycisk-hasla" type="submit">Zmień hasło</button>
                    </form>
                </div>

                <div className="dostepne-zajecia-frame">
                    <h2 className="napis1">Twoje zajęcia</h2>
                    <ul>
                        {zajecia.map((zajecie) => (
                            <li key={zajecie.zajecia_id}>
                                <p>Nazwa: {zajecie.nazwa}</p>
                                <p>Opis: {zajecie.opis}</p>
                                <p>Trener: {zajecie.trener_id}</p>
                                <p>Data: {zajecie.data_zajec}</p>
                                <p>Godzina: {zajecie.godzina}</p>
                                <p>Ilość miejsc: {zajecie.ilosc_miejsc}</p>
                                <button className="przycisk-odwolania-zajec" onClick={() => odwolajZajecia(zajecie.zajecia_id)}>Odwołaj</button>

                                <button className="pokaz-przysiskk"
                                    onClick={() => expandedZajecieId === zajecie.zajecia_id ? setExpandedZajecieId(null) : fetchParticipants(zajecie.zajecia_id)}
                                >
                                    {expandedZajecieId === zajecie.zajecia_id ? 'Ukryj uczestników' : 'Pokaż uczestników'}
                                </button>

                                {expandedZajecieId === zajecie.zajecia_id && participants[zajecie.zajecia_id] && (
                                    <div>
                                        <h3 className="lista_uczestnikow">Uczestnicy:</h3>
                                        <ul>
                                            {participants[zajecie.zajecia_id].map((uczestnik) => (
                                                <li key={uczestnik.osoba_id}>
                                                    <p>{uczestnik.imie} {uczestnik.nazwisko}</p>
                                                    {uczestnik.status !== 'potwierdzony' && (
                                                        <button
                                                            onClick={() => potwierdzUdzial(zajecie.zajecia_id, uczestnik.osoba_id)}>
                                                            Potwierdź
                                                        </button>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default PanelTrenera
