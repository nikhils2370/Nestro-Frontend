import ProductDetails from "@/components/website/UI/ProductDetails";
import RelatedProducts from "@/components/website/UI/RelatedProducts";
import { fetchProductById, fetchProduct } from "@/api/ProductAPI";

export default async function ProductPage({ params }) {
  const { product_id } = await params;

  console.log("Product ID:", product_id);

  let product = null;
  let relatedProducts = [];

  try {
    // --------------------------------
    // Fetch single product by ID
    // --------------------------------
    const response = await fetchProductById(product_id);

    console.log("Product response:", response);

    product = response?.product || response?.data || null;

    // --------------------------------
    // Fetch related products
    // --------------------------------
    if (product?.categoryId) {
      const relatedResponse = await fetchProduct({
        categoryId: product.categoryId,
        limit: 8,
      });
console.log(relatedResponse);

      console.log("Related products response:", relatedResponse);

      relatedProducts =
        relatedResponse?.product || relatedResponse?.data || [];
    }

    console.log("Product:", product);
    console.log("Related products:", relatedProducts);
  } catch (error) {
    console.error("Product page error:", error);
  }

  // --------------------------------
  // Product not found
  // --------------------------------
  if (!product) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-[#171717]">
            Product Not Found
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            This product is no longer available.
          </p>
        </div>
      </div>
    );
  }

  // --------------------------------
  // Remove current product
  // --------------------------------
  const filteredRelatedProducts = relatedProducts.filter(
    (item) => item._id !== product._id,
  );
console.log(filteredRelatedProducts);

  return (
    <main className="bg-[#faf9f7]">
      {/* Product Details */}
      <ProductDetails product={product} />

      {/* Related Products */}
      {filteredRelatedProducts.length > 0 && (
        <RelatedProducts products={filteredRelatedProducts} />
      )}
    </main>
  );
}
