---
title: Tabs Configuration
page_title: TabStrip Tabs Configuration
description: Overview of the TabStrip for Blazor.
slug: tabstrip-tabs-configuration
tags: telerik,blazor,tab,strip,tabstrip,overview
published: True
position: 7
---

# TabStrip Tabs Configuration

You can configure the `TabStripTab` instances in a TabStrip through the following parameters:

* [Title](#title)
* [Visible](#visible)
* [Disabled](#disabled)


## Title

The `Title` parameter allows you to define the desired text that will be rendered in the Tab heading. If not set, no text will be rendered in the Tab heading.

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

Control tab visibility through the `Visible` parameter of the `TabStripTab`. If you toggle the visibility at runtime, the tab order will be preserved. This is in contrast with adding a tab at runtime with a conditional statement, which adds it at last position.

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