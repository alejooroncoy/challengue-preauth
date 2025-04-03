import { GildedRose, Item } from "../gilded-rose";
import { ItemUpdater } from "./ItemUpdater";

class NormalItemUpdater implements ItemUpdater {
  updateQuality(item: Item): void {
    if (item.sellIn < 0) {
      item.quality = Math.max(GildedRose.MIN_QUALITY, item.quality - 2); // Doble decrecimiento después de la fecha de venta
    } else {
      item.quality = Math.max(GildedRose.MIN_QUALITY, item.quality - 1); // Decrecimiento normal
    }
  }
}

export default NormalItemUpdater;
