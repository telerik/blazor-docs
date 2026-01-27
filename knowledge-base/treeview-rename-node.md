---
title: How to Rename a TreeView Node
description: Learn how to edit the name (text) of a Treeview node and explore the example that demonstrates a possible approach with an ItemTemplate. 
type: how-to
page_title: How to Rename a TreeView Node?
slug: treeview-kb-rename-node
position: 
tags: telerik, treeview, tree, edit, template
ticketid: 1525532, 1540469, 1629878, 1602035
res_type: kb
components: ["treeview"]
---
## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>TreeView for Blazor</td>
		</tr>
	</tbody>
</table>


## Description
This KB article answers the following questions:
 - Is there any way I can edit the node text within a Blazor TreeView?
 - How can I let the user rename a node? 


## Solution
Use the `ItemTemplate` to determine the node text's rendering and customize the editing UI. For example, you can define a button that initiates editing, a TextBox that modifies the node's name, and another button that saves the changes.

````RAZOR
<TelerikTreeView Data="@FlatData">
    <TreeViewBindings>
        <TreeViewBinding>
            <ItemTemplate>
                @{
                    Item = context as TreeItem;

                    if (Item.Icon != null)
                    {
                        <TelerikSvgIcon Icon="@Item.Icon"></TelerikSvgIcon>
                    }
                    @if (!IsEditing)
                    {
                        <span style="margin-right: 1em;">@Item.Text</span>
                        <TelerikButton Icon="SvgIcon.Pencil" OnClick="@Edit" FillMode="flat"></TelerikButton>
                    }
                    else
                    {
                        <span @onclick:stopPropagation="true">
                            @* Stop the treenode from taking focus when you click in the textbox *@
                            <TelerikTextBox @bind-Value="@Item.Text" @ref="@TextBoxRef"></TelerikTextBox>
                        </span>
                        <TelerikButton Icon="SvgIcon.Save" OnClick="@Save" FillMode="flat"></TelerikButton>
                    }
                }
            </ItemTemplate>
        </TreeViewBinding>
    </TreeViewBindings>
</TelerikTreeView>

@code {
    private List<TreeItem> FlatData { get; set; }

    private TelerikTextBox TextBoxRef { get; set; }

    private TreeItem Item { get; set; }

    private TreeDataService DataService = new TreeDataService();

    private bool IsEditing { get; set; }

    private async Task Edit()
    {
        IsEditing = true;

        //give rendering time to put the markup in and populate the reference
        await InvokeAsync(StateHasChanged);
        await Task.Delay(20);

        if (TextBoxRef != null)
        {
            await TextBoxRef.FocusAsync();
        }
    }

    private async Task Save()
    {
        IsEditing = false;
        await DataService.UpdateNode(Item);
    }

    protected override async Task OnInitializedAsync()
    {
        FlatData = await DataService.GetData();
    }

    public class TreeDataService
    {
        List<TreeItem> items = new List<TreeItem>();

        public async Task<List<TreeItem>> GetData()
        {
            EnsureData();
            return await Task.FromResult(new List<TreeItem>(items));
        }

        public async Task UpdateNode(TreeItem itemToUpdate)
        {
            int itmIndex = items.FindIndex(itm => itm.Id == itemToUpdate.Id);
            if (itmIndex > -1)
            {
                items[itmIndex] = itemToUpdate;
            }
        }

        private void EnsureData()
        {
            if (items == null || !items.Any())
            {
                GenerateData();
            }
        }

        private void GenerateData()
        {
            items = new List<TreeItem>();

            items.Add(new TreeItem()
                {
                    Id = 1,
                    Text = "Project",
                    ParentId = null,
                    HasChildren = true,
                    Icon = SvgIcon.Folder,
                    Expanded = true
                });

            items.Add(new TreeItem()
                {
                    Id = 2,
                    Text = "Design",
                    ParentId = 1,
                    HasChildren = true,
                    Icon = SvgIcon.Brush,
                    Expanded = true
                });
            items.Add(new TreeItem()
                {
                    Id = 3,
                    Text = "Implementation",
                    ParentId = 1,
                    HasChildren = true,
                    Icon = SvgIcon.Folder,
                    Expanded = true
                });

            items.Add(new TreeItem()
                {
                    Id = 4,
                    Text = "site.psd",
                    ParentId = 2,
                    HasChildren = false,
                    Icon = SvgIcon.FilePsd,
                    Expanded = true
                });
            items.Add(new TreeItem()
                {
                    Id = 5,
                    Text = "index.js",
                    ParentId = 3,
                    HasChildren = false,
                    Icon = SvgIcon.Js
                });
            items.Add(new TreeItem()
                {
                    Id = 6,
                    Text = "index.html",
                    ParentId = 3,
                    HasChildren = false,
                    Icon = SvgIcon.Html5
                });
            items.Add(new TreeItem()
                {
                    Id = 7,
                    Text = "styles.css",
                    ParentId = 3,
                    HasChildren = false,
                    Icon = SvgIcon.Css
                });
        }
    }

    public class TreeItem
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public int? ParentId { get; set; }
        public bool HasChildren { get; set; }
        public ISvgIcon Icon { get; set; }
        public bool Expanded { get; set; }
    }
}
````


## See Also

* [TreeView Item Template](slug:components/treeview/templates)