---
title: Window with Grid Expands When Dragged
description: The Blazor TelerikWindow component grows the first time it is dragged, if it contains a Grid. Its right border sticks to the right side of the screen.
type: troubleshooting
page_title: Window with Grid Expands When Dragged for the First Time
slug: window-kb-expand-on-drag
position: 
tags: window, expand, drag, grid, move
ticketid: 1522796, 1524154
res_type: kb
---

## Description

I have a Window with no fixed width and the `Draggable` property is set to true. The Window contains a Grid. Initially the Window is rendered to be as wide as its content.
When the user starts dragging the component for the first time, it grows and sticks to the right side of the screen.

## Cause\Possible Cause(s)

The Window may expand on drag if it has no fixed width, and its content has no width either.

The Window is an absolutely positioned element. If it has no width, it will expand to enclose its content. If the Window content can extend horizontally without a limit (like block-level elements do), this can cause the Window to expand until it reaches the viewport boundary.

The unexpected expansion does not occur while the Window is centered, because of the styles, which the component uses at that time: `top: 50%`, `left: 50%` and especially `transform: translate(-50%, -50%);`. As soon as the user starts dragging the Window, the `transform` style is removed, which triggers different browser behavior.

### Grid inside a Window

The described behavior will occur most often if the Window contains a Grid.

The Grid table has a `table-layout:fixed` style. If the Grid has no width, the fixed table layout will force the table to expand to 100% of the available horizontal space. This in turn will cause the Window to expand as much as possible and stick its right end to the browser screen edge.

## Solution

Set the **Width** attribute of the Window or the Grid. To maintain [responsive behavior, set a Window width in relative units - `vw` or `%`]({%slug window-kb-responsive%}).

>caption Prevent Window expansion on drag with a relative Width

````CSHTML
<TelerikWindow Draggable="true"
               Visible="true"
               Top="10px"
               Left="10px">
    <WindowTitle>Non-Centered Window</WindowTitle>
    <WindowContent>
        <p>This Window will expand initially.</p>
        <TelerikGrid Data="@People" AutoGenerateColumns="true" />
    </WindowContent>
</TelerikWindow>

<TelerikWindow Draggable="true"
               Visible="true"
               Centered="true">
    <WindowTitle>Centered Window</WindowTitle>
    <WindowContent>
        <p>This Window will expand on drag start.</p>
        <TelerikGrid Data="@People" AutoGenerateColumns="true" />
    </WindowContent>
</TelerikWindow>

@*<TelerikWindow Draggable="true"
               Visible="true"
               Centered="true"
               Width="60vw">
    <WindowTitle>Width set to 60% of the viewport</WindowTitle>
    <WindowContent>
        <p>This Window will not expand while dragging. It will be responsive and resize with the browser window.</p>
        <TelerikGrid Data="@People" AutoGenerateColumns="true" />
    </WindowContent>
</TelerikWindow>*@

@code {

    private List<Person> People = new List<Person>() {
        new Person() { ID = 1, Name = "First Last" }
    };

    public class Person
    {
        public int ID { get; set; }
        public string Name { get; set; }
    }
}
````
