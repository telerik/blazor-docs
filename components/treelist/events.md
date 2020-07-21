---
title: Events
page_title: TreeList - Events
description: Events of the treelist for Blazor.
slug: treelist-events
tags: telerik,blazor,treelist,events
published: True
position: 100
---

# TreeList Events

This article explains the events available in the Telerik TreeList for Blazor. They are grouped logically.

* [CUD Events](#cud-events) - events related to Creating, Updating and Deleting items
* [Other Events](#other-events) - other events the treelist provides
	* [Command Button Click](#command-button-click)
	* [SelectedItemsChanged](#selecteditemschanged)
	* [PageChanged](#pagechanged)

## CUD Events

The `OnCreate`, `OnUpdate` and `OnDelete` events let you get the data item that the user changed so you can transfer the user action to the actual data source.

The `OnEdit` and `OnCancel` events let you respond to user actions - when they want to edit an item and when they want to cancel changes on an item they have been editing. You can use them to, for example, prevent editing of certain items based on some condition.

You can read more about the CUD events in the [Editing Overview]({%slug treelist-editing-overview%}) article.

## Other Events



### Command Button Click

The command buttons of a treelist provide an `OnClick` event before firing their built-in command (such as opening a row for editing, or adding a new row). You can do this to implement some additional logic and to also handle custom commands - both from a [Command Column]({%slug treelist-columns-command%}), and from a [Toolbar Button]({%slug treelist-toolbar%}).

### SelectedItemsChanged

Fires when the item selection is enabled and the user changes the selected [item]({%slug treelist-selection-single%}#selecteditemschanged-event) or [items]({%slug treelist-selection-multiple%}#selecteditemschanged-event).



### PageChanged

The event fires when the user pages the treelist.

````CSHTML
@result

<TelerikTreeList Data="@Data"
                 Pageable="true" PageChanged="@PageChangedHandler"
                 IdField="Id" ParentIdField="ParentId"
                 Width="650px">
    <TreeListColumns>
        <TreeListColumn Field="Name" Expandable="true" Width="300px"></TreeListColumn>
        <TreeListColumn Field="Id"></TreeListColumn>
    </TreeListColumns>
</TelerikTreeList>

@code {
    public List<Employee> Data { get; set; }

    string result { get; set; }
    async Task PageChangedHandler(int currPage)
    {
        result = $"the user is now on page {currPage}. Note - the indexes are 1-based, not 0-based";
    }

    protected override async Task OnInitializedAsync()
    {
        Data = await GetTreeListData();
    }

    // sample models and data generation

    public class Employee
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public string Name { get; set; }
    }

    async Task<List<Employee>> GetTreeListData()
    {
        List<Employee> data = new List<Employee>();

        for (int i = 1; i < 15; i++)
        {
            data.Add(new Employee
            {
                Id = i,
                ParentId = null,
                Name = $"root: {i}"
            });

            for (int j = 2; j < 5; j++)
            {
                int currId = i * 100 + j;
                data.Add(new Employee
                {
                    Id = currId,
                    ParentId = i,
                    Name = $"first level child of {i}"
                });

                for (int k = 3; k < 5; k++)
                {
                    data.Add(new Employee
                    {
                        Id = currId * 1000 + k,
                        ParentId = currId,
                        Name = $"second level child of {i} and {currId}"
                    }); ;
                }
            }
        }

        return await Task.FromResult(data);
    }
}
````

## See Also

  * [TreeList Overview]({%slug treelist-overview%})
  * [TreeList Editing Overview]({%slug treelist-editing-overview%})
  
