const loads = (images: any) => {
  return images.keys().map((data: any) => {
    const name = data.split("./").slice(-1)[0].split(".")[0].toUpperCase();
    return {
      name: name,
      data: images(data).default,
    };
  });
};
const Images = () => {
  const images = loads(require.context("@assets/images"));
  return images.reduce(
    (a: any, b: any) => ({
      ...a,
      [b.name]: b.data,
    }),
    {}
  );
};

export default Images();
