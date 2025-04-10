# Flexbox Recipes (React + Tailwind)

Common layout patterns solved using modern Flexbox and Tailwind classes — now in JSX.

---

## Centering a Box (both vertically and horizontally)

**Problem:**  
You want to center an element in the middle of its parent.

**Old CSS way:**
```css
.parent {
  position: relative;
}
.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

**Flexbox way (React):**
```jsx
<div className="flex items-center justify-center h-64">
  <div className="w-32 h-32 bg-blue-500" />
</div>
```

---

## Space Between Items Horizontally

**Problem:**  
You want two or more items spaced out across a row.

**Old CSS way:**
```css
.container {
  display: block;
}
.left {
  float: left;
}
.right {
  float: right;
}
```

**Flexbox way (React):**
```jsx
<div className="flex justify-between">
  <div>Left</div>
  <div>Right</div>
</div>
```

---

## Reverse the Order of Items

**Problem:**  
You want to reverse the display order without changing the HTML.

**Old CSS way:**  
Manual DOM reorder or `position: absolute` tricks.

**Flexbox way (React):**
```jsx
<div className="flex flex-row-reverse space-x-reverse space-x-4">
  <div>First</div>
  <div>Second</div>
</div>
```

---

## Sidebar Layout

**Problem:**  
You want a fixed-width sidebar and a flexible main content area.

**Old CSS way:**
```css
.sidebar {
  float: left;
  width: 250px;
}
.content {
  margin-left: 250px;
}
```

**Flexbox way (React):**
```jsx
<div className="flex h-screen">
  <aside className="w-64 bg-gray-200">Sidebar</aside>
  <main className="flex-1 bg-white">Main Content</main>
</div>
```

---

## Equal-Height Columns

**Problem:**  
You want two columns to have equal height, regardless of content.

**Old CSS way:**  
Use `table`, `display: table-cell`, or JavaScript hacks.

**Flexbox way (React):**
```jsx
<div className="flex space-x-4">
  <div className="flex-1 bg-green-100">Short</div>
  <div className="flex-1 bg-green-200">
    Tall<br />Content<br />Here
  </div>
</div>
```

---

## Prevent Item from Growing

**Problem:**  
You want one item in a flex layout to not grow, even if others do.

**Old CSS way:**  
Hardcode width or use `min-width`.

**Flexbox way (React):**
```jsx
<div className="flex">
  <div className="shrink-0 w-32 bg-red-200">Fixed</div>
  <div className="flex-1 bg-red-100">Flexible</div>
</div>
```

---

## Align a Button to the Bottom of a Card

**Problem:**  
You want a button stuck to the bottom of a card with dynamic content above.

**Old CSS way:**  
Manual height calculations, padding hacks.

**Flexbox way (React):**
```jsx
<div className="flex flex-col h-64 border p-4">
  <div className="flex-1">Card content</div>
  <button className="btn mt-4">Action</button>
</div>
```

---

## Align Items in a Navigation Bar

**Problem:**  
You want some items on the left and some on the right.

**Old CSS way:**  
Float left/right and clearfix.

**Flexbox way (React):**
```jsx
<div className="flex justify-between items-center px-4 py-2 bg-gray-800 text-white">
  <div>Logo</div>
  <div className="flex space-x-4">
    <a href="#">Link 1</a>
    <a href="#">Link 2</a>
  </div>
</div>
```

---

💡 *Tip:* Use responsive prefixes like `md:flex-row` or `lg:justify-end` to adapt layouts across screen sizes.
