export const resolveMediaBgImage = (uri: string) => {
  if (uri?.startsWith('https://')) {
    return `url(${uri})`;
  }

  return null;
};
