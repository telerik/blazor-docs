---
title: Column Layout and Scrolling in the Grid Popup Edit Form
description: How to organize the Grid popup edit form in columns and enable scrolling.
type: how-to
page_title: Enable Columns and Scrolling in the Grid Popup Edit Form
slug: grid-popup-edit-form-columns
position:
tags: grid,popup,edit,form,columns,multicolumn,scroll
ticketid: 1534563,1536862
res_type: kb
---

## Description

How do I display the Grid popup edit form in a multiple-column layout? How do I show a scrollbar if the number of Grid columns to edit is too large and overflows the page?

## Solution

Use the [`column-count` CSS style](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Columns) to apply a column-based layout in the Grid popup edit form. The following CSS rule targets TelerikForms inside TelerikWindows:

````css
.k-window .k-form {
    column-count: 2;
}
````

In addition to column layout, you can also limit the maximum popup Window height. If the form is larger, a scrollbar will appear automatically. The following CSS rule targets the TelerikWindow content container.

````css
.k-window-content {
    max-height: 300px;
}
````

> If you place the above CSS rules in the global app stylesheet (usually `site.css`), they will affect **all** TelerikWindows in the app. To avoid this, add the CSS code to the Razor file which holds the Grid. [CSS isolation (scoped styles)]({%slug common-kb-css-isolation%}) will not work, because the Window is rendered as a child of the page `<body>`, i.e. outside the Razor component.
>
> For full control of the edit form layout and more advanced customizations, you can also use a [custom edit form in a separate TelerikWindow](https://github.com/telerik/blazor-ui/tree/master/grid/custom-popup-form).

>caption Grid Popup Edit Form Columns and Scrolling

````CSHTML
@* Grid popup edit form columns and scrolling *@

<style>

    .k-window .k-form {
        column-count: 2;
    }

    .k-window-content {
        max-height: 240px;
        /* you can also use relative units, e.g. 60% of the viewport height: */
        /* max-height: 60vh; */
    }

</style>

<TelerikGrid Data=@GridData EditMode="@GridEditMode.Popup">
    <GridToolBar>
        <GridCommandButton Command="Add" Icon="add">Add New Item</GridCommandButton>
    </GridToolBar>
    <GridColumns>
        <GridCommandColumn Width="120px">
            <GridCommandButton Command="Edit" Icon="edit">Edit</GridCommandButton>
        </GridCommandColumn>
        @for (int i = 1; i <= 15; i++)
        {
            <GridColumn Field="@("FieldName" + i.ToString() )"
                        Title="@("Field " + i.ToString() )"
                        Width="100px">
                <Template>
                    foo bar
                </Template>
            </GridColumn>
        }
    </GridColumns>
</TelerikGrid>

@code {
    public List<Product> GridData { get; set; }

    protected override void OnInitialized()
    {
        GridData = new List<Product>();

        for (int i = 0; i < 5; i++)
        {
            GridData.Add(new Product() { ID = i });
        }
    }

    public class Product
    {
        public int ID { get; set; }
        public string FieldName1 { get; set; }
        public string FieldName2 { get; set; }
        public string FieldName3 { get; set; }
        public string FieldName4 { get; set; }
        public string FieldName5 { get; set; }
        public string FieldName6 { get; set; }
        public string FieldName7 { get; set; }
        public string FieldName8 { get; set; }
        public string FieldName9 { get; set; }
        public string FieldName10 { get; set; }
        public string FieldName11 { get; set; }
        public string FieldName12 { get; set; }
        public string FieldName13 { get; set; }
        public string FieldName14 { get; set; }
        public string FieldName15 { get; set; }
    }
}
````
