#delete-confirmation
To customize the appearance and behavior of the delete confirmation dialog, use one of the following options:

* [Localization](slug://globalization-localization) - this approach is useful if you want to change just the text of the built-in delete confirmation dialog elements. It does not allow adding item details to the dialog text.

* [Predefined dialogs (`DialogFactory`)](slug://dialog-predefined#confirm) - this option is useful if you want to change the dialog text and include some details for the item the user tries to delete (for example, record name).

* [Dialog Component](slug://dialog-overview) - this solution allows you to fully customize the rendering and appearance of the dialog. You may set the desired `ThemeColor` and add any content there, be that custom text, HTML elements or other components.

[Read more about customizing the delete confirmation dialog...](slug://grid-kb-customize-delete-confirmation-dialog)
#end