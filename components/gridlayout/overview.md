---
title: Overview
page_title: GridLayout Overview
description: Introduiction to the GridLayout for Blazor. The component provides a CSS grid system.
slug: gridlayout-overview
tags: telerik,blazor,gridlayout,overview
published: True
position: 0
components: ["gridlayout"]
---
# GridLayout Overview

The <a href="https://www.telerik.com/blazor-ui/gridlayout" target="_blank">Blazor GridLayout component</a> allows you to arrange the contents of the component in rows and columns in a grid structure. 

## Creating GridLayout

1. Add the `<TelerikGridLayout>` tag to your razor page. 
1. To define columns in the GridLayout, add one or more `<GridLayoutColumn>` tags to the `<GridLayoutColumns>` collection.
1. To define rows in the GridLayout add one or more `<GridLayoutRow>` tags to the `<GridLayoutRows>` collection.
1. Define one or more `<GridLayoutItem>` tags to the `<GridLayoutItems>` collection.

>caption A basic configuration of the Telerik GridLayout

````RAZOR
@* Split the items in the GridLayout in three columns and two rows. *@

<TelerikGridLayout>
    <GridLayoutColumns>
        <GridLayoutColumn Width="200px"></GridLayoutColumn>
        <GridLayoutColumn Width="200px"></GridLayoutColumn>
        <GridLayoutColumn Width="200px"></GridLayoutColumn>
    </GridLayoutColumns>
    <GridLayoutRows>
        <GridLayoutRow Height="50px"></GridLayoutRow>
    </GridLayoutRows>
    <GridLayoutItems>
        <GridLayoutItem>
            <div style="border: 1px gray solid;">
                item 1
            </div>
        </GridLayoutItem>
        <GridLayoutItem>
            <div style="border: 1px gray solid;">
                item 2
            </div>
        </GridLayoutItem>
        <GridLayoutItem>
            <div style="border: 1px gray solid;">
                item 3
            </div>
        </GridLayoutItem>
        <GridLayoutItem>
            <div style="border: 1px gray solid;">
                item 4
            </div>
        </GridLayoutItem>
        <GridLayoutItem>
            <div style="border: 1px gray solid;">
                item 5
            </div>
        </GridLayoutItem>
    </GridLayoutItems>
</TelerikGridLayout>
````

## Rows

Defining a new `GridLayoutRow` tag to the GridLayout renders a new row in the component. You can set their heights by using the `Height` parameter exposed on the `<GridLayoutRow>` tag.

## Columns

Defining a new `GridLayoutColumn` tag to the GridLayout renders a new column in the component. You can set their widths by using the `Width` parameter exposed on the `<GridLayoutColumn>`.

## Items

The GridLayout Item defines the content of the TelerikGridLayout. [See the Items article for more information...](slug:gridlayout-items)

## GridLayout Parameters

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default value | Description |
|-----------|------------------------|-------------|
| `Class`  | `string` | Adds a custom CSS class to the `<div class="k-grid-layout">` element. |
| `Width`  | `string` | Controls the width of the GridLayout. |
| `ColumnSpacing`  | `string` | Controls the space between the columns in the GridLayout. |
| `RowSpacing`  | `string` | Controls the space between the rows in the GridLayout. |
| `HorizontalAlign`  | `GridLayoutHorizontalAlign` enum <br /> (`Stretch`) | Controls the alignment of the inner items in the GridLayout column based on the X axis. |
| `VerticalAlign`  | `GridLayoutVerticalAlign` enum <br /> (`Stretch`) | Controls the alignment of the inner items in the GridLayout column based on the Y axis. |

## Next Steps

* [Explore the GridLayout Items](slug:gridlayout-items)

## See Also

  * [Live Demo: GridLayout](https://demos.telerik.com/blazor-ui/gridlayout/overview)
  * [GridLayout API Reference](slug:Telerik.Blazor.Components.TelerikGridLayout)
