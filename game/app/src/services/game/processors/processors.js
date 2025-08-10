import * as Main from '../index.js';
import _ from 'lodash';

// ? Comminication Helpers
export function Json({ message, target }) {
	const json = JSON.parse(message);
	const properties = Object.getOwnPropertyNames(json);
	Object.getOwnPropertyNames(target).forEach((property) => {
		if (_.includes(properties, property) === false) throw new Error('Invalid JSON');
	});
	return json;
}
