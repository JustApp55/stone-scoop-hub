import { MenuItem } from '@/types/menu'

interface CardItemProps {
  item: MenuItem
  onAddToCart: (name: string, price: number) => void
  small?: boolean
}

export function CardItem({ item, onAddToCart, small = false }: CardItemProps) {
  const handleAdd = () => {
    onAddToCart(item.n, item.p)
  }

  return (
    <div className="ice-cream-card group">
      <div className="flex items-start gap-3">
        <div className="text-3xl group-hover:scale-110 transition-transform duration-200" role="img" aria-label={item.n}>
          {item.e}
        </div>
        <div className="flex-1">
          <div className={`font-black text-primary ${small ? '' : 'text-lg'}`}>
            {item.n}
          </div>
          {item.limited && (
            <div className="text-xs font-bold text-orange-600 mt-1">
              Limited Time
            </div>
          )}
          <div className="font-bold mt-1 text-foreground">
            ${item.p.toFixed(2)}
          </div>
        </div>
        <button
          onClick={handleAdd}
          className="px-3 py-2 rounded-full bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          aria-label={`Add ${item.n} to cart for $${item.p.toFixed(2)}`}
        >
          Add
        </button>
      </div>
    </div>
  )
}