---
title: Header Template
page_title: TabStrip Header Template
description: Header Template for the Blazor TabStrip component
slug: tabstrip-header-template
tags: telerik,blazor, tabstrip, header, template
published: True
position: 15
---

# Header Template

The TabStrip `HeaderTemplate` allows you to define custom content in the tab header - such as components, icons or badges, instead of plain text.

If you only want to include text in `TabStripTab`'s header use the `Title` attribute of the tab.

If both the `Title` parameter and the `HeaderTemplate` are used, only the `HeaderTemplate` will be rendered.

You can define the `HeaderTemplate` with the following configuration in the `TabStripTab`:

* `<HeaderTemplate>` tag holding the custom content that you want to display in the `TabStripTab`'s title (e.g., components, an icon, icon + text, badge, etc.)

* `<Content>` tag holding the content of the tab.
    * If you do not use the `HeaderTemplate`, you can define the content of the tab directly between its opening and closing tag.

>caption The following example showcases the use of a `<HeaderTemplate>`, including `TelerikIcons`

````CSHTML
@*A couple of tabs with defferent header configuration.*@

<TelerikTabStrip>
    <TabStripTab>
        <HeaderTemplate>            
            <TelerikIcon Icon="email" />
            <strong>Icon and text</strong>
        </HeaderTemplate>
        <Content>            
            This is a tab with a header template including an icon and text.
        </Content>
    </TabStripTab>
    <TabStripTab Title="History">        
        <HeaderTemplate>
            <TelerikIcon Icon="clock" />
            <strong>Icon and text 2</strong>
        </HeaderTemplate>
        <Content>
            This is a tab that has a header template and as well as Title parameter.
            <br />
            Title parameter will not be displayed. Only the Header template will be displayed.
        </Content>
    </TabStripTab>
    <TabStripTab Title="Text only">
        This is a tab with Title parameter. If you want to use only text in the header, 
        set the Title parameter only and you can omit the Content tag.
    </TabStripTab>
</TelerikTabStrip>
````

>tip If you only need to add some styling to the TabStripTab header, you can use the `Class` parameter of the `TabStripTab` to define your custom CSS class instead of the Header template.

## See Also

  * [Live Demo: TabStrip Header Template](https://demos.telerik.com/blazor-ui/tabstrip/header-template)
  * [Live Demo: TabStrip](https://demos.telerik.com/blazor-ui/tabstrip/overview)
  * [Events]({%slug tabstrip-events%})
