export const collectionOptions = {
	'validator': {
		'$or': [{
			'title': {
				'$type': 'string',
				'$exists': true
			}
		}, {
			'order': {
				'$type': 'int',
				'$gte': 1,
				'$exists': true
			}
		}, {
			'category': {
				'$type': 'string',
				'$exists': true
			}
		}, {
			'questions': {
				'$type': 'array',
				'$exists': true,
				'$elemMatch': {
					'$or': [{
						'text': {
							'$type': 'string',
							'$exists': true
						}
					}, {
						'order': {
							'$type': 'int',
							'$gte': 1,
							'$exists': true
						}
					}]
				}
			}
		}]
	}
};


export const sampleData = [{
	title: 'Page1',
	order: 1,
	category: 'Living room',
	questions: [{
		text: 'Where to put sofa?',
		order: 1
	}, {
		text: 'TV?',
		order: 3
	}]
}, {
	title: 'Page2',
	order: 3,
	category: 'Kitchen',
	questions: [{
		text: 'How do I want to use my kitchen?',
		order: 2
	}, {
		text: 'Who is likely to be in the kitchen at the same time?',
		order: 3
	}]
}, {
	title: 'Page3',
	order: 5,
	category: 'Kitchen',
	questions: [{
		text: 'Do you eat mostly fresh food or packaged items? ',
		order: 1
	}]
}];
