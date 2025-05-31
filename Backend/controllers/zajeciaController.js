const Zajecia = require('../models/zajecia');

exports.getZajecia = async (req, res) => {
    try {
        const zajecia = await Zajecia.getZajecia();
        res.status(200).json(zajecia);
    } catch (error) {
        console.error('Błąd pobierania zajęć:', error);
        res.status(500).json({ message: 'Błąd serwera' });
    }
};



exports.getZajeciaKlienta = async (req, res) => {
    const clientId = req.params.id;

    try {
        const zajecia = await Zajecia.getZajeciaKlientaById(clientId);
        res.status(200).json(zajecia);
    } catch (error) {
        console.error('Błąd podczas pobierania zajęć klienta:', error);
        res.status(404).json({ message: error.message || 'Błąd serwera' });
    }
};


exports.getZajeciaTrenera = async (req, res) => {
    const trenerId = req.params.id;
    try {
        const zajecia = await Zajecia.getZajeciaTrenera(trenerId);
        res.status(200).json(zajecia);
    } catch (error) {
        console.error('Błąd podczas pobierania zajęć trenera:', error);
        res.status(404).json({ message: error.message || 'Błąd serwera' });
    }
};


exports.odwolajZajecia = async (req, res) => {
    const { idZajecia } = req.params;
    try {
        const result = await Zajecia.odwolajZajecia(idZajecia);

        if (result.affectedRows > 0) {
            return res.json({ success: true, message: 'Zajęcia zostały odwołane.' });
        } else {
            return res.status(404).json({ success: false, message: 'Nie znaleziono zajęć o podanym ID.' });
        }
    } catch (error) {
        console.error('Błąd podczas odwoływania zajęć:', error);
        return res.status(500).json({ success: false, message: 'Wystąpił błąd serwera.' });
    }
};



exports.ZapiszNaZajecia = async (req, res) => {
    const { idKlienta, idZajecia } = req.params;

    console.log(idKlienta);
    console.log(idZajecia);

    try {
        await Zajecia.zapiszKlientaNaZajecia(idKlienta, idZajecia);
        res.status(200).json({
            message: 'Klient został zapisany na zajęcia pomyślnie.',
            idKlienta,
            idZajecia
        });
    } catch (error) {
        console.error('Błąd podczas zapisywania klienta na zajęcia:', error);
        res.status(500).json({ message: 'Błąd serwera' });
    }
};


exports.UsunKlientaZZajecia = async (req, res) => {
    const { idKlienta, idZajecia } = req.params;

    console.log(`Usuwanie klienta o ID: ${idKlienta} z zajęć o ID: ${idZajecia}`);

    try {
        await Zajecia.usunKlientaZZajec(idKlienta, idZajecia);
        res.status(200).json({
            message: 'Klient został usunięty z zajęć pomyślnie.',
            idKlienta,
            idZajecia
        });
    } catch (error) {
        console.error('Błąd podczas usuwania klienta z zajęć:', error);
        res.status(500).json({ message: 'Błąd serwera' });
    }
};


exports.DodajZajecia = async (req, res) => {
    const { nazwa, opis, id_trenera, data, godzina, ilosc_miejsc } = req.body;

    try {
        const result = await Zajecia.dodajZajecia(nazwa, opis, id_trenera, data, godzina, ilosc_miejsc);

        if (result.affectedRows > 0) {
            res.status(201).json({
                success: true,
                message: 'Zajęcia zostały dodane pomyślnie.',
                zajeciaId: result.insertId,
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'Nie udało się dodać zajęć.',
            });
        }
    } catch (error) {
        console.error('Błąd podczas dodawania zajęć:', error);
        res.status(500).json({
            success: false,
            message: 'Wystąpił błąd serwera podczas dodawania zajęć.',
        });
    }
};

exports.EdytujZajecia = async (req, res) => {
    const { idZajecia } = req.params;
    const { nazwa, opis, trener_id, data_zajec, godzina, ilosc_miejsc } = req.body;

    console.log(idZajecia)

    try {
        const result = await Zajecia.EdytujZajecia(
            idZajecia,
            nazwa,
            opis,
            trener_id,
            data_zajec,
            godzina,
            ilosc_miejsc
        );

        if (result.affectedRows > 0) {
            res.status(200).json({
                success: true,
                message: 'Zajęcia zostały zaktualizowane pomyślnie.',
                zajeciaId: idZajecia,
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Nie znaleziono zajęć o podanym ID.',
            });
        }
    } catch (error) {
        console.error('Błąd podczas edytowania zajęć:', error);
        res.status(500).json({
            success: false,
            message: 'Wystąpił błąd serwera podczas edytowania zajęć.',
        });
    }
};



exports.getUczestnikowZapisanychNaZajecia = async (req, res) => {
    const { idZajecia } = req.params;

    try {
        const uczestnicy = await Zajecia.getUczestnikowZapisanychNaZajecia(idZajecia);
        res.status(200).json(uczestnicy || []);
    } catch (error) {
        console.error('Błąd podczas pobierania uczestników:', error);
        res.status(500).json({ message: 'Wystąpił błąd serwera' });
    }
};


exports.potwierzUczestnictwo = async (req, res) => {
    const { idUczestnika, idZajecia } = req.params;

    try {
        const result = await Zajecia.potwierzUczestnictwo(idUczestnika, idZajecia);

        if (result.affectedRows > 0) {
            return res.status(200).json({
                success: true,
                message: 'Uczestnictwo zostało potwierdzone.',
            });
        }
    } catch (error) {
        console.error('Błąd podczas potwierdzania uczestnictwa:', error);
        return res.status(500).json({
            success: false,
            message: 'Błąd serwera podczas potwierdzania uczestnictwa.',
        });
    }
};








