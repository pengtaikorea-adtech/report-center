const _configure = ((keyname) => {
  return {
    entry: `src/${keyname}/main.js`,
    template: 'public/index.html',
    filename: `${keyname}.html`,
    title: `${keyname}`,
    chunks: ['chunk-vendors', 'chunk-common', keyname],
  };
});

module.exports = {
  pages: ['index','dashboard','agency']
    .reduce((g,keyname)=>{
      g[keyname] = _configure(keyname);
      return g;
    }, {}),
}