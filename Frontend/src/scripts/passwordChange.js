export const validateChangePasswordForm = ({ oldPassword, newPassword, confirmPassword }) => {
    const errors = {};

    if (!oldPassword) {
        errors.oldPassword = 'Stare hasło jest wymagane.';
    }

    if (!newPassword) {
        errors.newPassword = 'Nowe hasło jest wymagane.';
    } else if (newPassword.length < 5) {
        errors.newPassword = 'Nowe hasło musi mieć co najmniej 5 znaków.';
    } else if (!/[0-9]/.test(newPassword)) {
        errors.newPassword = 'Nowe hasło musi zawierać co najmniej jedną cyfrę.';
    }

    if (newPassword !== confirmPassword) {
        errors.confirmPassword = 'Nowe hasło i potwierdzenie hasła muszą być takie same.';
    }

    return errors;
};
