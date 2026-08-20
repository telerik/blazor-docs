---
title: Sizing
page_title: Grid - Sizing
description: Adjust the size and modify the appearance of the Telerik UI for Blazor Grid.
slug: grid-sizing
tags: telerik,blazor,grid,size,compact, dense, small
published: true
position: 47
components: ["grid"]
---

# Grid Sizing

This feature attempts to address the need for a **Compact Grid**, which renders more items by utilizing the available space, mainly through setting smaller padding in its cells.

You can increase or decrease the size of the Grid by setting the `Size` attribute to a member of the [`Telerik.Blazor.ThemeConstants.Grid.Size`](slug:Telerik.Blazor.ThemeConstants.Grid.Size).Size class:

| Class members | Manual declarations |
|------------|--------|
|`Small`|`sm`|
|`Medium` <br /> default value|`md`|

>tip Changing the `Size` property affects different building blocks of the component (tables, buttons, inputs, dropdowns, and others). 

>caption The built-in Size modes

<demo metaUrl="client/grid/sizing-size/"></demo>

## Notes

1. The `Size` option does not affect elements displayed inside a Popup (such as [Filter Menu](slug:grid-filter-menu), [Column Menu](slug:grid-column-menu), etc.). By design, all Popup elements are rendered on root level, so they are not technically inside the Grid. Thus, the `Size` option cannot propagate to them. To change the `Size` options of the elements inside Popups, you can use a template(where available), so you can override the built-in rendering. You can then add custom elements and explicitly specify their `Size`.

1. The `Size` option does not propagate to components rendered inside templates (this includes elements in [GridToolBar](slug:components/grid/features/toolbar), [CommandColumn](slug:components/grid/columns/command), etc.). To change the size of the elements in those components you have to set it explicitly.

>caption Set GridCommandButton Size option

````RAZOR.skip-repl
<TelerikGrid Size="@ThemeConstants.Grid.Size.Small">
    <GridToolBarTemplate>
        <GridCommandButton Size="@ThemeConstants.Button.Size.Small">Small Button</GridCommandButton>
    </GridToolBarTemplate>
    <GridColumns>
        <GridCommandColumn>
            <GridCommandButton Size="@ThemeConstants.Button.Size.Small">Small Button</GridCommandButton>
        </GridCommandColumn>
    </GridColumns>
</TelerikGrid>
````

## See Also

* [Grid Overview](slug:grid-overview)
* [Live Demo: Grid Sizing](https://demos.telerik.com/blazor-ui/grid/sizing)
* [Blazor Grid](slug:grid-overview)