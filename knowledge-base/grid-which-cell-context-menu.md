---
title: How do I tell which cell I right clicked in for a context menu?
description: How to tell which grid cell was clicked for context menu
type: how-to
page_title: How to know which grid cell was clicked for context menu
slug: grid-kb-which-cell-context-menu
position: 
tags: 
ticketid: 1499425
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Grid for Blazor</td>
		</tr>
	</tbody>
</table>


## Description
When I right click a cell in a Grid, I want to show context menu. I need to know row, column and ideally cell value.  When using the [grid context menu event]({%slug grid-events%}#onrowcontextmenu), I need to figure out which column was clicked.

## Solution
To distinguish a column (cell) from the rest, you need to:

1. Use the [cell template]({%slug grid-templates-column%}) for columns that need special handling.
2. [Integrate the context menu there]({%slug contextmenu-integration%}) explicitly. 
3. Make sure to stop the event propagation so that the built-in grid event does not trigger.
4. In the specific event handlers for the context menu event, employ your application logic to use the row, and metadata from the event handlers to built the desired context menu experience.

>caption How to tell when the context menu on the grid row was triggered by a specific cell

````CSHTML
This example uses a simple boolean flag for brevity, you can extend the logic to also pass the column name/field or any other metadata you need to use.

<TelerikContextMenu Data="@MenuItems" @ref="@TheContextMenu"
                    TextField="Text" IconField="Icon" DisabledField="Disabled"
                    OnClick="@( (ContextMenuItem itm) => ClickHandler(itm) )">
</TelerikContextMenu>

<TelerikGrid Data="@MyData" Height="500px" OnRowContextMenu="@OnContextMenu">
    <GridColumns>
        <GridColumn Field="@(nameof(SampleData.ID))" Title="Photo">
            <Template>
                @{
                    var employee = context as SampleData;
                    <div @oncontextmenu:preventDefault="true"
                         @oncontextmenu:stopPropagation="true"
                         @oncontextmenu="@( (MouseEventArgs e) => ShowSpecialContextMenu(e, employee, true) )">
                        @* The custom context menu handler here distinguishes one column from another
                            through the third argument it passes, and the row model distinguishes the row.
                            we stop the propagation to prevent the built-in handler from the grid that we use for the other columns
                        *@
                        @employee.ID
                    </div>
                }
            </Template>
        </GridColumn>
        <GridColumn Field="@(nameof(SampleData.Name))" Title="Employee Name" />
        <GridColumn Field="@(nameof(SampleData.HireDate))" Title="Hire Date " />
    </GridColumns>
</TelerikGrid>

@code {
    public List<ContextMenuItem> MenuItems { get; set; }
    TelerikContextMenu<ContextMenuItem> TheContextMenu { get; set; }
    SampleData LastClickedItem { get; set; }

    // create the special menu for a special column
    async Task ShowSpecialContextMenu(MouseEventArgs e, SampleData clickedItem, bool isSpecial)
    {
        await InitializeMenu(clickedItem, isSpecial, e.ClientX, e.ClientY);
    }

    // handle the built-in grid event for the standard columns
    async Task OnContextMenu(GridRowClickEventArgs args)
    {
        if (args.EventArgs is MouseEventArgs e)
        {
            await InitializeMenu(args.Item as SampleData, false, e.ClientX, e.ClientY);
        }
    }

    // menu preparation - here we just enable a menu item for the special column, you can do more
    async Task InitializeMenu(SampleData clickedItem, bool isSpecial, double x, double y)
    {
        LastClickedItem = clickedItem;
        // change the menu items
        // disable one item, you can make bigger changes here too
        MenuItems[0].Disabled = !isSpecial;
        // show the menu
        await TheContextMenu.ShowAsync(x, y);
    }

    // sample handling of the context menu action
    async Task ClickHandler(ContextMenuItem clickedItem)
    {
        // handle the command from the context menu by using the stored metadata
        if (!string.IsNullOrEmpty(clickedItem.CommandName) && LastClickedItem != null)
        {
            Console.WriteLine($"The programm will now perform the {clickedItem.CommandName} operation for {LastClickedItem.Name}");
        }
        LastClickedItem = null;
    }

    // generate sample data for the menu
    protected override void OnInitialized()
    {
        MenuItems = new List<ContextMenuItem>()
        {
            new ContextMenuItem
            {
                Text = "More Info",
                Icon = "information",
                CommandName = "info"
            },
            new ContextMenuItem
            {
                Text = "Delete",
                Icon = "delete",
                CommandName = "delete"
            },
            new ContextMenuItem
            {
                Text = "Report",
                Icon = "cancel",
                CommandName = "report"
            }
        };

        base.OnInitialized();
    }

    public class ContextMenuItem
    {
        public string Text { get; set; }
        public string CommandName { get; set; }
        public string Icon { get; set; }
        public bool Disabled { get; set; }
        public List<ContextMenuItem> Items { get; set; }
    }

    public class SampleData
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public DateTime HireDate { get; set; }
    }

    public IEnumerable<SampleData> MyData = Enumerable.Range(1, 50).Select(x => new SampleData
    {
        ID = x,
        Name = "name " + x,
        HireDate = DateTime.Now.AddDays(-x)
    });
}
````

## Notes

If you need to do this for many columns, you can consider using the [row template]({%slug grid-templates-row%}), and/or extracting the desired logic into its own component so you can repeat it more easily in the grid.

While it might be a performance hit, an event that could make this easier may become available through <a href="https://feedback.telerik.com/blazor/1507338-oncellcontextmenu-event" target="_blank">this request</a>. You can Follow its status there.


