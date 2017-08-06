import { COLLECTIONS } from '../constants/db-constants';
import {
	collectionOptions as pagesCollectionOptions,
	sampleData as pagesSampleData
} from './pages-collections';


const COLLECTIONS_LIST = Object.values(COLLECTIONS);

const COLLECTIONS_OPTIONS = {
	[COLLECTIONS.PAGES]: pagesCollectionOptions
};


// create
const createCollection = (db, name) => db.createCollection(name, COLLECTIONS_OPTIONS[name]);

export const createCollections = db => Promise.all(COLLECTIONS_LIST.map(name => createCollection(db, name)));


// find
export const findCollection = (collections, name) => collections[COLLECTIONS_LIST.indexOf(name)];


// delete
const dropCollection = (db, name) => db.dropCollection(name);

export const dropCollections = db => Promise.all(COLLECTIONS_LIST.map(name => dropCollection(db, name)));



export default async db => {
	try {
		// await dropCollections(db);
		await createCollections(db);

		await db.collection(COLLECTIONS.PAGES).insertMany(pagesSampleData);
	} catch(e) {
		console.log(e);
	}
};
