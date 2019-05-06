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

const randomNumberArray = (length, min, max) => {
	return [...Array(length)].map(() => randomNumber(min, max));
}

const randomPercentage = (length) => {
	const numbers = randomNumberArray(length, 0, 100);
	const total = numbers.reduce((total, value) => total + value)

	return numbers.map(value => Number(((value / total) * 100).toFixed(2)));
}

const randomSocial = () => {
	const socials = [
		"facebook",
		"twitter",
		"instagram",
		"youtube",
		"pinterest"
	];

	const number = randomNumber(0, (socials.length - 1));

	return socials[number];
}

// Customs
const randomSimilarPropertiesArray = (leftTitles) => {
	const percentages = randomPercentage(4);
	return percentages.map((value, index) => ({
		"leftTitle": leftTitles[index],
		"value": value
	}));
}

const randomCompetitiorArray = (backgroundColors) => {
	const percentages = backgroundColors.map(() => randomPercentage(backgroundColors.length))
	return backgroundColors.map((color, index) => {
		let currentVal = [];
		percentages.map((val) => {
			currentVal.push(val[index])
		})

		return {
			backgroundColor: '#' + color,
			data: currentVal
		}
	})
}

const randomHeaderBarArray = (headerBarTitles) => headerBarTitles.map((title) => ({
	"title": title,
	"value": randomNumber(100, 350),
	"percentage": randomNumber(0, 100),
	"text": "This video is receiving <b>{percentage}% less</b> {title} than your library average"
}))

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

	data = data.replace(/"rSocial"/g, ($0) => {
		return String('"' + randomSocial() + '"');
	})

	data = data.replace(/"rCNT#(.*),(.*),(.*)#"/g, ($0, $1, $2, $3) => {
		return String('"' + randomNumber(parseInt($2), parseInt($3)) + " " + $1 + '"');
	})

  /* data = data.replace(/image=(.*)"/g, ($0, $1) => {
    return 'image=' + randomNumber(1, 100) + '"';
  }) */

	// Customs
	data = data.replace(/"rCSP#(.*)#"/g, ($0, $1) => {
		const leftTitles = $1.replace(/'/g, '"');
		return JSON.stringify(randomSimilarPropertiesArray(JSON.parse(leftTitles)));
	})

	data = data.replace(/"rCTV#(.*)#"/g, ($0, $1) => {
		const backgroundColors = $1.replace(/'/g, '"');
		return JSON.stringify(randomCompetitiorArray(JSON.parse(backgroundColors)));
	})

	data = data.replace(/"rCHB#(.*)#"/g, ($0, $1) => {
		const headerBarTitles = $1.replace(/'/g, '"');
		return JSON.stringify(randomHeaderBarArray(JSON.parse(headerBarTitles)));
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
