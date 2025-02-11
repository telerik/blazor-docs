---
title: Accessibility Overview
page_title: Telerik UI for Blazor TileLayout Documentation | TileLayout Accessibility Overview
description: "Get started with the Telerik UI for Blazor TileLayout and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
tags: telerik,blazor,accessibility,wai-aria,wcag,tilelayout
slug: tilelayout-accessibility-overview
position: 0
---

# Accessibility Overview

The UI for Blazor TileLayout component is <a href="https://www.w3.org/TR/WCAG22" target="_blank">WCAG 2.2 AA</a> and <a href="https://www.section508.gov" target="_blank">Section 508</a> compliant. The component also follows the <a href="https://www.w3.org/WAI/ARIA/apg/" target="_blank">WAI-ARIA best practices</a> for implementing the keyboard navigation for its component <a href="https://www.w3.org/TR/wai-aria/#roles" target="_blank">role</a>, and is tested against the popular screen readers.

# Blazor TileLayout Accessibility Example

WCAG 2.2 introduces the <a href="https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements" target="_blank">"Dragging Movements"</a> criterion as an important part of the Operable principle. Its primary goal is to guarantee that any feature reliant on drag actions offers an alternative method that can be executed with a single click, enhancing user accessibility.

The illustrative example below shows the tile resize action, achievable through the [DropDown Button](slug:dropdownbutton-overview). Telerik UI for Blazor aims to offer a versatile API that allows users to trigger all functions programmatically or externally, meeting diverse accessibility requirements for any applications.

The following example demonstrates the [accessibility compliance of the TileLayout component](slug:tilelayout-wai-aria-support). The described level of compliance is achievable with the [Ocean Blue A11y Accessibility Swatch](slug:accessibility-overview#color-contrast).

>caption TileLayout accessibility compliance example

````RAZOR
@*Evaluate the example with Axe Core or other accessibility tools*@

<style>
    .header {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }

    .header-text {
        margin: 0;
    }

    .window-restore {
        height: 20px;
    }
</style>

<TelerikTileLayout Columns="2"
                   RowHeight="150px"
                   Resizable="true"
                   Reorderable="true">
    <TileLayoutItems>
        @foreach (var item in TileItems)
        {
            <TileLayoutItem RowSpan="@item.RowSpan" ColSpan="@item.ColSpan">
                <HeaderTemplate>
                    <div class="header">
                        <h5 class="header-text">@item.HeaderContent</h5>
                        <TelerikDropDownButton AriaLabel="Resize Options" ShowArrowButton="false" FillMode="@ThemeConstants.DropDownButton.FillMode.Clear" Icon="@SvgIcon.MoreVertical">
                            <DropDownButtonItems>
                                <DropDownButtonItem OnClick="@(() => HandleTileResize(item))" Icon="@SvgIcon.ImageResize">
                                    Resize tile
                                    <TelerikSvgIcon Icon="@SvgIcon.WindowRestore" Class="window-restore" />
                                </DropDownButtonItem>
                            </DropDownButtonItems>
                        </TelerikDropDownButton>
                    </div>
                </HeaderTemplate>
                <Content>
                    @(new MarkupString($"{item.Content}"))
                </Content>
            </TileLayoutItem>
        }
    </TileLayoutItems>
</TelerikTileLayout>

<TelerikDialog @bind-Visible="@Visible"
               Width="300px"
               Title="Resize">
    <DialogContent>
        <span>Resize <b>Tile</b> to:</span>

        <div class="example">
            <div class="column-wrapper">
                <TelerikDropDownList Data="@ColSpanOptions"
                                     AriaLabel="Select Column Span"
                                     @bind-Value="SelectedColSpan">
                    <DropDownListSettings>
                        <DropDownListPopupSettings Height="auto" />
                    </DropDownListSettings>
                </TelerikDropDownList>
                <i>column(s)</i>
            </div>
            <span style="padding-top: 5px;">and</span>
            <div class="row-wrapper">
                <TelerikDropDownList Data="@RowSpanOptions"
                                     AriaLabel="Select Row Span"
                                     @bind-Value="SelectedRowSpan">
                    <DropDownListSettings>
                        <DropDownListPopupSettings Height="auto" />
                    </DropDownListSettings>
                </TelerikDropDownList>
                <i>row(s)</i>
            </div>
        </div>
    </DialogContent>
    <DialogButtons>
        <TelerikButton AriaLabel="Confirm Resize" OnClick="@ApplyResize" ThemeColor="@ThemeConstants.Button.ThemeColor.Primary"><TelerikSvgIcon Icon="@SvgIcon.Check" /><span style="margin-left: 5px;">Resize</span></TelerikButton>
        <TelerikButton AriaLabel="Cancel Resize" OnClick="@(() => { Visible = false; })"><TelerikSvgIcon Icon="@SvgIcon.Cancel" /><span style="margin-left: 5px;">Cancel</span></TelerikButton>
    </DialogButtons>
</TelerikDialog>

<style>
    .example {
        display: flex;
        flex-direction: row;
        gap: 10px;
        height: 55px;
        overflow: none;
    }

    .column-wrapper {
        dislay: flex;
        width: 40%;
        flex-direction: column;
        order: 0;
        height: 55px;
    }

    .row-wrapper {
        dislay: flex;
        width: 40%;
        flex-direction: column;
        order: 1;
        height: 55px;
    }
</style>

@code {
    private bool Visible { get; set; }
    private TileModel CurrentTile { get; set; }

    private List<int> ColSpanOptions = new List<int>() { 1, 2 };
    private List<int> RowSpanOptions = new List<int>() { 1, 2 };

    private int SelectedColSpan { get; set; }
    private int SelectedRowSpan { get; set; }

    private void ApplyResize()
    {
        CurrentTile.ColSpan = SelectedColSpan;
        CurrentTile.RowSpan = SelectedRowSpan;

        Visible = false;
    }

    private void HandleTileResize(TileModel selectedTile)
    {
        Visible = true;

        CurrentTile = selectedTile;
    }

    private List<TileModel> TileItems = new List<TileModel>
    {
        new TileModel
        {
            RowSpan = 1,
            ColSpan = 1,
            HeaderContent = "Sales Overview",
            Content = "Total Sales: $1,234,567<br />Growth Rate: 12%"
        },
        new TileModel
        {
            RowSpan = 1,
            ColSpan = 1,
            HeaderContent = "Upcoming Events",
            Content = "<ul><li>June 15, 2024 - Product Launch</li><li>July 20, 2024 - Annual Meeting</li><li>August 5, 2024 - Networking Event</li></ul>"
        },
        new TileModel
        {
            RowSpan = 1,
            ColSpan = 1,
            HeaderContent = "Market Analysis",
            Content = "The current market shows a significant increase in demand for sustainable products."
        },
        new TileModel
        {
            RowSpan = 1,
            ColSpan = 1,
            HeaderContent = "Project Management",
            Content = "Project A: 80% Complete<br />Project B: 60% Complete"
        }
    };

    public class TileModel
    {
        public int RowSpan { get; set; }
        public int ColSpan { get; set; }
        public string HeaderContent { get; set; }
        public string Content { get; set; }
    }
}
````

## See also
 * [Live demo: TileLayout Resizing](https://demos.telerik.com/blazor-ui/tilelayout/resizing)