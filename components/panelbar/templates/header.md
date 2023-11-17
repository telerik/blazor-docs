---
title: Header Template
page_title: PanelBar - Header Template
description: Use th header template in the PanelBar for Blazor.
slug: panelbar-templates-header
tags: telerik,blazor,panelbar,templates
published: True
position: 5
---

# HeaderTemplate


You can control and customize the rendering of the header items in the PanelBar by using the `HeaderTemplate`. It provides a `context` object that you can cast to the type that the PanelBar is bound to.

The `HeaderTemplate` of a level is defined under the `PanelBarBinding` tag.

If no levels are defined the `HeaderTemplate` will apply to the entire data.

>caption Use HeaderTemplate to customize the rendering of the headers in the PanelBar

````CSHTML
@* Customize the rendering of the parent items in the PanelBar *@

<div style="width: 30%;">
    <TelerikPanelBar Data="@Items"
                     @bind-ExpandedItems="@ExpandedItems">
        <PanelBarBindings>
            <PanelBarBinding>
                <HeaderTemplate>
                    @{
                        var item = context as PanelBarItem;

                        <div style="font-weight: bold; text-decoration: underline">
                            @item.Text
                        </div>
                    }
                </HeaderTemplate>
            </PanelBarBinding>
        </PanelBarBindings>
    </TelerikPanelBar>
</div>

@code {
    public List<PanelBarItem> Items { get; set; }
    public IEnumerable<object> ExpandedItems { get; set; } = new List<object>();

    public class PanelBarItem
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public int? ParentId { get; set; }
        public bool HasChildren { get; set; }
        public ISvgIcon Icon { get; set; }
        public string Url { get; set; }
    }

    private List<PanelBarItem> LoadFlatData()
    {
        List<PanelBarItem> items = new List<PanelBarItem>();

        items.Add(new PanelBarItem()
        {
            Id = 1,
            Text = "Project",
            ParentId = null,
            HasChildren = false,
            Icon = SvgIcon.Folder,
            Url = "projectURL.url"
        });

        items.Add(new PanelBarItem()
        {
            Id = 2,
            Text = "Implementation",
            ParentId = null,
            HasChildren = true,
            Icon = SvgIcon.Code
        });

        items.Add(new PanelBarItem()
        {
            Id = 3,
            Text = "C#",
            ParentId = 2,
            HasChildren = false,
            Icon = SvgIcon.Cs
        });

        items.Add(new PanelBarItem()
        {
            Id = 4,
            Text = "HTML 5",
            ParentId = 2,
            HasChildren = false,
            Icon = SvgIcon.Html5
        });

        items.Add(new PanelBarItem()
        {
            Id = 5,
            Text = "CSS",
            ParentId = 2,
            HasChildren = false,
            Icon = SvgIcon.Css
        });

        return items;
    }

    protected override void OnInitialized()
    {
        Items = LoadFlatData();

        ExpandedItems = new List<object>() { Items[1] };

        base.OnInitialized();
    }
}
````

>caption The result from the code snippet above

![HeaderTemplate example](images/header-template-example.png)

## See Also

  * [Data Binding a PanelBar]({%slug panelbar-data-binding-overview%})
  * [Live Demo: PanelBar](https://demos.telerik.com/blazor-ui/panelbar/index)
