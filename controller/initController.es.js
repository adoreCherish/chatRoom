// response 
import indexController from './indexController';
const initController = {
	init(app, router) {
		app.use(router(_ => {
			_.get('/index/index', indexController.init())
			_.get('/index/insert', indexController.insertData())


		}))
		
	}

}
export default initController;