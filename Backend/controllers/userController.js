const User = require('../models/user');

exports.addUser = async (req, res) => {
    const { email, password, firstName, lastName, phone } = req.body;

    try {
        const newUser = await User.addUser({ email, password, firstName, lastName, phone });

        res.status(201).json({ message: 'Użytkownik został dodany pomyślnie', user: newUser });
    } catch (error) {
        console.error('Błąd dodawania użytkownika:', error);
        res.status(500).json({ message: 'Błąd serwera' });
    }
};

exports.getZajecia = async (req, res) => {
    try {
        const zajecia = await User.getZajecia();
        res.status(200).json(zajecia);
    } catch (error) {
        console.error('Błąd pobierania zajęć:', error);
        res.status(500).json({ message: 'Błąd serwera' });
    }
};


exports.zmianaHasla = async (req, res) => {
    const { id } = req.params;
    const { stareHaslo, noweHaslo } = req.body;

    try {
        const result = await User.zmienHaslo({ id, stareHaslo, noweHaslo });

        res.status(200).json(result);
    } catch (error) {
        console.error('Błąd zmiany hasła:', error);
        res.status(400).json({ message: error.message });
    }
};


exports.SprawdzUzytkownika = async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await User.SprawdzUzytkownika({ email, password });

        if (result.success) {
            res.status(200).json({
                success: true,
                message: 'Logowanie zakończone sukcesem.',
                user: result.user,
            });
        } else {
            alert("Podane błędne dane!")
        }
    } catch (error) {
        console.error('Błąd podczas logowania:', error);
        res.status(500).json({ message: 'Błąd serwera' });
    }
};


exports.getUsers = async (req, res) => {
    try {
        const users = await User.getUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error('Błąd podczas pobierania użytkowników:', error);
        res.status(500).json({ message: 'Błąd serwera' });
    }
};

exports.getUser = async (req, res) => {
    const { email, haslo } = req.body;
    try {
        const users = await User.getUser(email, haslo);
        res.status(200).json(users);
    } catch (error) {
        console.error('Błąd podczas pobierania użytkowników:', error);
        res.status(500).json({ message: 'Błąd serwera' });
    }
};


exports.getTrenerzy = async (req, res) => {
    try {
        const users = await User.getTrenerzy();
        res.status(200).json(users);
    } catch (error) {
        console.error('Błąd podczas pobierania trenerow:', error);
        res.status(500).json({ message: 'Błąd serwera' });
    }
};


exports.updateRola = async (req, res) => {
    const { idUzytkownika } = req.params;
    const { rolaUzytkownika } = req.body;

    try {
        const result = await User.updateRola({ idUzytkownika, rolaUzytkownika });
        res.status(200).json(result);
    } catch (error) {
        console.error('Błąd podczas aktualizacji roli:', error);
        res.status(500).json({ message: 'Błąd serwera' });
    }
};

exports.changeStatus = async (req, res) => {
    const { idUzytkownika } = req.params;

    try {
        const result = await User.changeStatus(idUzytkownika);
        res.status(200).json(result);
    } catch (error) {
        console.error('Błąd podczas zmiany statusu użytkownika:', error);
        res.status(500).json({ message: 'Błąd serwera' });
    }
};



