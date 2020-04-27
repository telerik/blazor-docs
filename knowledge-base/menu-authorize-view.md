---
title: Menu and AuthorizeView
description: How to Show/Hide menu items when using AuthorizeView
type: how-to
page_title: Show/Hide menu items using AuthorizeView
slug: menu-kb-authorize-view
position: 
tags: 
ticketid: 1463581, 1460076
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Menu for Blazor</td>
		</tr>
	</tbody>
</table>


## Description

How do I integrate Authentication/Authorization with the TelerikMenu for Blazor? 

I'd like to allow on certain menu items based on user authentication

## Solution

>note The menu generates items based on its data source. So, to hide items for unauthorized users, you must remove them from the data source.

For example, a `.Where()` filter can be used to return only items based on certain criteria/metadata in their model and according to the authentication/authorization logic you have. Or, you could call different service methods to obtain the data depending on what view you are on. 

>caption Pseudocode example of showing menu items according to user authorization level

````CSHTML
<AuthorizeView>
	<h1>Hello, @context.User.Identity.Name!</h1>
	<TelerikMenu Data="@AuthService.GetMenuData(context.User.Identity.Name)" />
</AuthorizeView>
````

This would be the same approach as handling any other data that needs to be behind authentication mechanisms.


## Notes

A common question is whether it is possible to hide only items or their text with CSS based on authorization info used in the item template. Doing so would not be a good practice because:

* relying on CSS does not truly remove items which means a malicious user can easily get the data from the DOM.
* in WebAssembly environments where data travels as human-readable JSON over the wire should not even contain authorized data in the first place, even if it does not render in the DOM - this means the data request must be authorized in the first place and return only appropriate data.
* the menu cannot know what items to include and what items to exclude in a generic way that can tie into authentication automatically - there are many service implementations that depend on the app. Any parameter or field would still require that you prepare the data source - you can't set an Autorhize attribute on individual model items.
    * The closest approach to that is to add a field in the menu item model that contains the roles that need to be allowed or restricted, so you can filter the data based on those fields and the current role/data.
