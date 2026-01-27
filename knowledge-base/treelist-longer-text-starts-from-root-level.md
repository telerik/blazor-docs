---
title: Long text in TreeList does not align with the corresponding level
description: When a text is longer than the column width, it does not align with the corresponding level and starts from the very left
type: how-to
page_title: Long text in TreeList does not align with the corresponding level
slug: treelist-longer-text-starts-from-root-level
position: 
tags: treelist, long, text, not, align
ticketid: 1498752
res_type: kb
components: ["treelist"]
---
## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>TreeList for Blazor</td>
		</tr>
	</tbody>
</table>


## Description
When a text is longer than the column width, it does a line break but the next line doesn't take into account the depth level and starts at the very left.

![treelist-long-text-not-aligned](images/treelist-long-text-not-aligned.png)


## Solution

The following example showcases a CSS way to change the described behavior.

To align all lines of text to the same level do the following:

1. Use the `Class` parameter to set a CSS class to the TreeList and cascade so you affect only its elements, not all instances on the page/app.
1. Create a CSS class setting a default height for the cell and add it to the row through the [`OnCellRender` event](slug:treelist-column-events#oncellrender).
1. The treelist component implements child hierarchy levels padding through hidden spans with classes `k-icon` and `k-i-none`. Use those classes along with the TreeList class to cascade the spans and expand their `height` to `100%` and `float` to `left` so that they take up the height of the cell and text remains only to their right.

![treelist-long-text-aligned](images/treelist-long-text-aligned.png)

````RAZOR

@*Align the child element text with custom CSS*@

<style>
    .MyTreeList .defaultHeight {
        height: 50px;
    }

        .MyTreeList .defaultHeight .k-icon {
            float: left;
            height: 100%;
        }
</style>

<TelerikTreeList Data="@Data"
                 IdField="EmployeeId"
                 ParentIdField="ReportsTo"
                 Pageable="true"
                 Class="MyTreeList">
    <TreeListColumns>
        <TreeListColumn OnCellRender="@OnCellRenderHandler"
                        Field="FirstName" Expandable="true">
        </TreeListColumn>
        <TreeListColumn Field="EmployeeId"></TreeListColumn>
    </TreeListColumns>
</TelerikTreeList>

@code {
    private List<Employee> Data { get; set; }

    private void OnCellRenderHandler(TreeListCellRenderEventArgs args)
    {
        var item = args.Item as Employee;

        if (item.ReportsTo != null)
        {
            args.Class = "defaultHeight";
        }
    }

    public class Employee
    {
        public int EmployeeId { get; set; }
        public string FirstName { get; set; }
        public int? ReportsTo { get; set; }
    }

    protected override void OnInitialized()
    {
        Data = new List<Employee>();
        var rand = new Random();
        int currentId = 1;

        for (int i = 1; i < 3; i++)
        {
            Data.Add(new Employee()
                {
                    EmployeeId = currentId,
                    ReportsTo = null,
                    FirstName = "Employee  " + i.ToString()
                });

            currentId++;
        }
        for (int i = 1; i < 3; i++)
        {
            for (int j = 0; j < 2; j++)
            {
                Data.Add(new Employee()
                    {
                        EmployeeId = currentId,
                        ReportsTo = i,
                        FirstName = "Employee " + j.ToString() + " : Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
                    });
                currentId++;
            }
        }
    }
}
````

