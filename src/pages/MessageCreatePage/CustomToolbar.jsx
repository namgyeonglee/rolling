export default function CustomToolbar() {
  return (
    <div
      id="toolbar"
      style={{
        marginBottom: "-13px",
        backgroundColor: "var(--gray100)",
        border: "1px solid var(--gray300)",
        borderTopLeftRadius: "8px",
        borderTopRightRadius: "8px",
      }}
    >
      <span className="ql-formats">
        <select className="ql-header" defaultValue="3">
          <option value="1">Header 1</option>
          <option value="2">Header 2</option>
          <option value="3">Normal</option>
        </select>
      </span>
      <span className="ql-formats">
        <button className="ql-bold" />
        <button className="ql-underline" />
      </span>
    </div>
  );
}
