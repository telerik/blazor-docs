---
title: GridColumn in a separate file is always displayed as last on the right
description: I have noticed that if I specify a GridColumn in a razor component and then try to use it in a Telerik Grid elsewhere, this column gets set as the last one on the right, regardless of where I place it in my code (the "html" order).
page_title: GridColumn in a separate file is always displayed as last on the right
slug: grid-kb-columns-identification-positioning
position: 
tags: telerik,blazor,grid,columns,position,order
ticketid: 1518367
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
I have noticed that if I specify a GridColumn in a razor component and then try to use it in a Telerik Grid elsewhere, this column gets set as the last one on the right, regardless of where I place it in my code (the "html" order). Is there any way to either make the "html" order matter or to specify the position of the column in a grid?

## Cause\Possible Cause(s)
By default, when you add a new column in a grid, this column gets set as the last one on the right. This is the expected behavior. It comes from the way the framework initializes components and also from when such a column initializes and adds itself to the parent grid.

Parent components are initialized before the child components. This is how the framework rendering works by default. On initialization, child components can't be rendered before the parent components. This is why the order in the actual code can't affect the order on initialization.

After the grid initialized, it uses a loop to go through the columns.

>caption Components rendering. The result from the code snippet below.

![grid columns rendering](images/grid-column-rendering.png)

````GridColumnMimic.razor
<h3>Column Mimic - @Id</h3>

@code {
    [Parameter]
    public int Id { get; set; }

    [CascadingParameter]
    public Index ParentComponent {get;set;}

    protected override void OnInitialized()
    {
        ParentComponent.AddChildToParent(Id);
        Console.WriteLine(Id);
        base.OnInitialized();
    }
}
````

````NestedComponent.razor
<GridColumnMimic Id="@Id"></GridColumnMimic>

@code {
    [Parameter]
    public int Id { get; set; }
}
````

````Index.razor
@page "/"

<CascadingValue Value="this">
    <GridColumnMimic Id="1"></GridColumnMimic>
    <NestedComponent Id="2"></NestedComponent>
    <GridColumnMimic Id="3"></GridColumnMimic>
</CascadingValue>

@( new MarkupString(result) )

@*Will output:
         1
         3
         2

   Instead of:
         1
         2
         3
*@

@code {
    string result { get; set; }

    public void AddChildToParent(int index)
    {
        result += $"<br />{index}";
        StateHasChanged();
    }
}
````

## Solution
There are two ways for specifying the position of the columns in the grid:
* Avoid nesting components
* Using the [Grid State]({%slug components/grid/state%}), its methods (GetState, SetState) and events (OnStateInit, OnStateChanged).