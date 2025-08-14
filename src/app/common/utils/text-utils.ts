function stripHtml(html: string): string {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
}

export function getTagline(content: string): string {
  const plainText = stripHtml(content);
  return plainText.length > 100 ? plainText.slice(0, 100) + '...' : plainText;
}
