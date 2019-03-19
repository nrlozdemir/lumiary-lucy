import fs from "fs";
import path from "path";

const mocks = 'client/api/mocks/createMock';

const readFiles = (filenames, pathName, root) => {
	return filenames.reduce((object, filename) => {
		object[filename] = fs.readFileSync(path.join(root, `${mocks}/${pathName}/${filename}.json`), 'utf8');
		return object;
	}, {});
}

const randomNumber = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

const randomNumberArray = (lenght, min, max) => {
	return [...Array(lenght)].map(() => randomNumber(min, max));
}

const randomPercentage = (lenght) => {
	const numbers = randomNumberArray(lenght, 0, 100);
	const total = numbers.reduce((total, value) => total + value)

	return numbers.map(value => Number(((value / total) * 100).toFixed(2)));
}

const random = file => {
	let data = file;

	data = data.replace(/"rN#(.*),(.*)#"/g, ($0, $1, $2) => {
		// $1 = min, $2 = max
		return randomNumber(parseInt($1), parseInt($2));
	})

	data = data.replace(/"rNA#(.*),(.*),(.*)#"/g, ($0, $1, $2, $3) => {
		// $1 = length, $2 = min, $3 = max
		return JSON.stringify(randomNumberArray(parseInt($1), parseInt($2), parseInt($3)));
	})

	data = data.replace(/"rP#(.*)#"/g, ($0, $1) => {
		// $1 = length
		return JSON.stringify(randomPercentage(parseInt($1)));
	})

	data = data.replace(/image=(.*)"/g, ($0, $1) => {
		return 'image=' + randomNumber(1, 100) + '"';
	})

	return data;
}

module.exports = {
	readFiles,
	randomNumber,
	randomNumberArray,
	randomPercentage,
	random,
}
