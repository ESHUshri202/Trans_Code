import React, { useState } from "react";

const Translate = () => {
  const [inputText, setInputText] = React.useState("");
  const [translatedText, setTranslatedText] = React.useState("");

  const handleTranslate = async () => {
    if (!inputText.trim()) return;

    try {
      const response = await fetch("https://trans-code.onrender.com/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputText }),
      });
      const data = await response.json();
      if (response.ok) {
        setTranslatedText(data.translated_text);
      } else {
        alert(data.error || "Translation failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <>
      <div className="p-12 flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-5xl font-semibold font-serif pb-12">Translate Text</h1>

        <textarea
            className="w-1/2 h-32 p-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter text to translate..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        ></textarea>

        <br />
        <button onClick={handleTranslate} className="p-4 bg-amber-400 rounded-xl hover:bg-amber-200 ">Translate</button>

        {translatedText && (
          <div className="mt-8 p-4 "> 
            <h3 className="text-5xl font-semibold font-serif pb-12">Translated Text</h3>
            <p 
            className="w-1/2 h-32 p-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >{translatedText}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Translate;
