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

export { randomKey, socialIconSelector };
