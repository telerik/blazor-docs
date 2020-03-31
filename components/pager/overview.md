---
title: Paging
page_title: Pager for Blazor Overview
description: Enable and configure paging in Grid for Blazor
slug: components-pager-overview
tags: telerik,blazor,pager,paging
published: True
position: 20
---

# Grid Paging

The Grid component offers support for paging.

To enable paging, set its `Pageable` property to `true`. 

You can control the number of records per page through the `PageSize` property.

You can set the current page of the grid through its integer `Page` property.

>caption Enable paging in Telerik Grid

````CSHTML
Enable paging and start on the second page.

<TelerikGrid Data="@MyData" Pageable="true" PageSize="15" Page="2" Height="500px">
	<GridColumns>
		<GridColumn Field="ID"></GridColumn>
		<GridColumn Field="TheName" Title="Employee Name"></GridColumn>
	</GridColumns>
</TelerikGrid>

@code {
	public IEnumerable<object> MyData = Enumerable.Range(1, 50).Select(x => new { ID = x, TheName = "name " + x });
}
````

>caption The result from the code snippet above

![](images/paging-overview.png)

>tip You can bind the values of those properties to variables in the `@code {}` section. If you want to bind the page index to a variable, you must use the `@bind-Page="@MyPageIndexVariable"` syntax.

Here is one way to implement a page size choice that puts all records on one page.

>caption Bind Page Size to a variable

````CSHTML
Dynamic page size change

<select @onchange=@ChangePageSize>
	@for (int i = 1; i < 4; i++)
	{
		<option value=@(i*10)>@(i * 10)</option>
	}
	<option value="all" selected>all</option>
</select>

<TelerikGrid Data="@MyData" Pageable="true" PageSize="@PageSize">
	<GridColumns>
		<GridColumn Field="ID"></GridColumn>
		<GridColumn Field="TheName" Title="Employee Name"></GridColumn>
	</GridColumns>
</TelerikGrid>

@code {
	public IEnumerable<object> MyData = Enumerable.Range(1, 50).Select(x => new { ID = x, TheName = "name " + x });

	protected int PageSize { get; set; }

	protected void ChangePageSize(ChangeEventArgs e)
	{
		if (e.Value.ToString().ToLowerInvariant() == "all")
		{
			PageSize = MyData.Count();
		}
		else
		{
			PageSize = int.Parse(e.Value.ToString());
		}
	}
}
````

## See Also

  * [Live Demo: Grid Paging](https://demos.telerik.com/blazor-ui/grid/paging)
