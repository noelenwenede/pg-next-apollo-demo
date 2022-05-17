var casual = require('casual');

function generatePeople() {
	let result = [];

	for (let index = 1; index <= 2000; index++) {
		result.push({
			name: casual._full_name(),
			address: casual.address,
			email: casual.email,
			phone_number: casual.phone
		})
		
	}

	return result;
}

module.exports = {
	generatePeople
}