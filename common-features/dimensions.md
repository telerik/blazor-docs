---
title: Dimensions
page_title: Dimensions
description: How dimensions work and are set in the Telerik UI for Blazor component suite
slug: common-features/dimensions
tags: telerik,blazor,dimensions,width,height,percent,pixel
published: True
position: 3
---

# Dimensions

This article explains how dimensional properties like `Width` and `Height`, `Top` and `Left` work in the Telerik UI for Blazor suite to set size and position.

Properties that denote **dimensions and positions are** simple **string properties** that are not parsed by our code. You can provide **valid CSS values** to them. For example, `100px` or `50%` are valid options. This provides you with flexibility without limiting options. At the time of writing there is no `Unit` type in the underlying framework.

The string you provide is usually rendered within an inline `style` attribute, so you must make sure to provide a valid value that will not break other options. You do not need to include a semicolon (`;`).

For elements with **special positioning** (`Top` and `Left` properties), keep in mind that if the parent elements have special CSS positioning, it will affect the position of the component. If you experience issues, inspect the rendered HTML to see what elements are present and what their CSS rules are.

When setting **percentage values** (such as `100%` or `50%`), keep in mind the following - according to the web standards, elements which have their height set in percentage require that the height of their parent is also explicitly set. This requirement applies recursively until either an element with a pixel height or the html element is reached. Elements that are 100% high should not have margins, paddings, borders, or sibling elements.

