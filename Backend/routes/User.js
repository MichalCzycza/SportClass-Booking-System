const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const auth = require('../middleware/auth');
const { checkRole } = require('../middleware/roles');


router.post('/addUser', UserController.addUser);

router.post('/:id/zmienHaslo',[auth, checkRole(['trener', 'admin', 'klient'])], UserController.zmianaHasla);

router.post('/LoginUser', UserController.SprawdzUzytkownika);

router.get('/uzytkownicy',[auth, checkRole(['admin'])], UserController.getUsers);

router.put('/uzytkownicy/:idUzytkownika/rola',[auth, checkRole(['admin'])], UserController.updateRola);

router.put('/uzytkownicy/:idUzytkownika/zmienStatus',[auth, checkRole(['admin'])], UserController.changeStatus);

router.get('/trenerzy',[auth, checkRole(['admin'])], UserController.getTrenerzy);

router.post('/getUser', [auth, checkRole(['trener', 'admin', 'klient'])], UserController.getUser);









module.exports = router;