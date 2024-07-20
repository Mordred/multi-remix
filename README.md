This is minimal reproduction for bug in @remix/server-runtime when using dev server.

There are two Remix applications server each on subpath as /admin/ and /blog/.
Both are served using express aplication which handles base routing.

Run:
===

```shell
npm install
node server.js
```

Check: http://localhost:3000/admin/ and http://localhost:3000/blog/


Expected behaviour:
===

Both apps should run without problem


Actual Behavior:
===

One of them is throwing error:

```
TypeError: Cannot read properties of undefined (reading 'file')
```

Problem
===

Remix dev plugin is setting hook for `server-runtime`, but because it is set globally - second application is rewriting
hook which will cause crash.

https://github.com/remix-run/remix/blob/main/packages/remix-dev/vite/plugin.ts#L1317 -> setting hook
https://github.com/remix-run/remix/blob/main/packages/remix-server-runtime/dev.ts#L41 -> global storage
