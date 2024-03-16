import { useEffect, useState, useCallback, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) {
      str += "0123456789";
    }
    if (charAllowed) {
      str += "!@#$%&*?";
    }

    for (let i = 1; i <= length; i++) {
      let randomPass = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(randomPass);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed]);

  const passwordRef = useRef(null);

  const copyText = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <>
      <div className="container flex justify-center items-center h-screen">
        <div className="bg-gray-800 w-3/5 p-10 rounded-lg flex flex-col gap-10 ">
          <div>
            <h1 className="text-white text-4xl text-center">
              Password Generator
            </h1>
          </div>
          <div className="flex">
            <input
              className="w-full px-3 py-4 outline-none rounded-l-lg text-xl shadow-inner"
              type="text"
              placeholder="Password"
              readOnly
              value={password}
              ref={passwordRef}
            />
            <button
              onClick={copyText}
              className="bg-teal-500 text-white text-xl px-10 rounded-r-lg font-semibold"
            >
              Copy
            </button>
          </div>
          <div className="flex gap-10">
            <div className="flex gap-2">
              <input
                onChange={(e) => setLength(e.target.value)}
                className="text-teal-500"
                type="range"
                min={8}
                max={16}
              />
              <label className="text-xl text-teal-500">Length({length})</label>
            </div>
            <div className="flex gap-2">
              <input
                className="accent-teal-500"
                type="checkbox"
                onChange={() => setNumberAllowed((prev) => !prev)}
              />
              <label className="text-xl text-teal-500">Numbers</label>
            </div>
            <div className="flex gap-2">
              <input
                className="accent-teal-500"
                type="checkbox"
                onChange={() => setCharAllowed((prev) => !prev)}
              />
              <label className="text-xl text-teal-500">Characters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
