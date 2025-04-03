export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name: string, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  // Definición de los tipos de items
  private static readonly TYPES_ITEMS = {
    AGED_BRIE: "Aged Brie",
    SULFURAS: "Sulfuras, Hand of Ragnaros",
    BACKSTAGE_PASSES: "Backstage passes to a TAFKAL80ETC concert",
    CONJURED_MANA_CAKE: "Conjured Mana Cake",
  };

  // Definición de los valores máximos y mínimos de calidad
  private static readonly MAX_QUALITY = 50;
  private static readonly MIN_QUALITY = 0;

  // Definición de la calidad de Sulfuras
  private static readonly SULFURAS_QUALITY = 80;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  /* Método privado para obtener la calidad de los backstage passes dependiendo de la fecha de venta */
  private getQualityBackstagePasses(item: Item): number {
    if (item.sellIn < 0) {
      return -item.quality; // Después de la fecha de venta, la calidad se establece a 0
    } else if (item.sellIn <= 5) {
      return 3; // Aumenta 3 si quedan 5 o menos días
    } else if (item.sellIn <= 10) {
      return 2; // Aumenta 2 si quedan 10 o menos días
    } else {
      return 1; // Aumenta 1 si quedan más de 10 días
    }
  }

  /* Método privado para actualizar la calidad de los items */
  private updateQualityOfNormalItems(item: Item): void {
    if (item.sellIn < 0) {
      item.quality = Math.max(GildedRose.MIN_QUALITY, item.quality - 2); // Doble decrecimiento después de la fecha de venta
    } else {
      item.quality = Math.max(GildedRose.MIN_QUALITY, item.quality - 1); // Decrecimiento normal
    }
  }

  /* Método privado para actualizar la calidad de Aged Brie */
  private updateQualityOfAgedBrie(item: Item): void {
    item.quality = Math.min(GildedRose.MAX_QUALITY, item.quality + 1); // Aged Brie aumenta su calidad
  }

  /* Método privado para actualizar la calidad de Conjured items */
  private updateQualityOfConjured(item: Item): void {
    item.quality = Math.max(GildedRose.MIN_QUALITY, item.quality - 2); // Conjured items decrecen el doble
  }

  /* Método privado para actualizar la calidad de Sulfuras */
  private updateQualityOfSulfuras(item: Item): void {
    item.quality = GildedRose.SULFURAS_QUALITY; // Sulfuras no cambia
    item.sellIn += 1; // No disminuye el sellIn
  }

  /* Método privado para actualizar la calidad de Backstage passes */
  private updateQualityOfBackstagePasses(item: Item): void {
    item.quality = Math.min(
      GildedRose.MAX_QUALITY,
      item.quality + this.getQualityBackstagePasses(item)
    );
  }

  /* Método privado que actualiza la calidad de un solo item según su tipo */
  private updateQualityItem(item: Item): Item {
    item.sellIn -= 1;

    switch (item.name) {
      case GildedRose.TYPES_ITEMS.AGED_BRIE:
        this.updateQualityOfAgedBrie(item);
        break;
      case GildedRose.TYPES_ITEMS.SULFURAS:
        this.updateQualityOfSulfuras(item);
        break;
      case GildedRose.TYPES_ITEMS.BACKSTAGE_PASSES:
        this.updateQualityOfBackstagePasses(item);
        break;
      case GildedRose.TYPES_ITEMS.CONJURED_MANA_CAKE:
        this.updateQualityOfConjured(item);
        break;
      default:
        this.updateQualityOfNormalItems(item);
        break;
    }

    return item;
  }

  /* Método público para actualizar la calidad de todos los items */
  public updateQuality(): Array<Item> {
    // Utiliza la función map para actualizar la calidad de todos los items
    this.items = this.items.map((item) => this.updateQualityItem(item));
    return this.items;
  }
}
