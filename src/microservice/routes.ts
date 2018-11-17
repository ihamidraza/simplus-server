//////////////////////////////////////////////////////////////////////////////////////////////////
// Microservice router requirements
//////////////////////////////////////////////////////////////////////////////////////////////////
import { Router,  Request, Response } from 'express';

import { FacadeMicroservice } from './facade';
import { authenticate, validate } from '../auth';

//////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * microservice router controller
 */
export const controller  = {
	/**greetings
	 *
	 * test method from microservice
	 */
	greetings : (req: Request, res: Response) => {
		FacadeMicroservice.greet(req.body)
		.then((data) => {
			res.status(200).json(data)
		})
		.catch((err) => {
			res.status(500).send(err)
		})
	},
	auth: (req: Request, res: Response) => {
		 const auth = authenticate();
		 res.send(auth);
	},
	redirect: async (req: Request, res: Response) => {
		validate(req.query.code)
		.then(data => {
			if(!data){
				return res.status(401).send(`You're not authorized !`);
				
			}
			res.cookie('name', data.name);
			res.cookie('simplus_access_token', data.token);
			return res.status(200).redirect('http://localhost:8080');
		})
		.catch(err => {
			res.status(500).send(err)
		})
	}
}

//////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * microservice router
 */
export const microservice: Router = Router()
microservice.get('/', controller.auth)
microservice.get('/redirect', controller.redirect)
microservice.post('/greeting', controller.greetings)

export default microservice