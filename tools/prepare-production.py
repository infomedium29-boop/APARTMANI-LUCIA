#!/usr/bin/env python3
"""Only run AFTER owner approval and when the final HTTPS domain is known.
Usage: python tools/prepare-production.py https://example.hr
"""
from pathlib import Path
from urllib.parse import urlparse
from xml.sax.saxutils import escape
import re,sys,datetime
ROOT=Path(__file__).resolve().parent.parent
if len(sys.argv)!=2:
 sys.exit('Upotreba: python tools/prepare-production.py https://vasa-domena.hr')
base=sys.argv[1].rstrip('/')
parsed=urlparse(base)
if parsed.scheme!='https' or not parsed.hostname or parsed.path or parsed.query or parsed.fragment:
 sys.exit('Unesite HTTPS domenu bez putanje, npr. https://vasa-domena.hr')
urls=[]
for p in sorted(ROOT.glob('**/*.html')):
 rel=p.relative_to(ROOT).as_posix()
 u=base+'/'+rel
 html=p.read_text(encoding='utf8')
 if rel.endswith('404.html'):
  html=html.replace('content="noindex,nofollow"','content="noindex,follow"')
 else:
  html=html.replace('content="noindex,nofollow"','content="index,follow"')
  urls.append(u)
 html=html.replace('content="index,follow"','content="index,follow"')
 html=re.sub(r'<link rel="canonical"[^>]*>', '', html)
 html=re.sub(r'<meta property="og:url"[^>]*>', '', html)
 html=re.sub(r'(<meta property="og:image" content=")[^"]*(")',r'\g<1>'+base+'/assets/img/social-share.jpg'+r'\2',html)
 html=re.sub(r'(rel="alternate" hreflang="[^"]+" href=")/([^\"]+)(")',r'\1'+base+r'/\2\3',html)
 html=html.replace('</head>', f'<link rel="canonical" href="{u}"><meta property="og:url" content="{u}"></head>',1)
 p.write_text(html,encoding='utf8')
(ROOT/'robots.txt').write_text(f'User-agent: *\nAllow: /\n\nSitemap: {base}/sitemap.xml\n',encoding='utf8')
body='\n'.join(f'  <url><loc>{escape(u)}</loc></url>' for u in urls if '/404.html' not in u)
sitemap=f'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n{body}\n</urlset>\n'
(ROOT/'sitemap.xml').write_text(sitemap,encoding='utf8')
print(f'Pripremljeno {len(urls)} URL-ova za {base}. Provjerite sadržaj i prava na fotografije prije objave.')
