---
title: How to save Grid state in a WebAssembly application?
description: How to save Grid state in a WebAssembly project?
page_title: Save Grid State in WASM
slug: grid-kb-save-state-in-webassembly
position: 
tags: grid,state,wasm,webassembly,save
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Grid for Blazor, <br /> TreeList for Blazor</td>
        </tr>
    </tbody>
</table>


## Description

How to save the Grid State in a WASM project? How to save the Grid State in a WebAssembly through a controller? How to save the Grid State in a WebAssembly from the browser's LocalStorage? 


## Solution

The [sample app in GitHub](https://github.com/telerik/blazor-ui/tree/master/grid/save-state-in-wasm-through-controller) shows two ways to store the `GridState`:

* Through a custom controller;
* Through a custom service that calls the browser's `LocalStorage`.

## See Also

* [Grid State](slug:grid-state)
* [Save and load the Grid state from `localStorage`](slug:grid-kb-save-load-state-localstorage)
