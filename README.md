# 生日祝福网页

这是一个纯静态生日祝福页面，直接部署 `index.html`、`styles.css`、`script.js` 到服务器站点目录即可。

## 可定制位置

- `index.html` 中的祝福文字、三个愿望卡片、回忆描述和页脚年份。
- `assets/` 中的两张压缩照片来自原始回忆照片，用于移动端加载。
- `styles.css` 的配色变量位于 `:root`。

## 部署建议

如果你的服务器使用 Nginx，把三个文件放到域名对应的站点根目录，例如 `/var/www/birthday`。确保 Nginx 的 `root` 指向该目录，并让入口文件为 `index.html`。
