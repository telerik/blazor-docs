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

The TabStrip always renders the content of a Tab when this Tab becomes active. Once the Tab is deactivated, its content is disposed and re-initialized again when the user selects the corresponding Tab later.

To keep Tab content in the DOM after the Tab is deactivated, set the `PersistContent` boolean parameter of the TabStrip to `true`. In this way the inactive TabStrip content will be hidden with CSS.

>caption Persist the TabStrip content

````RAZOR
<h3>PersistTabContent="true"</h3>

<TelerikTabStrip PersistTabContent="true">
    <TabStripTab Title="First">
        Type something in the textbox. Go to the other tab and then return.
        <br />
        <TelerikTextBox Width="200px" />
    </TabStripTab>
    <TabStripTab Title="Second">
        Go back to the first tab to see the typed content.
    </TabStripTab>
</TelerikTabStrip>

<h3>PersistTabContent="false"</h3>

<TelerikTabStrip>
    <TabStripTab Title="First">
        Type something in the textbox. Go to the other tab and then return.
        <br />
        <TelerikTextBox Width="200px" />
    </TabStripTab>
    <TabStripTab Title="Second">
        The TextBox value in the first tab will not be persisted.
    </TabStripTab>
</TelerikTabStrip>
````

## See Also

* [Live Demo: TabStrip - Persist Tab Content](https://demos.telerik.com/blazor-ui/tabstrip/persist-content)
* [Render All TabStrip Tabs Initially]({%slug tabstrip-kb-load-all-tabs%})
