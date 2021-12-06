---
title: Persist Content
page_title: TabStrip Persist Content
description: Persist Content of the TabStrip for Blazor.
slug: tabstrip-persist-content
tags: telerik,blazor,tab,strip,tabstrip,overview
published: True
position: 13
---

# Persist Content

By default, the content of the TabStrip is rendered in the DOM when the Tab is active. Once it is deactivated, its content is disposed and re-initialized again when the user selects the corresponding tab.

If you want to change this behavior and keep the TabStrip content in the DOM while the user browses through the tabs, you can achieve that by enabling the `PersistContent` parameter the TabStrip exposes. It takes a `bool` and when set to `true`, the TabStrip content of the inactive tabs will be preserved and only hidden with CSS.

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