---
title: Using Components in Grid Templates
description: How to use my custom component in the various UI for Blazor Grid templates
type: how-to
page_title: Using Components in Grid Templates
slug: grid-kb-using-components-in-templates
position: 
tags: 
ticketid:
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

I'm trying to render my own component in the Column Template of the Grid. However, the component does not show correct values after filtering, paging or sorting.

How to properly use components in Grid templates?

## Solution

The Grid optimizes the UI renders after data operations. If you are using child components inside Grid column templates, [set the `@key` attribute to these components to ensure that they always show the correct values and content after filtering, paging, and sorting](https://learn.microsoft.com/en-us/aspnet/core/blazor/components/element-component-model-relationships?view=aspnetcore-9.0).

This applies to the following Grid elements:

* [CommandColumn](slug://components/grid/columns/command)
* [DetailTemplate](slug://components/grid/features/hierarchy)
* [FooterTemplate](slug://grid-templates-column-footer)
* [GroupFooterTemplate](slug://grid-templates-column-group-footer)
* [RowTemplate](slug://grid-templates-row)
* [Template](slug://grid-templates-column)

>caption Setting @key to child components inside Grid templates

<div class="skip-repl"></div>
````RAZOR Home.razor
@using YourAppName.Data

<ul>
    <li>Filter and sort the Grid to see the difference between the two columns.</li>
    <li>Group the Grid by the first column to test the GroupFooterTemplate.</li>
    <li>Uncomment the RowTemplate to see it in action. </li>
</ul>

<TelerikGrid Data="@GridData"
             EditMode="@GridEditMode.Inline"
             FilterMode="GridFilterMode.FilterRow"
             Groupable="true"
             Pageable="true"
             PageSize="5"
             Sortable="true">
    <GridAggregates>
        <GridAggregate Field="@nameof(SampleModel.Id)" FieldType="@typeof(int)" Aggregate="@GridAggregateType.Max" />
    </GridAggregates>
    <GridColumns>
        <GridColumn Field="@nameof(SampleModel.Id)" Title="Template with Key">
            <Template>
                @{
                    var dataItem = (SampleModel)context;
                }
                Direct: @dataItem.Id
                <br />
                In child:
                <Child @key="@dataItem" Model="@dataItem" Color="green" />
            </Template>
            <FooterTemplate>
                Direct: @context.Max
                <br />
                In child:
                <Child Model="@( new SampleModel() { Id = Convert.ToInt32(context.Max) })" Color="green" />
            </FooterTemplate>
            <GroupFooterTemplate>
                Direct: @context.Max
                <br />
                In child:
                <Child Model="@( new SampleModel() { Id = Convert.ToInt32(context.Max) })" Color="green" />
            </GroupFooterTemplate>
        </GridColumn>
        <GridColumn Field="@nameof(SampleModel.Name)" Title="Template without Key">
            <Template>
                @{
                    var dataItem = (SampleModel)context;
                }
                Direct: @dataItem.Id
                <br />
                In child:
                <Child Model="@dataItem" Color="red" />
            </Template>
        </GridColumn>
        <GridCommandColumn>
            <GridCommandButton Command="Edit" Icon="@SvgIcon.Pencil" />
            <GridCommandButton Command="Cancel" Icon="@SvgIcon.Cancel" ShowInEdit="true" />
            @{
                var dataItem = (SampleModel)context;
            }
            Direct: @dataItem.Id
            <br />
            In child:
            <Child @key="@dataItem" Model="@dataItem" />
        </GridCommandColumn>
    </GridColumns>
   @*  <RowTemplate>
        @{
            var dataItem = (SampleModel)context;
        }
        <td>
            Direct: @dataItem.Id
            <br />
            In child:
            <Child @key="@dataItem" Model="@dataItem" />
        </td>
        <td>@dataItem.Name</td>
    </RowTemplate> *@
    <DetailTemplate>
        @{
            var masterItem = (SampleModel)context;
        }
        <p><strong>DetailTemplate</strong></p>
        Direct: @masterItem.Id
        <br />
        In child: <Child @key="@masterItem" Model="@masterItem" />
    </DetailTemplate>
</TelerikGrid>

@code {
    private List<SampleModel> GridData { get; set; } = new();

    protected override void OnInitialized()
    {
        for (int i = 1; i <= 77; i++)
        {
            GridData.Add(new SampleModel()
                {
                    Id = i,
                    Name = $"Name {i}"
                });
        }
    }
}
````
````RAZOR Child.razor
@using YourAppName.Data

Properties require @@key:
<strong style="color: @Color; background: yellow; padding: 0 .2em;">@Foo</strong>

<br />

Parameters refresh:
<strong>@Model.Id</strong>

@code {
    [Parameter]
    public SampleModel Model { get; set; } = new();

    [Parameter]
    public string Color { get; set; } = "inherit";

    private string Foo { get; set; } = string.Empty;

    protected override void OnInitialized()
    {
        Foo = Model.Id.ToString();
    }
}
````
````C# SampleModel.cs
namespace YourAppName.Data
{
    public class SampleModel
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
    }
}
````