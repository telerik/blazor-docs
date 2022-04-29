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

By default, if the accumulative width or height of the tabs in the TabStrip exceed the width or height of the browser a browser-level scrollbar will appear. 

To scroll the tabs only, set the `Scrollable` bool parameter of the TabStrip to `true` (defaults to `false`). You should also set the `Width` (for tabs with [Position]({%slug tabstrip-tabs-position%}) set to top and bottom) and `Height` (for tabs with [Position]({%slug tabstrip-tabs-position%}) set to left and right) to achieve the desired behavior.

>caption Scroll the tabs only

<div class="skip-repl"></div>
````HorizontalScrolling
<TelerikTabStrip Scrollable="true"
                 Width="300px"
                 TabPosition="Telerik.Blazor.TabPosition.Top">
    <TabStripTab Title="First">
        First tab content.
    </TabStripTab>
    <TabStripTab Title="Second" Disabled="true">
        Second tab content. This tab is disabled and you cannot select it.
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
    <TabStripTab Title="Sixth">
        Sixth tab content.
    </TabStripTab>
    <TabStripTab Title="Seventh">
        Seventh tab content.
    </TabStripTab>
    <TabStripTab Title="Eight">
        Eight tab content.
    </TabStripTab>
    <TabStripTab Title="Ninth">
        Ninth tab content.
    </TabStripTab>
    <TabStripTab Title="Tenth">
        Tenth tab content.
    </TabStripTab>
</TelerikTabStrip>
````
````VerticalScrolling
<TelerikTabStrip Scrollable="true"
                 Width="300px"
                 TabPosition="Telerik.Blazor.TabPosition.Top">
    <TabStripTab Title="First">
        First tab content.
    </TabStripTab>
    <TabStripTab Title="Second" Disabled="true">
        Second tab content. This tab is disabled and you cannot select it.
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
    <TabStripTab Title="Sixth">
        Sixth tab content.
    </TabStripTab>
    <TabStripTab Title="Seventh">
        Seventh tab content.
    </TabStripTab>
    <TabStripTab Title="Eight">
        Eight tab content.
    </TabStripTab>
    <TabStripTab Title="Ninth">
        Ninth tab content.
    </TabStripTab>
    <TabStripTab Title="Tenth">
        Tenth tab content.
    </TabStripTab>
</TelerikTabStrip>
````

## See Also

  * [Live Demo: TabStrip - Persist Tab Content](https://demos.telerik.com/blazor-ui/tabstrip/persist-content)