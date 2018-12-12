const path = require('path');
const fs = require('fs');
const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();

// Attach static content server
app.use(require('koa-static')(path.join(__dirname, '/public')));

const router = new Router();

router.get('/', ctx => {
	const indexHTML = fs.readFileSync(path.join(__dirname, '/public/index.html'), 'utf-8');
	ctx.body = indexHTML;
});

app.use(router.routes())
	.use(router.allowedMethods());

const port = process.env.PORT || 4000;
app.listen(port);

console.log(`Listening on port ${port}`);

