import React, { useState } from "react";

function ArticleForm({ onAdd }) {
  const [form, setForm] = useState({
    id: "",
    title: "",
    content: "",
    url: "",
    published_at: "",
    source: "",
    category: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Simple validation
    if (
      !form.id ||
      !form.title ||
      !form.content ||
      !form.url ||
      !form.published_at ||
      !form.source
    ) {
      setError("Please fill in all required fields.");
      return;
    }
    try {
      await onAdd({ ...form, id: Number(form.id) });
      setSuccess("Article added!");
      setForm({
        id: "",
        title: "",
        content: "",
        url: "",
        published_at: "",
        source: "",
        category: "",
      });
    } catch (err) {
      setError("Failed to add article. Please check your input or try a different ID.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <h2>Add Article</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {success && <div style={{ color: "green" }}>{success}</div>}
      <input name="id" placeholder="ID" value={form.id} onChange={handleChange} required />
      <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
      <input name="content" placeholder="Content" value={form.content} onChange={handleChange} required />
      <input name="url" placeholder="URL" value={form.url} onChange={handleChange} required />
      <input name="published_at" placeholder="Published At" value={form.published_at} onChange={handleChange} required />
      <input name="source" placeholder="Source" value={form.source} onChange={handleChange} required />
      <input name="category" placeholder="Category" value={form.category} onChange={handleChange} />
      <button type="submit">Add Article</button>
    </form>
  );
}

export default ArticleForm; 