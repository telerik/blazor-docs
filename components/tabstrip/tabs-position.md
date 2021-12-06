---
title: Tabs Position
page_title: TabStrip Tabs Position
description: Overview of the TabStrip for Blazor.
slug: tabstrip-tabs-position
tags: telerik,blazor,tab,strip,tabstrip,position
published: True
position: 10
---

# TabStrip Tabs Position

By default, the tab titles display on top of the tab content.

You can customize their position through the optional `TabPosition` attribute of the `TelerikTabStrip` tag. It takes a member of the `Telerik.Blazor.TabPosition` enumeration:

* `Top` (default)
* `Left`
* `Right`
* `Bottom`

>caption Set the desired tab position.

````CSHTML
<TelerikTabStrip TabPosition="@TabPosition.Bottom">
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

## See Also

  * [Live Demo: TabStrip - Tab Positions](https://demos.telerik.com/blazor-ui/tabstrip/tab-positions)