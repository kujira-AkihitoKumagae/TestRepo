"use client";

import { useState, useMemo } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/product/ProductCard";
import ProductFilter, { FilterState } from "@/components/product/ProductFilter";
import { products, varieties, origins, sizes, tags } from "@/data/products";

export default function ProductsPage() {
  const [filters, setFilters] = useState<FilterState>({
    variety: "",
    origin: "",
    size: "",
    tag: "",
    sugarMin: 0,
    sugarMax: 30,
    sort: "popular",
  });

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // フィルタリング
    if (filters.variety) {
      result = result.filter((p) => p.variety === filters.variety);
    }
    if (filters.origin) {
      result = result.filter((p) => p.origin === filters.origin);
    }
    if (filters.size) {
      result = result.filter((p) => p.size === filters.size);
    }
    if (filters.tag) {
      result = result.filter((p) => p.tags.includes(filters.tag));
    }
    if (filters.sugarMin > 0) {
      result = result.filter((p) => p.sugarBrix >= filters.sugarMin);
    }

    // ソート
    switch (filters.sort) {
      case "price-asc":
        result.sort((a, b) => a.unitPrice - b.unitPrice);
        break;
      case "price-desc":
        result.sort((a, b) => b.unitPrice - a.unitPrice);
        break;
      case "sugar-desc":
        result.sort((a, b) => b.sugarBrix - a.sugarBrix);
        break;
      case "new":
        result.sort((a, b) => {
          if (!a.harvestDate || !b.harvestDate) return 0;
          return new Date(b.harvestDate).getTime() - new Date(a.harvestDate).getTime();
        });
        break;
      default:
        // 人気順（在庫が多い順 + タグに「人気」があるものを優先）
        result.sort((a, b) => {
          const aPopular = a.tags.includes("人気") ? 1 : 0;
          const bPopular = b.tags.includes("人気") ? 1 : 0;
          return bPopular - aPopular || b.stock - a.stock;
        });
    }

    return result;
  }, [filters]);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Header />

      <main className="flex-1">
        {/* ページヘッダー */}
        <section className="bg-[var(--grape-purple-900)] text-white py-8 md:py-12">
          <div className="max-w-[1200px] mx-auto px-4">
            <h1 className="text-2xl md:text-3xl font-bold">商品一覧</h1>
            <p className="text-gray-300 mt-2">
              {filteredProducts.length}件の商品が見つかりました
            </p>
          </div>
        </section>

        {/* メインコンテンツ */}
        <section className="py-8">
          <div className="max-w-[1200px] mx-auto px-4">
            {/* フィルター */}
            <ProductFilter
              varieties={varieties}
              origins={origins}
              sizes={sizes}
              tags={tags}
              onFilterChange={setFilters}
            />

            {/* 商品グリッド */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🍇</div>
                <h2 className="text-xl font-bold text-gray-700 mb-2">
                  条件に合う商品が見つかりませんでした
                </h2>
                <p className="text-gray-500">
                  絞り込み条件を変更してお探しください。
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
