---
title: Accessibility Overview
page_title: Telerik UI for Blazor Window Documentation | Window Accessibility Overview
description: "Get started with the Telerik UI for Blazor Window and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
tags: telerik,blazor,accessibility,wai-aria,wcag,window
slug: window-accessibility-overview
position: 0
---

# Accessibility Overview

The UI for Blazor Window component is <a href="https://www.w3.org/TR/WCAG22" target="_blank">WCAG 2.2 AA</a> and <a href="https://www.section508.gov" target="_blank">Section 508</a> compliant. The component also follows the <a href="https://www.w3.org/WAI/ARIA/apg/" target="_blank">WAI-ARIA best practices</a> for implementing the keyboard navigation for its component <a href="https://www.w3.org/TR/wai-aria/#roles" target="_blank">role</a>, and is tested against the popular screen readers.

# Blazor Window Accessibility Example

WCAG 2.2 introduces the <a href="https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements" target="_blank">"Dragging Movements"</a> criterion as an important part of the Operable principle. Its primary goal is to guarantee that any feature reliant on drag actions offers an alternative method that can be executed with a single click, enhancing user accessibility.

The illustrative example below shows the window resize action, achievable through the [Dialog]({%slug dialog-overview%}) and window position change through a button. Telerik UI for Blazor to offer a versatile API that allows users to trigger all functions programmatically or externally, meeting diverse accessibility requirements for any applications.

The following example demonstrates the [accessibility compliance of the Window component]({%slug window-wai-aria-support%}). The described level of compliance is achievable with the [Ocean Blue A11y Accessibility Swatch]({%slug accessibility-overview%}#color-contrast).

>caption Window accessibility compliance example

````RAZOR
@*Evaluate the example with Axe Core or another accessibility tool*@

<style>
    .resize-button {
        margin-left: 27px;
    }

    .window-container {
        position: fixed;
        width: 100vw;
        height: 100vh;
        z-index: 9999;
    }
</style>

<div @onclick="@HandleWindowPosition" class="window-container">
    <TelerikWindow @bind-Visible="@WindowIsVisible"
                   Width="@(WindowWidth + "px")"
                   Height="@(WindowHeigh + "px")"
                   @bind-Top="@WindowTop"
                   @bind-Left="@WindowLeft">
        <WindowTitle>
            <span class="k-window-title">WCAG 2.2 Compliance</span>
        </WindowTitle>
        <WindowContent>
            <ul>
                <li>
                    To move the Window, click the
                    <TelerikSvgIcon Icon="@SvgIcon.ArrowsMove"></TelerikSvgIcon> icon and then
                    click anywhere on the screen.
                </li>
                <li>Click the "Resize Window" button and enter the new dimensions.</li>
            </ul>
            <TelerikButton AriaLabel="Open Resize Dialog" Class="resize-button" OnClick="@(() => DialogVisible = true)">Resize Window</TelerikButton>
        </WindowContent>
        <WindowActions>
            <WindowAction Title="Change Position" OnClick="@(()=> ShouldMove = true)" Icon="@SvgIcon.ArrowsMove" />
            <WindowAction Name="Minimize" />
            <WindowAction Name="Close" />
        </WindowActions>
    </TelerikWindow>

    <TelerikDialog @bind-Visible="@DialogVisible"
                   Title="Resize"
                   Width="450px"
                   Height="220px">
        <DialogContent>
            New width:
            <div class="resize">
                <TelerikNumericTextBox AriaLabel="Set New Width" @bind-Value="NewWidth" Min="0" Format="## pixels" />
            </div>
            New height:
            <div class="resize">
                <TelerikNumericTextBox AriaLabel="Set New Height" @bind-Value="NewHeight" Min="0" Format="## pixels" />
            </div>
        </DialogContent>
        <DialogButtons>
            <TelerikButton AriaLabel="Confirm Resize" OnClick="@ApplyResize" ThemeColor="@ThemeConstants.Button.ThemeColor.Primary"><TelerikSvgIcon Icon="@SvgIcon.Check" /><span style="margin-left: 5px;">Resize</span></TelerikButton>
            <TelerikButton AriaLabel="Cancel Resize" OnClick="@(() => { DialogVisible = false; })"><TelerikSvgIcon Icon="@SvgIcon.Cancel" /><span style="margin-left: 5px;">Cancel</span></TelerikButton>
        </DialogButtons>
    </TelerikDialog>

@if (!WindowIsVisible)
{
    <TelerikButton AriaLabel="Open Window" OnClick="@( () => WindowIsVisible = !WindowIsVisible )">Open window</TelerikButton>
}
</div>

<style>
    .resize {
        display: flex;
        flex-direction: row;
        gap: 10%;
    }
</style>

@code {
    private bool ShouldMove {get; set;}
    private bool WindowIsVisible { get; set; }
    private bool DialogVisible { get; set; }

    private string WindowTop = "100px";
    private string WindowLeft = "50px";

    private int WindowWidth = 450;
    private int WindowHeigh = 220;

    private int NewWidth { get; set; } = 450;
    private int NewHeight { get; set; } = 220;

    private void ApplyResize()
    {
        WindowWidth = NewWidth;
        WindowHeigh = NewHeight;

        DialogVisible = false;
    }

    private void HandleWindowPosition(MouseEventArgs e)
    {
        if (ShouldMove)
        {
            WindowTop = e.ClientY + "px";
            WindowLeft = e.ClientX + "px";

            ShouldMove = false;
        }
    }
}
````

## See also
 * [Live demo: Window Accessibility](https://demos.telerik.com/blazor-ui/window/keyboard-navigation)
 * [Live demo: Window Overview](https://demos.telerik.com/blazor-ui/window/overview)
 * [Live demo: Blazor Accessibility Overview](https://docs.telerik.com/blazor-ui/accessibility/overview)