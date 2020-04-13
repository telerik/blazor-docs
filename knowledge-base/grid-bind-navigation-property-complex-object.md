---
title: Bind to navigation properties in complex objects
description: Bind grid columns to navigation properties in complex objects
type: how-to
page_title: Bind to navigation properties in complex objects
slug: grid-use-navigation-properties
position: 
tags: 
ticketid: 
res_type: kb
---

## Description

Data that you bind to the grid may have complex objects in its model, not only primitive types.

How do I use complex objects in my model and show navigation properties information in the grid?

## Solution

Set the `Field` parameter of the column to the name of the primitive type field (not a collection or entire class) that you want to use - include the name of the main model that holds the nested model, and the name of the field in the nested model.

Do *not* include the name of the main model the grid is bound to.

Do *not* use the `nameof` operator - it returns only the field name, without its parent class name.

>caption Use complex models with navigation properties in the grid without flattening the model

````CSHTML
@* As of 2.11.0, the grid can show complex (nested, navigation) properties out-of-the-box. 
    You can still consider using a Template or a DetailTemplate for showing complex details about a row/cell
    *@

<TelerikGrid Data="@myData" Pageable="true" Sortable="true" FilterMode="@GridFilterMode.FilterRow" Groupable="true">
    <GridColumns>
        <GridColumn Field="@nameof(SampleComplexObject.ID)" Title="ID"></GridColumn>
        <GridColumn Field="@nameof(SampleComplexObject.Name)" Title="The Name"></GridColumn>
        <GridColumn Title="First Nested Property" Field="SomeNavigationProperty.Field1" />
        <GridColumn Field="SomeNavigationProperty.OtherField" />
    </GridColumns>
</TelerikGrid>


@code {
    public class SampleComplexObject
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public NestedObject SomeNavigationProperty { get; set; } // use this field name for data binding
    }

    public class NestedObject
    {
        public string Field1 { get; set; }
        public string OtherField { get; set; }
    }

    public IEnumerable<SampleComplexObject> myData = Enumerable.Range(1, 50).Select(x =>
            new SampleComplexObject
            {
                ID = x,
                Name = "Name " + x,
                SomeNavigationProperty = new NestedObject
                {
                    Field1 = "first " + x % 4,
                    OtherField = "second " + x % 6
                }
            }
        );
}
````


