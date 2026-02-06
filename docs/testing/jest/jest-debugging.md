# Jest Debugging

## Visibility vs In the Document

I recently had an issue where I couldn't understand why my tooltip was in
the document (`.toBeInTheDocument()` succeeded) but not visible (`.toBeVisible()` failed).
The Jest output showed that the tooltip was in fact there. Here are some neat tricks to
help debug it:

```tsx
const tooltipElement = screen.getByText("My toolip!");
console.log("Tooltip element:", tooltipElement);
console.log("Tooltip HTML:", tooltipElement.outerHTML);
console.log("Tooltip parent:", tooltipElement.parentElement);

// Try using screen.debug() to see the full DOM structure
screen.debug(tooltipElement, 30000); // Increase maxLength to see more

// Check if it's in the document first
expect(tooltipElement).toBeInTheDocument();

// Try checking specific CSS properties that might block visibility
const styles = window.getComputedStyle(tooltipElement);
console.log("Computed styles:", {
  display: styles.display,
  visibility: styles.visibility,
  opacity: styles.opacity,
  position: styles.position,
  width: styles.width,
  height: styles.height,
});

// Alternative: Check if parent containers are visible
let parent = tooltipElement.parentElement;
while (parent) {
  const parentStyles = window.getComputedStyle(parent);
  console.log("Parent styles:", {
    tagName: parent.tagName,
    display: parentStyles.display,
    visibility: parentStyles.visibility,
    opacity: parentStyles.opacity,
  });
  parent = parent.parentElement;
}
```

It turned out that some styling on the tooltip itself were marked as "hidden". Using the
`screen.logTestingPlaygroundURL();` to visualize what was going on, I could see that it was
not visible. In a situation like this where it works locally with no issues but JSDom can't see
it, I ended up using `toBeInTheDocument()`. There a number of reasons why checking for visibility
possibly didn't work:

- not all styles are loaded
-

To see what your output sees:

```tsx
screen.logTestingPlaygroundURL();
```
