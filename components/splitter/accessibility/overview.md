---
title: Accessibility Overview
page_title: Telerik UI for Blazor Splitter Documentation | Splitter Accessibility Overview
description: "Get started with the Telerik UI for Blazor Splitter and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
tags: telerik,blazor,accessibility,wai-aria,wcag,splitter
slug: splitter-accessibility-overview
position: 0
---

# Accessibility Overview

The UI for Blazor Splitter component is <a href="https://www.w3.org/TR/WCAG22" target="_blank">WCAG 2.2 AA</a> and <a href="https://www.section508.gov" target="_blank">Section 508</a> compliant. The component also follows the <a href="https://www.w3.org/WAI/ARIA/apg/" target="_blank">WAI-ARIA best practices</a> for implementing the keyboard navigation for its component <a href="https://www.w3.org/TR/wai-aria/#roles" target="_blank">role</a>, and is tested against the popular screen readers.

# Blazor Splitter Accessibility Example

WCAG 2.2 introduces the <a href="https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements" target="_blank">"Dragging Movements"</a> criterion as an important part of the Operable principle. Its primary goal is to guarantee that any feature reliant on drag actions offers an alternative method that can be executed with a single click, enhancing user accessibility.

The illustrative example below shows the tile resize action, achievable through the [Context Menu](slug:contextmenu-overview). Telerik UI for Blazor to offer a versatile API that allows users to trigger all functions programmatically or externally, meeting diverse accessibility requirements for any applications.

The following example demonstrates the [accessibility compliance of the Splitter component](slug:splitter-wai-aria-support). The described level of compliance is achievable with the [Ocean Blue A11y Accessibility Swatch](slug:accessibility-overview#color-contrast).

>caption Splitter accessibility compliance example

````RAZOR
@*Evaluate the example with Axe Core or other accessibility tools*@

@using Telerik.SvgIcons

<TelerikContextMenu @ref="@ContextMenuRef"
                    Data="@MenuItems"
                    OnClick="@((MenuItem item) => ContextMenuClickHandler(item))">
    <ItemTemplate Context="item">
        @{
            <TelerikSvgIcon Icon="@item.Icon" />
            <div>@item.Text</div>

            @if (item.CommandName == "ResizePane")
            {
                <div style="margin-left: 5px;">
                    <TelerikSvgIcon Icon="@SvgIcon.WindowRestore" />
                </div>
            }
        }
    </ItemTemplate>
</TelerikContextMenu>

<TelerikSplitter AriaLabel="My Splitter" Width="500px" Height="300px" Orientation="@SplitterOrientation.Horizontal">
    <SplitterPanes>

        <SplitterPane Size="@(Panes[0].Size + Unit)" Collapsed="@Panes[0].PaneCollapsed">
            <div @oncontextmenu:preventDefault="true"
                 @oncontextmenu="@( (MouseEventArgs e) => ShowContextMenu(e, 0) )"
                 style="width: 100%; height: 100%;">
                Resizable and collapsible
            </div>
        </SplitterPane>

        <SplitterPane>
            <div style="width: 100%; height: 100%;">
                Non-resizable pane.
            </div>
        </SplitterPane>

        <SplitterPane Size="@(Panes[1].Size + Unit)" Collapsed="@Panes[1].PaneCollapsed">
            <div @oncontextmenu:preventDefault="true"
                 @oncontextmenu="@( (MouseEventArgs e) => ShowContextMenu(e, 1) )"
                 style="width: 100%; height: 100%;">
                Resizable and collapsible
            </div>
        </SplitterPane>

    </SplitterPanes>
</TelerikSplitter>

<TelerikDialog @bind-Visible="@Visible"
               Class="dialog-btn-formatting"
               Width="300px"
               Title="Resize">
    <DialogContent>
        <label id="newWidth" for="newWidth" style="display: block;">New width:</label>
        <TelerikNumericTextBox AriaLabelledBy="newWidth" ShowClearButton="true" Width="100px" @bind-Value="NewWidth" />
        <TelerikComboBox AriaLabel="Set unit"
                         Data="@ComboBoxData"
                         Width="100px"
                         @bind-Value="ComboBoxValue">
        </TelerikComboBox>
    </DialogContent>
    <DialogButtons>
        <TelerikButton AriaLabel="Confirm Resize" OnClick="@OnApplyClick" ThemeColor="@ThemeConstants.Button.ThemeColor.Primary"><TelerikSvgIcon Icon="@SvgIcon.Check" /><span style="margin-left: 5px;">Resize</span></TelerikButton>
        <TelerikButton AriaLabel="Cancel Resize" OnClick="@(() => { Visible = false; })"><TelerikSvgIcon Icon="@SvgIcon.CancelOutline" /><span style="margin-left: 5px;">Cancel</span></TelerikButton>
    </DialogButtons>
</TelerikDialog>

<style>
    .dialog-btn-formatting .k-actions-stretched > * {
        flex: 0;
    }
</style>

@code {
    private bool Visible { get; set; }
    private int NewWidth { get; set; }
    private string Unit { get; set; } = "px";
    private string ComboBoxValue { get; set; } = "px";

    // Data sources
    private List<MenuItem> MenuItems { get; set; }
    private List<string> ComboBoxData = new List<string>() { "px", "%" };

    // Component references so we can use their methods
    private TelerikContextMenu<MenuItem> ContextMenuRef { get; set; }

    // Track the index of the pane from which the context menu is triggered
    private int currentPaneIndex;

    // Store pane sizes
    private List<Pane> Panes { get; set; } = new List<Pane> { new Pane { Size = 100, PaneCollapsed = false }, new Pane { Size = 100, PaneCollapsed = false} };

    // Generate data
    protected override void OnInitialized()
    {
        // Context menu items
        MenuItems = new List<MenuItem>()
        {
            new MenuItem(){ Text = "Resize pane", Icon = SvgIcon.ArrowsLeftRight, CommandName = "ResizePane" },
            new MenuItem(){ Text = "Collapse pane", Icon = SvgIcon.MinWidth, CommandName = "CollapsePane" }
        };
    }

    #region ContextMenu and Dialog Action Handlers
    // Show the context menu for a particular pane
    private async Task ShowContextMenu(MouseEventArgs e, int paneIndex)
    {
        currentPaneIndex = paneIndex;
        await ContextMenuRef.ShowAsync(e.ClientX, e.ClientY);
    }

    // Sample handling of the context menu click
    private void ContextMenuClickHandler(MenuItem item)
    {
        if (item.Action != null)
        {
            item.Action.Invoke();
        }
        else
        {
            switch (item.CommandName)
            {
                case "ResizePane":
                    Visible = true;
                    break;
                case "CollapsePane":
                    Panes[currentPaneIndex].PaneCollapsed = true;
                    break;
                default:
                    break;
            }
        }
    }

    private void OnApplyClick()
    {
        Panes[currentPaneIndex].Size = NewWidth;
        Unit = ComboBoxValue;
        Visible = false;
    }
    #endregion

    #region Models
    // Sample menu item class
    public class MenuItem
    {
        public string Text { get; set; }
        public ISvgIcon Icon { get; set; }
        public Action Action { get; set; }
        public string CommandName { get; set; }
    }
    
    public class Pane
    {
        public int Size { get; set; }
        public bool PaneCollapsed { get; set; }
    }
    #endregion
}
````

## See also
 * [Live demo: Splitter Accessibility](https://demos.telerik.com/blazor-ui/splitter/keyboard-navigation)