import axios from "axios";
import { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [data, setData] = useState("");
  const inputFiled = document.getElementById("inputFiled");
  const [newInput, setNewInput] = useState("");

  const setInputValue = (event) => {
    setInput(event.target.value);
    // console.log(input);
  };

  const removeSpaces = (input) => {
    let arr = input.split("");

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === " ") {
        arr[i] = "+";
      }
    }

    arr = arr.join("");

    return arr;
  };

  const getData = async (input) => {
    inputFiled.value = "";
    let name = "";

    console.log(input);
    if (!input) {
      alert("Enter any movie name");
    } else {
      name = removeSpaces(input);
      console.log(name);
    }
    let data = await axios.get(
      `https://www.omdbapi.com/?apikey=deea189a&t=${name}`
    );
    console.log(data);
    setData(data);
    
  };

  return (
    <>
      <nav className="text-center p-5 text-[#fff] bg-[#242B2E]">
        <input
          id="inputFiled"
          className="p-2 mr-3 rounded-md outline-none text-[#6A1B4D]"
          type="text"
          placeholder="Enter movie name"
          onChange={setInputValue}
        />
        <button
          className="bg-[#758283] p-2 rounded-md hover:bg-[#CAD5E2] hover:text-[#758283]"
          onClick={() => getData(input)}
        >
          Search
        </button>
      </nav>

      <div
        id="detailContainer"
        className="flex flex-col items-center justify-center  bg-[#0D0D0D]"
      >
        <img className="mt-2" src={data.data?.Poster} />

        <div className="bg-[#242B2E] text-[#CAD5E2] p-8 font-semibold rounded-md text-center mt-3 m-2">
          <p className="mb-1 text-2xl">Title : {data.data?.Title}</p>
          <p className="mb-1 text-[#DDD101]">Actors : {data.data?.Actors}</p>
          <p className="mb-1">Director : {data.data?.Director}</p>
          <p className="mb-1">Genre : {data.data?.Genre}</p>
          <p className="mb-1">Released Date : {data.data?.Released}</p>
          <p className="mb-1 text-[#4DD637]">BoxOffice Collection : {data.data?.BoxOffice}</p>
          <p className="mb-1">Runtime : {data.data?.Runtime}</p>
          <p className="mb-1 text-[#FF6666]">Plot : {data.data?.Plot}</p>
          <p className="mb-1">Awards : {data.data?.Awards}</p>
          <p className="mb-1">IMDB Rating : {data.data?.imdbRating}</p>
        </div>
      </div>
    </>
  );
}

export default App;
