---
title: Data Visualization
---

# Data Visualization

- [Picasso Playground](https://github.com/coolinmc6/picasso-playground)
- D3 Playground (under construction)

## D3 in React

- Here is a simple example of a barchart following the basic patterns of D3. The example below is able to show
the transitions which is ideal. I'll explain what's happening in detail below it:

```js
// Barchart.js
import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';

export default ({ height, width, data, margin }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    draw();
  }, [data])
  console.log(data);
  const draw = () => {

    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom
    
    // X Scale
    const xScale = d3
      .scaleBand()
      .domain([...d3.range(0,data.length)])
      .range([0, chartWidth])
    
    // Y Scale
    const yScale = d3
      .scaleLinear()
      .domain([3, -3])
      .range([0, chartHeight])

    // Axes
    const xAxis = d3.axisBottom(xScale)
    const yAxis = d3.axisLeft(yScale);

    d3.select(svgRef.current).select('.x-axis').call(xAxis);
    d3.select(svgRef.current).select('.y-axis').call(yAxis);
    
    // D3
    d3.select(svgRef.current)
      .select('g.bars')
      .selectAll('rect')
      .data(data)
      .transition()
      .duration(1000)
      .attr('x', d => xScale(d.x))
      .attr('y', d => yScale(d.y))
      .attr('width', xScale.bandwidth())
      .attr('height', d => chartHeight - yScale(d.y))
      .style('fill', d => d.color)
  }

  const bars = data.map(d => <rect key={d.x} />)
  return (
    <div>
      <svg height={height} width={width} ref={svgRef}>
        <g 
          className="bars"
          style={{ transform: `translate(${margin.left}px, ${margin.top}px)`}}
        >
          {bars}
        </g>
        <g 
          className="x-axis"
          style={{ transform: `translate(${margin.left}px, ${height - margin.bottom}px)`}}
        />
        <g 
          className="y-axis"
          style={{ transform: `translate(${margin.left}px, ${margin.top}px)`}}
        />
        
      </svg>
    </div>
  )
}
```
- First, with D3 v5+ you can import the entire D3 package or just certain D3 packages. I've been just
importing the whole thing, hence the line `import * as d3 from 'd3'`.
- Height and width are just the dimensions of the entire chart with margin being the room needed for
the axes.
  - the data is just an array with object properties of `x` and `y`
- Next, we create a ref `svgRef` and actually create the svg in JSX. In many of these examples, developers use
D3 to create the svg for them. Here, we can put the `height` and `width` right into the svg element
- The bars should drawn every time the data updates. That is why I have a `useEffect()` there to watch for changes
in the data. Whenever the data is updated, run the `draw()` function.
- Inside my draw function, I do all the basic D3 things:
	- Set my chart height and width
	- Create my X and Y Scales
	- Create my X and Y Axes
	- And then the D3 part of setting the bar characteristics
- Last, I create my bars with a unique key for each 
- **Note:** this isn't quite the enter-exit-update pattern but it works.
