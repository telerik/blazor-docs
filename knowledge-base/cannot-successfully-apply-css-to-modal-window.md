---  
title: Applying CSS to a Modal Window in UI for Blazor  
description: Learn how to successfully apply CSS styles to a modal window in UI for Blazor.  
type: how-to  
page_title: How to Apply Custom CSS to a UI for Blazor Modal Window  
meta_title: Applying Custom CSS to UI for Blazor Window  
slug: apply-css-modal-window-blazor  
tags: blazor, window, css, modal  
res_type: kb  
---  

## Environment  

<table>  
<tbody>  
<tr>  
<td>Product</td>  
<td>  
UI for Blazor Window  
</td>  
</tr>  
<tr>  
<td>Version</td>  
<td>Current</td>  
</tr>  
</tbody>  
</table>  

## Description  

I want to apply custom CSS styles to a modal window using the [UI for Blazor Window](https://docs.telerik.com/blazor-ui/components/window/overview) component, but the styles do not seem to apply correctly.  

This knowledge base article also answers the following questions:  
- How can I style a modal window in UI for Blazor?  
- Why is my CSS not working with a modal window in Blazor?  
- What steps are needed to apply custom CSS to a Blazor Window component?  

## Solution  

To apply custom CSS to a modal window, ensure you follow these steps:  

1. Define a unique `Class` for the Window component to differentiate it from other elements.  

```razor  
<TelerikWindow Modal="true" Class="custom-window" Title="My Modal Window">  
    <p>Content of the modal window.</p>  
</TelerikWindow>  
```  

2. Add your custom CSS rules targeting the defined class.  

```css  
.custom-window {  
    background-color: #f0f0f0; /* Example background color */  
    border: 2px solid #333; /* Example border styling */  
    padding: 20px; /* Example padding */  
}  
```  

3. Ensure your CSS is loaded correctly in the application by including it in the `wwwroot/css/site.css` file or any other linked CSS file in your Blazor project.  

4. If the styles are still not applied, check for CSS specificity issues or conflicting styles from other libraries. Use more specific selectors if needed. For example:  

```css  
.blazor .custom-window {  
    color: #000;  
}  
```  

5. Verify that the `Modal` parameter is set to `true` for the Window component to ensure it behaves as a modal.  

## See Also  

- [UI for Blazor Window Documentation](https://docs.telerik.com/blazor-ui/components/window/overview)  
- [UI for Blazor Modal Window](https://docs.telerik.com/blazor-ui/components/window/modal)  
- [CSS Specificity and How It Works](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity)  
