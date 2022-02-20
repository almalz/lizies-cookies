export const Store = {
  getState: () => Snipcart.store.getState(),
  itemCount: () => Snipcart.store.getState().cart.items.count,
  getItems: () => Snipcart.store.getState().cart.items,
  getItemById: (id: string) =>
    Snipcart.store
      .getState()
      .cart.items.items.find((item: any) => item.id == id),
  subscribe: (callback: () => void) => Snipcart.store.subscribe(callback),
}
