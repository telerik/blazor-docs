---
title: Override Theme Styles
page_title: Override Theme Styles
description: General rules of thumb to override UI for Blazor themes
slug: themes-override
tags: telerik,blazor,theme,override
published: True
position: 6
---

# Override Theme Styles

Sometimes you may need to make a small change to the appearance of a component, while still using the same [built-in]({%slug general-information/themes%}) or [custom]({%slug themes-custom%}) theme.

This article provides high-level guidance about the required knowledge and tools to override existing CSS styles without changing them.

## CSS Knowledge

To override an existing style, you implement another *conflicting* style. To make sure the new style takes precedence, it should have a **higher specificity**.

* [MDN Documentation for CSS Specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity). You may prefer a [less formal explanation](https://www.smashingmagazine.com/2007/07/css-specificity-things-you-should-know/).
* How to easily [calculate CSS Specificity](https://stuffandnonsense.co.uk/archives/images/css-specificity-wars.png) (part of the article [CSS Specificity Wars](https://stuffandnonsense.co.uk/archives/css_specificity_wars.html)).
* [CSS Combinators](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors/Combinators) provide different ways to target an element, depending on its place in the DOM structure. Combinators are often called ["selectors"](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors), which is something different. Developers most commonly use **descendant** or **child** combinators, but there are many other options.

## Tools

To see what CSS styles are applied on an HTML element, use the browser's developer tools.

* [Inspect the HTML output of a page](https://www.telerik.com/blogs/improve-your-debugging-skills-with-chrome-devtools#inspect-the-generated-html-of-a-control)
* [See the applied styles for a specific element](https://www.telerik.com/blogs/improve-your-debugging-skills-with-chrome-devtools#see-the-applied-styles)
* [Inspect elements that hide automatically and disappear from the DOM](https://www.telerik.com/blogs/improve-your-debugging-skills-with-chrome-devtools-(part-2)#inspect-auto-hiding-tooltips-and-elements)

## Blazor CSS Isolation

[CSS isolation](https://docs.microsoft.com/en-us/aspnet/core/blazor/components/css-isolation) is a .NET feature, which scopes styles to a specific Razor component.

* There are two cases when CSS isolation may not work with UI for Blazor components. We explain the reasons and suggest workarounds in [this knowledge base article]({%slug common-kb-css-isolation%}). The two cases are:
   * Using isolated styles with a component `Class`.
   * Using isolated styles for popups (Window, Dialog).
