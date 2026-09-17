module.exports = {
  language: 'ja',
  theme: ['@vivliostyle/theme-techbook', '.'],
  entry: ['example/default.md'],
  workspaceDir: '.vivliostyle',
  output: [
    'dist/book.pdf',
    {
      path: './dist/book',
      format: 'webpub',
    },
  ],
}
