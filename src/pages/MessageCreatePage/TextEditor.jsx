import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, false] }],
      ["bold", "underline"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
    ],
  },
};

function stripHTMLTags(str) {
  return str.replace(/<[^>]+>/g, "");
}

const formats = ["header", "bold", "underline", "list", "bullet", "indent"];

export function TextEditor({ value, onChange, setIsEmpty }) {
  const onEdit = (e) => {
    onChange(e);
    if (stripHTMLTags(e) === '') {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  };

  return (
    <ReactQuill
      style={{ height: "230px", marginBottom: "50px" }}
      theme="snow"
      placeholder="메세지를 남겨주세요."
      modules={modules}
      formats={formats}
      value={value}
      onChange={onEdit}
    />
  );
}
