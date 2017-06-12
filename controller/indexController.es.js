import indexModal from '../model/indexModal';
const indexController = {
	init() {
		return async(ctx, next) => {
			ctx.body = await ctx.render('index');
		}
	},
	insertData(){
		return async(ctx, next) => {
			const insert = new indexModal(ctx);
			console.log(ctx.request.query);
			ctx.body = await insert.insertD(ctx.request.query.username,ctx.request.query.message);
		}
	}
}
export default indexController;
