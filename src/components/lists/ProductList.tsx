const ProductList = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/products?page=1&size=4`
  );
  const body = await response.json();

  return <ul>{JSON.stringify(body)}</ul>;
};

export default ProductList;
