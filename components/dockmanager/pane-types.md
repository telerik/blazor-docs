---
title: Pane Types
page_title: DockManager - Pane Types
description: Pane Types in the DockManager for Blazor.
slug: dockmanager-pane-types
tags: telerik, blazor, dockmanager, panes
published: true
position: 5
components: ["dockmanager"]
---
# Pane Types

The Blazor DockManager component exposes the ability to configure different pane types.

When defining pane types, the naming convention follows the structure `<DockManager`**`Type`**`Pane>`, where **Type** specifies the behavior of the pane. The available types are:

## Content Pane

Provides full control over explicitly defining custom content to be rendered for a given pane based on specific requirements. 

* It can be a direct child of all other panes and the `<DockManagerPanes>` tag.
* The `DockManagerContentPane` cannot have child panes.

## TabGroup Pane

Groups panes in a tab strip, similar to the [TabStrip component](slug:tabstrip-overview). Users can navigate through panes using tabs in the header. 

* It can be a direct child of `<DockManagerSplitPane>`. 
* It can only contain `<DockManagerContentPane>` children.

## Split Pane

Organizes panes in a [Splitter-like](slug:splitter-overview) manner, allowing the container pane to be split either horizontally or vertically. 

* It can be a direct child of another `<DockManagerSplitPane>`. 
* It can contain `<DockManagerTabGroupPane>`, `<DockManagerContentPane>`, and other `<DockManagerSplitPane>` tags as children. 
* Only this pane type can be declared as a direct child of the `<DockManagerFloatingPanes>` tag.

## Restore Closed Panes

To restore closed panes, track their visibility state in a collection. Use two-way binding for the `Size` parameter to persist the pane size.  

The following example demonstrates how to use:

* Two-way binding to maintain pane size.
* The `Visible` parameter and the `VisibleChanged` event to track pane visibility.

>caption Restore closed panes through `Visible` and `@bind-Size`

````RAZOR
<div style="margin-bottom: 10px;">
    @foreach (var pane in HiddenPanes)
    {
        <TelerikButton OnClick="@(() => RestorePane(pane))">Restore @pane.HeaderText</TelerikButton>
    }
</div>

<TelerikDockManager Height="90vh">
    <DockManagerPanes>
        <DockManagerSplitPane Orientation="@DockManagerPaneOrientation.Vertical" @bind-Size="@SplitPaneSize">
            <Panes>
                @foreach (var pane in SplitPanes)
                {
                    <DockManagerContentPane @bind-Size="@pane.Size"
                                            Unpinnable="false"
                                            HeaderText="@pane.HeaderText"
                                            Visible="@pane.Visible"
                                            VisibleChanged="@((bool v) => pane.Visible = v)">
                        <Content>
                            Content of @pane.HeaderText
                        </Content>
                    </DockManagerContentPane>
                }
            </Panes>
        </DockManagerSplitPane>

        <DockManagerTabGroupPane>
            <Panes>
                @foreach (var pane in TabPanes)
                {
                    <DockManagerContentPane HeaderText="@pane.HeaderText"
                                            @bind-Size="@pane.Size"
                                            Unpinnable="false"
                                            Visible="@pane.Visible"
                                            VisibleChanged="@((bool v) => pane.Visible = v)">
                        <Content>
                            Content of @pane.HeaderText
                        </Content>
                    </DockManagerContentPane>
                }
            </Panes>
        </DockManagerTabGroupPane>
    </DockManagerPanes>
</TelerikDockManager>

@code {
    private string SplitPaneSize { get; set; } = "40%";

    private List<PaneModel> SplitPanes { get; set; } = new()
    {
        new PaneModel { HeaderText = "Pane 1.1", Size = "55%", Visible = false },
        new PaneModel { HeaderText = "Pane 1.2", Size = "", Visible = false }
    };

    private List<PaneModel> TabPanes { get; set; } = new()
    {
        new PaneModel { HeaderText = "Tab 2.1", Size = "", Visible = false },
        new PaneModel { HeaderText = "Tab 2.2", Size = "", Visible = false }
    };

    private IEnumerable<PaneModel> HiddenPanes =>
        SplitPanes.Concat(TabPanes).Where(p => !p.Visible);

    private void RestorePane(PaneModel pane)
    {
        pane.Visible = true;
    }

    public class PaneModel
    {
        public string HeaderText { get; set; } = string.Empty;
        public string Size { get; set; } = string.Empty;
        public bool Visible { get; set; }
    }
}
````

## Examples

Check the [DockManager Overview](slug:dockmanager-overview) and [DockManager Events](slug:dockmanager-events) articles for examples that include all pane types.
