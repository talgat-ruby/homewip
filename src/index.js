// libs
import Koa from 'koa';
import Route from 'koa-router';
import cors from 'kcors';
import bodyParser from 'koa-bodyparser';
import serve from 'koa-static';
import send from 'koa-send';
import { MongoClient } from 'mongodb';

// constants
import { PORT, PATHS } from './constants/app-constants';

// methods, functions, utilities
// import populateDb from './db/';
import API from './rest-api';


const app = new Koa();
const router = new Route();
const uri = (process.env.MONGO_USER && process.env.MONGO_PASSWORD && process.env.MONGO_DATABASE) ?
				`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-shard-00-00-4ukzn.mongodb.net:27017,cluster0-shard-00-01-4ukzn.mongodb.net:27017,cluster0-shard-00-02-4ukzn.mongodb.net:27017/${process.env.MONGO_DATABASE}?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin` :
				'mongodb://localhost:27017/myproject';


MongoClient.connect(uri, (err, db) => {
	// populateDb(db);
	API(router, db);
});

app.use(cors());

app.use(bodyParser());

app.use(router.routes()).use(router.allowedMethods());

if(process.env.NODE_ENV !== 'development') {
	app.use(serve(PATHS.CLIENT));

	app.use(async ctx => {
		await send(ctx, './index.html', { root: PATHS.CLIENT });
	});
}

app.listen(process.env.PORT || PORT);
