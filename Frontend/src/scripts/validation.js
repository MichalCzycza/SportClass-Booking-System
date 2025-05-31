export const validateRegisterForm = ({ firstName, lastName, phone, email, password }) => {
    const errors = {};

    if (!firstName || firstName.length < 2) {
        errors.firstName = 'Imię musi mieć co najmniej 2 litery.';
    }

    if (!lastName || lastName.length < 2) {
        errors.lastName = 'Nazwisko musi mieć co najmniej 2 litery.';
    }

    if (!phone || !/^\d{9,15}$/.test(phone)) {
        errors.phone = 'Telefon musi być numerem składającym się z 9-15 cyfr.';
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = 'Podaj poprawny adres e-mail.';
    }

    if (!password || !/^(?=.*\d)[A-Za-z\d@$!%*?&._]{5,}$/.test(password)) {
        errors.password = 'Hasło musi mieć co najmniej 5 znaków, i conajmniej jedną cyfrę.';
    }

    return errors;
};
