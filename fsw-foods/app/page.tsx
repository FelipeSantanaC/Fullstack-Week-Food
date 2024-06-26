import Image from "next/image";
import CategoryList from "./_components/category-list";
import Header from "./_components/header";
import Search from "./_components/search";
import ProductList from "./_components/product-list";
import { Button } from "./_components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import { db } from "./_lib/prisma";
import PromoBanner from "./_components/promo-banner";
import RestaurantList from "./_components/restaurant-list";

export default async function Home() {

  const products = await db.product.findMany({
    where: {
        discountPercentage: {
            gt: 0
        }
    },
    take: 10,
    include: {
        restaurant: {
            select: {
                name: true,
            }
        }
    }
})

  return (
    <>
      <Header/>
      <div className="px-5 pt-6">
        <Search/>
      </div>
      
      <div className="px-5 pt-6">
        <CategoryList/>
      </div>

      <div className="px-5 pt-6">
        <PromoBanner
        src="/promo-banner.png" 
        alt="Até 30% de desconto em pizza" 
        />
      </div>

      <div className="pt-6 space-y-4">
        <div className="px-5 flex justify-between items-center">
          <h2 className="font-semibold">Pedidos recomendados</h2>
          <Button variant="ghost" className="p-0 text-primary hover:bg-transparent h-fit">
            Ver todos
            <ChevronRightIcon size={16}/>
          </Button>
        </div>
        <ProductList products={products}/>
      </div>

      <div className="px-5 pt-6">
        <PromoBanner
        src="/promo-banner2.png"
        alt="oi"
        />
      </div>

      <div className="pt-6 py-6 space-y-4">
        <div className="px-5 flex justify-between items-center">
          <h2 className="font-semibold">Restaurantes recomendados</h2>
          <Button variant="ghost" className="p-0 text-primary hover:bg-transparent h-fit">
            Ver todos
            <ChevronRightIcon size={16}/>
          </Button>
        </div>
        <RestaurantList />
      </div>
    </>
  );
}
