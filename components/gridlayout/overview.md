---
title: Overview
page_title: GridLayout Overview
description: Introduiction to the GridLayout for Blazor. The component provides a CSS grid system.
slug: gridlayout-overview
tags: telerik,blazor,gridlayout,overview
published: True
position: 0
---

# GridLayout Overview

The <a href="https://www.telerik.com/blazor-ui/gridlayout" target="_blank">Blazor GridLayout component</a> allows you to arrange the contents of the component in rows and columns in a grid structure. 

#### In This Article:

* [Basics](#basics)

* [Features](#features)

## Basics

To use the Telerik GridLayout for Blazor:

1. Declare the `<TelerikGridLayout>` tag 

1. To define columns in the GridLayout, add one or more `<GridLayoutColumn>` tags to the `<GridLayoutColumns>` collection.
    
1. To define rows in the GridLayout add one or more `<GridLayoutRow>` tags to the `<GridLayoutRows>` collection.

1. Define one or more `<GridLayoutItem>` tags to the `<GridLayoutItems>` collection.

>caption A basic configuration of the Telerik GridLayout

````CSHTML
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

>caption The result from the code snippet above

![overview of the GridLayout functionality](images/gridlayout-overview-basic-example.png121)


>caption Component namespace and reference

````CSHTML
<TelerikGridLayout @ref="@GridLayoutRef">
    <GridLayoutColumns>
        <GridLayoutColumn Width="200px"></GridLayoutColumn>
    </GridLayoutColumns>
    <GridLayoutRows>
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
    </GridLayoutItems>
</TelerikGridLayout>

@code {
    Telerik.Blazor.Components.TelerikGridLayout GridLayoutRef { get; set; }
}
````


## Features

The GridLayout offers the following features:

* `Class` - the CSS class that renders on the main wrapping element of the component.

* `Width`- takes a CSS lenght unit that determines how wide the GridLayout is. See the [Dimensions]({%slug common-features/dimensions%}) article for more details on what units you can use and how dimensions in percent work.

* `ColumnSpacing` - controls the space between the columns in the GridLayout. Use a CSS length unit.

* `RowSpacing` - controls the space between the rows in the GridLayout. Use a CSS length unit.

* `HorizontalAlign` - controls the alignment of the inner items in the GridLayout column based on the X axis. Takes a member of the `GridLayoutHorizontalAlign` enum:

    * `Left`
    
    * `Right`
    
    * `Center`
    
    * `Stretch` - this is the default value. It streches the inner items to the available horizontal space in the column.

* `VerticalAlign` - controls the alignment of the inner items in the GridLayout column based on the Y axis. Takes a member of the `GridLayoutVerticalAlign` enum:

    * `Top`
    
    * `Bottom`
    
    * `Center`
    
    * `Stretch` - this is the default value. It stretches the inner items to the available vertical space in the column. 
    
* `GridLayoutItem` - define items in the GridLayout. See the [Items]({%slug gridlayout-items%}) article for more information. 

* `GridLayoutColumn` - define columns in the GridLayout. You can set their widths by using the `Width` paramter exposed on the `<GridLayoutColumn>` tag.

* `GridLayoutRow` - define rows in the GridLayout. You can set their heights by using the `Height` paramter exposed on the `<GridLayoutRow>` tag.

## See Also

  * [Live Demo: GridLayout](https://demos.telerik.com/blazor-ui/gridlayout/overview)
  * [Items]({%slug gridlayout-items%})
  * [StackLayout API Reference](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.TelerikGridLayout)