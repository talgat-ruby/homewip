import { ObjectID } from 'mongodb';

import { COLLECTIONS } from './constants/db-constants';

export default (router, db) => {
	router.get('/pages', async ({ response }) => {
		try {
			const data = await db.collection(COLLECTIONS.PAGES)
									.find({})
									.project({ title: 1, order: 1 })
									.sort({ order: 1 })
									.toArray();

			response.body = data;
		} catch(e) {
			response.status = 503;
			response.message = 'Something went wrong with database';
		}
	});


	router.get('/categories', async ({ response }) => {
		try {
			const data = await db.collection(COLLECTIONS.PAGES)
									.distinct('category');
			response.body = data;
		} catch(e) {
			response.status = 503;
			response.message = 'Something went wrong with database';
		}
	});


	router.get('/page', async ({
		request: { query: { id } },
		response
	}) => {
		try {
			const data = await db.collection(COLLECTIONS.PAGES)
									.findOne({ _id: ObjectID(id) }, {
										fields: { title: 1, category: 1, questions: 1 }
									});
			response.body = data;
		} catch(e) {
			response.status = 503;
			response.message = 'Something went wrong with database';
		}
	});


	router.post('/page', async ({ request, response }) => {
		try {
			const [{ maxOrder }] = await db.collection(COLLECTIONS.PAGES).aggregate([
				{ $group: { _id: null, maxOrder: { $max: '$order' } } }
			]).toArray();
			await db.collection(COLLECTIONS.PAGES).insertOne({
				...request.body,
				order: maxOrder + 1
			});
			response.status = 200;
		} catch(e) {
			response.status = 503;
			response.message = 'Something went wrong with database';
		}
	});

	router.patch('/page', async ({ request, response }) => {
		try {
			const { id, ...body } = request.body;
			await db.collection(COLLECTIONS.PAGES).updateOne({
				_id: ObjectID(id)
			}, {
				$set: body
			});
			response.status = 200;
		} catch(e) {
			response.status = 503;
			response.message = 'Something went wrong with database';
		}
	});
};
