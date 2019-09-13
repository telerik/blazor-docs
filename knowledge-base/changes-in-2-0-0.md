---
title: Breaking Changes in 2.0.0
description: Handle the changes in the 2.0.0 major release of the Telerik UI for Blazor components.
type: how-to
page_title: Changes in 2.0.0
slug: changes-in-2-0-0
position: 
tags: 
ticketid: 
res_type: kb
---

In the `2.0.0` release, there are some changes in the Telerik Blazor components that have been brewing for a while due to the evolution of the framework. This article explains what they are and what you need to change.

A shortlist of the changes:
* The component namespaces changed, so now you only need to include `@using Telerik.Blazor.Components` and `@using Telerik.Blazor` in your main `_Imports.razor` file, instead of a per-component statement in each view.
* Some inner tags changed names for brevity and usability. A detailed list with the changes per component is available below.
    * Most notably, the `Telerik` prefix is removed from all child tags, only the root-level components are still `<TelerikComponentName>`. There are some particular changes for certain components, and they are detailed below.
* Some methods that manipulated collections or state are now gone. The way to alter collections (like Action buttons on a Window) is to use conditional markup and looping over collections from a view model. When we were initially creating the components, there were indications that there will be programmatic creation options. It seems this is not going to be the case, and conditional markup plus binding is the way to affect markup. There are details for each component below.

## Namespace Change

Until now, you had to include things like `@using Telerik.Blazor.Components.<ComponentName>` for every component use used, in every view.

As of the `2.0.0` version, you only need to add the following to your main **~/_Imports.razor** file, and you have to remove the `@using` statements per component:

````
@using Telerik.Blazor
@using Telerik.Blazor.Components
````

You can keep `@using Telerik.Blazor.Components` in the views, it simply is not needed anymore.

### Moved Enums

Some enums had to move to different namespaces and/or to have more descriptive names:

````CSHTML
// Grid
Telerik.Blazor.FilterMode -> Telerik.Blazor.GridFilterMode

// TabStrip
Telerik.Blazor.Components.TabStrip.TabPosition -> Telerik.Blazor.TabPosition

// Window
Telerik.Blazor.Size -> Telerik.Blazor.WindowSize
````

## Removed Methods and Properties

This is a list of the components that had methods removed and the new approach of doing things.

### Calendar

* The `Navigate()` method is no longer available. Use binding for the `View` and `Date` parameters.

### DatePicker

* The `Close()` method is no longer available. The popup closes on clicks outside of it anyway.

### Grid

* The `AddColumn()` and `RemoveColumn()` methods are removed. Use conditional markup instead, like in the [Columns demo](https://demos.telerik.com/blazor-ui/grid/columns).
* The `Filterable` property is removed in favor of `FilterMode`.
* The `EditMode` property is now an enum. Use `EditMode="@GridEditMode.Incell|Inline|Popup"`.

### Inputs

* All input-type components no longer have the `Height` property. Their height is to be controlled through CSS and the font-size through the themes anyway, and the `Height` property did not always produce expected/proper results.

### TabStrip

* The `ActivateTab()` and `DeactivateTab()` methods are no longer available. Use the new `ActiveTabIndex` property and its `ActiveTabIndexChanged` event.
* The `AddTab()` method is no longer available in favor of conditional markup.


### Textbox

* The `Pattern`, `MinLength` and `MaxLength` parameters are removed in favor of validation. In the future, they will probably become available through attribute splatting.

### TreeView

* The `AddBinding()` and `RemoveBinding()` methods are no longer avaialble.

## Renamed Tags

This is a list of the components that had their child tags removed or renamed.

### DropDownList

* `Header` is now `HeaderTemplate`
* `Footer` is now `FooterTemplate`

````CSHTML
// Old
<TelerikDropDownList Data="@Data">
    <Header></Header>
    <Footer></Footer>
    <ValueTemplate></ValueTemplate>
    <ItemTemplate></ItemTemplate>
</TelerikDateInput>

// New
<TelerikDropDownList Data="@Data">
    <HeaderTemplate></HeaderTemplate>
    <FooterTemplate></FooterTemplate>
    <ValueTemplate></ValueTemplate>
    <ItemTemplate></ItemTemplate>
</TelerikDateInput>
````

### Grid

* The `TelerikGridEvents` and `EventsManager` tags are removed. The CRUD events of the grid are now available at its root-level tag, for example `<TelerikGrid OnRead=@ReadItems>`.
* All child tags that had `Telerik` as a prefix do not have that prefix anymore.

````
// Old
<TelerikGrid Data=@GridData>
    <TelerikGridColumns>
        <TelerikGridCommandColumn>
            <TelerikGridCommandButton>Edit</TelerikGridCommandButton>
        </TelerikGridCommandColumn>
        <TelerikGridColumn>
            <Template>
                <p>content</p>
            </Template>
        </GridColumn>
    </TelerikGridColumns>
    <TelerikGridToolBar>
        <TelerikGridCommandButton>Text</TelerikGridCommandButton>
    </TelerikGridToolBar>
    <RowTemplate>
        <p>content</p>
    </RowTemplate>
    <TelerikGridEvents>
        <EventsManager OnUpdate=@UpdateItem></EventsManager>
    </TelerikGridEvents>
</TelerikGrid>

// New
<TelerikGrid Data=@GridData>
    <GridColumns>
        <GridCommandColumn Command="save">
            <GridCommandButton>Edit</GridCommandButton>
        </GridCommandColumn>
        <GridColumn>
            <Template>
                <p>content</p>
            </Template>
        </GridColumn>
    </GridColumns>
    <GridToolBar>
        <GridCommandButton>Text</GridCommandButton>
    </GridToolBar>
    <RowTemplate>
        <p>content</p>
    </RowTemplate>
</TelerikGrid>
````

### TabStrip

* `TelerikTab` is now `TabStripTab`

````CSHTML
// Old
<TelerikTabStrip @bind-Value=@IntValue>
    <TelerikTab>
        <p>tab content</p>
    </TelerikTab>
</TelerikTabStrip>

// New
<TelerikTabStrip @bind-Value=@IntValue>
    <TabStripTab>
        <p>tab content</p>
    </TabStripTab>
</TelerikTabStrip>
````

### TreeView

* All child tags that had `Telerik` as a prefix do not have that prefix anymore.

````CSHTML
// Old
<TelerikTreeView Data="@HierarchicalData">
    <TelerikTreeViewBindings>
        <TelerikTreeViewBinding>
            <ItemTemplate>
                <p>content</p>
            </ItemTemplate>
        </TelerikTreeViewBinding>
    </TelerikTreeViewBindings>
</TelerikTreeView>

// New
<TelerikTreeView Data="@HierarchicalData">
    <TreeViewBindings>
        <TreeViewBinding>
            <ItemTemplate>
                <p>content</p>
            </ItemTemplate>
        </TreeViewBinding>
    </TreeViewBindings>
</TelerikTreeView>
````

### Window

* All child tags that had `Telerik` as a prefix do not have that prefix anymore.

````CSHTML
// Old
<TelerikWindow>
    <TelerikWindowTitle>
        <p>Title</p>
    </TelerikWindowTitle>
    <TelerikWindowActions>
        <TelerikWindowAction Name="Minimize"></TelerikWindowAction>
    </TelerikWindowActions>
    <TelerikWindowContent>
        <p>content</p>
    </TelerikWindowContent>
</TelerikWindow>

// New
<TelerikWindow>
    <WindowTitle>
        <p>Title</p>
    </WindowTitle>
    <WindowActions>
        <WindowAction Name="Minimize"></WindowAction>
    </WindowActions>
    <WindowContent>
        <p>content</p>
    </WindowContent>
</TelerikWindow>
````


