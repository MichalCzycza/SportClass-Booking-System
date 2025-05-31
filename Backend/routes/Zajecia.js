const express = require('express');
const router = express.Router();
const ZajeciaController = require('../controllers/zajeciaController');
const auth = require('../middleware/auth');
const { checkRole } = require('../middleware/roles');

router.get('/zajecia', ZajeciaController.getZajecia);

router.get('/zajecia/:id',[auth, checkRole(['klient'])], ZajeciaController.getZajeciaKlienta);

router.post('/zajecia/:idKlienta/:idZajecia/zapisz',[auth, checkRole(['klient'])], ZajeciaController.ZapiszNaZajecia);

router.delete('/zajecia/:idKlienta/:idZajecia/usun',[auth, checkRole(['klient'])], ZajeciaController.UsunKlientaZZajecia);

router.get('/zajeciaTrenera/:id',[auth, checkRole(['trener'])], ZajeciaController.getZajeciaTrenera);

router.delete('/zajecia/:idTrenera/:idZajecia/odwolaj',[auth, checkRole(['trener'])], ZajeciaController.odwolajZajecia);

router.post('/zajecia/dodaj',[auth, checkRole(['admin'])], ZajeciaController.DodajZajecia);

router.put(`/zajecia/edytuj/:idZajecia`,[auth, checkRole(['admin'])], ZajeciaController.EdytujZajecia);

router.get(`/zajecia/:idZajecia/uczestnicy`,[auth, checkRole(['trener'])], ZajeciaController.getUczestnikowZapisanychNaZajecia);

router.post(`/zajecia/:idZajecia/uczestnik/:idUczestnika/potwierdz`,[auth, checkRole(['trener'])], ZajeciaController.potwierzUczestnictwo);

module.exports = router;