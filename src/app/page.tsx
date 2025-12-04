import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/product/ProductCard";
import { products } from "@/data/products";

export default function Home() {
  const popularProducts = products.filter((p) => p.tags.includes("人気")).slice(0, 4);
  const giftProducts = products.filter((p) => p.tags.includes("ギフト")).slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* ヒーローセクション */}
        <section className="relative bg-gradient-to-br from-[var(--grape-purple-900)] via-[var(--grape-purple-700)] to-[var(--grape-purple-600)] text-white">
          <div className="max-w-[1200px] mx-auto px-4 py-16 md:py-24 lg:py-32">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="order-2 lg:order-1">
                <p className="text-[var(--appetite-yellow-400)] font-bold mb-2">
                  🍇 旬の味覚をお届け
                </p>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                  産地直送の
                  <br />
                  厳選ぶどう
                </h1>
                <p className="text-lg text-gray-200 mb-8 leading-relaxed">
                  糖度・産地・収穫日にこだわった、最高品質のぶどうをお届けします。
                  シャインマスカット、巨峰、ピオーネなど旬の品種をご用意。
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/products"
                    className="inline-flex items-center justify-center px-8 py-4 bg-[var(--appetite-red-600)] hover:bg-[var(--appetite-red-500)] text-white font-bold rounded-full transition-colors btn-touch"
                  >
                    商品を見る
                  </Link>
                  <Link
                    href="/products?tag=ギフト"
                    className="inline-flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-full transition-colors border border-white/30 btn-touch"
                  >
                    ギフト特集
                  </Link>
                </div>
              </div>
              <div className="order-1 lg:order-2 flex justify-center">
                <div className="text-[150px] md:text-[200px] lg:text-[250px] select-none">
                  🍇
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* カテゴリセクション */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-[1200px] mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-[var(--grape-purple-900)]">
              品種から探す
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                { name: "シャインマスカット", emoji: "🍇", color: "from-green-400 to-green-600" },
                { name: "巨峰", emoji: "🍇", color: "from-purple-600 to-purple-800" },
                { name: "ピオーネ", emoji: "🍇", color: "from-purple-500 to-purple-700" },
                { name: "ナガノパープル", emoji: "🍇", color: "from-indigo-500 to-purple-700" },
                { name: "デラウェア", emoji: "🍇", color: "from-red-400 to-red-600" },
              ].map((variety) => (
                <Link
                  key={variety.name}
                  href={`/products?variety=${encodeURIComponent(variety.name)}`}
                  className={`bg-gradient-to-br ${variety.color} text-white rounded-xl p-6 text-center hover:scale-105 transition-transform shadow-lg`}
                >
                  <div className="text-4xl mb-2">{variety.emoji}</div>
                  <div className="font-bold text-sm">{variety.name}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 人気商品セクション */}
        <section className="py-12 md:py-16 bg-[var(--background)]">
          <div className="max-w-[1200px] mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--grape-purple-900)]">
                🔥 人気ランキング
              </h2>
              <Link
                href="/products?sort=popular"
                className="text-[var(--grape-purple-700)] hover:underline font-medium"
              >
                もっと見る →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* 特集バナー */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-[1200px] mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-6">
              <Link
                href="/products?tag=ギフト"
                className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[var(--grape-purple-800)] to-[var(--grape-purple-600)] text-white p-8 hover:shadow-xl transition-shadow"
              >
                <div className="relative z-10">
                  <p className="text-[var(--appetite-yellow-400)] font-bold mb-2">🎁 贈り物に</p>
                  <h3 className="text-2xl font-bold mb-2">ギフトセット</h3>
                  <p className="text-gray-200">大切な方への贈り物に最適な詰め合わせ</p>
                </div>
                <div className="absolute right-4 bottom-4 text-8xl opacity-20">🍇</div>
              </Link>
              <Link
                href="/products?tag=訳あり"
                className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[var(--appetite-yellow-500)] to-orange-500 text-white p-8 hover:shadow-xl transition-shadow"
              >
                <div className="relative z-10">
                  <p className="font-bold mb-2">💰 お得に</p>
                  <h3 className="text-2xl font-bold mb-2">訳ありセール</h3>
                  <p className="text-white/90">味は変わらず、お手頃価格でお届け</p>
                </div>
                <div className="absolute right-4 bottom-4 text-8xl opacity-20">🍇</div>
              </Link>
            </div>
          </div>
        </section>

        {/* ギフト商品セクション */}
        <section className="py-12 md:py-16 bg-[var(--background)]">
          <div className="max-w-[1200px] mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--grape-purple-900)]">
                🎁 ギフトにおすすめ
              </h2>
              <Link
                href="/products?tag=ギフト"
                className="text-[var(--grape-purple-700)] hover:underline font-medium"
              >
                もっと見る →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {giftProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* 特徴セクション */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-[1200px] mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-[var(--grape-purple-900)]">
              ぶどう屋が選ばれる理由
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-[var(--fresh-green-400)] rounded-full flex items-center justify-center text-3xl">
                  🌱
                </div>
                <h3 className="font-bold text-lg mb-2">産地直送</h3>
                <p className="text-gray-600">
                  全国の契約農園から、収穫したての新鮮なぶどうを直接お届けします。
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-[var(--appetite-yellow-400)] rounded-full flex items-center justify-center text-3xl">
                  📊
                </div>
                <h3 className="font-bold text-lg mb-2">糖度保証</h3>
                <p className="text-gray-600">
                  すべての商品で糖度を測定・表示。確かな甘さをお約束します。
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-[var(--grape-purple-500)] rounded-full flex items-center justify-center text-3xl text-white">
                  📦
                </div>
                <h3 className="font-bold text-lg mb-2">丁寧な梱包</h3>
                <p className="text-gray-600">
                  デリケートなぶどうを傷つけないよう、専用資材で丁寧に梱包します。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ニュースレター */}
        <section className="py-12 md:py-16 bg-[var(--grape-purple-900)] text-white">
          <div className="max-w-[600px] mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              旬の情報をお届け
            </h2>
            <p className="text-gray-300 mb-6">
              新入荷情報やお得なキャンペーンをメールでお知らせします。
            </p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="メールアドレス"
                className="flex-1 px-4 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--appetite-yellow-400)]"
              />
              <button
                type="submit"
                className="px-8 py-3 bg-[var(--appetite-red-600)] hover:bg-[var(--appetite-red-500)] font-bold rounded-full transition-colors btn-touch"
              >
                登録する
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
