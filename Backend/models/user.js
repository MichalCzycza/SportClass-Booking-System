const db = require('../db');

class User {


    static async getUsers() {
        try {
            const [rows] = await db.promise().query(
                'SELECT osoba.osoba_id, osoba.imie, osoba.nazwisko, osoba.email, osoba.telefon, osoba.rola,osoba.data_dolaczenia, osoba.status FROM osoba'
            );

            return rows;
        } catch (error) {
            console.error('Błąd podczas pobierania użytkowników:', error);
            throw error;
        }
    }


    static async getUser(email, haslo) {
        try {
            const [rows] = await db.promise().query(
                'SELECT osoba.osoba_id, osoba.imie, osoba.nazwisko, osoba.email, osoba.telefon, osoba.rola,osoba.data_dolaczenia, osoba.status FROM osoba WHERE osoba.email = ? AND osoba.haslo = ?', [email, haslo]
            );

            return rows[0];
        } catch (error) {
            console.error('Błąd podczas pobierania użytkowników:', error);
            throw error;
        }
    }

    static async getTrenerzy() {
        try {
            const [rows] = await db.promise().query(
                'SELECT osoba.osoba_id, osoba.imie, osoba.nazwisko FROM osoba WHERE osoba.rola = "trener"'
            );

            return rows;
        } catch (error) {
            console.error('Błąd podczas pobierania trenerow:', error);
            throw error;
        }
    }


    static async changeStatus(idUzytkownika) {
        try {
            const [rows] = await db.promise().query(
                'SELECT osoba.status FROM osoba WHERE osoba.osoba_id = ?',
                [idUzytkownika]
            );


            const user = rows[0];
            const newStatus = user.status === 'aktywny' ? 'nieaktywny' : 'aktywny';

            await db.promise().query(
                'UPDATE osoba SET status = ? WHERE osoba.osoba_id = ?',
                [newStatus, idUzytkownika]
            );

            return { success: true, message: `Status użytkownika został zmieniony na ${newStatus}` };
        } catch (error) {
            console.error('Błąd podczas zmiany statusu użytkownika:', error);
            throw error;
        }
    }





    static async updateRola({ idUzytkownika, rolaUzytkownika }) {
        try {
            console.log(idUzytkownika, rolaUzytkownika)
            const result = await db.promise().query(
                'UPDATE osoba SET rola = ? WHERE osoba.osoba_id = ?',
                [rolaUzytkownika, idUzytkownika]
            );

            return { success: true, message: 'Rola użytkownika została zaktualizowana' };
        } catch (error) {
            console.error('Błąd podczas aktualizacji roli użytkownika:', error);
            throw error;
        }
    }



static async addUser({ email, password, firstName, lastName, phone }) {
        try {
            const result = await db.promise().query(
                'INSERT INTO osoba (imie, nazwisko, email, telefon, haslo, rola, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [firstName, lastName, email, phone, password, 'klient', 'aktywny']
            );

            return result[0];
        } catch (error) {
            throw error;
        }
    }

    static async zmienHaslo({ id, stareHaslo, noweHaslo }) {
        try {
            const [rows] = await db.promise().query('SELECT osoba.haslo FROM osoba WHERE osoba.osoba_id = ?', [id]);

            if (rows.length === 0) {
                throw new Error('Użytkownik nie istnieje');
            }

            const user = rows[0];

            const isMatch = stareHaslo == user.haslo

            if (!isMatch) {
                throw new Error('Stare hasło jest niepoprawne');
            }

            await db.promise().query('UPDATE osoba SET osoba.haslo = ? WHERE osoba.osoba_id = ?', [noweHaslo, id]);

            return { success: true, message: 'Hasło zostało zmienione!' };
        } catch (error) {
            throw error;
        }
    }


    static async SprawdzUzytkownika({ email, password }) {
        try {
            const [rows] = await db.promise().query(
                'SELECT osoba.osoba_id, osoba.email, osoba.haslo, osoba.rola, osoba.status FROM osoba WHERE osoba.email = ?',
                [email]
            );

            if (rows.length === 0) {
                alert('Użytkownik z podanym emailem nie istnieje.');
            }

            const user = rows[0];

            const isMatch = password === user.haslo;

            if (!isMatch) {
                alert('Nieprawidłowe hasło.');
            }


            return {
                success: true,
                message: 'Użytkownik zalogowany pomyślnie.',
                user: {
                    id: user.osoba_id,
                    imie: user.imie,
                    nazwisko: user.nazwisko,
                    email: user.email,
                    telefon: user.telefon,
                    haslo: user.haslo,
                    rola: user.rola,
                    data_dolaczenia: user.data_dolaczenia,
                    status: user.status
                }
            };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }






}

module.exports = User;
