import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import CustomToolbar from "./CustomToolbar";

const modules = {
  toolbar: {
    container: "#toolbar",
  },
};

const formats = ["header", "bold", "underline"];

function stripHTMLTags(str) {
  return str.replace(/<[^>]+>/g, "");
}

export function TextEditor({ value, onChange, setIsEmpty }) {
  const onEdit = (e) => {
    onChange(e);
    console.log(e);
    if (stripHTMLTags(e) === "") {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  };

  return (
    <>
      <CustomToolbar />
      <ReactQuill
        style={{ height: "230px", borderBottomLeftRadius: "8px" }}
        theme="snow"
        placeholder="메세지를 남겨주세요."
        modules={modules}
        formats={formats}
        value={value}
        onChange={onEdit}
      />
    </>
  );
}
