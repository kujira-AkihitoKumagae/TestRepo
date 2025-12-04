"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* トップバー（キャンペーン） */}
      <div className="bg-[var(--grape-purple-900)] text-white text-center text-sm py-2 px-4">
        <p>🍇 旬のシャインマスカット特集開催中！送料無料キャンペーン実施中 🍇</p>
      </div>

      {/* メインヘッダー */}
      <div className="px-4 py-3 flex items-center justify-between gap-4 max-w-[1200px] mx-auto">
        {/* ハンバーガーメニュー（モバイル） */}
        <button
          className="lg:hidden p-2 -ml-2 btn-touch"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="メニューを開く"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* ロゴ */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <span className="text-2xl">🍇</span>
          <span className="text-xl font-bold text-[var(--grape-purple-900)]">ぶどう屋</span>
        </Link>

        {/* デスクトップナビゲーション */}
        <nav className="hidden lg:flex items-center gap-8">
          <Link href="/products" className="text-gray-700 hover:text-[var(--grape-purple-700)] transition-colors">
            商品一覧
          </Link>
          <Link href="/products?variety=シャインマスカット" className="text-gray-700 hover:text-[var(--grape-purple-700)] transition-colors">
            シャインマスカット
          </Link>
          <Link href="/products?variety=巨峰" className="text-gray-700 hover:text-[var(--grape-purple-700)] transition-colors">
            巨峰
          </Link>
          <Link href="/products?tag=ギフト" className="text-gray-700 hover:text-[var(--grape-purple-700)] transition-colors">
            ギフト
          </Link>
          <Link href="/products?tag=訳あり" className="text-gray-700 hover:text-[var(--grape-purple-700)] transition-colors">
            訳あり
          </Link>
        </nav>

        {/* 検索バー（デスクトップ） */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <input
              type="search"
              placeholder="品種・産地で検索..."
              className="w-full py-2 px-4 pr-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--grape-purple-500)] focus:border-transparent"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[var(--grape-purple-700)]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>

        {/* 右側アイコン */}
        <div className="flex items-center gap-2">
          {/* 検索（モバイル） */}
          <button
            className="md:hidden p-2 btn-touch"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            aria-label="検索"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          {/* 会員 */}
          <Link href="/account" className="p-2 btn-touch" aria-label="マイページ">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </Link>

          {/* カート */}
          <Link href="/cart" className="p-2 btn-touch relative" aria-label="カート">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="absolute -top-1 -right-1 bg-[var(--appetite-red-600)] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              0
            </span>
          </Link>
        </div>
      </div>

      {/* モバイル検索バー */}
      {isSearchOpen && (
        <div className="md:hidden px-4 pb-3">
          <div className="relative">
            <input
              type="search"
              placeholder="品種・産地で検索..."
              className="w-full py-2 px-4 pr-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--grape-purple-500)]"
              autoFocus
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* モバイルメニュー */}
      {isMenuOpen && (
        <nav className="lg:hidden border-t border-gray-200">
          <ul className="py-2">
            <li>
              <Link href="/products" className="block px-4 py-3 hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>
                商品一覧
              </Link>
            </li>
            <li>
              <Link href="/products?variety=シャインマスカット" className="block px-4 py-3 hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>
                シャインマスカット
              </Link>
            </li>
            <li>
              <Link href="/products?variety=巨峰" className="block px-4 py-3 hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>
                巨峰
              </Link>
            </li>
            <li>
              <Link href="/products?variety=ピオーネ" className="block px-4 py-3 hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>
                ピオーネ
              </Link>
            </li>
            <li>
              <Link href="/products?tag=ギフト" className="block px-4 py-3 hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>
                ギフト特集
              </Link>
            </li>
            <li>
              <Link href="/products?tag=訳あり" className="block px-4 py-3 hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>
                訳ありセール
              </Link>
            </li>
            <li className="border-t border-gray-200 mt-2 pt-2">
              <Link href="/guide" className="block px-4 py-3 text-gray-600 hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>
                ご利用ガイド
              </Link>
            </li>
            <li>
              <Link href="/contact" className="block px-4 py-3 text-gray-600 hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>
                お問い合わせ
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
