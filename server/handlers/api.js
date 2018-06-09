/**
 * Created by ddanilets on 09.06.18.
 */
import { Router as expressRouter } from 'express';
import bodyParser from 'body-parser';
import CityController from '../controllers/CityController';

const router = expressRouter();
router.use(bodyParser.json());

router.get('/info', (req, res) => {
  res.send('OK');
});

router.post('/city', (req, res) => {
  const controller = new CityController();
  controller.setCity(req.body);
  res.send(controller.getBlocks());
});

export default router;