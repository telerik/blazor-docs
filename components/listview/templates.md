---
title: Templates
page_title: ListView | Templates
description: Templates in the ListView for Blazor.
slug: listview-templates
tags: telerik,blazor,listview,templates
published: True
position: 2
---

# ListView Templates

The ListView component is all about your templates - it does not have an item rendering of its own and lets you customize all aspects. You can define:

* [Template](#template) - mandatory, this is what is used to display all items
* [Edit Template](#edit-template) - the rendering of an item in edit or insert mode
* [Header Template](#header-template) - your own content above the list of items
* [Footer Template](#footer-template) - your own content after the list of items and before the [pager]({%slug listview-paging%})

## Template

This is the main building block of the listview component. You define the layout of each item through its `Template` and you can use the `context` which is the model from the data source in order to get the information for the item.

>caption Item template in the ListView

````CSHTML
<TelerikListView Data="@ListViewData" Pageable="true" PageSize="15">
    <Template>
        @{
            SampleData currItem = context as SampleData;
            <div class="listview-item">
                <strong>@currItem.Name</strong> has ID: <strong>@currItem.Id</strong>
            </div>
        }
    </Template>
</TelerikListView>

@code{
    List<SampleData> ListViewData { get; set; } = Enumerable.Range(1, 250).Select(x => new SampleData
    {
        Id = x,
        Name = $"Name {x}"
    }).ToList();

    public class SampleData
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
````

>caption The result from the snippet above

![listview item template](images/listview-item-template.png)


## Edit Template

This is the template that an item in edit or insert mode renders, instead of its item template. You can use it to add inputs or other editors so the user can modify the data. You can read more about editing data and see examples of using this template in the [ListView Editing]({%slug listview-editing%}) article.


>caption Declaring an edit template in the ListView. Note: The CUD operations are not implemented in this example.

````CSHTML
@* This example showcases a minimal edit template declaration. For more details on
the available commands and the event handlers you need to implement, see the following article:
https://docs.telerik.com/blazor-ui/components/listview/editing
*@

<TelerikListView Data="@ListViewData" Pageable="true" PageSize="15">
    <EditTemplate>
        <TelerikTextBox @bind-Value="@context.Name" Label="Name"></TelerikTextBox>
        <ListViewCommandButton Command="Save">Save</ListViewCommandButton>
    </EditTemplate>
    <Template>
        <div>
            item @context.Id
            <ListViewCommandButton Command="Edit">Edit</ListViewCommandButton>
        </div>
    </Template>
    <HeaderTemplate>
        <ListViewCommandButton Command="Add">Add</ListViewCommandButton>
    </HeaderTemplate>
</TelerikListView>

@code{
    List<SampleData> ListViewData { get; set; } = Enumerable.Range(1, 250).Select(x => new SampleData
    {
        Id = x,
        Name = $"Name {x}"
    }).ToList();

    public class SampleData
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
````

## Header Template

This piece of code renders just above the items, but within the main listview wrapper. You would commonly use it to show a heading or other description of the data. You can also add buttons or other components that will invoke actions (such as [filter or sort the data source]({%slug listview-manual-operations%}#custom-operations), or [edit data]({%slug listview-editing%})).

>caption Header Template in the ListView

````CSHTML
@* The item template is mandatory. You can also add other components in the header template. *@

<TelerikListView Data="@ListViewData" Pageable="true" PageSize="15">
    <HeaderTemplate>
        <h1>Employees</h1>
    </HeaderTemplate>
    <Template>
        <div>item @context.Id</div>
    </Template>
</TelerikListView>

@code{
    List<SampleData> ListViewData { get; set; } = Enumerable.Range(1, 250).Select(x => new SampleData
    {
        Id = x,
        Name = $"Name {x}"
    }).ToList();

    public class SampleData
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
````

>caption The result from the code snippe above

![listview header template](images/listview-header-template.png)


## Footer Template

This piece of code renders just below the items, but within the main listview wrapper, and before the [pager]({%slug listview-paging%}). You would commonly use it to show a summary of the data or add components to invoke commands or business logic.

>caption Footer Template in the ListView

````CSHTML
@* As with the other templates, layout and nice visual distinctions are up to the application *@

<TelerikListView Data="@ListViewData" Pageable="true" PageSize="15">
    <FooterTemplate>
        A total of <strong>@ListViewData.Count</strong> items.
    </FooterTemplate>
    <Template>
        <div>item @context.Id</div>
    </Template>
</TelerikListView>

@code{
    List<SampleData> ListViewData { get; set; } = Enumerable.Range(1, 250).Select(x => new SampleData
    {
        Id = x,
        Name = $"Name {x}"
    }).ToList();

    public class SampleData
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
````

>caption The result from the code snippet above

![listview footer template](images/listview-footer-template.png)




## See Also

  * [Live Demo: ListView Templates](https://demos.telerik.com/blazor-ui/listview/templates)
   
  
