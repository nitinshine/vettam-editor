import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useState, useEffect } from "react";
import {
  FiMessageSquare,
  FiMoreVertical,
  FiCloud,
  FiEdit,
  FiInfo,
  FiLink2,
  FiEdit3,
  FiImage
} from "react-icons/fi";
import "../EditorPage.css";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Color from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import Highlight from "@tiptap/extension-highlight";
import FontFamily from "@tiptap/extension-font-family";
import Link from "@tiptap/extension-link";
const MAX_CHARS_PER_PAGE = 900;

const EditorPage = () => {
  const [activeTab, setActiveTab] = useState("Page");
  const [pages, setPages] = useState<{ pageNumber: number; header: string; content: string; footer: string }[]>([]);

  const editor = useEditor({
    extensions: [StarterKit,   Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"]
      }),
      Color,
      TextStyle,
      Highlight,
      FontFamily,
      Link.configure({
        openOnClick: true
      }),
    ],
    content: `<ol>
      <li>Androids and Iphones : explores the uneasy coexistence...</li>
      <li>Empathy and Identity: To distinguish androids from humans...</li>
    </ol>`,
    onUpdate: ({ editor }) => {
      splitIntoPages(editor.getText());
    },
  });

  useEffect(() => {
    if (editor) {
      splitIntoPages(editor.getText());
    }
  }, [editor]);

  const splitIntoPages = (text: string) => {
    const newPages = [];
    let pageNumber = 1;
    for (let i = 0; i < text.length; i += MAX_CHARS_PER_PAGE) {
      const pageContent = text.slice(i, i + MAX_CHARS_PER_PAGE);
      newPages.push({
        pageNumber,
        header: "Document Header Example", 
        content: pageContent,
        footer: `Page ${pageNumber}`,
      });
      pageNumber++;
    }
    // Add total pages to footer dynamically
    const totalPages = newPages.length;
    const updated = newPages.map((p) => ({
      ...p,
      footer: `${p.footer} of ${totalPages}`
    }));
    setPages(updated);
  };

  const getApiPayload = () => {
    return {
      pages: pages
    };
  };

  const handleSaveToApi = () => {
    const payload = getApiPayload();
    console.log("API Payload", payload);
    fetch('/api/save-document', { method: 'POST', body: JSON.stringify(payload) })
  };

  const handleDraw = () => console.log("Drawing mode enabled");


    const handleInsertLink = () => {
    const url = prompt("Enter link URL:");
    if (url) {
      editor?.chain().focus().setLink({ href: url }).run();
    }
  };



  const InfoIcon = FiInfo as React.ComponentType<{ className?: string }>;
  const CloudIcon = FiCloud as React.ComponentType<{ className?: string }>;
  const FiEditIcon = FiEdit as React.ComponentType<{ className?: string }>;
  const MessageSquareIcon = FiMessageSquare as React.ComponentType<{ className?: string }>;
  const FiLink2Icon = FiLink2 as React.ComponentType<{ className?: string }>;
  const FiEdit3Icon = FiEdit3 as React.ComponentType<{ className?: string }>;
  const FiMoreVerticalIcon = FiMoreVertical as React.ComponentType<{ className?: string }>;
  return (
    <div className="editor-wrapper">
      {/* HEADER */}
      <div className="editor-header">
        <div className="header-left">
          <span className="doc-title">
            Olga Tellis v. Bombay Municipal Corporation (1985).docx
          </span>
<InfoIcon className="header-icon" />
          <CloudIcon className="header-icon" />
          <span className="saved-text">Saved</span>
        </div>
        <div className="header-right">
          <MessageSquareIcon className="header-icon" />
          <div className="purple-circle">
            <FiEditIcon className="edit-icon" />
          </div>
          <FiMoreVerticalIcon className="header-icon" />
        </div>
      </div>

      {/* TABS */}
      <div className="editor-tabs">
        <span className={`tab ${activeTab === "Text" ? "active" : ""}`} onClick={() => setActiveTab("Text")}>Text</span>
        <span className={`tab ${activeTab === "Page" ? "active" : ""}`} onClick={() => setActiveTab("Page")}>Page</span>
      </div>

      {/* TOOLBARS */}
      {activeTab === "Page" && (
        <div className="page-toolbar">
          <button onClick={handleSaveToApi}>Header & Footer</button>
          <button>Margin</button>
          <button style={{ backgroundColor: 'white', color: 'black', width: '100px', height: '40px', borderRadius: '6px' }}>Rulers</button>
          <button>Watermark</button>
          <button>Zoom</button>
          <button>Fill</button>
          <button>Character count</button>
        </div>
      )}
      {activeTab === "Text" && (
        <div className="text-toolbar">
          {/* Font Family */}
          <select onChange={(e) => editor?.chain().focus().setFontFamily(e.target.value).run()}>
            <option value="Arial">Arial</option>
            <option value="Georgia">Georgia</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Avenir Next">Avenir Next</option>
          </select>

          {/* Font Size */}
          <select onChange={(e) => editor?.chain().focus().setFontSize?.(e.target.value).run()}>
            <option value="12px">12</option>
            <option value="14px">14</option>
            <option value="16px">16</option>
            <option value="18px">18</option>
            <option value="20px">20</option>
          </select>

          {/* Formatting */}
          <button onClick={() => editor?.chain().focus().toggleBold().run()}><b>B</b></button>
          <button onClick={() => editor?.chain().focus().toggleItalic().run()}><i>I</i></button>
          <button onClick={() => editor?.chain().focus().toggleUnderline().run()}><u>U</u></button>

          {/* Colors */}
          <input type="color" onChange={(e) => editor?.chain().focus().setColor(e.target.value).run()} />
          <input type="color" onChange={(e) => editor?.chain().focus().setHighlight({ color: e.target.value }).run()} />

          {/* Alignment */}
          <button onClick={() => editor?.chain().focus().setTextAlign("left").run()}>Left</button>
          <button onClick={() => editor?.chain().focus().setTextAlign("center").run()}>Center</button>
          <button onClick={() => editor?.chain().focus().setTextAlign("right").run()}>Right</button>

          {/* Lists */}
          <button onClick={() => editor?.chain().focus().toggleBulletList().run()}>• List</button>
          <button onClick={() => editor?.chain().focus().toggleOrderedList().run()}>1. List</button>

          {/* Custom Tools */}
          <div className="toolbar-buttons">
            <button title="Draw" onClick={handleDraw}><FiEdit3Icon /></button>
            <button title="Insert Link" onClick={handleInsertLink}><FiLink2Icon /></button>
          </div>
        </div>
      )}


      {/* MAIN EDITOR + THUMBNAILS */}
      <div className="editor-area-wrapper">
        <div className="editor-page">
          <EditorContent editor={editor} className="editor-content" />
        </div>
        <div className="right-panel">
          <div className="tab-header">
            <span className="tab active">Thumbnail</span>
            <span className="tab">Index</span>
            <span className="tab">Search</span>
          </div>
          <div className="thumbnail-preview">
            {pages.map((page) => (
              <div key={page.pageNumber} className="thumb">
                <div className="page-header">{page.header}</div>
                <p>{page.content}</p>
                <div className="page-footer">{page.footer}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="editor-footer">
        <span>{MAX_CHARS_PER_PAGE} characters per page</span>
        <span className="page-count">
          Page <strong>{pages.length > 0 ? 1 : 0}</strong> of <strong>{pages.length}</strong>
        </span>
        <div className="ask-ai-input">
          <input type="text" placeholder="Ask Vettam..." />
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-send">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditorPage;
