const correctionMap = {
	Roblox: "Rōblox",
	roblox: "rōblox",
	ROBLOX: "Rōblox",
};

const textTagNames = [
	"p",
	"li",
	"td",
	"caption",
	"span",
	"h1",
	"h2",
	"h3",
	"h4",
	"h5",
	"h6",
	"a",
	"strong",
	"i",
	"em",
	"textarea",
	"input",
	"title",
	"abbr",
	"address",
	"blockquote",
	"cite",
	"q",
	"code",
	"ins",
	"pre",
	"div",
	"ul",
	"ol",
	"li",
	"dl",
	"dd",
	"dt",
	"del",
	"sup",
	"sub",
	"small",
	"b",
];

// Fixes the text given by replacing incorrect spellings of 'Roblox'.
function fixRobloxText(text) {
	Object.entries(correctionMap).forEach(
		([incorrectSpelling, correctSpelling]) => (text = text.replaceAll(incorrectSpelling, correctSpelling))
	);
	return text;
}

// Collects a list of non-empty text nodes descended from `el`.
function deepNonEmptyTextNodes(el) {
	return [...el.childNodes].flatMap((e) =>
		e.nodeType === Node.TEXT_NODE && e.textContent.trim() ? e : deepNonEmptyTextNodes(e)
	);
}

// Traverses the page to find all text tags.
function traverseTags() {
	console.log("Changing all tags...");

	// Iterates over all text on a page to fix misspellings.
	const textTags = [...document.querySelectorAll(textTagNames)];
	textTags.forEach((tagNode) => {
		const textNodes = deepNonEmptyTextNodes(tagNode);
		textNodes.forEach((node) => {
			const newText = fixRobloxText(node.nodeValue);
			if (node.nodeValue != newText) node.nodeValue = newText;
		});
	});
}

setInterval(traverseTags, 1000);
traverseTags();
