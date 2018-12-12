const path = require('path');
const fs = require('fs');
const Koa = require('koa');
const Router = require('koa-router');
const Ajv = require('ajv');
const bodyParser = require('koa-bodyparser');
const {MongoClient} = require('mongodb');

const app = new Koa();
const ajv = new Ajv();
const formSchema = ajv.compile(require('./public/schema.json'));

// Attach static content server
app.use(require('koa-static')(path.join(__dirname, '/public')));

app.use(bodyParser());

const router = new Router();

router.get('/', ctx => {
	const indexHTML = fs.readFileSync(path.join(__dirname, '/index.html'), 'utf-8');
	ctx.body = indexHTML;
});

router.post('/submit', ctx => {
	const input = Object.assign({}, ctx.request.body);
	if (formSchema(input)) {
		console.log('Input is valid, saving it', input);
		MongoClient.connect(process.env.MONGODB_URI, (err, db) => {
			if (err) {
				console.log('Error connecting to mLab', err, process.env.MONGODB_URI);
				throw err;
			}

			const dbo = db.db('heroku_947lsfwb');
			dbo.collection('application').insertOne(input, (err, res) => {
				if (err) {
					console.log('Error inserting application', err);
					throw err;
				}
				console.log('1 document inserted');
				db.close();
			});
			ctx.response.status = 200;
		});
	} else {
		console.log(formSchema.errors);
		ctx.response.status = 401;
	}
});

app.use(router.routes())
	.use(router.allowedMethods());

const port = process.env.PORT || 4000;
app.listen(port);

console.log(`Listening on port ${port}`);

