import { GildedRose, Item } from "../gilded-rose";
import { ItemUpdater } from "./ItemUpdater";

class AgedBrieUpdater implements ItemUpdater {
  updateQuality(item: Item): void {
    item.quality = Math.min(GildedRose.MAX_QUALITY, item.quality + 1); // Aged Brie aumenta su calidad
  }
}

export default AgedBrieUpdater;
