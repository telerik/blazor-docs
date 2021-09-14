---
title: Data Binding to Interface
page_title: Blazor TreeList - Data Binding to Interface | Telerik UI for Blazor
description: Data binding the Blazor TreeList to multiple model types with the same interface.
slug: treelist-data-binding-interface
tags: telerik,blazor,treelist,data,bind,databind,databinding,interface
published: true
position: 4
---

# TreeList Data Binding to Interface

Since version 2.27, the TreeList supports binding to a collection of multiple model types that implement the same interface.

Note the usage of [`OnModelInit`]({%slug treelist-events%}#onmodelinit) in the example below. The event handler sets the model type to be used for new items in the TreeList. One-type model creation is supported out-of-the-box. If you need to support adding instances of different types:

* Use custom **Add** buttons in the [TreeList Toolbar]({%slug treelist-toolbar%}), one for each model type.
* In each button click handler, define an `InsertedItem` of the correct type in the [TreeList State]({%slug treelist-state%}).
* [Put the TreeList in Insert mode]({%slug treelist-state%}#initiate-editing-or-inserting-of-an-item) with the [SetState method]({%slug treelist-state%}#methods).

>caption Data Binding the TreeList to an Interface

````CSHTML
<TelerikTreeList Data="@TreeListData"
             EditMode="TreeListEditMode.Inline"
             OnUpdate="@UpdateHandler"
             OnDelete="@DeleteHandler"
             OnCreate="@CreateHandler"
             OnModelInit="@(() => new Model1())">
    <TreeListToolBar>
        <TreeListCommandButton Command="Add" Icon="add">Add</TreeListCommandButton>
    </TreeListToolBar>
    <TreeListColumns>
        <TreeListColumn Field="IntProperty" />
        <TreeListCommandColumn>
            <TreeListCommandButton Command="Edit">Edit</TreeListCommandButton>
            <TreeListCommandButton Command="Save" ShowInEdit="true">Save</TreeListCommandButton>
            <TreeListCommandButton Command="Cancel" ShowInEdit="true">Cancel</TreeListCommandButton>
        </TreeListCommandColumn>
    </TreeListColumns>
</TelerikTreeList>

@code {
    public interface IModel
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public int IntProperty { get; set; }
    }

    public class Model1 : IModel
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public int IntProperty { get; set; }
    }

    public class Model2 : IModel
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public int IntProperty { get; set; }
    }

    List<IModel> TreeListData { get; set; }

    protected override void OnInitialized()
    {
        var data = new List<IModel>();

        data.Add(new Model1()
        {
            Id = 1,
            ParentId = null,
            IntProperty = 1
        });
        data.Add(new Model2()
        {
            Id = 2,
            ParentId = 1,
            IntProperty = 2
        });

       TreeListData = data;
    }

    public void UpdateHandler(TreeListCommandEventArgs args)
    {
        var model = (IModel)args.Item;

        var matchingItem = TreeListData.FirstOrDefault(c => c.Id == model.Id);

        if (matchingItem != null)
        {
            matchingItem.IntProperty = model.IntProperty;
        }
    }

    public void DeleteHandler(TreeListCommandEventArgs args)
    {
        var model = (IModel)args.Item;

        TreeListData.Remove(model);
    }

    public void CreateHandler(TreeListCommandEventArgs args)
    {
        var model = (IModel)args.Item;

        model.Id = TreeListData.Max(d => d.Id) + 1;

        TreeListData.Insert(0, model);
    }
}
````

>note Up to version 2.26, the `Data` collection of the TreeList must contain instances of only one model type.


## See Also

  * [Binding to Flat Data]({%slug treelist-data-binding-flat-data%})
  * [Binding to Hierarchical Data]({%slug treelist-data-binding-hierarchical-data%})
  * [Load on Demand]({%slug treelist-data-binding-load-on-demand%})
  * [Live Demo: TreeList Flat Data](https://demos.telerik.com/blazor-ui/treelist/flat-data)
  * [Live Demo: TreeList Hierarchical Data](https://demos.telerik.com/blazor-ui/treelist/hierarchical-data)
  * [Live Demo: TreeList Load on Demand](https://demos.telerik.com/blazor-ui/treelist/lazy-loading)
