import React, { useEffect, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import App from "../App";
import axios from "axios";
import ImageResize from "quill-image-resize-module-react";

Quill.register("modules/imageResize", ImageResize);
const TextEditor = () => {
  const [value, setValue] = useState("");
  // console.log("values", value);

  useEffect(() => {
    getQuillData();
  }, []);

  const getQuillData = async () => {
    const res = await axios.get("http://localhost:5000/api/quill/get");
    console.log("res", res.data);
    const newValue = res.data.map((data) => setValue(data.content));
    // setValue(res.data.content)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("content", value);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/quill/save",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  App.modules = {
    toolbar: [
      [{ font: [] }],
      [{ size: [] }],
      [{ 'script': 'sub'}, { 'script': 'super' }],  
      [{ 'direction': 'rtl' }],  
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
       
    ],
    clipboard: {
      matchVisual: false,
    },
    imageResize: {
      parchment: Quill.import("parchment"),
      modules: ["Resize", "DisplaySize"],
    },
  };

  App.formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "color",
    "background",
  ];

  return (
    <>
      <section className="main-sec">
        <div className="row">
          <h1>TextEditor</h1>
          <form onSubmit={handleSubmit}>
            <ReactQuill
              placeholder="Write Something here"
              modules={App.modules}
              formats={App.formats}
              theme="snow"
              value={value}
              onChange={setValue}
            />
            <button type="submit">Save</button>
          </form>
        </div>
      </section>
    </>
  );
};

export default TextEditor;
