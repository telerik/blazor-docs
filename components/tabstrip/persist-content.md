---
title: Persist Content
page_title: TabStrip Persist Content
description: Persist Content of the TabStrip for Blazor.
slug: tabstrip-persist-content
tags: telerik,blazor,tab,strip,tabstrip,overview
published: True
position: 13
---

# TabStrip Persist Content

By default, the content of a Tab is rendered in the DOM when this Tab is active. Once it is deactivated, its content is disposed and re-initialized again when the user selects the corresponding tab.

To keep the Tab content in the DOM at all times, set the `PersistContent` boolean attribute of the TabStrip to `true`. In this way the inactive TabStrip content will be hidden with CSS.

>caption Persist the TabStrip content

````CSHTML
<TelerikTabStrip PersistTabContent="true">
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

  * [Live Demo: TabStrip - Persist Tab Content](https://demos.telerik.com/blazor-ui/tabstrip/persist-content)