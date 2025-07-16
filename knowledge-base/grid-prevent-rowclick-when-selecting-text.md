---
title: Prevent RowClick Event When Selecting Text in Grid for Blazor
description: Learn how to prevent the RowClick event from being triggered in Grid for Blazor when selecting text using JavaScript interop.
type: how-to
page_title: Avoid RowClick Event Trigger During Text Selection in Grid for Blazor
meta_title: Avoid RowClick Event Trigger During Text Selection in Grid for Blazor
slug: grid-kb-prevent-rowclick-when-selecting-text
tags: grid, blazor, rowclick, text-selection
res_type: kb
ticketid: 1692651
---

## Environment
<table>
<tbody>
<tr>
<td> Product </td>
<td> Grid for Blazor </td>
</tr>
</tbody>
</table>

## Description

I want to prevent the [OnRowClick](slug:grid-events#onrowclick) event in the [Grid for Blazor](slug:grid-overview) from executing when a user selects text by dragging to highlight it. 

This knowledge base article also answers the following questions:
- How to prevent row click event in a Blazor Grid during text selection?
- How to check for text selection before firing Grid events?
- How to use JavaScript interop for handling the `OnRowClick` event in Telerik Blazor Grid?

## Solution

To achieve this, use JavaScript interop to detect text selection. Follow these steps:

1. Define a JavaScript helper function that checks whether any text is currently selected on the page.
2. Inject the IJSRuntime service into your Blazor component to enable JavaScript interop.
3. Call the JavaScript function within your `OnRowClick` event handler to bypass logic when text is selected conditionally.

````RAZOR
@inject IJSRuntime JS

<h3>Grid with Safe Row Click Handling</h3>

@if (!string.IsNullOrEmpty(ClickedPersonName))
{
    <p><strong>Last clicked person:</strong> @ClickedPersonName</p>
}

<TelerikGrid Data="@People"
             OnRowClick="@OnRowClickHandler"
             Height="300px">
    <GridColumns>
        <GridColumn Field="Id" Title="ID" />
        <GridColumn Field="Name" Title="Name" />
        <GridColumn Field="Email" Title="Email" />
    </GridColumns>
</TelerikGrid>

@code {
    public class Person
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
    }

    private readonly List<Person> People = new()
    {
        new Person { Id = 1, Name = "Alice Johnson", Email = "alice@example.com" },
        new Person { Id = 2, Name = "Bob Smith", Email = "bob@example.com" },
        new Person { Id = 3, Name = "Carol Lee", Email = "carol@example.com" }
    };

    private string ClickedPersonName = "";

    private async Task OnRowClickHandler(GridRowClickEventArgs args)
    {
        var isTextSelected = await JS.InvokeAsync<bool>("isTextSelected");
        if (isTextSelected)
        {
            ClickedPersonName = "Text was selected, row click ignored.";
            return;
        }

        var item = (Person)args.Item;
        ClickedPersonName = item.Name;
    }
}

@* Inline JavaScript for detecting text selection *@
<script>
    window.isTextSelected = function () {
        return window.getSelection().toString().length > 0;
    };
</script>
````

## See Also

* [Grid OnRowClick event](slug:grid-events#onrowclick)
