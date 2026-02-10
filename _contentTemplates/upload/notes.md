#server-security-note

>warning File handling, saving and deletion can create application vulnerabilities. This includes any related controller methods. Learn about all possible security risks and how to avoid them. Do not trust the user files or requests, and implement server-side validation.
>
* [ASP.NET Core Secuirty Considerations](https://learn.microsoft.com/en-us/aspnet/core/mvc/models/file-uploads)
* [File Upload Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html)
* [Upload Path Traversal](https://security.stackexchange.com/questions/177307/path-traversal-via-filename)
>
The code examples in this documentation do not implement security measures for simplicity and brevity.

#end


#fileselect-upload-comparison

The FileSelect and Upload components are similar and even inter-changeable. The major difference is how they communicate with the server and how the user files are received. These two aspects can determine which component to use.

* The [FileSelect](slug:fileselect-overview) is more suitable for WebAssembly apps if you want to receive and manipulate the file in the browser's .NET runtime. The user files are received in the [FileSelect `OnSelect` event](slug:fileselect-events#onselect). Uploading the files to a remote server is optional and depends on manual coding in the `OnSelect` handler. The benefit is that FileSelect allows full control over the upload process. In Blazor Server apps, the FileSelect uses the SignalR WebSocket and files over 32 KB require [`MaximumReceiveMessageSize` configuration](slug:fileselect-overview#large-file-support).
* The [Upload](slug:upload-overview) uses the HTTP protocol. The user files are received by a controller. Prefer the Upload component in Blazor Server and WebAssembly apps to directly send files to a remote endpoint, as HTTP is the usual and faster way to do this. Large file support requires [different configurations](slug:upload-overview#large-file-uploads), depending on the receiving web server.

#end
