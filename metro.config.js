module.exports = {
    watchFolders: [
      // Solo incluye carpetas esenciales (ej: la raíz del proyecto)
    ],
    resolver: {
    blacklistRE: /(\.idea|node_modules[\\/].*|android|build|dist|\.cache)/
  }
}
