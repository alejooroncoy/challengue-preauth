import ItemFactory from "./ItemFactory";

export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  // Definición de los valores máximos y mínimos de calidad
  public static readonly MAX_QUALITY = 50;
  public static readonly MIN_QUALITY = 0;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  /* Método privado que actualiza la calidad de un solo item según su tipo */
  private updateQualityItem(item: Item): Item {
    item.sellIn -= 1;
    const updater = ItemFactory.getUpdater(item); // Obtener el updater adecuado
    updater.updateQuality(item); // Actualizar la calidad del item
    return item;
  }

  /* Método público para actualizar la calidad de todos los items */
  public updateQuality(): Array<Item> {
    // Utiliza la función map para actualizar la calidad de todos los items
    this.items = this.items.map((item) => this.updateQualityItem(item));
    return this.items;
  }
}
