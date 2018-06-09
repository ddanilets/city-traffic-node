/**
 * Created by ddanilets on 09.06.18.
 */
import { Router as expressRouter } from 'express';
import bodyParser from 'body-parser';
const router = expressRouter();
router.use(bodyParser.json());

router.get('/info', (req, res) => {
  res.send('OK');
});

export default router;