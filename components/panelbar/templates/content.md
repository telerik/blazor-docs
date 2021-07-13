---
title: Content Template
page_title: PanelBar - Content Template
description: Use th content template in the PanelBar for Blazor.
slug: panelbar-templates-content
tags: telerik,blazor,panelbar,templates
published: True
position: 10
---

## ContentTemplate

You can control and customize the rendering of the content items in the PanelBar with a `ContentTemplate`. Here is how to use it.

* The `ContentTemplate` is defined under the `PanelBarBinding` tag.
* It provides a `context` object that you can cast to the type, which the PanelBar is bound to.
* The template can include other Razor components or executable code.
* Similar to [`PanelBarBinding`s]({%slug panelbar-data-binding-overview%}), there can be **one** `ContentTemplate` for all items at the same level. If the content of these items should be different, use conditional statements inside the template.
* A `ContentTemplate` displays like a child item. It is rendered only for the items, which have no children.

>caption Use ContentTemplate to customize the content items

````CSHTML
@*Set Level 0, 1 or 2 to the PanelBarBinding to see how the content template appears for specific levels only.*@
@*Without a Level, the ContentTemplate will be applied to all items that have no children, from all levels, which don't have their own binding.*@

<div style="width: 30%;">
    <TelerikPanelBar Data="@Items">
        <PanelBarBindings>
            <PanelBarBinding ItemsField="Items">
                <ContentTemplate>
                    @{
                        var item = context as PanelBarItem;

                        <div style="padding: 8px 16px;">
                            <span style="text-decoration: underline; color: blue;">
                                content template for: @item.Text
                            </span>
                            <br />
                            @if (item.Text == "Item 2")
                            {
                                <TelerikButton Primary="true">Nested Component</TelerikButton>
                            }

                        </div>
                    }
                </ContentTemplate>
            </PanelBarBinding>
        </PanelBarBindings>
    </TelerikPanelBar>
</div>

@code {
    public List<PanelBarItem> Items { get; set; }

    public class PanelBarItem
    {
        public string Text { get; set; }
        public List<PanelBarItem> Items { get; set; }
    }

    protected override void OnInitialized()
    {
        Items = new List<PanelBarItem>()
        {
            new PanelBarItem()
            {
                Text = "Item 1",
                Items = new List<PanelBarItem>()
                {
                    new PanelBarItem()
                    {
                        Text = "Item 1.1"
                    },
                    new PanelBarItem()
                    {
                        Text = "Item 1.2",
                        Items = new List<PanelBarItem>()
                        {
                            new PanelBarItem()
                            {
                                Text = "Item 1.2.1"
                            }
                        }
                    }
                }
            },
            new PanelBarItem()
            {
                Text = "Item 2"
            }
        };

        base.OnInitialized();
    }
}
````

>caption The result from the code snippet above

![ContentTemplate example](images/content-template-example.png)

## See Also

  * [Data Binding a PanelBar]({%slug panelbar-data-binding-overview%})
  * [Live Demo: PanelBar](https://demos.telerik.com/blazor-ui/panelbar/index)
