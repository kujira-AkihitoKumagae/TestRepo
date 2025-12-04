"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { products } from "@/data/products";

// デモ用のカートデータ
const initialCartItems = [
  { productId: "1", quantity: 1 },
  { productId: "2", quantity: 2 },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const cartProducts = cartItems
    .map((item) => {
      const product = products.find((p) => p.id === item.productId);
      return product ? { ...item, product } : null;
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  const subtotal = cartProducts.reduce((sum, item) => {
    return sum + item.product.unitPrice * item.quantity;
  }, 0);

  const shippingFee = subtotal >= 5000 ? 0 : 880;
  const total = subtotal + shippingFee;

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      setCartItems(cartItems.filter((item) => item.productId !== productId));
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.productId === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeItem = (productId: string) => {
    setCartItems(cartItems.filter((item) => item.productId !== productId));
  };

  if (cartProducts.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-[var(--background)]">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center px-4">
            <div className="text-6xl mb-4">🛒</div>
            <h1 className="text-2xl font-bold mb-4">カートは空です</h1>
            <p className="text-gray-600 mb-8">
              商品を追加してお買い物をお楽しみください。
            </p>
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-8 py-4 bg-[var(--appetite-red-600)] hover:bg-[var(--appetite-red-500)] text-white font-bold rounded-full transition-colors"
            >
              商品を探す
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Header />

      <main className="flex-1">
        {/* ページヘッダー */}
        <section className="bg-[var(--grape-purple-900)] text-white py-8">
          <div className="max-w-[1200px] mx-auto px-4">
            <h1 className="text-2xl md:text-3xl font-bold">ショッピングカート</h1>
            <p className="text-gray-300 mt-2">{cartProducts.length}点の商品</p>
          </div>
        </section>

        <section className="py-8">
          <div className="max-w-[1200px] mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* カート商品一覧 */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  {cartProducts.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex gap-4 p-4 border-b last:border-b-0"
                    >
                      {/* 商品画像 */}
                      <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center text-4xl flex-shrink-0">
                        🍇
                      </div>

                      {/* 商品情報 */}
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/products/${item.product.id}`}
                          className="font-bold text-gray-900 hover:text-[var(--grape-purple-700)] overflow-hidden text-ellipsis whitespace-nowrap block"
                        >
                          {item.product.name}
                        </Link>
                        <div className="text-sm text-gray-500 mt-1">
                          {item.product.variety} / {item.product.origin}
                        </div>
                        <div className="text-sm text-gray-500">
                          サイズ: {item.product.size}
                        </div>

                        {/* モバイル: 価格・数量 */}
                        <div className="md:hidden mt-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.product.id,
                                    item.quantity - 1
                                  )
                                }
                                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg"
                              >
                                -
                              </button>
                              <span className="w-8 text-center font-medium">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.product.id,
                                    item.quantity + 1
                                  )
                                }
                                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg"
                              >
                                +
                              </button>
                            </div>
                            <span className="font-bold text-[var(--appetite-red-600)]">
                              ¥
                              {(
                                item.product.unitPrice * item.quantity
                              ).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* デスクトップ: 価格・数量・削除 */}
                      <div className="hidden md:flex items-center gap-8">
                        {/* 数量 */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.quantity - 1
                              )
                            }
                            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50"
                          >
                            -
                          </button>
                          <span className="w-8 text-center font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.quantity + 1
                              )
                            }
                            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50"
                          >
                            +
                          </button>
                        </div>

                        {/* 価格 */}
                        <div className="w-24 text-right">
                          <span className="font-bold text-[var(--appetite-red-600)]">
                            ¥
                            {(
                              item.product.unitPrice * item.quantity
                            ).toLocaleString()}
                          </span>
                        </div>

                        {/* 削除 */}
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="text-gray-400 hover:text-red-500"
                          aria-label="削除"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 買い物を続ける */}
                <div className="mt-4">
                  <Link
                    href="/products"
                    className="text-[var(--grape-purple-700)] hover:underline"
                  >
                    ← 買い物を続ける
                  </Link>
                </div>
              </div>

              {/* 注文サマリー */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                  <h2 className="font-bold text-lg mb-4">注文内容</h2>

                  <dl className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-gray-600">小計</dt>
                      <dd className="font-medium">¥{subtotal.toLocaleString()}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">送料</dt>
                      <dd className="font-medium">
                        {shippingFee === 0 ? (
                          <span className="text-[var(--fresh-green-600)]">無料</span>
                        ) : (
                          `¥${shippingFee.toLocaleString()}`
                        )}
                      </dd>
                    </div>
                    {subtotal < 5000 && (
                      <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                        あと¥{(5000 - subtotal).toLocaleString()}で送料無料！
                      </div>
                    )}
                    <div className="border-t pt-3 flex justify-between text-base">
                      <dt className="font-bold">合計</dt>
                      <dd className="font-bold text-[var(--appetite-red-600)]">
                        ¥{total.toLocaleString()}
                      </dd>
                    </div>
                  </dl>

                  <button className="w-full mt-6 py-4 bg-[var(--appetite-red-600)] hover:bg-[var(--appetite-red-500)] text-white font-bold rounded-lg transition-colors btn-touch">
                    レジに進む
                  </button>

                  <div className="mt-4 text-center text-sm text-gray-500">
                    <p>安全な決済</p>
                    <div className="flex justify-center gap-2 mt-2">
                      <span className="text-xl">💳</span>
                      <span className="text-xl">🍎</span>
                      <span className="text-xl">📱</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* モバイル固定CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 z-40">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-600">合計</span>
          <span className="text-xl font-bold text-[var(--appetite-red-600)]">
            ¥{total.toLocaleString()}
          </span>
        </div>
        <button className="w-full py-3 bg-[var(--appetite-red-600)] hover:bg-[var(--appetite-red-500)] text-white font-bold rounded-lg transition-colors btn-touch">
          レジに進む
        </button>
      </div>

      <Footer />
    </div>
  );
}
