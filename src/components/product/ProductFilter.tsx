"use client";

import { useState } from "react";

interface ProductFilterProps {
  varieties: string[];
  origins: string[];
  sizes: string[];
  tags: string[];
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  variety: string;
  origin: string;
  size: string;
  tag: string;
  sugarMin: number;
  sugarMax: number;
  sort: string;
}

export default function ProductFilter({
  varieties,
  origins,
  sizes,
  tags,
  onFilterChange,
}: ProductFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    variety: "",
    origin: "",
    size: "",
    tag: "",
    sugarMin: 0,
    sugarMax: 30,
    sort: "popular",
  });

  const handleChange = (key: keyof FilterState, value: string | number) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const initialFilters: FilterState = {
      variety: "",
      origin: "",
      size: "",
      tag: "",
      sugarMin: 0,
      sugarMax: 30,
      sort: "popular",
    };
    setFilters(initialFilters);
    onFilterChange(initialFilters);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      {/* モバイル: フィルタートグル */}
      <button
        className="lg:hidden w-full flex items-center justify-between py-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-bold">絞り込み・並べ替え</span>
        <svg
          className={`w-5 h-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* フィルター本体 */}
      <div className={`${isOpen ? "block" : "hidden"} lg:block mt-4 lg:mt-0`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          {/* 品種 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">品種</label>
            <select
              value={filters.variety}
              onChange={(e) => handleChange("variety", e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--grape-purple-500)] focus:border-transparent"
            >
              <option value="">すべて</option>
              {varieties.map((v) => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
          </div>

          {/* 産地 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">産地</label>
            <select
              value={filters.origin}
              onChange={(e) => handleChange("origin", e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--grape-purple-500)] focus:border-transparent"
            >
              <option value="">すべて</option>
              {origins.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>

          {/* サイズ */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">サイズ</label>
            <select
              value={filters.size}
              onChange={(e) => handleChange("size", e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--grape-purple-500)] focus:border-transparent"
            >
              <option value="">すべて</option>
              {sizes.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* タグ */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">用途</label>
            <select
              value={filters.tag}
              onChange={(e) => handleChange("tag", e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--grape-purple-500)] focus:border-transparent"
            >
              <option value="">すべて</option>
              {tags.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* 糖度 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">糖度（{filters.sugarMin}°以上）</label>
            <input
              type="range"
              min="0"
              max="25"
              value={filters.sugarMin}
              onChange={(e) => handleChange("sugarMin", parseInt(e.target.value))}
              className="w-full accent-[var(--grape-purple-600)]"
            />
          </div>

          {/* 並べ替え */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">並べ替え</label>
            <select
              value={filters.sort}
              onChange={(e) => handleChange("sort", e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--grape-purple-500)] focus:border-transparent"
            >
              <option value="popular">人気順</option>
              <option value="price-asc">価格が安い順</option>
              <option value="price-desc">価格が高い順</option>
              <option value="sugar-desc">糖度が高い順</option>
              <option value="new">新着順</option>
            </select>
          </div>
        </div>

        {/* クリアボタン */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={clearFilters}
            className="text-sm text-gray-500 hover:text-[var(--grape-purple-700)] underline"
          >
            条件をクリア
          </button>
        </div>
      </div>
    </div>
  );
}
