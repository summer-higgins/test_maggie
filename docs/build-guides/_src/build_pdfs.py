"""Convert the Prototype-1 build-guide markdown sources to styled HTML.

Usage: python build_pdfs.py
Outputs <name>.html next to each <name>.md in this folder. A separate step
renders each HTML to ../<name>.pdf via headless Chrome.
"""
import pathlib
import markdown

SRC = pathlib.Path(__file__).parent
TITLE = "MAGGIE — Prototype 1 Build Guide"

CSS = """
@page { size: Letter; margin: 18mm 16mm 20mm 16mm; }
* { box-sizing: border-box; }
body {
  font-family: "Segoe UI", Calibri, Arial, sans-serif;
  color: #1f1615; font-size: 10.5pt; line-height: 1.5; max-width: 100%;
}
h1, h2, h3, h4 { color: #234f3f; line-height: 1.25; font-weight: 700; }
h1 { font-size: 20pt; border-bottom: 3px solid #51b5a6; padding-bottom: 6px; margin: 0 0 14px; }
h2 { font-size: 14.5pt; margin: 22px 0 8px; border-bottom: 1px solid #d9cdb4; padding-bottom: 3px; }
h3 { font-size: 12pt; margin: 16px 0 6px; }
h4 { font-size: 10.8pt; margin: 12px 0 4px; color: #6e3c3b; }
p { margin: 6px 0; }
a { color: #234f3f; text-decoration: none; }
strong { color: #1f1615; }
ul, ol { margin: 6px 0 6px 0; padding-left: 22px; }
li { margin: 3px 0; }
hr { border: none; border-top: 1px solid #d9cdb4; margin: 18px 0; }
blockquote {
  margin: 8px 0; padding: 6px 12px; background: #fff7e8;
  border-left: 4px solid #c17145; color: #5c4e44; border-radius: 4px;
}
code {
  font-family: "Cascadia Code", Consolas, "Courier New", monospace;
  font-size: 9pt; background: #f3ead2; padding: 1px 4px; border-radius: 3px; color: #6e3c3b;
}
pre {
  background: #1f1615; color: #f4efe6; padding: 10px 12px; border-radius: 6px;
  overflow-x: auto; font-size: 8.6pt; line-height: 1.45; page-break-inside: avoid;
}
pre code { background: none; color: inherit; padding: 0; font-size: inherit; }
table {
  border-collapse: collapse; width: 100%; margin: 10px 0; font-size: 9.2pt;
  page-break-inside: avoid;
}
th, td { border: 1px solid #c9bda4; padding: 5px 8px; text-align: left; vertical-align: top; }
th { background: #234f3f; color: #fff7e8; font-weight: 700; }
tr:nth-child(even) td { background: #fbf6ea; }
.footer-note { margin-top: 26px; padding-top: 8px; border-top: 1px solid #d9cdb4;
  color: #8a7c6e; font-size: 8.5pt; }
"""

HTML = """<!doctype html><html><head><meta charset="utf-8">
<title>{title}</title><style>{css}</style></head>
<body>{body}
<div class="footer-note">MAGGIE · Wayne State CSC4996 · Prototype 1 build guide · generated from {src}</div>
</body></html>"""

EXTS = ["extra", "sane_lists", "tables", "fenced_code", "attr_list"]

def main():
    mds = sorted(p for p in SRC.glob("*.md"))
    for md_path in mds:
        text = md_path.read_text(encoding="utf-8")
        body = markdown.markdown(text, extensions=EXTS)
        html = HTML.format(title=TITLE, css=CSS, body=body, src=md_path.name)
        out = md_path.with_suffix(".html")
        out.write_text(html, encoding="utf-8")
        print("wrote", out.name)

if __name__ == "__main__":
    main()
