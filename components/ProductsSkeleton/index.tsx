const PRODUCTS_NUM = 4

export const ProductSkeleton: React.FC = () => {
  return (
    <div className="grid gap-8 px-4 sm:grid-cols-1 sm:py-8 sm:px-16 md:grid-cols-2 xl:grid-cols-4">
      {Array.from(Array(PRODUCTS_NUM).keys()).map((product: number) => (
        <div
          key={product}
          className="border-1 flex animate-pulse items-center bg-pink-100 sm:h-[40rem] sm:flex-col sm:p-2"
        ></div>
      ))}
    </div>
  )
}
