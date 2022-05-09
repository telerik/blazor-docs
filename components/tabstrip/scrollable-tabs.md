---
title: Scrollable Tabs
page_title: TabStrip Scrollable Tabs
description: Scrollable Tabs in the TabStrip for Blazor.
slug: tabstrip-scrollalbe-tabs
tags: telerik,blazor,tab,strip,tabstrip,scroll,tabs
published: True
position: 15
---

# TabStrip Scrollable Tabs

By default, if the accumulative width or height of the tabs in the TabStrip exceed the width or height of the browser a browser-level scrollbar will appear. 

To scroll the tabs only, set the `Scrollable` bool parameter of the TabStrip to `true` (defaults to `false`). You should also set the `Width` (for tabs with [Position]({%slug tabstrip-tabs-position%}) set to top and bottom) and `Height` (for tabs with [Position]({%slug tabstrip-tabs-position%}) set to left and right) to achieve the desired behavior.

>caption Scroll the tabs only

<div class="skip-repl"></div>
````HorizontalScrolling
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
````VerticalScrolling
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

## See Also

  * [Live Demo: TabStrip - Persist Tab Content](https://demos.telerik.com/blazor-ui/tabstrip/persist-content)