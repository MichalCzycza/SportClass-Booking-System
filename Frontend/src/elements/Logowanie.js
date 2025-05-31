import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../logowanie-styles/login-body.css';
import { Link } from 'react-router-dom';
import { validateRegisterForm } from '../scripts/validation';

const Logowanie = ({ setUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [error, setError] = useState('');
    const [validationErrors, setValidationErrors] = useState({});
    const navigate = useNavigate();


    useEffect(() => {
        const userData = sessionStorage.getItem('user');
        if (userData) {
            const parsedUser = JSON.parse(userData);
            setUser(parsedUser);
            navigateToPanel(parsedUser);
        }
    }, []);

    const navigateToPanel = (userData) => {
        if (userData) {
            if (userData.rola === 'admin') {
                navigate(`/panelAdmina/${userData.osoba_id}`);
            } else if (userData.rola === 'klient') {
                navigate(`/panelKlienta/${userData.osoba_id}`);
            } else if (userData.rola === 'trener') {
                navigate(`/panelTrenera/${userData.osoba_id}`);
            } else {
                alert('Nieznana rola użytkownika!');
            }
        }
    };

    const handleRegister = (e) => {
        e.preventDefault();

        const errors = validateRegisterForm({ firstName, lastName, phone, email, password });
        setValidationErrors(errors);

        if (Object.keys(errors).length > 0) {
            return;
        }

        fetch('http://localhost:3000/addUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, firstName, lastName, phone }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Błąd serwera: ${response.statusText}`);
                }

                return response.json();
            })
            .then((data) => {
                console.log('Klient dodany:', data);
                setEmail('');
                setPassword('');
                setFirstName('');
                setLastName('');
                setPhone('');
                alert('Rejestracja zakończona! Możesz się teraz zalogować.');
                setIsLoginMode(true);
            })
            .catch((error) => {
                console.error('Błąd:', error);
            });
    };

    const handleLogin = (e) => {
        e.preventDefault();

        const haslo = password;

        fetch('http://localhost:3000/auth/getToken', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, haslo }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.ok) {
                    console.log('Zalogowano pomyślnie:', data);

                    localStorage.setItem('authToken', data.token);

                    fetch('http://localhost:3000/getUser', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'x-auth-token': `${data.token}`,
                        },
                        body: JSON.stringify({ email, haslo }),
                    })
                        .then((response) => response.json())
                        .then((userData) => {
                            sessionStorage.setItem('user', JSON.stringify(userData));
                            setUser(userData);

                            console.log(sessionStorage.getItem('user'));
                            if (userData) {
                                if (userData.rola === 'admin') {
                                    navigate(`/panelAdmina/${userData.osoba_id}`);
                                } else if (userData.rola === 'klient') {
                                    navigate(`/panelKlienta/${userData.osoba_id}`);
                                } else if (userData.rola === 'trener') {
                                    navigate(`/panelTrenera/${userData.osoba_id}`);
                                } else {
                                    alert('Nieznana rola użytkownika!');
                                }
                            } else {
                                alert('Błąd: brak danych użytkownika.');
                            }
                        })
                        .catch((error) => {
                            console.error('Błąd przy pobieraniu użytkownika:', error);
                            setError('Wystąpił problem z pobieraniem danych użytkownika.');
                        });
                } else {
                    setError('Nieprawidłowy email lub hasło.');
                }
            })
            .catch((error) => {
                console.error('Błąd:', error);
                setError('Wystąpił problem z logowaniem. Spróbuj ponownie.');
            });
    };


    return (
        <div>
            <div className="header">
                <div className="left-section">
                    <div className="custom-icon">
                        <Link to="/" className="href">
                            <i className="fa-solid fa-dumbbell"></i>
                        </Link>
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
            </div>

            <div className="login-content">
                <div className="login-ramka">
                    <h1 className="login-h1">{isLoginMode ? 'Logowanie' : 'Rejestracja'}</h1>
                    <form id="login-form" onSubmit={isLoginMode ? handleLogin : handleRegister}>
                        {!isLoginMode && (
                            <>
                                <div className="login-opis-input">
                                    <input
                                        className="login-input"
                                        type="text"
                                        placeholder="Imię"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                    {validationErrors.firstName && (
                                        <p style={{ color: 'red', fontSize: '12px' }}>
                                            {validationErrors.firstName}
                                        </p>
                                    )}
                                </div>
                                <div className="login-opis-input">
                                    <input
                                        className="login-input"
                                        type="text"
                                        placeholder="Nazwisko"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                    {validationErrors.lastName && (
                                        <p style={{ color: 'red', fontSize: '12px' }}>
                                            {validationErrors.lastName}
                                        </p>
                                    )}
                                </div>
                                <div className="login-opis-input">
                                    <input
                                        className="login-input"
                                        type="text"
                                        placeholder="Telefon"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                    {validationErrors.phone && (
                                        <p style={{ color: 'red', fontSize: '12px' }}>
                                            {validationErrors.phone}
                                        </p>
                                    )}
                                </div>
                            </>
                        )}
                        <div className="login-opis-input">
                            <input
                                className="login-input"
                                type="email"
                                placeholder="E-mail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {!isLoginMode && validationErrors.email && (
                                <p style={{ color: 'red', fontSize: '12px' }}>
                                    {validationErrors.email}
                                </p>
                            )}
                        </div>
                        <div className="login-opis-input">
                            <input
                                className="login-input"
                                type="password"
                                placeholder="Hasło"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {!isLoginMode && validationErrors.password && (
                                <p style={{ color: 'red', fontSize: '12px' }}>
                                    {validationErrors.password}
                                </p>
                            )}
                        </div>
                        {isLoginMode && error && <p style={{ color: 'red' }}>{error}</p>}
                        <button className="login-przycisk" type="submit">
                            {isLoginMode ? 'Zaloguj się' : 'Zarejestruj się'}
                        </button>
                    </form>
                    <p className="switch-mode">
                        {isLoginMode ? 'Nie masz konta? ' : 'Masz już konto? '}
                        <button className="switch-button" onClick={() => setIsLoginMode(!isLoginMode)}>
                            {isLoginMode ? 'Zarejestruj się' : 'Zaloguj się'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Logowanie;
