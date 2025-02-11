#app-must-sanitize-content

The application must sanitize the content before passing it to the Editor and, optionally, before saving it to its storage after obtaining it from the Editor. It is up to the application to ensure there is no malicious content (such as input sanitization, XSS attack prevention and other security concerns).

#end

#content-size-signalr

This section applies only to Blazor **Server** apps. Blazor **WebAssembly** apps do not require additional configuration for the Editor to work with large content.

Blazor **Server** apps use the **SignalR WebSocket** to send the Editor `Value` from the browser to the server .NET runtime and vice-versa. The default SignalR maximum message size is **32 KB**. To work with larger content (especially paste images as Base64 strings), [increase the max WebSocket message size for the Blazor application](slug:common-kb-increase-signalr-max-message-size).

#end
#prosemirror-schema-prerequisites
## Prerequisites

To work with ProseMirror, make sure you are familiar with:

* JavaScript&mdash;ProseMirror is a JavaScript library and the schema uses JavaScript syntax.
* <a href="https://prosemirror.net/docs/guide/#schema" target="_blank">ProseMirror Schema</a>&mdash;The schema structure and its children (<a href="https://prosemirror.net/docs/ref/#model.NodeType" target="_blank">nodes</a> and <a href="https://prosemirror.net/docs/ref/#model.MarkType" target="_blank">marks</a>).

Modifying the ProseMirror Schema is outside of the Editor scope and we do not provide support for such customizations.
#end

#prosemirror-schema-general-info
The Editor accepts a custom ProseMirror schema through its `Schema` parameter. Set this `string` parameter to the name of a JavaScript function that:

* Is declared in the global scope (the `window` object).
* Returns an instance of the <a href="https://prosemirror.net/docs/ref/#model.Schema" target="_blank">ProseMirror `Schema` class</a>(the updated schema). You can access this class from the `ProseMirror` object of the event arguments.
* Accepts a single argument.

The Editor will call this function and will pass an argument object that contains the following properties:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Property | Description |
|----------|-------------|
| `getSchema` | A function that returns the current <a href="https://prosemirror.net/docs/ref/#model.Schema" target="_blank">`Schema` object</a>. Before the Editor is initialized, the returned `Schema` object is the default schema of the Editor. After the Editor is initialized, the returned `Schema` object is the updated schema. If you don't provide a custom schema, this function always returns the default schema. |
| `getView` | A function that returns the currently used instance of the <a href="https://prosemirror.net/docs/ref/#view.EditorView" target="_blank">`EditorView` object</a>. Before the Editor is initialized, the view (the result of the function) is null. |
| `ProseMirror` | An object that contains various ProseMirror classes and functions. |

> You can set a custom schema only once during initialization of the Editor component. Further changes to the schema will not take effect and the component will continue using the initial custom or built-in schema.
#end