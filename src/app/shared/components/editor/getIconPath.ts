/**
 * 针对 build 目录下 icon 进行二级路径处理
 * - 如果开启二级路径，但是图片路径中未包含，则进行拼接
 * - 二级路径格式: /second
 */
export const getIconPath = (path: string) => {
  const publicUrlstatic = window.location.origin || '';

  if (!publicUrlstatic || typeof path !== 'string') {
    return path;
  }

  if (!path.startsWith(publicUrlstatic)) {
    return `${publicUrlstatic}${path}`;
  }

  return path;
};
