import { Button } from "@/app/_components/ui/button";
import { db } from "@/app/_lib/prisma";
import { ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

interface ProductPageProps {
    params: {
        id: string;
    }
}

const ProductPage = async ({params}: ProductPageProps) => {

    const product = await db.product.findUnique({
        where: {
            id: params.id
        },
        include: {
            restaurant: true
        }
    })

    if(!product) {
        return notFound();
    }

    console.log(product)

    return (
        <div>
            <div className="relative w-full h-[360px]">
                <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover"
                />

                <Button className="absolute top-4 left-4 rounded-full bg-white text-foreground hover:text-white" size="icon">
                    <ChevronLeftIcon/>
                </Button>
            </div>

            <div className="p-5">
                <div className="flex items-center gap-[0.375rem]">
                    <div className="relative h-6 w-6">
                    <Image
                    src={product.restaurant.imageUrl}
                    alt={product.restaurant.name}
                    fill
                    className="rounded-full object-cover"
                    />
                    </div>
                    <span className="text-xs text-muted-foreground">{product.restaurant.name}</span>
                </div>
            </div>
        </div>
    );
}
 
export default ProductPage;