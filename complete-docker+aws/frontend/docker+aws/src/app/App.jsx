
import "./App.css"
import {Editor} from "@monaco-editor/react"

function App() {

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Files</h2>

        <ul className="space-y-2">
          <li className="p-2 rounded hover:bg-gray-800 cursor-pointer">
            index.html
          </li>
          <li className="p-2 rounded hover:bg-gray-800 cursor-pointer">
            style.css
          </li>
          <li className="p-2 rounded hover:bg-gray-800 cursor-pointer">
            app.js
          </li>
        </ul>
      </aside>

      {/* Editor Section */}
      <main className="flex-1 p-4 flex flex-col">
        {/* Tab/Header */}
        <div className="bg-white border rounded-t-lg px-4 py-2">
          <span className="font-medium">index.html</span>
        </div>

        {/* Editor */}
        <textarea
          className="flex-1 p-4 border border-t-0 rounded-b-lg resize-none outline-none font-mono bg-white"
          defaultValue={`<!DOCTYPE html>
<html>
<head>
  <title>My App</title>
</head>
<body>
  <h1>Hello World</h1>
</body>
</html>`}
        />
      </main>
    </div>
  );
}

export default App
