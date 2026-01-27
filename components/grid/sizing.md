---
title: Sizing
page_title: Grid - Sizing
description: Adjust the size and modify the appearance of the Telerik UI for Blazor Grid.
slug: grid-sizing
tags: telerik,blazor,grid,size,compact, dense, small
published: true
position: 47
components: ["grid"]
---
# Grid Sizing

This feature attempts to address the need for a **Compact Grid**, which renders more items by utilizing the available space, mainly through setting smaller padding in its cells.

You can increase or decrease the size of the Grid by setting the `Size` attribute to a member of the [`Telerik.Blazor.ThemeConstants.Grid.Size`](slug:Telerik.Blazor.ThemeConstants.Grid.Size).Size class:

| Class members | Manual declarations |
|------------|--------|
|`Small`|`sm`|
|`Medium` <br /> default value|`md`|

>tip Changing the `Size` property affects different building blocks of the component (tables, buttons, inputs, dropdowns, and others). 

>caption The built-in Size modes

```CSHTML
@* These are all built-in Size modes *@

@{ 
    var fields = typeof(Telerik.Blazor.ThemeConstants.Grid.Size)
        .GetFields(System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static
        | System.Reflection.BindingFlags.FlattenHierarchy)
        .Where(field => field.IsLiteral && !field.IsInitOnly).ToList();

    foreach (var field in fields)
    {
        string size = field.GetValue(null).ToString();

        <TelerikGrid Size="@size"
					 Data="@GridData"
			 	     Height="350px">
            <GridColumns>
                <GridColumn Field="ID"></GridColumn>
                <GridColumn Field="TheName" Title="Employee Name"></GridColumn>
            </GridColumns>
        </TelerikGrid>
        <br />
    }
}
@code {
    private IEnumerable<object> GridData = Enumerable.Range(1, 50).Select(x => new { ID = x, TheName = "name " + x });
}
```

## Notes

1. The `Size` option does not affect elements displayed inside a Popup (such as [Filter Menu](slug:grid-filter-menu), [Column Menu](slug:grid-column-menu), etc.). By design, all Popup elements are rendered on root level, so they are not technically inside the Grid. Thus, the `Size` option cannot propagate to them. To change the `Size` options of the elements inside Popups, you can use a template(where available), so you can override the built-in rendering. You can then add custom elements and explicitly specify their `Size`.

1. The `Size` option does not propagate to components rendered inside templates (this includes elements in [GridToolBar](slug:components/grid/features/toolbar), [CommandColumn](slug:components/grid/columns/command), etc.). To change the size of the elements in those components you have to set it explicitly.

>caption Set GridCommandButton Size option

```CSHTML
<TelerikGrid Size="@ThemeConstants.Grid.Size.Small"
             Data="@GridData"
			 Height="350px">
    <GridToolBarTemplate>
        <GridCommandButton Size="@ThemeConstants.Button.Size.Small">Custom Command</GridCommandButton>
    </GridToolBarTemplate>
	<GridColumns>
		<GridColumn Field="ID"></GridColumn>
		<GridColumn Field="TheName" Title="Employee Name"></GridColumn>
        <GridCommandColumn>
            <GridCommandButton Size="@ThemeConstants.Button.Size.Small">Custom Command</GridCommandButton>
        </GridCommandColumn>
	</GridColumns>
</TelerikGrid>

@code {
	private IEnumerable<object> GridData = Enumerable.Range(1, 50).Select(x => new { ID = x, TheName = "name " + x });
}
```

## See Also

  * [Grid Overview](slug:grid-overview)
  * [Live Demo: Grid Sizing](https://demos.telerik.com/blazor-ui/grid/sizing)
  * [Blazor Grid](slug:grid-overview)