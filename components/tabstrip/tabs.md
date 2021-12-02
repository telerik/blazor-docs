---
title: Tabs
page_title: TabStrip Tabs
description: Overview of the TabStrip for Blazor.
slug: tabstrip-tabs
tags: telerik,blazor,tab,strip,tabstrip,overview
published: True
position: 7
---

# Tabs

You can configure the `TabStripTab` component and its child `TabStrip` instances through the following parameters:

* [Position](#position)
* [Title](#title)
* [Visible](#visible)
* [Disabled](#disabled)


## Position

To control the position of the tab titles, the main `TelerikTabStrip` tag exposes the optional `TabPosition` attribute that takes a member of the `Telerik.Blazor.TabPosition` enumeration:

* `Top` (default)
* `Left`
* `Right`
* `Bottom`

>caption Set the desired tab position.

````CSHTML
<TelerikTabStrip TabPosition="@TabPosition.Left">
    <TabStripTab Title="First">
        First tab content.
    </TabStripTab>
    <TabStripTab Title="Second">
        Second tab content.        
    </TabStripTab>
    <TabStripTab Title="Third">
        Third tab content.
    </TabStripTab>
</TelerikTabStrip>
````

## Title

The `Title` parameter allows you to define the desired text that will be rendered in the Tab heading. If not set, no text will be rendered in the `TabStrip` heading.

>caption Set the desired title for the tab heading.

````CSHTML
<TelerikTabStrip >
    <TabStripTab Title="First">
        First tab content.
    </TabStripTab>
    <TabStripTab Title="Second">
        Second tab content.
    </TabStripTab>
    <TabStripTab Title="Third">
        Third tab content.
    </TabStripTab>
</TelerikTabStrip>
````

## Visible

You can control the visibility of the tabs through the `Visible` parameter the `TabStripTab` exposes. If you toggle a tab visibility at runtime, its order will be preserved.

>caption Toggle the visibility of the second tab

````CSHTML
<TelerikButton OnClick="@ToggleVisible">Toggle Second Tab Visibility</TelerikButton>

<TelerikTabStrip>
    <TabStripTab Title="First" >
        First tab content.
    </TabStripTab>
    <TabStripTab Visible="@Visible" Title="Second">
        Second tab content.
    </TabStripTab>
    <TabStripTab Title="Third">
        Third tab content.
    </TabStripTab>
</TelerikTabStrip>

@code {
    public bool Visible { get; set; }

    public void ToggleVisible()
    {
        Visible = !Visible;
    }
}
````

## Disabled

The `Disabled` parameter allows you to mark a tab as disabled, so the user cannot select it.

>caption Disable the second tab

````CSHTML
<TelerikButton OnClick="@ToggleDisabled">Eanble/Disable Second Tab</TelerikButton>

<TelerikTabStrip>
    <TabStripTab Title="First" >
        First tab content.
    </TabStripTab>
    <TabStripTab Disabled="@Disabled" Title="Second">
        Second tab content.
    </TabStripTab>
    <TabStripTab Title="Third">
        Third tab content.
    </TabStripTab>
</TelerikTabStrip>

@code {
    public bool Disabled { get; set; } = true;

    public void ToggleDisabled()
    {
        Disabled = !Disabled;
    }
}
````

## See Also

  * [Live Demo: TabStrip](https://demos.telerik.com/blazor-ui/tabstrip/index)
  * [Live Demo: TabStrip - Tab Visibility](https://demos.telerik.com/blazor-ui/tabstrip/tab-visibility)