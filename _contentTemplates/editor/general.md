#app-must-sanitize-content

The application must sanitize the content before passing it to the editor and, optionally, before saving it to its storage after obtaining it from the editor. It is up to the application to ensure there is no malicious content (such as input sanitization, XSS attack prevention and other security concerns).

#end

#content-size-signalr

This section applies only to Blazor **Server** apps. Blazor **WebAssembly** apps do not require additional configuration for the Editor to work with large content.

Blazor **Server** apps use the **SignalR WebSocket** to send the Editor `Value` from the browser to the server .NET runtime and vice-versa. The default SignalR maximum message size is **32 KB**. To work with larger content (especially paste images as Base64 strings), [increase the max WebSocket message size for the Blazor application]({%slug common-kb-increase-signalr-max-message-size%}).

#end
#prosemirror-schema-prerequisites
## Prerequisites

Customization of the ProseMirror schema requires familiarity with:

* JavaScript - the ProseMirror library is JavaScript-based and working with the schema is performed through JavaScript.
* [ProseMirror Schema](https://prosemirror.net/docs/guide/#schema) - the schema structure and its children ([nodes](https://prosemirror.net/docs/ref/#model.NodeType), [marks](https://prosemirror.net/docs/ref/#model.MarkType)).
#end

#prosemirror-schema-general-info
The Editor accepts a custom ProseMirror schema through the `Schema` parameter(`string`). Use this parameter to provide the name of your JS function that returns your custom schema - an instance of the [ProseMirror `Schema` class](https://prosemirror.net/docs/ref/#model.Schema).

This JS function:
* Must be declared in the global scope (the `window` object).
* Must return an instance of the [ProseMirror `Schema` class](https://prosemirror.net/docs/ref/#model.Schema)(the updated schema). You can access this class from the `ProseMirror` object of the event arguments.
* Provides an `arguments` object with the following properties:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Property | Description |
|----------|-------------|
| `getSchema` | A function that returns the current [`Schema` object](https://prosemirror.net/docs/ref/#model.Schema). Before the Editor is initialized, the returned `Schema` object is the default schema of the Editor. After the Editor is initialized, the returned `Schema` object is the updated schema. Iy you don't provide a custom schema, this function always retrns the default schema. |
| `getView` | A function that returns the currently used instance of [`EditorView` object](https://prosemirror.net/docs/ref/#view.EditorView). Before the Editor is initialized, the view (the result of the function) is null. |
| `ProseMirror` | An object that contains various ProseMirror classes and functions. |

> You can set a custom schema only once—upon the initialization of the Editor component. Further changes to the schema will not be reflected. The Editor will continue to use the initially provided schema or, if no schema is initially provided, the built-in one.
#end