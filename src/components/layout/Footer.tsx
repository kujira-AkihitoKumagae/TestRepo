import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[var(--grape-purple-900)] text-white">
      {/* メインフッター */}
      <div className="max-w-[1200px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* ブランド */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🍇</span>
              <span className="text-xl font-bold">ぶどう屋</span>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              全国の厳選されたぶどうを産地直送でお届けします。旬の味わいをご家庭でお楽しみください。
            </p>
          </div>

          {/* 商品カテゴリ */}
          <div>
            <h3 className="font-bold mb-4 text-[var(--appetite-yellow-400)]">商品カテゴリ</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products?variety=シャインマスカット" className="text-gray-300 hover:text-white transition-colors">
                  シャインマスカット
                </Link>
              </li>
              <li>
                <Link href="/products?variety=巨峰" className="text-gray-300 hover:text-white transition-colors">
                  巨峰
                </Link>
              </li>
              <li>
                <Link href="/products?variety=ピオーネ" className="text-gray-300 hover:text-white transition-colors">
                  ピオーネ
                </Link>
              </li>
              <li>
                <Link href="/products?tag=ギフト" className="text-gray-300 hover:text-white transition-colors">
                  ギフトセット
                </Link>
              </li>
              <li>
                <Link href="/products?tag=訳あり" className="text-gray-300 hover:text-white transition-colors">
                  訳あり商品
                </Link>
              </li>
            </ul>
          </div>

          {/* ご利用ガイド */}
          <div>
            <h3 className="font-bold mb-4 text-[var(--appetite-yellow-400)]">ご利用ガイド</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/guide/shipping" className="text-gray-300 hover:text-white transition-colors">
                  送料・配送について
                </Link>
              </li>
              <li>
                <Link href="/guide/payment" className="text-gray-300 hover:text-white transition-colors">
                  お支払い方法
                </Link>
              </li>
              <li>
                <Link href="/guide/returns" className="text-gray-300 hover:text-white transition-colors">
                  返品・交換
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-white transition-colors">
                  よくある質問
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  お問い合わせ
                </Link>
              </li>
            </ul>
          </div>

          {/* 会社情報 */}
          <div>
            <h3 className="font-bold mb-4 text-[var(--appetite-yellow-400)]">会社情報</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  会社概要
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors">
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-white transition-colors">
                  利用規約
                </Link>
              </li>
              <li>
                <Link href="/law" className="text-gray-300 hover:text-white transition-colors">
                  特定商取引法に基づく表記
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* コピーライト */}
      <div className="border-t border-white/10">
        <div className="max-w-[1200px] mx-auto px-4 py-4 text-center text-sm text-gray-400">
          <p>&copy; 2024 ぶどう屋 All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
