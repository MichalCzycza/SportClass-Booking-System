import React, { useState, useEffect } from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import '../panelKlienta-styles/content.css';

const PanelKlienta = () => {
    const [zajecia, setZajecia] = useState([]);
    const [zapisaneZajecia, setZapisaneZajecia] = useState([]);
    const { id } = useParams();
    const [stareHaslo, setStareHaslo] = useState('');
    const [noweHaslo, setNoweHaslo] = useState('');
    const [potwierdzenieHasla, setPotwierdzenieHasla] = useState('');
    const [hasloError, setHasloError] = useState('');





    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (id) {
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

            fetch(`http://localhost:3000/zajecia/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token,
                },
            })
                .then(response => response.json())
                .then(data => setZapisaneZajecia(data))
                .catch(error => console.error('Błąd pobierania zapisanych zajęć:', error));
        }
    }, [id]);

    const zapiszNaZajecia = (idZajecia) => {
        fetch(`http://localhost:3000/zajecia/${id}/${idZajecia}/zapisz`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('authToken'),
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data && data.idZajecia) {
                    fetch(`http://localhost:3000/zajecia/${id}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'x-auth-token': localStorage.getItem('authToken'),
                        },
                    })
                        .then(response => response.json())
                        .then(updatedZapisaneZajecia => {
                            setZapisaneZajecia(updatedZapisaneZajecia);
                        })
                        .catch(error => console.error('Błąd pobierania zapisanych zajęć:', error));
                } else {
                    console.error('Błąd zapisu na zajęcia');
                }
            })
            .catch(error => console.error('Błąd zapisywania na zajęcia:', error));
    };



    const wypiszZajecia = (idZajecia) => {
        fetch(`http://localhost:3000/zajecia/${id}/${idZajecia}/usun`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('authToken'),
            },
        })
            .then(response => response.json())
            .then(() => {
                fetch(`http://localhost:3000/zajecia/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': localStorage.getItem('authToken'),
                    },
                })
                    .then(response => response.json())
                    .then(data => {
                        setZapisaneZajecia(data);
                    })
                    .catch(error => console.error('Błąd pobierania zapisanych zajęć:', error));
            })
            .catch(error => console.error('Błąd wypisywania z zajęć:', error));
    };



    const isZapisane = (idZajecia) => {
        return zapisaneZajecia.some(zajecie => zajecie.zajecia_id == idZajecia);
    };



    const zmienHaslo = (e) => {
        e.preventDefault();

        if (noweHaslo !== potwierdzenieHasla) {
            setHasloError('Nowe hasło i potwierdzenie hasła muszą być takie same');
            return;
        }


        const hasloRegex = /^(?=.*\d)[A-Za-z\d@$!%*?&]{5,}$/;

        if (!hasloRegex.test(noweHaslo)) {
            setHasloError('Hasło musi mieć co najmniej 5 znaków, i conajmniej jedną cyfrę.');
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
            <h1 className="p">Panel Klienta</h1>
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
                            />
                        </div>
                        {hasloError && <p className="error">{hasloError}</p>}
                        <button className="przycisk-hasla" type="submit">Zmień hasło</button>
                    </form>
                </div>


                <div className="dostepne-zajecia-frame">
                    <h2 className="napis1">Dostępne zajęcia</h2>
                    <ul>
                        {zajecia.map((zajecie) => (
                            <li key={zajecie.zajecia_id}>
                                <p>Nazwa: {zajecie.nazwa}</p>
                                <p>Opis: {zajecie.opis}</p>
                                <p>Trener: {zajecie.trener_id}</p>
                                <p>Data: {zajecie.data_zajec}</p>
                                <p>Godzina: {zajecie.godzina}</p>
                                <p>Ilość miejsc: {zajecie.ilosc_miejsc}</p>

                                {!isZapisane(zajecie.zajecia_id) && (
                                    <button onClick={() => zapiszNaZajecia(zajecie.zajecia_id)}>Zapisz się</button>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="zapisane-zajecia-ramka">
                    <h2>Twoje zapisane zajęcia</h2>
                    <ul>
                        {zapisaneZajecia.map((zajecie) => (
                            <li key={zajecie.zajecia_id}>
                                <p>Nazwa: {zajecie.nazwa}</p>
                                <p>Opis: {zajecie.opis}</p>
                                <p>Data: {zajecie.data_zajec}</p>
                                <p>Godzina: {zajecie.godzina}</p>
                                <p>Status: {zajecie.status}</p>
                                <button onClick={() => wypiszZajecia(zajecie.zajecia_id)}>Wypisz się</button>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        </div>

    );
};

export default PanelKlienta;
