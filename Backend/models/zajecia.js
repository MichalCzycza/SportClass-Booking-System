const db = require('../db');

class Zajecia{
    static async getZajecia() {
        try {
            const result = await db.promise().query('SELECT * FROM zajecia');
            return result[0];
        } catch (error) {
            throw error;
        }
    }

    static async getZajeciaKlientaById(id) {
        try {
            const result = await db.promise().query(
                `SELECT
                osoba.nazwisko,
                zajecia.zajecia_id,
                zajecia.nazwa,
                zajecia.opis, 
                zajecia.data_zajec, 
                zajecia.godzina, 
                osoba_zajecia.status 
            FROM osoba
            JOIN osoba_zajecia ON osoba.osoba_id = osoba_zajecia.osoba_id
            JOIN zajecia ON zajecia.zajecia_id = osoba_zajecia.zajecia_id
            WHERE osoba.osoba_id = ?;`,
                [id]
            );

            return result[0];
        } catch (error) {
            console.error('Błąd podczas pobierania zajęć klienta:', error);
            throw error;
        }
    }


    static async zapiszKlientaNaZajecia(idKlienta, idZajecia) {
        try {
            const result = await db.promise().query(
                'INSERT INTO osoba_zajecia (osoba_id, zajecia_id, status) VALUES (?, ?, ?)',
                [idKlienta, idZajecia, 'oczekujący']
            );
        } catch (error) {
            console.error('Błąd podczas zapisywania klienta na zajęcia:', error);
            throw error;
        }
    }

    static async usunKlientaZZajec(idKlienta, idZajecia) {
        try {
            const result = await db.promise().query(
                'DELETE FROM osoba_zajecia WHERE osoba_id = ? AND zajecia_id = ?',
                [idKlienta, idZajecia]
            );
            return result[0];
        } catch (error) {
            console.error('Błąd podczas usuwania klienta z zajęć:', error);
            throw error;
        }
    }


    static async getZajeciaTrenera(idTrenera) {
        try {
            const result = await db.promise().query(
                'SELECT * FROM zajecia WHERE zajecia.trener_id = ?',
                [idTrenera]
            );
            return result[0];
        } catch (error) {
            console.error('Błąd podczas pobierania zajec trenera:', error);
            throw error;
        }
    }


    static async odwolajZajecia(idZajec) {
        try {
            console.log('Usuwanie zajęć o ID:', idZajec);
            const [result] = await db.promise().query(
                'DELETE FROM zajecia WHERE zajecia.zajecia_id = ?',
                [idZajec]
            );

            if (result.affectedRows === 0) {
                console.log('Brak zajęć do usunięcia');
            }

            return result;
        } catch (error) {
            console.error('Błąd podczas usuwania zajęć:', error);
            throw error;
        }
    }


    static async dodajZajecia(nazwa, opis, trener_id, data, godzina, ilosc_miejsc) {
        try {
            const [result] = await db.promise().query(
                `INSERT INTO zajecia (nazwa, opis, trener_id, data_zajec, godzina, ilosc_miejsc) 
             VALUES (?, ?, ?, ?, ?, ?)`,
                [nazwa, opis, trener_id, data, godzina, ilosc_miejsc]
            );

            if (result.affectedRows > 0) {
                console.log('Zajęcia zostały dodane pomyślnie.');
            } else {
                console.log('Nie udało się dodać zajęć.');
            }

            return result;
        } catch (error) {
            console.error('Błąd podczas dodawania zajęć:', error);
            throw error;
        }
    }


    static async EdytujZajecia(idZajec, nazwa, opis, trener_id, data_zajec, godzina, ilosc_miejsc) {
        try {
            const query = `
            UPDATE zajecia 
            SET nazwa = ?, opis = ?, trener_id = ?, data_zajec = ?, godzina = ?, ilosc_miejsc = ?
            WHERE zajecia_id = ?
        `;

            const [result] = await db.promise().query(query, [
                nazwa,
                opis,
                trener_id,
                data_zajec,
                godzina,
                ilosc_miejsc,
                idZajec,
            ]);

            if (result.affectedRows > 0) {
                console.log(`Zajęcia o ID ${idZajec} zostały zaktualizowane.`);
            } else {
                console.log(`Nie znaleziono zajęć o ID ${idZajec}.`);
            }

            return result;
        } catch (error) {
            console.error('Błąd podczas edytowania zajęć:', error);
            throw error;
        }
    }


    static async getUczestnikowZapisanychNaZajecia(idZajecia) {
        try {
            const result = await db.promise().query(
                `SELECT
                osoba.osoba_id,
                osoba.imie,
                osoba.nazwisko,
                osoba_zajecia.status
            FROM osoba
            JOIN osoba_zajecia ON osoba.osoba_id = osoba_zajecia.osoba_id
            WHERE osoba_zajecia.zajecia_id = ?;`,
                [idZajecia]
            );

            return result[0];
        } catch (error) {
            console.error('Błąd podczas pobierania uczestników zajęć:', error);
            throw error;
        }
    }


    static async potwierzUczestnictwo(idUczestnika, idZajecia) {
        try {
            const query = `
            UPDATE osoba_zajecia
            SET status = 'potwierdzony'
            WHERE osoba_id = ? AND zajecia_id = ?;
        `;

            const [result] = await db.promise().query(query, [idUczestnika, idZajecia]);

            if (result.affectedRows > 0) {
                console.log(`Uczestnictwo klienta o ID ${idUczestnika} zostało potwierdzone na zajęciach o ID ${idZajecia}.`);
            } else {
                console.log(`Nie znaleziono klienta o ID ${idUczestnika} zapisanych na zajęcia o ID ${idZajecia}.`);
            }

            return result;
        } catch (error) {
            console.error('Błąd podczas potwierdzania uczestnictwa:', error);
            throw error;
        }
    }







}

module.exports = Zajecia;