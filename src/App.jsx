import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState("https://placehold.co/600x400.png");
  const [error, setError] = useState("");

  async function greet() {
    if (!link) {
      setError("Link cannot be empty");
      return;
    }

    setError(""); // Clear any previous errors

    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { link }));
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Welcome to Steves-bet bot!</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
        className="flex items-center space-x-2"
      >
        <input
          id="greet-input"
          className={`${
            error ? "border-red " : "border-gray-300"
          } border p-2 rounded-lg`}
          onChange={(e) => setLink(e.currentTarget.value)}
          placeholder="Enter a link..."
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Scrape
        </button>
      </form>

      {error && <p className="text-red mt-2">{error}</p>}
      <p className="mt-4">{greetMsg}</p>

      <img className="my-4" src={image} alt="" />
    </div>
  );
}

export default App;
