import express,{Router} from "express"
const spaRoutes: Router = express.Router();

spaRoutes.get('/iamspa', (req, res) => {
  res.send('SPA API');
})

spaRoutes.get('/iamspatwo', (req, res) => {
  res.send('SPA API TWO');
})
export default spaRoutes;
