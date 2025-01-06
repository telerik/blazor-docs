---
title: Accessibility Overview
page_title: Telerik UI for Blazor Grid Documentation | Grid Accessibility Overview
description: "Get started with the Telerik UI for Blazor Grid and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
tags: telerik,blazor,accessibility,wai-aria,wcag,grid
slug: grid-accessibility-overview
position: 0
---

# Accessibility Overview

The UI for Blazor Grid component is [WCAG 2.2 AA](https://www.w3.org/TR/WCAG22) and [Section 508](https://www.section508.gov) compliant. The component also follows the [WAI-ARIA best practices](https://www.w3.org/WAI/ARIA/apg/) for implementing the keyboard navigation for its component [role](https://www.w3.org/TR/wai-aria/#roles), and is tested against the popular screen readers.

# Blazor Grid Accessibility Example

WCAG 2.2 introduces the ["Dragging Movements"](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements) criterion as an important part of the Operable principle. Its primary goal is to guarantee that any feature reliant on drag actions offers an alternative method that can be executed with a single click, enhancing user accessibility.

In our illustrative example below, we've showcased the grouping and column reorder actions, both achievable through our Column Menu functionality. We've demonstrated also the row reordering achievable through our [Context Menu]({%slug contextmenu-integration%}#context-menu-for-a-grid-row). Our goal is to offer a versatile API that allows users to trigger all functions programmatically or externally, meeting diverse accessibility requirements for any applications.

The following example demonstrates the [accessibility compliance of the Grid component]({%slug grid-wai-aria-support%}). The described level of compliance is achievable with the [Ocean Blue A11y Accessibility Swatch]({%slug accessibility-overview%}#color-contrast).

>caption Grid accessibility compliance example

````RAZOR
@*Evaluate the example with Axe Core or other accessibility tools*@

@using System.Collections.Generic
@using System.Collections.ObjectModel
@using Telerik.SvgIcons

<TelerikContextMenu @ref="@ContextMenuRef" 
                    Data="@MenuItems"
                    OnClick="@((MenuItem item) => ContextMenuClickHandler(item))">
    <ItemTemplate Context="item">
        @{
            <TelerikSvgIcon Icon="@item.Icon" />
            <div>@item.Text</div>

            @if (item.CommandName == "ReorderRow")
            {
                <div style="margin-left: 5px;">
                    <TelerikSvgIcon Icon="@SvgIcon.WindowRestore" />
                </div>
            }
        }
    </ItemTemplate>
</TelerikContextMenu>

<TelerikDialog @bind-Visible="@Visible"
               Class="dialog-btn-formatting"
               Width="300px"
               Title="Reorder Item">
    <DialogContent>
        Move row <strong>@($"{OriginIndex} {ReorderItem.Name}")</strong>:
        <TelerikRadioGroup Data="@RadioOptions"
                           @bind-Value="@RadioValue"
                           ValueField="@nameof(RadioModel.Id)"
                           TextField="@nameof(RadioModel.Text)">
            <ItemTemplate>
                @{
                    var item = context as RadioModel;
                }

                @if (item.Id == 1)
                {
                    <span>@item.Text</span>
                    <TelerikDropDownList Width="190px"
                                         Data="@ColumnsList"
                                         @bind-Value="@ColumnBefore"
                                         OnChange="@BeforeChangeHandler"
                                         AriaLabel="Select Row"
                                         DefaultText="-Select row-"
                                         TextField="MyTextField"
                                         ValueField="MyValueField">
                    </TelerikDropDownList>
                }
                else if (item.Id == 2)
                {
                    <span>@item.Text</span>
                    <TelerikDropDownList Width="190px"
                                         Data="@ColumnsList"
                                         @bind-Value="@ColumnAfter"
                                         OnChange="@AfterChangeHandler"
                                         DefaultText="-Select row-"
                                         AriaLabel="Select Row"
                                         TextField="MyTextField"
                                         ValueField="MyValueField">
                    </TelerikDropDownList>
                }
                else
                {
                    <span>@item.Text</span>
                    <TelerikNumericTextBox @bind-Value="@DestinationIndex" 
                                           Width="40%" 
                                           AriaLabel="Select Destination Index" />
                }
            </ItemTemplate>
        </TelerikRadioGroup>
    </DialogContent>
    <DialogButtons>
        <TelerikButton AriaLabel="Confirm Reorder" OnClick="@OnApplyClick" ThemeColor="@ThemeConstants.Button.ThemeColor.Primary"><TelerikSvgIcon Icon="@SvgIcon.Check" /><span style="margin-left: 5px;">Reorder</span></TelerikButton>
        <TelerikButton AriaLabel="Cancel Reorder" OnClick="@(() => { Visible = false; })"><TelerikSvgIcon Icon="@SvgIcon.CancelOutline" /><span style="margin-left: 5px;">Cancel</span></TelerikButton>
    </DialogButtons>
</TelerikDialog>

<style>
    .dialog-btn-formatting .k-actions-stretched > * {
        flex: 0;
    }
</style>

<TelerikGrid @ref="@GridRef"
             Data="@GridData"
             Navigable="true"
             Reorderable="true"
             ShowColumnMenu="true"
             Groupable="true"
             EditMode="@GridEditMode.Inline"
             Height="500px"
             Pageable="true"
             FilterMode="GridFilterMode.FilterRow"
             OnCreate="@CreateItem"
             OnUpdate="@UpdateHandler"
             OnRowContextMenu="@OnContextMenu"
             SelectionMode="@GridSelectionMode.Multiple"
             @bind-SelectedItems="@SelectedItems">
    <GridSettings>
        <GridColumnMenuSettings Lockable="false"
                                Groupable="true"
                                Reorderable="true"
                                FilterMode="@ColumnMenuFilterMode.None">
        </GridColumnMenuSettings>
    </GridSettings>
    <GridToolBarTemplate>
        <GridCommandButton Command="Add" Icon="@SvgIcon.Plus">Add Employee</GridCommandButton>
    </GridToolBarTemplate>
    <GridColumns>
        <GridColumn Field=@nameof(SampleData.ID) Editable="false" />
        <GridColumn Field=@nameof(SampleData.Name) />
        <GridCommandColumn>
            <GridCommandButton Command="Save" Icon="@SvgIcon.Save" ShowInEdit="true">Save</GridCommandButton>
            <GridCommandButton Command="Cancel" Icon="@SvgIcon.Cancel" ShowInEdit="true">Cancel</GridCommandButton>
        </GridCommandColumn>
    </GridColumns>
</TelerikGrid>

@code {
    private List<RadioModel> RadioOptions { get; set; }
    private int RadioValue { get; set; }

    private List<MyDdlModel> ColumnsList { get; set; }
    private int? ColumnAfter { get; set; }
    private int? ColumnBefore { get; set; }

    //data sources
    private ObservableCollection<SampleData> GridData { get; set; }
    private List<MenuItem> MenuItems { get; set; }
    private IEnumerable<SampleData> SelectedItems { get; set; } = Enumerable.Empty<SampleData>();
    //metadata for the context menu actions
    private SampleData SelectedPerson { get; set; }
    //component references so we can use their methods
    private TelerikContextMenu<MenuItem> ContextMenuRef { get; set; }
    private TelerikGrid<SampleData> GridRef { get; set; }

    private int DestinationIndex { get; set; }
    private int OriginIndex { get; set; }
    private bool Visible { get; set; }
    private SampleData ReorderItem { get; set; }

    private void BeforeChangeHandler(object theUserInput)
    {
        if ((int)theUserInput == 0 || (int)theUserInput == OriginIndex)
        {
            ColumnBefore = default;
        }
    }

    private void AfterChangeHandler(object theUserInput)
    {
        if ((int)theUserInput == ColumnsList.Count - 1 || (int)theUserInput == OriginIndex)
        {
            ColumnAfter = default;
        }
    }

    private void OnApplyClick()
    {
        if (RadioValue == 1)
        {
            if (ColumnBefore != default)
            {
                var beforeItem = GridData.First(i => i.ID == ColumnBefore);
                var index = GridData.IndexOf(beforeItem);

                GridData.Remove(ReorderItem);
                GridData.Insert((int)(--index), ReorderItem);

                RefreshDropDownListData();
                RefreshRowIds();

                DestinationIndex = default;
                ReorderItem = default;
                Visible = false;
            }
        }
        else if (RadioValue == 2)
        {
            if (ColumnAfter != default)
            {
                var afterItem = GridData.First(i => i.ID == ColumnAfter);
                var index = GridData.IndexOf(afterItem);

                GridData.Remove(ReorderItem);
                GridData.Insert((int)(++index), ReorderItem);

                RefreshDropDownListData();
                RefreshRowIds();

                DestinationIndex = default;
                ReorderItem = default;
                Visible = false;
            }
        }
        else
        {
            if (DestinationIndex >= 0)
            {
                GridData.Remove(ReorderItem);
                GridData.Insert(DestinationIndex, ReorderItem);

                RefreshDropDownListData();
                RefreshRowIds();

                DestinationIndex = default;
                ReorderItem = default;
                Visible = false;
            }
        }
    }

    // show the context menu for a particular row
    private async Task OnContextMenu(GridRowClickEventArgs args)
    {
        var argsItem = args.Item as SampleData;

        SelectedPerson = argsItem;

        if (args.EventArgs is MouseEventArgs mouseEventArgs)
        {
            await ContextMenuRef.ShowAsync(mouseEventArgs.ClientX, mouseEventArgs.ClientY);
        }
    }

    // sample handling of the context menu click
    private void ContextMenuClickHandler(MenuItem item)
    {
        if (item.Action != null)
        {
            item.Action.Invoke();
        }
        else
        {
            SampleData itemToEdit = SampleData.GetClonedInstance(GridData.Where(itm => itm.ID == SelectedPerson.ID).FirstOrDefault());
            ReorderItem = itemToEdit;
            var index = GridData.IndexOf(itemToEdit);

            switch (item.CommandName)
            {
                case "MoveUp":
                    GridData.Remove(itemToEdit);
                    GridData.Insert(--index, itemToEdit);
                    RefreshDropDownListData();
                    RefreshRowIds();
                    break;
                case "MoveDown":
                    GridData.Remove(itemToEdit);
                    GridData.Insert(++index, itemToEdit);
                    RefreshDropDownListData();
                    RefreshRowIds();
                    break;
                case "ReorderRow":
                    Visible = true;
                    OriginIndex = index;
                    break;
                default:
                    break;
            }
        }

        SelectedPerson = null; // clean up
    }

    // refresh dropdownlist data
    private void RefreshDropDownListData()
    {
        ColumnsList = new List<MyDdlModel>();
        for (int i = 0; i < GridData.Count; i++)
        {
            ColumnsList.Add(new MyDdlModel { MyValueField = i, MyTextField = $"{i} {GridData[i].Name}" });
        }
    }

    // refresh grid rows ids
    private void RefreshRowIds()
    {
        for (int i = 0; i < GridData.Count; i++)
        {
            GridData[i].ID = i;
        }
    }

    // generate data
    protected override void OnInitialized()
    {
        // context menu items
        MenuItems = new List<MenuItem>()
        {
            new MenuItem(){ Text = "Move up", Icon = SvgIcon.CaretAltUp, CommandName = "MoveUp" },
            new MenuItem(){ Text = "Move down", Icon = SvgIcon.CaretAltDown, CommandName = "MoveDown" },
            new MenuItem(){ Text = "Reorder row", Icon = SvgIcon.CaretAltExpand, CommandName = "ReorderRow" }
        };

        // radiogroup options
        RadioOptions = new List<RadioModel>()
        {
            new RadioModel { Id = 1, Text = "Before:" },
            new RadioModel { Id = 2, Text = "After:" },
            new RadioModel { Id = 3, Text = "At position:" },
        };

        RadioValue = 1;

        // generate data for the grid
        GridData = new ObservableCollection<SampleData>();
        var rand = new Random();

        ColumnsList = new List<MyDdlModel>();

        for (int i = 0; i < 100; i++)
        {
            GridData.Add(new SampleData()
                {
                    ID = i,
                    Name = GenerateRandomFirstName()
                });

            ColumnsList.Add(new MyDdlModel { MyValueField = i, MyTextField = $"{i} {$"{GridData[i].Name}"}" });
        }
    }

    #region CUD Operations

    // CUD operations for the grid
    private void CreateItem(GridCommandEventArgs args)
    {
        var argsItem = args.Item as SampleData;

        // call the actual data service here

        argsItem.ID = GridData.Count + 1;

        GridData.Insert(0, argsItem);
    }

    private void DeleteItem() // not async so it can be passed as an Action
    {
        var argsItem = SelectedPerson;

        // call the actual data service here

        GridData.Remove(argsItem);
    }

    private void UpdateHandler(GridCommandEventArgs args)
    {
        var argsItem = args.Item as SampleData;

        // call the actual data service here

        var index = GridData.ToList().FindIndex(i => i.ID == argsItem.ID);
        if (index != -1)
        {
            GridData[index] = argsItem;
        }
    }

    #endregion

    #region Models
    // sample menu item class
    public class MenuItem
    {
        public string Text { get; set; }
        public ISvgIcon Icon { get; set; }
        public Action Action { get; set; }
        public string CommandName { get; set; }
    }

    public class SampleData
    {
        public int ID { get; set; }
        public string Name { get; set; }


        public override bool Equals(object obj)
        {
            if (obj is SampleData)
            {
                return this.ID == (obj as SampleData).ID;
            }
            return false;
        }

        public SampleData()
        {

        }

        public SampleData(SampleData itmToClone)
        {
            this.ID = itmToClone.ID;
            this.Name = itmToClone.Name;
        }

        public static SampleData GetClonedInstance(SampleData itmToClone)
        {
            return new SampleData(itmToClone);
        }

        public override int GetHashCode() { return base.GetHashCode(); }
    }

    public class RadioModel
    {
        public int Id { get; set; }
        public string Text { get; set; }
    }

    //in a real case, the model is usually in a separate file
    //the model type and value field type must be provided to the dropdpownlist
    public class MyDdlModel
    {
        public int MyValueField { get; set; }
        public string MyTextField { get; set; }
    }

    #endregion

    #region Random Name Generator
    private static readonly Random random = new Random();

    private static readonly List<string> firstNames = new List<string>
    {
        "John", "Alice", "Michael", "Emma", "James", "Olivia", "Robert", "Sophia", "William", "Emily"
    };

    private static string GenerateRandomFirstName()
    {
        return firstNames[random.Next(firstNames.Count)];
    }

    #endregion
}
````

## See also
 * [Live demo: Grid Accessibility](https://demos.telerik.com/blazor-ui/grid/keyboard-navigation)
 * [Blazor Grid]({%slug grid-overview%})