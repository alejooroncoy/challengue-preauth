import { GildedRose, Item } from "../gilded-rose";
import { ItemUpdater } from "./ItemUpdater";

class BackstagePassesUpdater implements ItemUpdater {
  private getQualityBackstagePasses(item: Item): number {
    if (item.sellIn < 0) {
      return -item.quality; // Después de la fecha de venta, la calidad se establece a 0
    }
    if (item.sellIn <= 5) {
      return 3; // Aumenta 3 si quedan 5 o menos días
    }
    if (item.sellIn <= 10) {
      return 2; // Aumenta 2 si quedan 10 o menos días
    }

    return 1; // Aumenta 1 si quedan más de 10 días
  }

  updateQuality(item: Item): void {
    item.quality = Math.min(
      GildedRose.MAX_QUALITY,
      item.quality + this.getQualityBackstagePasses(item)
    );
  }
}

export default BackstagePassesUpdater;
