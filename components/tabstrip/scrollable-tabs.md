---
title: Scrollable Tabs
page_title: TabStrip Scrollable Tabs
description: Scrollable Tabs in the TabStrip for Blazor.
slug: tabstrip-scroll-tabs
tags: telerik,blazor,tab,strip,tabstrip,scroll,tabs
published: True
position: 15
---

# TabStrip Scrollable Tabs

If the TabStrip dimensions exceed the width or height of the page, a browser-level scrollbar will appear.

To scroll the tabs only, set the `Scrollable` bool parameter of the TabStrip to `true` (defaults to `false`). You should also set the `Width` (for tabs with [Position](slug:tabstrip-tabs-position) set to top and bottom) and `Height` (for tabs with [Position](slug:tabstrip-tabs-position) set to left and right) to achieve the desired behavior.

>caption Scroll the tabs only

````RAZOR Horizontal Scrolling
<TelerikTabStrip Scrollable="true"
                 Width="300px"
                 TabPosition="Telerik.Blazor.TabPosition.Top">
        @{
        for (int i = 0; i < 10; i++)
        {
            <TabStripTab Title="@i.ToString()" @key="@i">
                Tab content.
            </TabStripTab>
        }
    }
</TelerikTabStrip>
````
````RAZOR Vertical Scrolling
<TelerikTabStrip Scrollable="true"
                 Height="200px"
                 TabPosition="Telerik.Blazor.TabPosition.Left">
    @{
        for (int i = 0; i < 10; i++)
        {
            <TabStripTab Title="@i.ToString()" @key="@i">
                Tab content.
            </TabStripTab>
        }
    }
</TelerikTabStrip>
````

## Scroll Buttons Visibility

You can configure the TabStrip to show scroll buttons on both ends of the tab list. To customize this behavior, use the `ScrollButtonsVisibility` parameter of the TabStrip. This option accepts the following values of type `TabStripScrollButtonsVisibility`:

* `Visible` (default) - The scroll buttons will be constantly visible. If the tabs fit inside the TabStrip boundaries, the buttons will be disabled.
* `Auto` - The scroll buttons will be automatically shown if the tabs do not fit inside the TabStrip boundaries.
* `Hidden` - The scroll buttons won't be displayed.

The following example demonstrates this option in action.

````RAZOR
<TelerikTabStrip Scrollable="true"
                 ScrollButtonsVisibility="@TabStripScrollButtonsVisibility.Auto"
                 Width="30vw">
    <TabStripTab Title="First">
        First tab content.
    </TabStripTab>
    <TabStripTab Title="Second">
        Second tab content.
    </TabStripTab>
    <TabStripTab Title="Third">
        Third tab content.
    </TabStripTab>
    <TabStripTab Title="Fourth">
        Fourth tab content.
    </TabStripTab>
    <TabStripTab Title="Fifth">
        Fifth tab content.
    </TabStripTab>
</TelerikTabStrip>
````

## Scroll Buttons Position

By default, the TabStrip renders its scroll buttons on both ends of the tab list. To customize the position of the scroll buttons, use the `ScrollButtonsPosition` parameter of the TabStrip. This option accepts the following values of type `TabStripScrollButtonsPosition`:

* `Split` (default) — The scroll buttons will be rendered on both sides of the tab list.
* `Start` — The scroll buttons will be rendered before the tab list.
* `End` — The scroll buttons will be rendered after the tab list.

The following example demonstrates this option in action.

````RAZOR
<TelerikTabStrip Scrollable="true"
                 ScrollButtonsPosition="@TabStripScrollButtonsPosition.Start"
                 Width="280px">
    <TabStripTab Title="First">
        First tab content.
    </TabStripTab>
    <TabStripTab Title="Second">
        Second tab content.
    </TabStripTab>
    <TabStripTab Title="Third">
        Third tab content.
    </TabStripTab>
    <TabStripTab Title="Fourth">
        Fourth tab content.
    </TabStripTab>
    <TabStripTab Title="Fifth">
        Fifth tab content.
    </TabStripTab>
</TelerikTabStrip>
````

## See Also

  * [Live Demo: TabStrip - Persist Tab Content](https://demos.telerik.com/blazor-ui/tabstrip/persist-content)
  * [Live Demo: TabStrip - Scrollable Tabs](https://demos.telerik.com/blazor-ui/tabstrip/scrollable-tabs)
