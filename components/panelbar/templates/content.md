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


You can control and customize the rendering of the content items in the PanelBar. It provides a `context` object that you can cast to the type that the PanelBar is bound it.

The `ContentTemplate` is defined under the `PanelBarBinding` tag.

>caption Use the ContentTemplate to customize the content items

````CSHTML
@* Customize the rendering of the content items *@

<div style="width: 30%;">
    <TelerikPanelBar Data="@Items">
        <PanelBarBindings>
            <PanelBarBinding ItemsField="Items">
                <ContentTemplate>
                    @{ 
                        var item = context as PanelBarItem;

                        <div style="text-decoration: underline; color: blue">
                            @item.Text
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
                            },
                            new PanelBarItem()
                            {
                                Text = "Item 1.2.2"
                            }
                        }
                    }
                }
            },
            new PanelBarItem()
            {
                Text = "Item 2",
                Items = new List<PanelBarItem>()
                {
                    new PanelBarItem()
                    {
                        Text = "Item 2.1",
                        Items = new List<PanelBarItem>()
                {
                            new PanelBarItem()
                            {
                                Text = "Item 2.1.1"
                            }
                        }
                    },
                    new PanelBarItem()
                    {
                        Text = "Item 2.2"
                    }
                }
            },
            new PanelBarItem()
            {
                Text = "Item 3"
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
