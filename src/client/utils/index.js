function randomKey(char) {
	var text = "";
	var possible =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for (var i = 0; i < char; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));

	return text;
}

function socialIconSelector(key) {
	const socialIcons = {
		facebook: "qf-iconFacebook",
		twitter: "qf-iconTwitter",
		instagram: "qf-iconInstagram",
		youtube: "qf-iconYoutube",
		pinterest: "qf-iconPinterest",
		snapchat: "qf-iconSnapchat"
	};

	return socialIcons[key];
}

function toSlug(str) {
	str = str.replace(/^\s+|\s+$/g, "");
	str = str.toLowerCase();

	const from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
	const to = "aaaaeeeeiiiioooouuuunc------";
	for (let i = 0, l = from.length; i < l; i++) {
		str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
	}

	str = str
		.replace(/[^a-z0-9 -]/g, "")
		.replace(/\s+/g, "-")
		.replace(/-+/g, "-");

	return str;
}

function chartCombineDataset(data, options, globalOptions) {
	return {
		...data,
		...globalOptions,
		datasets: data.datasets.map((dataset, index) => ({
			...dataset,
			...options[index]
		}))
	};
}

export { randomKey, socialIconSelector, toSlug, chartCombineDataset };

