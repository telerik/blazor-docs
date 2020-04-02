---
title: Persist Grid Selection Across Pages
description: How to Persist Grid Selection Across Pages
type: how-to
page_title: Persist Grid Selection Across Pages
slug: common-kb-persist-selection-across-pages
position:
tags:
res_type: kb
---


## Description

How do I select data across different pages without losing the current selection? If I click a row, all other rows are unselected. If I click the header checkbox, only the current page is selected.


## Solution

If your users don't use the `Ctrl` and/or `Shift` buttons to extend the selection, you may want to implement some logic that amends the current selection. This also extends to the Select All checkbox in the header.

An example is available in the following project: [https://github.com/telerik/blazor-ui/tree/master/grid/persist-selection](https://github.com/telerik/blazor-ui/tree/master/grid/persist-selection)

>tip Since our 2.10.0 release the behavior showcased above is delivered out of the box with the `SelectAllMode` parameter of the `GridCheckBoxColumn`.
More information can be found in the [Multiple Selection](https://docs.telerik.com/blazor-ui/components/grid/selection/multiple) article
