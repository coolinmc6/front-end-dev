---
title: VS Code
---

# VS Code

**Adding a Snippet**

1. Cmd+Shift+P
2. Select "Preferences: Configure User Snippets"
3. Select the language OR create a new file
4. Follow the format to create your new snipet. Here's an example:

```json
{
	// Place your snippets for <language> here
	"snippetName": {
		"prefix": "trigger",
		"body": [
			"const ${1:variableName} = ${2:value};",
			"$3"
		],
		"description": "description here"
	}
}
```
- Here's a `forEach` loop example:

```json
"forEach loop": {
	"prefix": "forEach",
	"body": [
		"${1:array}.forEach(${2:(item, index) => {",
		"\t${3:// code to execute for each item}",
		"}});"
	],
	"description": "forEach loop"
}
```

[[↑] Back to top](#top)
