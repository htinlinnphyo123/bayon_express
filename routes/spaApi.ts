import express,{Router} from "express"
const spaRoutes: Router = express.Router();

spaRoutes.get('/iamspa', (req, res) => {
  res.send('SPA API');
})
export default spaRoutes;
