/**
 * 下载文件流方法
 */
export function download(blob, fileName, type=".xls") {
  let url = window.URL.createObjectURL(new Blob([blob]))
  // 生成一个a标签
  let link = document.createElement("a")
  link.style.display = "none"
  link.href = url
  if (!fileName) fileName = new Date().getTime();
  link.download = fileName + type
  document.body.appendChild(link)
  link.click();
  document.body.removeChild(link)
  // 释放blob URL地址
  window.URL.revokeObjectURL(url)
}
