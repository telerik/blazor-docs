---
title: Edit Grid CheckBoxes with Single Click
description: How to toggle checkboxes in the Grid with one click and edit bool values without using the built-in Grid edit mode.
type: how-to
page_title: How to Change Grid CheckBox Values with One Click
slug: grid-kb-checkbox-editing
position: 
tags: 
ticketid: 1560276, 1562242, 1573118, 1580394, 1587589
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>
                Grid for Blazor, <br />
                TreeList for Blazor
            </td>
        </tr>
    </tbody>
</table>

## Description

This KB article answers the following questions:

* To edit a checkbox in a Grid cell, users need to click once to put the row (or cell) in edit mode. Then they need another click to change the checkbox value. How to do this with only one click?
* How to update boolean values in the Grid with no edit mode?
* How to toggle checkboxes in the Grid directly without using the built-in editing feature?
* How to allow users to check and uncheck checкbox values when the Grid is not editable?
* How to use a single click on Grid checkboxes to set the reverse (opposite) value?
* How to get the value of a checkbox and use it for an update action on button click?

## Solution

1. Define a [`<GridColumn>` with a `Field`](slug:components/grid/columns/bound) that points to a `bool` property.
1. Set [`Editable="false"`](slug:components/grid/columns/bound#data-operations) for that column, if the [Grid `EditMode`](slug:components/grid/editing/overview) is `Incell`.
1. Define a [column cell template](slug:grid-templates-column) (`<Template>`) for the column. Place a [`TelerikCheckBox` component](slug:checkbox-overview) inside.
1. If the updated CheckBox values require real-time synchronization with a remote data source, then use the [CheckBox `OnChange` or `ValueChanged` event](slug:checkbox-events). In this case, `ValueChanged` will also require a [`ValueExpression`](slug:common-kb-requires-valueexpression).

```CSHTML
@using Telerik.DataSource.Extensions

<TelerikGrid OnRead="@OnGridRead"
             TItem="@User"
             EditMode="@GridEditMode.Incell"
             OnUpdate="@OnGridUpdate"
             OnCreate="@OnGridCreate">
    <GridToolBarTemplate>
        <GridCommandButton Command="Add">Add</GridCommandButton>
    </GridToolBarTemplate>
    <GridColumns>
        <GridColumn Field="@nameof(User.Name)" />
        <GridColumn Field="@nameof(User.Admin)" Title="No Template" />
        <GridColumn Field="@nameof(User.Admin)" Title="Template - ValueChanged" Editable="false">
            <Template>
                @{
                    var user = (User)context;
                }
                <TelerikCheckBox Value="@user.Admin"
                                 ValueExpression="@( () => user.Admin )"
                                 ValueChanged="@( (bool newValue) => OnAdminValueChanged(newValue, user) )" />
            </Template>
        </GridColumn>
        <GridColumn Field="@nameof(User.Admin)" Title="Template - OnChange" Editable="false">
            <Template>
                @{
                    var user = (User)context;
                }
                <TelerikCheckBox @bind-Value="@user.Admin"
                                 OnChange="@( (object newValue) => OnAdminChange((bool)newValue, user) )" />
            </Template>
        </GridColumn>
    </GridColumns>
</TelerikGrid>

@code {
    private List<User> Users { get; set; } = new();

    private int LastId { get; set; }

    private async Task OnAdminValueChanged(bool newValue, User user)
    {
        // Update the local value in the Grid.
        // Required when using a ValueChanged handler.
        user.Admin = newValue;

        // Update the remote data source.
        await TriggerGridUpdate(user);
    }

    private async Task OnAdminChange(bool newValue, User user)
    {
        // Update the remote data source.
        await TriggerGridUpdate(user);
    }

    private async Task TriggerGridUpdate(User user)
    {
        // Here we simulate an actual Grid update.
        // The goal is to reuse the existing OnUpdate event handler.
        // However, such OnUpdate simulation is not required.
        // Instead, you can call the remote data service directly.
        await OnGridUpdate(new GridCommandEventArgs()
        {
            Field = nameof(User.Admin),
            IsNew = false,
            Item = user,
            Value = user.Admin
        });
    }

    private async Task OnGridUpdate(GridCommandEventArgs args)
    {
        // simulate network delay
        await Task.Delay(100);

        var user = (User)args.Item;
        var index = Users.FindIndex(x => x.Id == user.Id);

        if (index >= 0)
        {
            Users[index] = user;
        }
    }

    private async Task OnGridCreate(GridCommandEventArgs args)
    {
        // simulate network delay
        await Task.Delay(100);

        var user = (User)args.Item;
        user.Id = ++LastId;

        Users.Insert(0, user);
    }

    private async Task OnGridRead(GridReadEventArgs args)
    {
        // simulate network delay
        await Task.Delay(100);

        var result = Users.ToDataSourceResult(args.Request);

        args.Data = result.Data;
        args.Total = result.Total;
    }

    protected override void OnInitialized()
    {
        Users = new List<User>();

        for (int i = 1; i <= 3; i++)
        {
            Users.Add(new User()
            {
                Id = ++LastId,
                Name = "User Name " + LastId,
                Admin = LastId % 2 == 0
            });
        }

        base.OnInitialized();
    }

    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public bool Admin { get; set; }
    }
}
```

## Notes

The [built-in Grid editing](slug:components/grid/editing/overview) feature creates a [copy of the original data item](slug:components/grid/editing/overview#notes) while a row is in edit mode. As a result, CheckBox value changes in the non-templated column above are applied to the template columns *after* the `OnUpdate` handler executes.

## See Also

* [Grid Column Cell Template](slug:grid-templates-column)
