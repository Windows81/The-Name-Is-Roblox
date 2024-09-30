const correctSpelling = "Rōblox"
const incorrectVersions = [
    "Roblox",
    "ROBLOX",
    "roblox",
]

const textTags = [
    'p', 'li', 'td', 'caption', 'span',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'a', 'strong', 'i', 'em', 'textarea',
    'input', 'title', 'abbr', 'address',
    'blockquote', 'cite', 'q', 'code',
    'ins', 'pre', 'div', 'ul', 'ol', 'li',
    'dl', 'dd', 'dt', 'del', 'sup', 'sub',
    'small', 'b',
]

// Fixes the text given by replacing incorrect spellings of 'Roblox'.
function fixRobloxText(text) {
    incorrectVersions.forEach((incorrectSpelling) => {
        text = text.replaceAll(incorrectSpelling, correctSpelling)
    })
    return text
}

// Traverses the page to find all text tags.
function traverseTags() {
    console.log("Changing all tags...")

    const deepNonEmptyTextNodes = el => [...el.childNodes].flatMap(e =>
        e.nodeType === Node.TEXT_NODE && e.textContent.trim() ?
            e : deepNonEmptyTextNodes(e)
    );

    // iterates over all text on a page to fix misspellings of Roblox
    const textTags = [...document.querySelectorAll(textTags)];
    textTags.forEach(tagNode => {
        const textNodes = deepNonEmptyTextNodes(tagNode);
        textNodes.forEach(node => node.nodeValue = fixRobloxText(node.nodeValue))
    })
}

setInterval(traverseTags, 1000)
traverseTags()
