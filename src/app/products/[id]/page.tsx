"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/product/ProductCard";
import { products } from "@/data/products";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const product = products.find((p) => p.id === productId);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">🍇</div>
            <h1 className="text-2xl font-bold mb-4">商品が見つかりません</h1>
            <Link href="/products" className="text-[var(--grape-purple-700)] hover:underline">
              商品一覧に戻る
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // 関連商品（同じ品種の他の商品）
  const relatedProducts = products
    .filter((p) => p.variety === product.variety && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Header />

      <main className="flex-1">
        {/* パンくずリスト */}
        <nav className="bg-white border-b">
          <div className="max-w-[1200px] mx-auto px-4 py-3">
            <ol className="flex items-center gap-2 text-sm">
              <li>
                <Link href="/" className="text-gray-500 hover:text-[var(--grape-purple-700)]">
                  ホーム
                </Link>
              </li>
              <li className="text-gray-400">/</li>
              <li>
                <Link href="/products" className="text-gray-500 hover:text-[var(--grape-purple-700)]">
                  商品一覧
                </Link>
              </li>
              <li className="text-gray-400">/</li>
              <li className="text-gray-900 font-medium truncate">{product.name}</li>
            </ol>
          </div>
        </nav>

        {/* 商品詳細 */}
        <section className="py-8">
          <div className="max-w-[1200px] mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              {/* 画像エリア */}
              <div>
                <div className="aspect-square bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center text-[200px] relative overflow-hidden">
                  🍇
                  {/* タグ */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    {product.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`text-sm px-3 py-1 rounded-full font-medium ${
                          tag === "人気"
                            ? "bg-[var(--appetite-red-600)] text-white"
                            : tag === "訳あり"
                            ? "bg-[var(--appetite-yellow-500)] text-white"
                            : tag === "ギフト"
                            ? "bg-[var(--grape-purple-700)] text-white"
                            : "bg-gray-600 text-white"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                {/* サムネイル */}
                <div className="flex gap-2 mt-4">
                  {[1, 2, 3].map((i) => (
                    <button
                      key={i}
                      className="w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center text-3xl border-2 border-transparent hover:border-[var(--grape-purple-500)] transition-colors"
                    >
                      🍇
                    </button>
                  ))}
                </div>
              </div>

              {/* 商品情報エリア */}
              <div>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <span>{product.variety}</span>
                  <span>·</span>
                  <span>{product.origin}</span>
                </div>

                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  {product.name}
                </h1>

                {/* 価格 */}
                <div className="mb-6">
                  <span className="text-4xl font-bold text-[var(--appetite-red-600)]">
                    ¥{product.unitPrice.toLocaleString()}
                  </span>
                  <span className="text-gray-500 ml-2">（税込）</span>
                </div>

                {/* 商品スペック */}
                <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
                  <h2 className="font-bold text-lg mb-4">商品情報</h2>
                  <dl className="grid grid-cols-2 gap-4">
                    <div>
                      <dt className="text-sm text-gray-500">糖度</dt>
                      <dd className="text-lg font-bold text-[var(--fresh-green-600)]">
                        {product.sugarBrix}°
                      </dd>
                    </div>
                    {product.acidity && (
                      <div>
                        <dt className="text-sm text-gray-500">酸度</dt>
                        <dd className="text-lg font-bold">{product.acidity}%</dd>
                      </div>
                    )}
                    <div>
                      <dt className="text-sm text-gray-500">サイズ</dt>
                      <dd className="text-lg font-bold">{product.size}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">産地</dt>
                      <dd className="text-lg font-bold">{product.origin}</dd>
                    </div>
                    {product.harvestDate && (
                      <div className="col-span-2">
                        <dt className="text-sm text-gray-500">収穫日</dt>
                        <dd className="text-lg font-bold">
                          {new Date(product.harvestDate).toLocaleDateString("ja-JP")}
                        </dd>
                      </div>
                    )}
                    {product.aromaNotes && (
                      <div className="col-span-2">
                        <dt className="text-sm text-gray-500">香りノート</dt>
                        <dd className="font-medium">{product.aromaNotes}</dd>
                      </div>
                    )}
                  </dl>
                </div>

                {/* 在庫状況 */}
                <div className="mb-6">
                  {product.stock > 10 ? (
                    <span className="text-[var(--fresh-green-600)] font-medium">
                      ✓ 在庫あり
                    </span>
                  ) : product.stock > 0 ? (
                    <span className="text-orange-500 font-medium">
                      ⚠ 残り{product.stock}点
                    </span>
                  ) : (
                    <span className="text-red-500 font-medium">
                      ✕ 在庫切れ
                    </span>
                  )}
                </div>

                {/* 数量選択 */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    数量
                  </label>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors btn-touch"
                    >
                      -
                    </button>
                    <span className="w-12 text-center text-lg font-bold">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors btn-touch"
                      disabled={quantity >= product.stock}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex flex-col gap-3">
                  <button
                    className="w-full py-4 bg-[var(--appetite-red-600)] hover:bg-[var(--appetite-red-500)] text-white font-bold rounded-lg transition-colors btn-touch disabled:bg-gray-300 disabled:cursor-not-allowed text-lg"
                    disabled={product.stock === 0}
                  >
                    {product.stock === 0 ? "売り切れ" : "カートに入れる"}
                  </button>
                  <button
                    className="w-full py-4 bg-[var(--grape-purple-900)] hover:bg-[var(--grape-purple-800)] text-white font-bold rounded-lg transition-colors btn-touch disabled:bg-gray-300 disabled:cursor-not-allowed text-lg"
                    disabled={product.stock === 0}
                  >
                    今すぐ購入
                  </button>
                </div>

                {/* 配送情報 */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
                  <p className="flex items-center gap-2 mb-2">
                    <span>🚚</span>
                    <span>最短翌日お届け（冷蔵便）</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span>📦</span>
                    <span>5,000円以上で送料無料</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 商品説明 */}
        <section className="py-8 bg-white">
          <div className="max-w-[1200px] mx-auto px-4">
            <h2 className="text-xl font-bold mb-4">商品説明</h2>
            <p className="text-gray-700 leading-relaxed">
              {product.description || "この商品の詳細な説明文が入ります。"}
            </p>
          </div>
        </section>

        {/* 関連商品 */}
        {relatedProducts.length > 0 && (
          <section className="py-12 bg-[var(--background)]">
            <div className="max-w-[1200px] mx-auto px-4">
              <h2 className="text-2xl font-bold mb-8 text-[var(--grape-purple-900)]">
                関連商品
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      {/* モバイル固定CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 z-40">
        <div className="flex items-center gap-4">
          <div>
            <span className="text-2xl font-bold text-[var(--appetite-red-600)]">
              ¥{product.unitPrice.toLocaleString()}
            </span>
          </div>
          <button
            className="flex-1 py-3 bg-[var(--appetite-red-600)] hover:bg-[var(--appetite-red-500)] text-white font-bold rounded-lg transition-colors btn-touch disabled:bg-gray-300"
            disabled={product.stock === 0}
          >
            {product.stock === 0 ? "売り切れ" : "カートに入れる"}
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
