export const loadCustomFonts = (fontList) => {
  fontList.forEach((fontInfo) => {
    const { fontFamily, fontUrl, fontStretch } = fontInfo;
    const font = new FontFace(fontFamily, `url(${fontUrl})`);
    if (fontStretch) {
      font.stretch = fontStretch;
    }

    font
      .load()
      .then((loadedFont) => {
        document.fonts.add(loadedFont);
      })
      .catch((error) => {
        console.error(`Font "${fontFamily}" loading failed:`, error);
      });
  });
};
