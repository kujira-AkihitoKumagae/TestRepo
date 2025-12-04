import Link from "next/link";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow overflow-hidden">
      <Link href={`/products/${product.id}`} className="block">
        {/* 商品画像 */}
        <div className="relative aspect-square bg-gray-100 overflow-hidden">
          {/* プレースホルダー画像 */}
          <div className="absolute inset-0 flex items-center justify-center text-6xl bg-gradient-to-br from-purple-100 to-purple-200">
            🍇
          </div>
          
          {/* タグ */}
          <div className="absolute top-2 left-2 flex flex-wrap gap-1">
            {product.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className={`text-xs px-2 py-1 rounded-full font-medium ${
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

          {/* 在庫状況 */}
          {product.stock <= 5 && product.stock > 0 && (
            <div className="absolute bottom-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
              残りわずか
            </div>
          )}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-bold text-lg">売り切れ</span>
            </div>
          )}
        </div>

        {/* 商品情報 */}
        <div className="p-3 md:p-4">
          {/* 品種・産地 */}
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
            <span>{product.variety}</span>
            <span>·</span>
            <span>{product.origin}</span>
          </div>

          {/* 商品名 */}
          <h3 className="font-bold text-gray-900 mb-2 group-hover:text-[var(--grape-purple-700)] transition-colors line-clamp-2">
            {product.name}
          </h3>

          {/* 糖度・サイズ */}
          <div className="flex items-center gap-3 text-sm mb-3">
            <span className="flex items-center gap-1 text-[var(--fresh-green-600)]">
              <span className="text-xs">糖度</span>
              <span className="font-bold">{product.sugarBrix}°</span>
            </span>
            <span className="text-gray-400">|</span>
            <span className="text-gray-600">サイズ {product.size}</span>
          </div>

          {/* 価格 */}
          <div className="flex items-end justify-between">
            <div>
              <span className="text-2xl font-bold text-[var(--appetite-red-600)]">
                ¥{product.unitPrice.toLocaleString()}
              </span>
              <span className="text-xs text-gray-500 ml-1">（税込）</span>
            </div>
          </div>
        </div>
      </Link>

      {/* カートボタン */}
      <div className="px-3 pb-3 md:px-4 md:pb-4">
        <button
          className="w-full py-3 bg-[var(--appetite-red-600)] hover:bg-[var(--appetite-red-500)] text-white font-bold rounded-lg transition-colors btn-touch disabled:bg-gray-300 disabled:cursor-not-allowed"
          disabled={product.stock === 0}
        >
          {product.stock === 0 ? "売り切れ" : "カートに入れる"}
        </button>
      </div>
    </article>
  );
}
