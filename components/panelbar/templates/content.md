---
title: Content Template
page_title: PanelBar - Content Template
description: Use th content template in the PanelBar for Blazor.
slug: panelbar-templates-content
tags: telerik,blazor,panelbar,templates
published: True
position: 10
components: ["panelbar"]
---
## ContentTemplate

You can control and customize the rendering of the content items in the PanelBar with a `ContentTemplate`. Here is how to use it.

* The `ContentTemplate` is defined under the `PanelBarBinding` tag.
* It provides a `context` object that you can cast to the type, which the PanelBar is bound to.
* The template can include other Razor components or executable code.
* Similar to [`PanelBarBinding`s](slug:panelbar-data-binding-overview), there can be **one** `ContentTemplate` for all items at the same level. If the content of these items should be different, use conditional statements inside the template.
* A `ContentTemplate` displays like a child item. It is rendered only for the items, which have no children.

>caption Use ContentTemplate to customize the content items

````RAZOR
@* Set Level 0, 1 or 2 to the PanelBarBinding to see how the content template appears for specific levels only.
Without a Level, the ContentTemplate will be applied to all items that have no children, from all levels without their own binding. *@

<div style="width: 30%;">
    <TelerikPanelBar Data="@Items">
        <PanelBarBindings>
            <PanelBarBinding ItemsField="Items">
                <ContentTemplate>
                    @{
                        var item = context as PanelBarItem;

                        <div style="padding: 8px 16px;">
                            @if (item.Text == "New Web Site")
                            {
                                <strong style="text-decoration: underline; color: green;">
                                    content template for: @item.Text
                                </strong>
                                <br />
                                <TelerikButton ThemeColor="primary">Nested Component</TelerikButton>
                            }
                            else
                            {
                                <span style="text-decoration: solid; color: blue;">
                                    content template for: @item.Text
                                </span>
                                <br />
                            }
                        </div>
                    }
                </ContentTemplate>
            </PanelBarBinding>
        </PanelBarBindings>
    </TelerikPanelBar>
</div>

@code {
    private List<PanelBarItem> Items { get; set; }

    public class PanelBarItem
    {
        public string Text { get; set; }
        public List<PanelBarItem> Items { get; set; }
        public ISvgIcon Icon { get; set; }
    }

    protected override void OnInitialized()
    {
        Items = new List<PanelBarItem>()
        {
            new PanelBarItem()
            {
                Text = "My Documents",
                Icon = SvgIcon.FolderMore,
                Items = new List<PanelBarItem>()
                {
                    new PanelBarItem()
                    {
                        Text = "Reports",
                        Icon = SvgIcon.Folder,
                    },
                    new PanelBarItem
                    {
                        Text = "Projects",
                        Icon = SvgIcon.Folder,
                        Items = new List<PanelBarItem>()
                        {
                            new PanelBarItem()
                            {
                                Text = "November",
                                Icon = SvgIcon.Folder
                            }
                        }
                    }
                }
            },
            new PanelBarItem()
            {
                Text = "New Web Site",
                Icon = SvgIcon.FolderMore
            }
        };

        base.OnInitialized();
    }
}
````

## See Also

  * [Data Binding a PanelBar](slug:panelbar-data-binding-overview)
  * [Live Demo: PanelBar](https://demos.telerik.com/blazor-ui/panelbar/overview)
